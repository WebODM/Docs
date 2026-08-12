---
title: Guida allo Sviluppo di Plugin
template: doc
---

WebODM ti permette di scrivere plugin, che puoi distribuire come file .zip o condividere con il mondo aggiungendoli alla cartella `coreplugins` di WebODM (e aprendo una pull request). Questa è un'opzione flessibile per chi non vuole mantenere un fork separato, ma vuole comunque aggiungere nuove funzionalità a WebODM.

Puoi attivare/disattivare i plugin dalla Dashboard tramite il menu **Administration** --> **Plugins**.

I plugin ti permettono di definire sia logica lato server (Python) che lato client (Javascript). Vengono eseguiti in un ambiente condiviso. Ci sono hook / gestori di eventi / segnali a cui puoi iscriverti per essere notificato di vari eventi, ad esempio quando un task viene creato/eliminato, o quando la vista mappa sta per essere renderizzata. Il loro numero è limitato, ma tieni presente che se ne possono aggiungere altri.

Vengono forniti alcuni helper di base, ad esempio per eseguire task asincroni di lunga durata, per l'archiviazione di base di dati chiave-valore, per installare dipendenze Python isolate (tramite pip) così come dipendenze Javascript (tramite npm). Un sistema di build lato client (tramite webpack) ti permette inoltre di usare React/SCSS nel codice del tuo plugin e di accedere a tutti i componenti lato client di WebODM (JSX).

Puoi rendere disponibili degli asset (immagini, stili, template, ...) semplicemente posizionandoli in una cartella `public`.

Il sistema di plugin non cerca di imporre standard rigidi. Ciò che costruisci dipende da te e tutto è possibile.

