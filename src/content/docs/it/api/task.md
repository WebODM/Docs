---
title: Task
template: doc
---

> Esempio di task:

```json
{
  "id": 134,
  "project": 27,
  "processing_node": 10,
  "processing_node_name": "localhost:3000",
  "images_count": 48,
  "can_rerun_from": [],
  "available_assets": [
    "all.zip",
    "orthophoto.tif",
    "orthophoto.png",
    "georeferenced_model.las",
    "georeferenced_model.ply",
    "georeferenced_model.csv",
    "textured_model.zip"
  ],
  "uuid": "4338d684-91b4-49a2-b907-8ba171894393",
  "name": "Task Name",
  "processing_time": 2197417,
  "auto_processing_node": false,
  "status": 40,
  "last_error": null,
  "options": [
    {
      "name": "use-opensfm-pointcloud",
      "value": true
    }
  ],
  "created_at": "2017-02-18T18:01:55.402551Z",
  "pending_action": null,
  "upload_progress": 1.0,
  "resize_progress": 0.0,
  "running_progress": 1.0
}
```

Un [Task](/it/api/task/) è l'unità di elaborazione di base di WebODM. Per calcolare un'ortofoto, una nuvola di punti e un modello con texture a partire da un insieme di immagini, è necessario creare un [Task](/it/api/task/).

