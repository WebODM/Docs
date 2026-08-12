---
title: Uso del Visualizzatore 3D
template: doc
---

### Fotocamere

Attiva questa funzione per visualizzare le posizioni delle fotocamere.

Puoi anche fare clic sull'icona della fotocamera per visualizzare le singole immagini in un riquadro nell'angolo in alto a destra. Un clic sul riquadro dell'immagine attiva la modalità a schermo intero.

All'interno del riquadro dell'immagine ci sono collegamenti per scaricare l'immagine e il file GeoJSON delle fotocamere.

![Posizioni delle fotocamere](/images/cameras.webp)

### Modello Texturizzato

Attiva questa funzione per caricare e mostrare il modello texturizzato. A seconda della dimensione del file e della velocità di connessione, il caricamento può richiedere diversi secondi.

![Modello texturizzato](/images/texturedmodel.webp)

### Aspetto

#### Budget di Punti

Sia per motivi di aspetto che di prestazioni, è possibile gestire il budget di punti della scena. Alcuni sistemi datati e meno potenti trarrebbero beneficio da un budget di 500.000 punti, mentre la maggior parte dei sistemi di fascia media è in grado di gestire un budget da 1 a 2 milioni di punti.

Un budget da 5 a 7 milioni di punti produce un modello 3D della nuvola di punti uniforme, ma può risultare in un processo molto esigente in termini di risorse.

Il valore predefinito del budget di punti è impostato a 1.000.000.

#### Campo Visivo

Per controllare gli elementi del modello da includere nella scena, è possibile regolare il campo visivo. Il valore predefinito è impostato a 60 gradi.

![Regolazione del campo visivo](/images/FOV_animation.webp)

#### Eye Dome-lighting

Il modulo visualizzatore 3D di nuvole di punti Potree può implementare l'eye dome-lighting, un modello di illuminazione che accentua le forme degli oggetti.

L'eye dome-lighting raggruppa gli oggetti, ne ombreggia i contorni e migliora la percezione della profondità nelle immagini di visualizzazione scientifica. È utile per il riconoscimento e la misurazione di strutture all'interno di un modello. Può essere modificato regolando Radius, Strength e Opacity.

Per impostazione predefinita, l'Eye Dome-Lighting è abilitato nel visualizzatore 3D Potree, ma può essere disabilitato facendo clic sull'opzione di abilitazione.

