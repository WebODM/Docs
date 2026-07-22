---
title: Punti di Controllo a Terra
template: doc
---

I punti di controllo a terra sono utili per correggere le distorsioni nei dati e per riferire i dati a sistemi di coordinate noti.

Un Punto di Controllo a Terra (GCP) è una misurazione di posizione effettuata sul terreno, tipicamente utilizzando un GPS ad alta precisione.

I punti di controllo a terra possono essere posizionati su strutture esistenti come angoli di pavimentazione, linee di un parcheggio o piastrelle di colore contrastante, altrimenti possono essere realizzati usando target posizionati sul terreno.

I target possono essere acquistati o costruiti con un'ampia varietà di materiali, dai coperchi di secchi alle piastrelle.

### Pratiche Raccomandate per il Posizionamento dei GCP

Mantieni i punti di controllo a terra visibili da tutte le posizioni della fotocamera. Considera la distanza di campionamento al suolo (GSD) prevista, l'illuminazione, la vegetazione, gli edifici e tutti gli ostacoli esistenti.

Procura una distribuzione orizzontale uniforme dei GCP all'interno del progetto, coprendo le quote più alte e più basse. Un minimo di 5 GCP funziona per la maggior parte dei lavori, e per progetti più grandi 8–10 sono sufficienti. Posiziona alcuni punti vicino agli angoli e altri al centro, considerando che la spaziatura tra i GCP dovrebbe essere maggiore dell'impronta a terra dell'immagine, in modo da non poter vedere più di un GCP in una singola immagine.

Per garantire che i GCP siano visibili in almeno 5 immagini, distanzia i punti da 10 a 30 metri dal perimetro del progetto. Questa distanza dipende dalla sovrapposizione, quindi aumentare la sovrapposizione dovrebbe ridurre la distanza richiesta dal perimetro.

### Formato del File GCP

Il formato del file GCP è semplice.

- La prima riga deve contenere il nome della proiezione utilizzata per le coordinate geografiche. Questa può essere specificata come stringa PROJ (ad esempio `+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`), codice EPSG (ad esempio `EPSG:4326`) oppure come valore `WGS84 UTM <zone>[N|S]` (ad esempio `WGS84 UTM 16N`)
- Le righe successive sono le coordinate X, Y e Z, i pixel associati, il nome del file dell'immagine e campi extra opzionali, separati da tabulazioni o spazi
- Evita di impostare i valori di elevazione a "NaN" per indicare l'assenza di valore. Questo può causare errori di elaborazione. Usa invece 0.0
- Analogamente, ridurre il numero di cifre dopo la virgola per `geo_x` e `geo_y` può anch'esso ridurre gli errori di elaborazione
- La settima colonna (opzionale) contiene tipicamente l'etichetta del GCP

```
<projection>
geo_x geo_y geo_z im_x im_y filename [label] [extra1] [extra2]
...
```

Esempio:

```
+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs
544256.7 5320919.9 5 3044 2622 IMG_0525.jpg
544157.7 5320899.2 5 4193 1552 IMG_0585.jpg
544033.4 5320876.0 5 1606 2763 IMG_0690.jpg
```

:::note
 * Il nome del file distingue tra maiuscole e minuscole. IMG_0001.jpg non è lo stesso di IMG_0001.JPG.
 * Il nome del file non può contenere spazi. Gli spazi possono essere codificati usando la sequenza di escape %20. Ad esempio, My Image.JPG deve essere riferito come My%20Image.JPG.
:::

Se fornisci un file GCP chiamato `gcp_list.txt`, WebODM lo rileverà automaticamente. Se hai un file gcp e vuoi invece effettuare la georeferenziazione con exif, puoi specificare `--use-exif`. Se hai misurazioni GPS ad alta precisione nelle tue immagini (RTK) e vuoi usare quelle informazioni insieme a un file gcp, puoi specificare `--force-gps`.

È importante che tu trovi oggetti ad alto contrasto presenti in **almeno** 3 foto e che tu trovi un minimo di 5 oggetti.

Gli angoli netti sono buone scelte per i GCP. Dovresti inoltre posizionare/individuare i GCP in modo uniforme all'interno dell'area di rilievo.