## Avvio Rapido

 * Assicurati di aver avviato WebODM in modalità sviluppo (tramite `--dev`). Vedi [contribuire](/it/contributing/#configurare-un-ambiente-di-sviluppo) per le istruzioni.
 * Vai su **Administration** --> **Plugins** e attiva il plugin **Hello World**.
 * Nota che un menu "Hello World" è apparso nel menu laterale sinistro.
 * Fai una copia della cartella `coreplugins/hello-world`. Chiamala `coreplugins/my-plugin`.
 * Modifica `coreplugins/my-plugin/manifest.json`:

 ```json
 {
	"name": "My Plugin",
	"webodmMinVersion": "2.9.4",
	"description": "My First plugin",
	"version": "1.0.0",
	"author": "Your name",
	"email": "your@email.here",
	"repository": "https://github.com/WebODM/WebODM",
	"tags": ["descriptive", "tags"],
	"homepage": "https://github.com/WebODM/WebODM",
	"experimental": false,
	"deprecated": false
}
```

 * Modifica `coreplugins/my-plugin/plugin.py`:

```python
from app.plugins import PluginBase, Menu, MountPoint
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.translation import gettext as _

class Plugin(PluginBase):
    def main_menu(self):
        return [Menu(_("My Plugin"), self.public_url(""), "fa fa-cog fa-fw")]

    def app_mount_points(self):
        @login_required
        def hello_view(request):
            return render(request, self.template_path("hello.html"), {'message': "Hello!"})

        return [
            MountPoint('$', hello_view),
            # altri mount point qui ...
        ]
    
    def include_js_files(self):
        return ['main.js']
    
    def build_jsx_components(self):
        return ['app.jsx']

    # vedi anche plugin_base.py per altri metodi
 ```

 * Salva le modifiche e apri `app/boot.py`, aggiungi una riga vuota, salva `boot.py`, poi rimuovi la riga vuota e salva di nuovo `boot.py`. Questo è un trucco per forzare WebODM a ricaricarsi senza riavviare il processo docker. Devi farlo solo una volta.
 * Il tuo plugin dovrebbe ora essere visibile in **Administration** --> **Plugins**.
 * Attivalo per vedere se funziona.

Congratulazioni! 🎉 Ora sei uno sviluppatore di plugin.

Il tuo plugin dovrebbe avere questa struttura di file di base:

```
├── disabled
├── __init__.py
├── manifest.json
├── plugin.py
├── public
│   ├── app.jsx
│   ├── app.scss
│   ├── main.js
│   └── webpack.config.js
└── templates
    └── hello.html
```

Un file `disabled` vuoto nella radice indica che il plugin non deve essere abilitato per impostazione predefinita.

## Template Django

Puoi renderizzare [template Django](https://docs.djangoproject.com/en/2.2/topics/templates/) posizionando i file di template nella cartella `templates`. Poi renderizzi i template creando dei *mount point* (proprio come gli [URL Django](https://docs.djangoproject.com/en/2.2/topics/http/urls/)).

## File Javascript

Puoi eseguire codice javascript arbitrario. Quando il tuo plugin è abilitato, ogni file restituito da `include_js_files` verrà incluso in ogni pagina di WebODM (nell'header). Puoi usarlo come punto di ingresso per caricare codice Javascript più complesso (ad esempio una build React) o per registrare un hook.

## File CSS

Come per Javascript, puoi includere file CSS arbitrari tramite:


```python
def include_css_files(self):
    return ['style.css']
```

## Componenti React

Se prevedi di usare React (opzionale) e vuoi utilizzare il sistema integrato per la build dei componenti (anch'esso opzionale), dovrai dichiarare quali file `.jsx` vuoi compilare tramite:

```python
def build_jsx_components(self):
    return ['app.jsx']
```

I file compilati verranno posizionati in `coreplugins/my-plugin/public/build/*` e sono accessibili tramite `http://localhost:8000/plugins/my-plugin/build/*`.

Se usi componenti JSX, ti conviene riavviare il tuo ambiente di sviluppo con:

```bash
./webodm.sh restart --dev --dev-watch-plugins
```

Altrimenti dovrai eseguire manualmente `webpack --watch` dalla cartella `coreplugins/my-plugin/public` (all'interno del container WebODM).

Sul lato client, puoi importare i tuoi componenti React, così come qualsiasi altro modulo Javascript, usando vari hook. Uno di questi hook è `PluginsAPI.App.Ready`, che viene attivato al caricamento della pagina:

```javascript
PluginsAPI.App.ready([
        '/plugins/my-plugin/build/app.js',
        '/plugins/my-plugin/build/app.css'        
    ], function(args, App){
    
    ReactDOM.render(React.createElement(App, {greeting: "Hi"}), $("#hello-component").get(0));
});
```

## Hook Lato Client

Puoi essere notificato di vari eventi lato client tramite gli hook. Alcuni di questi hook ti permettono di restituire un elemento DOM, che può essere utile per aggiungere pulsanti o altri componenti in momenti diversi del processo di rendering dell'interfaccia utente:

```javascript
PluginsAPI.hook([
    // elenco opzionale di dipendenze da caricare
], function(args, optional dependencies]){
    // Il tuo codice qui

    // args contiene parametri specifici per ciascun hook.

    console.log(args);

    var domEl = /* ... */;
    return domEl;
});

```

| <div style="width:260px">Hook</div> | Attivato                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `App.ready`                         | Al caricamento del DOM                                                                               |
| `Dashboard.addTaskActionButton`     | Quando sono stati aggiunti pulsanti a un task (accanto a View Map, View 3D Model, ..)              |
| `Dashboard.addNewTaskPanelItem`     | All'apertura del pannello dopo aver selezionato immagini e GCP                                    |
| `Dashboard.addNewTaskButton`        | Quando sono stati aggiunti pulsanti al pannello di un progetto (accanto a Select Images and GCP, Import) |
| `Map.willAddControls`               | Quando i controlli Leaflet stanno per essere aggiunti                                               |
| `Map.didAddControls`                | Quando i controlli Leaflet sono stati aggiunti                                                     |
| `Map.addActionButton`               | Quando i pulsanti azione (in basso a destra dello schermo) stanno per essere aggiunti                    |
| `ModelView.addActionButton`         | Quando i pulsanti azione (in basso a destra dello schermo) stanno per essere aggiunti (nel Modello 3D)      |
| `SharePopup.addLinkControl`         | Al rendering della finestra di dialogo Share nella Vista Mappa                                               |

## Callback Lato Client

Analogamente agli hook, le callback possono notificarti degli eventi che si verificano nell'applicazione, ma a differenza degli hook, non permettono il caricamento di dipendenze. Puoi registrare e annullare la registrazione delle callback:

```javascript
var myFunction = function(){
    return someValue;
};

PluginsAPI.[ns].onCallback(myFunction); // per registrare
PluginsAPI.[ns].offCallback(myFunction); // per annullare la registrazione
```

Ad esempio:

```javascript
PluginsAPI.Map.onHandleClick(function(){
    console.log("Map clicked!");
});
```

| Namespace | <div style="width:260px">Callback</div> | Attivata Quando                                                                |
| --------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| `Map`     | `handleClick`                           | La mappa Leaflet viene cliccata                                                        |
| `Map`     | `addAnnotation`                     | Un'annotazione sta per essere aggiunta                                               |                        
| `Map`     | `updateAnnotation`                  | Un'annotazione sta per essere modificata                                             |                        
| `Map`     | `deleteAnnotation`                  | Un'annotazione sta per essere eliminata                                             |                        
| `Map`     | `toggleAnnotation`                  | Un'annotazione sta per essere attivata/disattivata                                             |                        
| `Map`     | `annotationDeleted`                 | Un'annotazione è stata eliminata                                                   |                        
| `Map`     | `downloadAnnotations`               | Viene avviata una richiesta di download delle annotazioni                                |                        
| `Map`     | `mapTypeChanged`                    | Il tipo di mappa (da Ortofoto a Modello di Superficie, a Salute delle Piante, ecc.) è cambiato |                        
| `Map`     | `sideBySideChanged`                 | L'utente ha sovrapposto due layer affiancati                                |                        

## Segnali Lato Server

Puoi registrarti a vari [segnali Django](https://docs.djangoproject.com/en/2.2/topics/signals/) per essere notificato degli eventi che si verificano nell'applicazione.

```python
from django.dispatch import receiver
from app.plugins.signals import task_completed
from app.plugins.functions import get_current_plugin

@receiver(task_completed)
def on_complete(sender, task_id, **kwargs):
    # Non eseguire questo se il plugin non è attivo
    if get_current_plugin(only_active=True) is None:
        return
    
    print("Task %s has completed" % task_id)
```

| <div style="width:260px">Segnale</div> | Attivato Quando                     |
| ------------------------------------- | ---------------------------------- |
| `task_completed`                      | Un task è terminato con successo   |
| `task_removing`                       | Un task sta per essere eliminato      |
| `task_removed`                        | Un task è stato eliminato            |
| `task_failed`                         | Un task è fallito                  |
| `task_resizing_images`                | Un task sta ridimensionando le immagini          |
| `task_duplicated`                     | Un task è stato duplicato         |
| `processing_node_removed`             | Un nodo di elaborazione è stato eliminato |

## Dipendenze NPM

Puoi utilizzare dipendenze esterne definendo un `package.json` nella cartella `public` del tuo plugin e riferire quelle dipendenze nei tuoi componenti JSX (o caricarle nel browser). Questo può essere creato tramite `npm init`. Le dipendenze vengono scaricate e installate automaticamente durante la build.

## Dipendenze PIP

Sul lato server, puoi installare pacchetti Python aggiuntivi definendo un file `requirements.txt` nella cartella radice del tuo plugin (ad esempio `coreplugins/my-plugin/requirements.txt`).

Quando il plugin viene abilitato, il sistema verificherà prima se qualche dipendenza deve essere scaricata ed eseguirà `pip install` se necessario.

Per evitare collisioni di versioni/namespace con WebODM, così come con altri plugin, per usare una dipendenza del plugin devi racchiudere l'import in un contesto `python_imports`:

```python
from app.plugins.functions import get_current_plugin

with get_current_plugin().python_imports():
    import numpy as np
    # ...
```

## Task di Lunga Durata

Il sistema di plugin offre funzioni per eseguire task lato server di lunga durata, così come funzioni lato client per tracciare lo stato di tali task. I task di lunga durata vengono eseguiti da processi worker anziché dall'applicazione del server web.

Sul server:

```python
from app.plugins.worker import run_function_async
from rest_framework import status
from rest_framework.response import Response

# Dal mount point "greet"

def long_greet(greeting, progress_callback=None):
    import time # DEVI posizionare gli import all'interno della funzione asincrona e non all'inizio del file
    time.sleep(30)
    progress_callback("Almost done!", 50) # opzionale (testo di stato, [0-100]%)
    time.sleep(10)
    return {'output': greeting + " there!"} # qualsiasi output serializzabile in JSON

    # - oppure - puoi anche restituire file restituendo un
    # myfile = 'path/to/file.txt'
    # return {'file': myfile}

    # - oppure - un errore
    # return {'error': 'oh no'}

try: 
    celery_task_id = run_function_async(long_greet, greeting="Hi").task_id
    return Response({'celery_task_id': celery_task_id}, status=status.HTTP_200_OK)
except Exception as e:
    return Response({'error': str(e)}, status=status.HTTP_200_OK)
```

Sul client:

```javascript
import Workers from 'webodm/classes/Workers';

$.ajax({
    type: 'GET',
    url: `/api/plugins/my-plugin/greet/`,
    contentType: "application/json"
}).done(res => {
    Workers.waitForCompletion(res.celery_task_id, error => {
        if (error){
            console.error("oh no!");
        }else{
            Workers.getOutput(result.celery_task_id, (error, greeting) => {
                console.log(greeting);
            });
            // - oppure - anche download di file
            // Workers.downloadFile(res.celery_task_id, res.filename);
        }
    }, (status, progress) => {
        console.log(status, progress)
    });
});
```

:::caution
**Devi** dichiarare tutte le istruzioni di import all'interno delle tue funzioni asincrone (e non all'inizio del file). Inoltre puoi passare solo argomenti serializzabili in JSON alle funzioni asincrone. Ad esempio, non puoi passare oggetti Python complessi.
:::

## Data Store Integrato

L'archiviazione dei dati è un requisito frequente per ogni tipo di applicazione, quindi il sistema di plugin offre un semplice store chiave-valore per archiviare stringhe, interi, float, booleani e JSON, che può essere globale (condiviso tra tutti gli utenti) o basato sull'utente (specifico per un utente).

```python
from app.plugins import GlobalDataStore, UserDataStore

# da un mount point

ds = GlobalDataStore('my-plugin')
uds = UserDataStore('my-plugin', request.user)

ds.set_string("key1", "string")
ds.set_int("key2", 42)
ds.set_float("key3", 3.14)
ds.set_bool("key4", True)
ds.set_json("key5", {'piero_is': ['cool', 'silly', 'both']})

ds.get_string("key1")
ds.get_int("key2")

# ...
```

I dati salvati in questo modo vengono archiviati **non cifrati** nella tabella *PluginDatum*. Puoi visualizzare/modificare questi dati visitando **Administration** --> **Application** --> **Plugin Datum**.

## Pubblicare il Tuo Plugin

Il modo più semplice per condividere il tuo lavoro è aprire una pull request nel repository di WebODM. A un certo punto in futuro potremmo creare una sorta di repository di plugin dove le persone possano sfogliare e scaricare i plugin, ma non ci siamo ancora arrivati.

Puoi anche creare un file zip dell'intera cartella del plugin (ad esempio `my-plugin`) con la cartella come elemento di primo livello nell'archivio zip e distribuire il file zip manualmente. Gli utenti possono quindi installare il plugin premendo il pulsante **Load Plugin (.zip)** visitando **Administration** --> **Plugins**.

## Consigli Finali

 * Impara dagli altri plugin! Questa documentazione fornisce le basi, ma è davvero utile studiare come funzionano gli altri plugin guardandone il codice sorgente.
 * Se hai bisogno di un nuovo hook, callback o segnale, apri una pull request e aggiungiamolo al sistema.
 * Col tempo, questa documentazione potrebbe diventare obsoleta. Se qualcosa non sembra corrispondere a ciò che vedi in questa pagina o non sembra funzionare, controlla il codice! Il sistema di plugin non è complicato e può essere letto dall'inizio alla fine in meno di qualche ora. Leggi `app/plugins` e `app/static/app/js/classes/plugins`.
 * Divertiti :)