![Regolazione dell'eye dome lighting](/images/EDL_animation.webp)

#### Sfondo

Lo sfondo del visualizzatore 3D Potree può essere modificato. Le opzioni disponibili sono **Skybox** / **Gradient** / **Black** / **White** / **None**

![Selezione dello sfondo](/images/Background_animation.webp)

#### Altro

**Splat Quality** — La qualità degli splat può essere regolata su standard o alta qualità, per migliorare l'aspetto del modello.

**Min node size** — L'opzione della dimensione minima del nodo influisce sulla densità dei punti dei nodi rappresentati.

**Box** — Visualizza i riquadri dei nodi.

**Lock view** — Blocca la vista della nuvola di punti, impedendo il caricamento o lo scaricamento di punti dal modello.

### Strumenti

#### Misurazione

Il modulo visualizzatore 3D Potree fornisce diversi strumenti di misurazione. Questo insieme di strumenti è composto da 12 elementi. Include anche controlli per mostrare o nascondere le etichette delle misurazioni risultanti.

Le misurazioni vengono eseguite facendo clic con il tasto sinistro sui punti desiderati e, per alcuni strumenti, è necessario fare clic con il tasto destro per terminare il processo.

![Strumenti di misurazione](/images/measurement.webp)

**Angolo** — Questo strumento misura l'angolo tridimensionale formato dalle linee che collegano 3 punti. Per avviare una misurazione, fai clic sull'icona dell'angolo, poi fai clic con il tasto sinistro su 3 punti e il processo terminerà automaticamente. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Punto** — Questo strumento evidenzia un punto selezionato e ne visualizza le coordinate XYZ. Per avviare una misurazione, fai clic sull'icona del punto, poi fai clic sul punto desiderato e il processo terminerà automaticamente. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Distanza** — Questo strumento misura la distanza tridimensionale delle linee che collegano una serie di punti. Per avviare una misurazione, fai clic sull'icona della distanza e inizia a fare clic sui punti desiderati (due o più). Fai clic con il tasto destro per terminare la misurazione. Ulteriori informazioni, come la lunghezza totale, possono essere ottenute selezionando questo elemento nella sezione della scena.

**Altezza** — Questo strumento misura l'altezza o la distanza verticale tra due punti. Per avviare una misurazione, fai clic sull'icona dell'altezza e poi fai clic sui due punti desiderati. Il processo terminerà automaticamente. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

![Misurazione dell'altezza](/images/height_animation.webp)

**Cerchio** — Questo strumento misura il raggio di un cerchio formato da tre punti. Per avviare una misurazione, fai clic sull'icona del cerchio e poi fai clic sui due punti desiderati. Il processo terminerà automaticamente. Ulteriori informazioni, come la circonferenza, possono essere ottenute selezionando questo elemento nella sezione della scena.

**Azimut** — Questo strumento misura l'angolo azimutale di una linea. Questa linea è formata da due punti selezionati dall'utente; l'angolo è misurato in gradi, in senso orario da 0 a 360 e partendo dal nord geografico. Per avviare una misurazione, fai clic sull'icona dell'azimut e poi fai clic sui due punti desiderati. Il processo terminerà automaticamente. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Area** — Questo strumento misura l'area orizzontale formata da un poligono. Per avviare una misurazione, fai clic sull'icona dell'area e inizia a fare clic sui punti che formano il poligono desiderato (tre o più). Fai clic con il tasto destro per terminare la misurazione. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Volume (cubo)** — Questo strumento misura il volume formato da un cubo. Per avviare una misurazione, fai clic sull'icona del volume (cubo) e fai clic sul modello per posizionare il cubo. È possibile riposizionare, ridimensionare e ruotare il cubo utilizzando le maniglie visualizzate. Fai clic con il tasto destro per terminare la misurazione. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Volume (sfera)** — Questo strumento misura il volume formato da una sfera. Per avviare una misurazione, fai clic sull'icona del volume (sfera) e fai clic sul modello per posizionare la sfera. È possibile riposizionare, ridimensionare e ruotare la sfera utilizzando le maniglie visualizzate. Fai clic con il tasto destro per terminare la misurazione. Ulteriori informazioni possono essere ottenute selezionando questo elemento nella sezione della scena.

**Profilo altimetrico** — Questo strumento crea un profilo altimetrico formato da una linea sul modello. Per avviare una misurazione, fai clic sull'icona del profilo altimetrico e poi forma una linea sul modello facendo clic sui punti desiderati (due o più). Fai clic con il tasto destro per terminare la misurazione. Ulteriori informazioni e opzioni, come "Show 2d Profile", possono essere ottenute selezionando questo elemento nella sezione della scena.

![Profilo altimetrico](/images/height_profile.webp)

**Annotazione** — Questo strumento crea un'etichetta di annotazione su un punto evidenziato del modello. Per avviare una misurazione, fai clic sull'icona dell'annotazione e poi fai clic sul punto desiderato. Il processo terminerà automaticamente. Per modificare l'annotazione, seleziona questo elemento nella sezione della scena, poi modifica Titolo e Descrizione.

**Rimuovi misurazioni** — Questo strumento rimuove tutte le misurazioni sul modello. Per rimuovere tutte le misurazioni, fai clic sull'icona "Remove measurements".

#### Ritaglio

![Strumenti di ritaglio](/images/clipping.webp)

La nuvola di punti può essere ritagliata selezionando un'area. Le opzioni di ritaglio includono **None** / **Highlight** / **Inside** / **Outside**

Per ritagliare una nuvola di punti, fai clic sull'icona del volume di ritaglio, posiziona il cubo sul modello e riposizionalo, ridimensionalo e ruotalo per contenere l'area desiderata. Highlight è impostato come metodo di ritaglio predefinito. Se vuoi visualizzare solo i punti contenuti all'interno del cubo, fai clic su "Inside", altrimenti fai clic su "Outside".

Per rimuovere il volume di ritaglio o i poligoni, fai clic sull'icona "Remove all measurements".

![Ritaglio](/images/clipping_animation.webp)

#### Navigazione

![Controlli di navigazione](/images/navigation.webp)

Il visualizzatore 3D Potree ha 4 controlli di navigazione che ne definiscono il comportamento.

**Earth Control** — Earth control naviga come ancorato al terreno. Il tasto sinistro del mouse sposta il modello orizzontalmente, la rotellina del mouse controlla lo zoom e il tasto destro orbita attorno al modello.

**Fly control** — Fly control muove la fotocamera come in volo d'uccello utilizzando la tastiera. I tasti "W" e "S" muovono rispettivamente avanti e indietro nella direzione della fotocamera, mentre "A" e "D" muovono rispettivamente a sinistra e a destra. Inoltre, i tasti "R" e "F" muovono la fotocamera su e giù. Il tasto sinistro del mouse cambia la direzione della fotocamera, la rotellina del mouse controlla lo zoom e il tasto destro muove la fotocamera sugli assi XYZ. La velocità di questi movimenti può essere controllata utilizzando il cursore a scorrimento.

**Helicopter control** — Helicopter control muove la fotocamera come in un aeromobile utilizzando la tastiera. I tasti "W" e "S" muovono rispettivamente avanti e indietro, vincolati a un piano orizzontale, mentre "A" e "D" muovono rispettivamente a sinistra e a destra. Inoltre, i tasti "R" e "F" muovono la fotocamera su e giù. Il tasto sinistro del mouse cambia la direzione della fotocamera, la rotellina del mouse controlla lo zoom e il tasto destro muove il modello sugli assi XY. La velocità di questi movimenti può essere controllata utilizzando il cursore a scorrimento.

**Orbit Control** — Orbit Control è il comportamento di navigazione predefinito. Il tasto sinistro del mouse orbita attorno al modello, la rotellina controlla lo zoom e il tasto destro muove il modello sugli assi XYZ.

**Full extent** — Il pulsante full extent ripristina la vista del modello.

**Navigation cube** — Il navigation cube visualizza un cubo in wireframe che contiene il modello.

**Compass** — Il pulsante della bussola visualizza una bussola nell'angolo in alto a destra.

**Camera animation** — Il pulsante dell'animazione della fotocamera crea un percorso di animazione della fotocamera. La posizione della fotocamera è definita dai punti sulla linea verde, mentre i punti sulla linea blu sono le posizioni verso cui la fotocamera è destinata a rivolgersi. Per creare un'animazione, regola i punti per le posizioni della fotocamera e la direzione della fotocamera, poi seleziona l'elemento della fotocamera nella sezione Scena per creare altri punti, cambiare la velocità dell'animazione o riprodurre l'animazione.

![Animazione della fotocamera](/images/camera_animation.webp)

### Scena

La sezione Scena visualizza un albero di file contenente tutti gli elementi della scena. Gli elementi sono organizzati in sei gruppi, che sono **Point clouds** / **Measurements** / **Annotations** / **Other** / **Vector** / **Images**

Ogni elemento all'interno di questi gruppi può essere selezionato per ottenere ulteriori informazioni o per controllarne le proprietà.

Per esempio, le proprietà delle nuvole di punti possono essere modificate per mostrare l'elevazione e anche la rampa di colori può essere personalizzata.

![Elevazione della nuvola di punti](/images/pointcloud_elevation.webp)