Il file `gcp_list.txt` deve essere creato nella cartella base del tuo progetto.

Per ottenere buoni risultati il tuo file dovrebbe avere un minimo di 15 righe dopo l'intestazione (5 punti con 3 immagini per ciascun punto).

### Contrassegnare i Checkpoint

I checkpoint vengono utilizzati per verificare l'accuratezza della ricostruzione. Vengono esclusi dal processo di ricostruzione e sono invece utilizzati per misurare l'accuratezza dei risultati alla fine.

Puoi contrassegnare un checkpoint etichettandolo con il prefisso `CHK-`. Ad esempio:

```
+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs
544256.7 5320919.9 5 3044 2622 IMG_0525.jpg CHK-A
```


### Interfacce Utente

Puoi usare una di due interfacce utente per creare file GCP:

- [POSM GCPi](https://github.com/posm/posm-gcpi)
- [GCP Editor Pro](https://github.com/uav4geo/GCPEditorPro)

#### POSM GCPi

POSM GCPi è caricato per impostazione predefinita in WebODM. Per usarlo con valori XYZ di controllo a terra noti, si procede come segue:

Crea una lista di GCP che includa solo nome del gcp, x, y e z, con un'intestazione contenente una stringa proj4 dei tuoi GCP (assicurati che siano in un sistema di coordinate planare, come UTM). Dovrebbe apparire più o meno così:

```
+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs
gcp01 529356.250827686 9251137.5643209 8.465
gcp02 530203.125367657 9250140.80991621 15.781
gcp03 530292.136003818 9250745.02372435 11.977
gcp04 530203.125367657 9250140.80991621 15.781
gcp05 530292.136003818 9250745.02372435 11.977
```

Poi è possibile caricare questa lista di GCP nell'interfaccia, caricare le immagini e posizionare ciascuno dei GCP nell'immagine.

#### GCP Editor Pro

:::tip[Lo Sapevi?]

[GCP Editor Pro](https://gcp.uav4geo.com) è realizzato dagli sviluppatori di WebODM. Acquistarlo supporta direttamente lo sviluppo di WebODM. ❤

:::

[GCP Editor Pro](https://gcp.uav4geo.com) deve essere acquistato, ma offre un flusso di lavoro più fluido rispetto a POSM GCPi.

Per usarlo, crea un file CSV che includa i nomi dei GCP, la coordinata nord (northing), la coordinata est (easting) e l'elevazione.

```
GCP Label,Northing,Easting,Elevation
gcp01,529356.250827686,9251137.5643209,8.465
gcp02,530203.125367657,9250140.80991621,15.781
...
```

Poi importa il CSV dalla schermata principale e digita `+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs` nella casella `EPSG/PROJ`. Puoi trovare un database di codici EPSG su https://epsg.io

La schermata successiva mostrerà una mappa da cui selezionare i GCP da contrassegnare e importare le rispettive immagini.

## Accuratezza della Mappa

L'accuratezza può essere definita come il grado o la vicinanza con cui le informazioni su una mappa corrispondono ai valori nel mondo reale. Pertanto, quando parliamo di accuratezza, parliamo di qualità dei dati e del numero di errori contenuti in un determinato dataset (Pascual 2011).

**Accuratezza Relativa o Locale**

L'accuratezza locale o relativa può essere definita come il grado con cui le distanze tra due punti su una mappa corrispondono alle distanze reali tra quei punti nel mondo reale.

L'accuratezza relativa è indipendente dalla posizione della mappa nel mondo, quindi una mappa può avere un'alta accuratezza relativa (in dimensione e forma) ma la sua posizione nel mondo può essere traslata.

![Modello che mostra un'alta accuratezza relativa](/images/rel_accuracy.webp)

*Figura 1. Modello che mostra un'alta accuratezza relativa ma posizionato in modo errato rispetto alla sua posizione nel mondo reale*

**Accuratezza Assoluta o Globale**

L'accuratezza assoluta è l'accuratezza della ricostruzione in relazione alla sua vera posizione sul pianeta (Pix4D 2019). La Figura 2 mostra un modello accurato in senso relativo e assoluto, poiché i punti sono posizionati correttamente rispetto alla loro posizione nel mondo reale.

![Modello che mostra un'alta accuratezza assoluta](/images/abs_accuracy.webp)

*Figura 2. Modello che mostra un'alta accuratezza relativa e assoluta. Posizionato correttamente rispetto alla sua posizione nel mondo reale*

**Un Livello di Accuratezza per Ogni Progetto**

Ogni progetto ha esigenze specifiche di accuratezza da soddisfare. Ad esempio, valutare l'avanzamento di un cantiere o misurare un'area colpita da un incendio non richiede l'uso di GCP, poiché l'accuratezza assoluta non influirà sul processo decisionale. D'altra parte, ci sono lavori in cui l'accuratezza è critica, ad esempio le valutazioni di conformità dei progetti e i rilievi catastali, che richiedono un'accuratezza relativa e assoluta più elevata.

### Cosa Aspettarsi

In termini generali, ci si può aspettare che l'accuratezza relativa sia nell'ordine di 1-3 volte il GSD medio del dataset. Per quanto riguarda l'accuratezza assoluta, bisogna considerare che dipende dall'unità GPS montata sull'UAV, ma l'accuratezza orizzontale di un GPS standard è solitamente compresa tra 2 e 6 metri e l'accuratezza verticale tra 3 e 4 volte l'accuratezza orizzontale.

Utilizzando i GCP, l'accuratezza assoluta può essere migliorata fino a 2,5 volte il GSD per l'accuratezza orizzontale e 4 volte il GSD per l'accuratezza verticale (Madawalagama 2016).

Con un GSD di 1 cm, l'accuratezza è pari a quella del GNSS RTK e rientra nelle scale 1:200 secondo gli standard di accuratezza cartografica NSDI e FGDC in condizioni non ottimali (Barry 2013).

### Aspetti che Influenzano l'Accuratezza della Mappa

**Meteo** — Le condizioni meteorologiche hanno un impatto diretto sui risultati della fotogrammetria, quindi è importante considerare la copertura nuvolosa, la velocità del vento, l'umidità, l'altezza del sole e altri fattori che influenzano la stabilità dell'UAV e l'illuminazione del terreno.

**Fotocamere** — Sensori più grandi e migliori producono meno rumore e immagini messe a fuoco più nitidamente. Considera inoltre che le fotocamere con otturatore rolling shutter producono immagini distorte quando l'UAV è in movimento, quindi per i lavori di mappatura sono consigliate fotocamere con otturatore globale o meccanico.

**Altitudine di volo** — Maggiore è l'altitudine di volo, maggiore è l'impronta a terra dell'immagine e il GSD. Con un GSD più grande l'accuratezza sarà ridotta poiché ci sarà meno dettaglio negli elementi riconoscibili. Quando è richiesto un GSD più piccolo, è raccomandata un'altitudine di 3-4 volte l'altezza del punto più alto.

**Velocità di volo** — La velocità di volo ha un effetto particolare sulle fotocamere dotate di rolling shutter, mentre quelle dotate di otturatore globale o meccanico tendono a ridurre questo effetto. Anche gli UAV dotati di sistemi di posizionamento RTK sono influenzati dalla velocità, ma se si rimane in hovering a ogni scatto, si può ottenere un'ottima accuratezza. Se invece ci si muove durante ogni scatto, l'accuratezza sarà limitata da due fattori: la velocità di movimento moltiplicata per gli incrementi di 1 secondo dell'RTK (Mather 2020).

## Migliorare l'Accuratezza Relativa

La georeferenziazione per impostazione predefinita viene effettuata utilizzando GPS (GNSS) o GCP (se forniti).

WebODM può anche allineare due task. Quando ciò accade, la ricostruzione verrà inizialmente eseguita utilizzando GPS/GCP e verrà successivamente allineata al modello di riferimento tramite un'operazione lineare di scala/rotazione/traslazione.

### Dataset Multi-temporali

Quando siti precedentemente mappati devono essere rivisitati, WebODM può allineare più versioni di un dataset nel tempo utilizzando una nuvola di punti o un modello di elevazione digitale precedenti.

**Flusso di lavoro per dataset multi-temporali:**

1. Elabora i tuoi dati originali. Questo passaggio non richiede un file di punti di controllo a terra, ma usane uno se l'accuratezza assoluta è un requisito del progetto
2. Carica un altro dataset che si allinei con il precedente e cerca l'opzione **Align**, quindi seleziona il task originale.

### Allineare Dataset di Grandi Dimensioni

Quando si tenta di elaborare dataset molto grandi, può essere necessario dividere un ampio set di immagini in blocchi più piccoli e gestibili per facilitarne l'elaborazione. Questo processo, tuttavia, può introdurre una certa incertezza rispetto all'allineamento di tutti gli output elaborati. Per assicurarci che tutte le nuvole di punti e i modelli del terreno/della superficie siano perfettamente allineati in preparazione della fusione, seguiamo le semplici tecniche descritte di seguito.

## File di Geolocalizzazione delle Immagini

Per impostazione predefinita WebODM utilizzerà le informazioni GPS incorporate nelle immagini, se disponibili. A volte le immagini non contengono informazioni GPS, oppure un utente desidera sovrascrivere le informazioni con dati più accurati (come RTK).

Puoi anche utilizzare un file di geolocalizzazione per specificare i centroidi GPS delle immagini.

Il formato del file di geolocalizzazione delle immagini è semplice.

- La prima riga deve contenere il nome della proiezione utilizzata per le coordinate geografiche. Questa può essere specificata come stringa PROJ (ad esempio `+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`), codice EPSG (ad esempio `EPSG:4326`) oppure come valore `WGS84 UTM <zone>[N|S]` (ad esempio `WGS84 UTM 16N`)
- Le righe successive sono il nome del file dell'immagine, le coordinate X, Y e Z (opzionale), gli angoli della fotocamera (opzionali, attualmente usati solo per la calibrazione radiometrica) e l'accuratezza orizzontale/verticale (opzionale)
- Gli angoli della fotocamera possono essere impostati a `0` se non sono disponibili
- La decima colonna (opzionale) può contenere campi extra, come un'etichetta

```
<projection>
filename geo_x geo_y [geo_z] [yaw (degrees)] [pitch (degrees)] [roll (degrees)] [horz accuracy (meters)] [vert accuracy (meters)] [extras...]
...
```

Esempio:

```
EPSG:4326
DJI_0028.JPG    -91.9942096111111   46.84252125 198.609
DJI_0032.JPG    -91.9938293055556   46.8424584444444    198.609
```

Se fornisci un file chiamato `geo.txt`, WebODM lo rileverà automaticamente. Se ha un altro nome, puoi specificarlo usando `--geo <path>`.

Il file `geo.txt` deve essere creato nella cartella base del tuo progetto oppure, quando si usa WebODM, caricato insieme ai file di input raw jpg o tif.

## Riferimenti

- Barry, P., & Coakley, R. ["Accuracy of UAV photogrammetry compared with Network RTK GPS."](http://uav.ie/PDF/Accuracy_UAV_compare_RTK_GPS.pdf) Baseline Surveys. 2013.
- Drone Deploy. [How Do I Use Ground Control Points?: A guide to using ground control points with drone mapping software.](https://www.dronedeploy.com/blog/what-are-ground-control-points-gcps/) 2017.
- Madawalagama, S.L., Munasinghe, N., Dampegama, S.D.P.J. and Samarakoon, L. "Low-cost aerial mapping with consumer grade." 37th Asian Conference on Remote Sensing. Colombo, Sri Lanka, 2016.
- Mather, Stephen. [OpenDroneMap.](https://community.opendronemap.org/t/the-accuracy-of-webodm-using-rtk-uavs/3937) 2020.
- Pascual, Manuel S. [GIS Lounge: GIS Data: A Look at Accuracy, Precision, and Types of Errors.](https://www.gislounge.com/gis-data-a-look-at-accuracy-precision-and-types-of-errors/) 2011.
- Pix4D. ["What is accuracy in an aerial mapping project?"](https://www.pix4d.com/blog/accuracy-aerial-mapping) 2019.