Campo | Tipo | Descrizione
----- | ---- | -----------
id | int | Identificatore univoco
project | int | ID del [Progetto](/api/reference/operations/projects_create/) a cui appartiene il task
processing_node | int | L'ID del [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) a cui questo task è stato assegnato, oppure `null` se nessun [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) è stato assegnato.
processing_node_name | string | Il nome del nodo di elaborazione di cui sopra, oppure `null` se nessun [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) è stato assegnato.
images_count | int | Numero di immagini
can_rerun_from | string[] | Elenco delle possibili opzioni "rerun-from" da cui questo task potrebbe ripartire, dato il nodo di elaborazione attualmente assegnato. Se questo è un elenco vuoto, il task può essere riavviato solo dall'inizio della pipeline.
available_assets | string[] | Elenco degli [asset](/it/api/task/#scaricare-gli-asset) disponibili per il download 
uuid | string | Identificatore univoco assegnato da un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) una volta iniziata l'elaborazione.
name | string | Nome del task definito dall'utente
processing_time | int | Millisecondi trascorsi dall'inizio dell'elaborazione, oppure `-1` se non sono disponibili informazioni. Utile per mostrare all'utente un resoconto del tempo trascorso.
auto_processing_node | boolean | Indica se WebODM deve assegnare automaticamente il prossimo [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) disponibile per elaborare questo [Task](/it/api/task/). Un utente può impostarlo a `false` per scegliere manualmente un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/).
status | int | Uno dei [Codici di Stato](#codici-di-stato), oppure `null` se nessuno stato è disponibile.
last_error | string | L'ultimo messaggio di errore riportato da un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) in caso di errore di elaborazione.
options | JSON[] | Elenco codificato in JSON di coppie nome/valore, dove ogni coppia rappresenta un'opzione da riga di comando da passare a un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/).
created_at | string | Data e ora di creazione.
pending_action | int | Una delle [Azioni in Sospeso](#azioni-in-sospeso), oppure `null` se nessuna azione in sospeso è impostata.
upload_progress | float | Valore compreso tra 0 e 1 che indica l'avanzamento del caricamento dei file di questo task verso il nodo di elaborazione.
resize_progress | float | Valore compreso tra 0 e 1 che indica l'avanzamento del ridimensionamento delle immagini di questo task.
running_progress | float | Valore compreso tra 0 e 1 che indica l'avanzamento (stimato) dell'esecuzione di questo task.


<aside class="notice">I task ereditano le impostazioni dei permessi dal <a href="/api/reference/operations/projects_read/">Progetto</a> a cui appartengono.</aside>

### Creare un task

`POST /api/projects/{project_id}/tasks/`

Parametro | Obbligatorio | Predefinito | Descrizione
--------- | ------------ | ----------- | -----------
images[] | * | "" | Elenco di immagini codificate in multipart (minimo 2)
processing_node | | null | L'ID del [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) a cui questo [Task](/it/api/task/) deve essere assegnato. Se non specificato, e auto_processing_node è `true`, un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) verrà assegnato automaticamente. 
name | | "" | Nome del task definito dall'utente
auto_processing_node | | true | Indica se WebODM deve assegnare automaticamente il prossimo [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) disponibile per elaborare questo [Task](/it/api/task/).
options | | "[]" | Elenco codificato in JSON di coppie nome/valore, dove ogni coppia rappresenta un'opzione da riga di comando da passare a un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/).

Puoi assegnare un [Task](/it/api/task/) a un [Progetto](/api/reference/operations/projects_create/) passando il corretto `project_id` nel percorso dell'URL.


### Aggiornare un task

`PATCH /api/projects/{project_id}/tasks/{task_id}/`

I parametri sono gli stessi indicati sopra.

### Importare un Task

`POST /api/projects/{project_id}/tasks/import`

Importa task che sono stati elaborati da un'altra istanza di WebODM (oppure tramite [webodm.net](https://webodm.net) o NodeODX)

Parametro | Obbligatorio | Predefinito      | Descrizione
--------- | ------------ | -------          | ----------
name      |              | Imported Task    | Nome del task definito dall'utente.
filename  | */           | ""               | File contenente gli asset. Deve essere uno zip.
url       | /*           | ""               | URL degli asset compressi in zip.

Per importare gli asset creati devi fornire il parametro `filename` oppure `url` (ma non entrambi).
 
Ricorda di impostare il Content-type corretto per la richiesta a seconda di come vengono caricati gli asset:

Parametro | Content-Type
--------- | ---
filename  | application/zip
url       | application/x-www-form-urlencoded

### Ottenere l'elenco dei task

> Elenco dei task:

```json
[
    {
        "id": 6,
        "project": 2,
        "processing_node": 2,
        "processing_node_name": "localhost:3000",
        "images_count": 89,
        "uuid": "2e8b687d-c269-4e2f-91b3-5a2cd51b5321",
        "name": "Test name",
        "processing_time": 8402184,
        "auto_processing_node": true,
        "status": 40,
        "last_error": null,
        "options": [],
        "created_at": "2016-12-08T13:32:28.139474Z",
        "pending_action": null,
        "upload_progress": 1.0,
        "resize_progress": 0.0,
        "running_progress": 1.0
    }
]
```

`GET /api/projects/{project_id}/tasks/`

Recupera tutti i [Task](/it/api/task/) associati a `project_id`.

### Scaricare gli asset

`GET /api/projects/{project_id}/tasks/{task_id}/download/{asset}`

Dopo che un task è stato elaborato con successo, l'utente può scaricare diversi asset da questo URL. Non tutti gli asset sono sempre disponibili. Ad esempio, se le informazioni GPS sono assenti dalle immagini di input, l'asset `orthophoto.tif` non sarà presente. Puoi controllare la proprietà `available_assets` di un [Task](/it/api/task/) per vedere quali asset sono disponibili per il download.

Asset | Descrizione
----- | -----------
all.zip   | Archivio (.zip) contenente tutti gli asset, tra cui un'ortofoto, le tile TMS, un modello 3D con texture e la nuvola di punti in vari formati.
orthophoto.tif | Ortofoto GeoTIFF.
orthophoto.png | Ortofoto PNG.
orthophoto.mbtiles | Archivio MBTiles dell'ortofoto.
textured_model.zip | Archivio contenente il modello 3D con texture
georeferenced_model.las | Nuvola di punti in formato .LAS.
georeferenced_model.ply | Nuvola di punti in formato .PLY.
georeferenced_model.csv | Nuvola di punti in formato .CSV.

### Scaricare gli asset (percorso diretto)

`GET /api/projects/{project_id}/tasks/{task_id}/assets/{path}`

Dopo che un task è stato elaborato con successo, i suoi asset vengono archiviati in una directory sul file system. Questa chiamata API consente l'accesso diretto ai file di quella directory (per impostazione predefinita: `WebODM/app/media/project/{project_id}/task/{task_id}/assets`). Questo può essere utile per le applicazioni che vogliono trasmettere in streaming un dataset `Potree`, o renderizzare al volo un modello 3D con texture. 

<aside class="notice">
Questi percorsi potrebbero cambiare nelle versioni future di WebODM. Se l'asset di cui hai bisogno è raggiungibile tramite <b>/api/projects/{project_id}/tasks/download/{asset}</b>, utilizza quel percorso.
</aside>

### Recuperare l'output della console

> Esempio di output della console:

```bash
curl -H "Authorization: JWT <your_token>" http://localhost:8000/api/projects/2/tasks/1/output/?line=5

[DEBUG]   /var/www/data/e453747f-5fd4-4654-9622-b02727b29fc5/images\n[DEBUG]   Loaded DJI_0219.JPG | camera: dji fc300s ...
```


`GET /api/projects/{project_id}/tasks/{task_id}/output/`

Mentre un [Task](/it/api/task/) è in fase di elaborazione, i nodi di elaborazione restituiscono una stringa di output che può essere utilizzata a scopo di debug e informativo. L'output è disponibile solo dopo l'inizio dell'elaborazione.

Parametro | Obbligatorio | Predefinito | Descrizione
--------- | ------------ | ----------- | -----------
line | | 0 | Mostra solo l'output a partire da un certo numero di riga. Questo può essere utile per mostrare l'output in tempo reale all'utente, tenendo traccia del numero di righe già mostrate finora ed evitando così di scaricare tutto l'output a ogni richiesta.

### Annullare un task

`POST /api/projects/{project_id}/tasks/{task_id}/cancel/`

Interrompe l'elaborazione di un [Task](/it/api/task/). I task annullati possono essere riavviati.

### Rimuovere un task

`POST /api/projects/{project_id}/tasks/{task_id}/remove/`

Anche tutti gli asset associati verranno eliminati. Se il [Task](/it/api/task/) è attualmente in fase di elaborazione, l'elaborazione verrà interrotta.

### Riavviare un task

`POST /api/projects/{project_id}/tasks/{task_id}/restart/`

Se un [Task](/it/api/task/) è stato annullato o la sua elaborazione non è riuscita, oppure è stato completato ma l'utente ha deciso di cambiare le opzioni di elaborazione, può essere riavviato. Se il [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) assegnato al [Task](/it/api/task/) non è cambiato, l'elaborazione avverrà più rapidamente rispetto alla creazione di un nuovo [Task](/it/api/task/), poiché il [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) ricorda lo `uuid` del [Task](/it/api/task/) e tenterà di riutilizzare i risultati precedenti della pipeline di calcolo.

### Layer TMS dell'ortofoto

`GET /api/projects/{project_id}/tasks/{task_id}/orthophoto/tiles.json`

`GET /api/projects/{project_id}/tasks/{task_id}/orthophoto/tiles/{Z}/{X}/{Y}.png`

Dopo che un task è stato elaborato con successo, viene reso disponibile un layer TMS per l'inclusione in programmi come [Leaflet](http://leafletjs.com/) o [Cesium](http://cesiumjs.org).

<aside class="notice">Se utilizzi <a href="http://leafletjs.com/" target="_blank">Leaflet</a>, dovrai passare il token di autenticazione tramite querystring: /api/projects/{project_id}/tasks/{task_id}/tiles/{Z}/{X}/{Y}.png?jwt=your_token</aside>

### Layer TMS del Modello di Superficie

`GET /api/projects/{project_id}/tasks/{task_id}/dsm/tiles.json`

`GET /api/projects/{project_id}/tasks/{task_id}/dsm/tiles/{Z}/{X}/{Y}.png`

### Layer TMS del Modello del Terreno

`GET /api/projects/{project_id}/tasks/{task_id}/dtm/tiles.json`

`GET /api/projects/{project_id}/tasks/{task_id}/dtm/tiles/{Z}/{X}/{Y}.png`

### Azioni in Sospeso

In alcune circostanze, un [Task](/it/api/task/) può avere un'azione in sospeso che richiede una certa quantità di tempo per essere eseguita.

Azione in Sospeso | Codice | Descrizione
----- | ---- | -----------
CANCEL | 1 | Il [Task](/it/api/task/) è in fase di annullamento
REMOVE | 2 | Il [Task](/it/api/task/) è in fase di rimozione
RESTART | 3 | Il [Task](/it/api/task/) è in fase di riavvio

### Codici di Stato

Stato | Codice | Descrizione
----- | ---- | -----------
QUEUED | 10 | I file del [Task](/it/api/task/) sono stati caricati su un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) e sono in attesa di essere elaborati.
RUNNING | 20 | Il [Task](/it/api/task/) è attualmente in fase di elaborazione.
FAILED | 30 | Il [Task](/it/api/task/) non è riuscito per qualche motivo (immagini insufficienti, memoria esaurita, Piero ha dimenticato di chiudere una parentesi, ecc.)
COMPLETED | 40 | Il [Task](/it/api/task/) è stato completato. Gli asset sono pronti per essere scaricati.
CANCELED | 50 | Il [Task](/it/api/task/) è stato annullato manualmente dall'utente.
