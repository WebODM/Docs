---
title: Opzioni e Flag
template: doc
---

Questo è l'elenco completo delle opzioni disponibili in [ODX](https://github.com/WebODM/ODX). 


:::note
Alcune di queste non saranno visibili in [WebODM](https://github.com/WebODM/WebODM) perché non sono applicabili oppure sono integrate nel flusso di lavoro dell'esperienza utente (ad es. i GCP vengono selezionati automaticamente, quindi non è necessario specificare un'opzione `--gcp`).
:::

## 3d-tiles

Genera output OGC 3D Tiles.

**Predefinito:** `False`

## align

Percorso a un DEM GeoTIFF o a una nuvola di punti LAS/LAZ a cui gli output della ricostruzione devono essere allineati automaticamente. Sperimentale.

**Opzioni:** `<path string>`

**Predefinito:** `None`

## auto-boundary

Imposta automaticamente un confine utilizzando le posizioni degli scatti della fotocamera per limitare l'area della ricostruzione. Questo può aiutare a rimuovere artefatti di sfondo lontani (cielo, paesaggi sullo sfondo, ecc.). Vedi anche --boundary.

**Predefinito:** `False`

## auto-boundary-distance

Specifica la distanza tra le posizioni degli scatti della fotocamera e il bordo esterno del confine quando questo viene calcolato con --auto-boundary. Imposta a 0 per scegliere automaticamente un valore.

**Opzioni:** `<positive float>`

**Predefinito:** `0`

## bg-removal

Calcola automaticamente le maschere delle immagini utilizzando l'IA per rimuovere lo sfondo. Sperimentale.

**Predefinito:** `False`

## boundary

Poligono GeoJSON che limita l'area della ricostruzione. Può essere specificato come percorso a un file GeoJSON oppure come stringa JSON che rappresenta il contenuto di un file GeoJSON.

**Opzioni:** `<json>`

## build-overviews

Genera le overview dell'ortofoto per una visualizzazione più rapida in programmi come QGIS.

**Predefinito:** `False`

## camera-lens

Imposta un tipo di proiezione della fotocamera. Impostare manualmente un valore può aiutare a migliorare la correzione geometrica della distorsione. Per impostazione predefinita l'applicazione tenta di determinare il tipo di obiettivo dai metadati delle immagini.

**Opzioni:** `auto |  perspective |  brown |  fisheye |  fisheye_opencv |  spherical |  equirectangular |  dual`

**Predefinito:** `auto`

## cameras

Utilizza i parametri della fotocamera calcolati da un altro dataset invece di calcolarli. Può essere specificato come percorso a un file cameras.json oppure come stringa JSON che rappresenta il contenuto di un file cameras.json.

**Opzioni:** `<json>`

## cog

Crea GeoTIFF Cloud-Optimized invece di GeoTIFF normali.

**Predefinito:** `False`

## copy-to

Copia i risultati di output in questa cartella al termine dell'elaborazione.

**Opzioni:** `<path>`

## crop

Ritaglia automaticamente le immagini di output creando un buffer uniforme attorno ai confini del dataset, ridotto di N metri. Usa 0 per disabilitare il ritaglio.

**Opzioni:** `<positive float>`

**Predefinito:** `3`

## dem-decimation

Decima i punti prima di generare il DEM. 1 significa nessuna decimazione (qualità piena). 100 decima circa il 99%% dei punti. Utile per velocizzare la generazione dei risultati DEM in dataset molto grandi.

**Opzioni:** `<positive integer>`

**Predefinito:** `1`

## dem-euclidean-map

Calcola una mappa raster euclidea per ogni DEM. La mappa riporta la distanza di ogni cella dal valore NODATA più vicino (prima che avvenga qualsiasi riempimento dei vuoti). Questo può essere utile per isolare le aree che sono state riempite.

**Predefinito:** `False`

## dem-gapfill-steps

Numero di passaggi utilizzati per riempire le aree con vuoti. Imposta a 0 per disabilitare il riempimento dei vuoti. Partendo da un raggio pari alla risoluzione di output, vengono generati N DEM diversi con raggio progressivamente maggiore utilizzando l'algoritmo di ponderazione a distanza inversa (IDW) e poi uniti insieme. I vuoti rimanenti vengono quindi riempiti utilizzando l'interpolazione nearest neighbor.

**Opzioni:** `<positive integer>`

**Predefinito:** `3`

## dem-resolution

Risoluzione del DSM/DTM in cm / pixel. Nota che questo valore è limitato da una stima della distanza di campionamento al suolo (GSD).

**Opzioni:** `<float>`

**Predefinito:** `5`

## dsm

Usa questo tag per generare un DSM (Digital Surface Model, terreno + oggetti) utilizzando un filtro morfologico progressivo. Consulta i parametri --dem* per una regolazione più fine.

**Predefinito:** `False`

## dtm

Usa questo tag per generare un DTM (Digital Terrain Model, solo terreno) utilizzando un filtro morfologico semplice. Consulta i parametri --dem* e --smrf* per una regolazione più fine.

**Predefinito:** `False`

## end-with

Termina l'elaborazione a questa fase.

**Opzioni:** `dataset |  split |  merge |  opensfm |  openmvs |  odm_filterpoints |  odm_meshing |  mvs_texturing |  odm_georeferencing |  odm_dem |  odm_orthophoto |  odm_report |  odm_postprocess`

**Predefinito:** `odm_postprocess`

## fast-orthophoto

Salta la ricostruzione densa e la generazione del modello 3D. Genera un'ortofoto direttamente dalla ricostruzione sparsa. Su terreni pianeggianti senza oggetti/strutture, attiva questa opzione per risparmiare tempo.

**Predefinito:** `False`

## feature-quality

Imposta la qualità dell'estrazione delle feature. Una qualità più alta genera feature migliori, ma richiede più memoria e più tempo.

**Opzioni:** `ultra |  high |  medium |  low |  lowest`

**Predefinito:** `high`

## feature-type

Scegli l'algoritmo per l'estrazione dei keypoint e il calcolo dei descrittori.

**Opzioni:** `akaze |  dspsift |  hahog |  orb |  sift`

**Predefinito:** `dspsift`

## force-gps

Utilizza i dati GPS EXIF delle immagini per la ricostruzione, anche se sono presenti GCP. Questo flag è utile se disponi di misurazioni GPS ad alta precisione. Se non ci sono GCP, questo flag non ha alcun effetto.

**Predefinito:** `False`

## gcp

Percorso al file contenente i Punti di Controllo a Terra (GCP) utilizzati per la georeferenziazione. Il file deve usare il seguente formato: 

EPSG:`<code>` oppure `<+proj definition>`

geo_x geo_y geo_z im_x im_y image_name [gcp_name] [extra1] [extra2]

**Opzioni:** `<path string>`

**Predefinito:** `None`

## geo

Percorso al file di geolocalizzazione delle immagini contenente le coordinate del centro della fotocamera utilizzate per la georeferenziazione. Se non disponi dei valori di yaw/pitch/roll puoi impostarli a 0. Il file deve usare il seguente formato: 

EPSG:`<code>` oppure `<+proj definition>`

image_name geo_x geo_y geo_z [yaw (gradi)] [pitch (gradi)] [roll (gradi)] [accuratezza orizzontale (metri)] [accuratezza verticale (metri)]

**Opzioni:** `<path string>`

**Predefinito:** `None`

## gltf

Genera modelli texturizzati Binary glTF (GLB) in file singolo.

**Predefinito:** `False`

## gps-accuracy

Imposta un valore in metri per l'informazione GPS Dilution of Precision (DOP) per tutte le immagini. Se le tue immagini sono taggate con informazioni GPS ad alta precisione (RTK), questo valore verrà impostato automaticamente di conseguenza. Puoi usare questa opzione per impostarlo manualmente nel caso in cui la ricostruzione fallisca. Ridurre questa opzione può a volte aiutare a controllare gli effetti di incurvamento (bowling) su aree estese.

**Opzioni:** `<positive float>`

**Predefinito:** `3`

## gps-z-offset

Imposta un offset GPS in metri per l'asse verticale (Z) aggiungendolo al valore di altitudine dei dati GPS EXIF. Questo non modifica il valore di alcun GCP. Può essere utile, ad esempio, per passare dall'altezza ellissoidica a quella ortometrica.

**Opzioni:** `<float>`

**Predefinito:** `0`

## help

mostra questo messaggio di aiuto ed esce

## ignore-gsd

Ignora la distanza di campionamento al suolo (GSD). Se impostata a true, comporta un maggiore consumo di memoria e processore rispetto al comportamento predefinito. Normalmente, le stime della GSD vengono utilizzate per limitare la risoluzione massima delle immagini di output e per ridimensionare le immagini quando necessario, con conseguente elaborazione più rapida e minore utilizzo di memoria. Poiché la GSD è una stima, a volte ignorarla può produrre una qualità delle immagini di output leggermente migliore. Non impostare mai --ignore-gsd a true a meno che tu non sia certo di averne bisogno, e anche in quel caso: non usarla.

**Predefinito:** `False`

## matcher-neighbors

Esegue il matching delle immagini con le immagini più vicine in base ai dati GPS EXIF. Imposta a 0 per effettuare il matching tramite triangolazione.

**Opzioni:** `<positive integer>`

**Predefinito:** `0`

## matcher-order

Esegue il matching delle immagini con le N immagini più vicine in base all'ordine dei nomi dei file. Può velocizzare l'elaborazione di immagini sequenziali, come quelle estratte da video. Viene applicato solo su dataset non georeferenziati. Imposta a 0 per disabilitare.

**Opzioni:** `<positive integer>`

**Predefinito:** `0`

## matcher-type

Algoritmo di matching, Fast Library for Approximate Nearest Neighbors o Bag of Words. FLANN è più lento, ma più stabile. BOW è più veloce, ma a volte può perdere corrispondenze valide. BRUTEFORCE è molto lento ma robusto. HAMMING è molto più veloce con dataset di grandi dimensioni ma richiede una GPU.

**Opzioni:** `auto |  bow |  bruteforce |  flann |  hamming`

**Predefinito:** `auto`

## max-concurrency

Il numero massimo di processi da utilizzare nelle varie elaborazioni. Il requisito di memoria di picco è di circa 1 GB per thread con immagini da 2 megapixel di risoluzione.

**Opzioni:** `<positive integer>`

**Predefinito:** `4`

## merge

Scegli cosa unire nella fase di merge in un dataset suddiviso. Per impostazione predefinita vengono uniti tutti gli output disponibili. Opzioni: ['all', 'pointcloud', 'orthophoto', 'dem'].

**Opzioni:** `all |  pointcloud |  orthophoto |  dem`

**Predefinito:** `all`

## mesh-octree-depth

Profondità dell'octree utilizzata nella ricostruzione della mesh, aumentala per ottenere più vertici; i valori consigliati sono 8-12.

**Opzioni:** `<integer: 1 <= x <= 14>`

**Predefinito:** `11`

## mesh-size

Il numero massimo di vertici della mesh di output.

**Opzioni:** `<positive integer>`

**Predefinito:** `200000`

## min-num-features

Numero minimo di feature da estrarre per immagine. Più feature possono essere utili per trovare più corrispondenze tra le immagini, consentendo potenzialmente la ricostruzione di aree con poca sovrapposizione o feature insufficienti. Un numero maggiore di feature rallenta però l'elaborazione.

**Opzioni:** `<integer>`

**Predefinito:** `10000`

## name

Nome del dataset (ovvero il nome della sottocartella all'interno della cartella del progetto).

**Opzioni:** `<dataset name>`

**Predefinito:** `code`

## no-gpu

Non utilizzare l'accelerazione GPU, anche se disponibile.

**Predefinito:** `False`

## optimize-disk-space

Elimina i file intermedi pesanti per ottimizzare l'utilizzo dello spazio su disco. Questo influisce sulla possibilità di riavviare la pipeline da una fase intermedia, ma consente di elaborare i dataset su sistemi che non dispongono di spazio su disco sufficiente.

**Predefinito:** `False`

## orthophoto-compression

Imposta la compressione da utilizzare per le ortofoto.

**Opzioni:** `JPEG |  LZW |  PACKBITS |  DEFLATE |  LZMA |  NONE`

**Predefinito:** `DEFLATE`

## orthophoto-cutline

Genera un poligono attorno all'area di ritaglio che taglia l'ortofoto lungo i bordi degli elementi. Questo poligono può essere utile per assemblare mosaici senza giunzioni con più ortofoto sovrapposte.

**Predefinito:** `False`

## orthophoto-kmz

Imposta questo parametro se vuoi generare un rendering Google Earth (KMZ) dell'ortofoto.

**Predefinito:** `False`

## orthophoto-no-tiled

Imposta questo parametro se vuoi un GeoTIFF a strisce (striped).

**Predefinito:** `False`

## orthophoto-png

Imposta questo parametro se vuoi generare un rendering PNG dell'ortofoto.

**Predefinito:** `False`

## orthophoto-resolution

Risoluzione dell'ortofoto in cm / pixel. Nota che questo valore è limitato da una stima della distanza di campionamento al suolo (GSD).

**Opzioni:** `<float > 0.0>`

**Predefinito:** `5`

## pc-classify

Classifica gli output della nuvola di punti. Puoi controllare il comportamento di questa opzione regolando i parametri --dem-*.

**Predefinito:** `False`

## pc-copc

Salva la nuvola di punti georeferenziata nel formato Cloud Optimized Point Cloud (COPC).

**Predefinito:** `False`

## pc-csv

Esporta la nuvola di punti georeferenziata in formato CSV.

**Predefinito:** `False`

## pc-ept

Esporta la nuvola di punti georeferenziata in formato Entwine Point Tile (EPT).

**Predefinito:** `False`

## pc-filter

Filtra la nuvola di punti rimuovendo i punti che deviano più di N deviazioni standard dalla media locale. Imposta a 0 per disabilitare il filtraggio.

**Opzioni:** `<positive float>`

**Predefinito:** `5`

## pc-las

Esporta la nuvola di punti georeferenziata in formato LAS.

**Predefinito:** `False`

## pc-quality

Imposta la qualità della nuvola di punti. Una qualità più alta genera nuvole di punti migliori e più dense, ma richiede più memoria e più tempo. Ogni incremento di qualità aumenta il tempo di elaborazione di un fattore circa 4x.

**Opzioni:** `ultra |  high |  medium |  low |  lowest`

**Predefinito:** `medium`

## pc-sample

Filtra la nuvola di punti mantenendo un solo punto entro un raggio di N (in metri). Questo può essere utile per limitare la risoluzione di output della nuvola di punti e rimuovere punti duplicati. Imposta a 0 per disabilitare il campionamento.

**Opzioni:** `<positive float>`

**Predefinito:** `0`

## pc-skip-geometric

Le stime geometriche migliorano l'accuratezza della nuvola di punti calcolando mappe di profondità geometricamente coerenti, ma potrebbero non essere utilizzabili in dataset più grandi. Questo flag disabilita le stime geometriche.

**Predefinito:** `False`

## primary-band

Durante l'elaborazione di dataset multispettrali, puoi specificare il nome della banda primaria che verrà utilizzata per la ricostruzione. Si consiglia di scegliere una banda con dettagli nitidi e a fuoco.

**Opzioni:** `<string>`

**Predefinito:** `auto`

## project-path

Percorso alla cartella del progetto. La cartella del progetto deve contenere sottocartelle per ciascun dataset. Ogni dataset deve avere una cartella "images".

**Opzioni:** `<path>`

## radiometric-calibration

Imposta la calibrazione radiometrica da eseguire sulle immagini. Durante l'elaborazione di immagini multispettrali e termiche dovresti impostare questa opzione per ottenere valori di riflettanza/temperatura (altrimenti otterrai valori digitali grezzi). [camera] applica il livello del nero, la vignettatura, la compensazione di guadagno/esposizione del gradiente di riga (se vengono trovati i tag EXIF appropriati) e calcola i valori di temperatura assoluta. [camera+sun] è sperimentale: applica tutte le correzioni di [camera] e in più compensa la radianza spettrale registrata tramite un sensore di luce incidente (DLS) tenendo in considerazione l'angolo del sole.

**Opzioni:** `none |  camera |  camera+sun`

**Predefinito:** `none`

## report-units

Imposta le unità di misura del report PDF. Per impostazione predefinita vengono utilizzate le unità verticali del sistema di riferimento delle coordinate.

**Opzioni:** `m |  ft |  US survey foot`

**Predefinito:** `m`

## rerun

Riesegue solo questa fase e si ferma.

**Opzioni:** `dataset |  split |  merge |  opensfm |  openmvs |  odm_filterpoints |  odm_meshing |  mvs_texturing |  odm_georeferencing |  odm_dem |  odm_orthophoto |  odm_report |  odm_postprocess`

## rerun-all

Elimina definitivamente tutti i risultati precedenti e riesegue la pipeline di elaborazione.

**Predefinito:** `False`

## rerun-from

Riesegue l'elaborazione a partire da questa fase.

**Opzioni:** `dataset |  split |  merge |  opensfm |  openmvs |  odm_filterpoints |  odm_meshing |  mvs_texturing |  odm_georeferencing |  odm_dem |  odm_orthophoto |  odm_report |  odm_postprocess`

## rolling-shutter

Attiva la correzione del rolling shutter. Se la fotocamera ha un otturatore rolling shutter e le immagini sono state scattate in movimento, puoi attivare questa opzione per migliorare l'accuratezza dei risultati. Vedi anche --rolling-shutter-readout.

**Predefinito:** `False`

## rolling-shutter-readout

Sovrascrive il tempo di lettura (readout) del rolling shutter per il sensore della tua fotocamera (in millisecondi), invece di utilizzare il database dei tempi di lettura del rolling shutter. Nota che non tutte le fotocamere sono presenti nel database. Imposta a 0 per utilizzare il valore del database.

**Opzioni:** `<positive integer>`

**Predefinito:** `0`

## sfm-algorithm

Scegli l'algoritmo di structure from motion. Per dataset aerei, se sono disponibili le posizioni GPS e gli angoli della fotocamera, la triangolazione può essere più veloce. Planar è deprecato e verrà rimosso in una versione futura.

**Opzioni:** `incremental |  triangulation |  planar`

**Predefinito:** `incremental`

## sfm-no-partial

Non tentare di unire le ricostruzioni parziali. Queste possono verificarsi quando le immagini non hanno una sovrapposizione sufficiente o sono isolate.

**Predefinito:** `False`

## skip-3dmodel

Salta la generazione del modello 3D completo. Questo può far risparmiare tempo se ti servono solo risultati 2D come ortofoto e DEM.

**Predefinito:** `False`

## skip-band-alignment

Durante l'elaborazione di dataset multispettrali, le immagini di ciascuna banda vengono allineate automaticamente. Se le immagini sono state post-elaborate e sono già allineate, usa questa opzione.

**Predefinito:** `False`

## skip-orthophoto

Salta la generazione dell'ortofoto. Questo può far risparmiare tempo se ti servono solo risultati 3D o DEM.

**Predefinito:** `False`

## skip-report

Salta la generazione del report PDF. Questo può far risparmiare tempo se non hai bisogno di un report.

**Predefinito:** `False`

## sky-removal

Calcola automaticamente le maschere delle immagini utilizzando l'IA per rimuovere il cielo. Sperimentale.

**Predefinito:** `False`

## sm-cluster

URL a un'istanza di ClusterODM per distribuire un flusso di lavoro split-merge su più nodi in parallelo.

**Opzioni:** `<string>`

**Predefinito:** `None`

## sm-no-align

Salta l'allineamento dei sottomodelli nello split-merge. Utile se il GPS è sufficientemente buono su dataset molto grandi.

**Predefinito:** `False`

## smrf-scalar

Parametro scalare di elevazione del Simple Morphological Filter.

**Opzioni:** `<positive float>`

**Predefinito:** `1.25`

## smrf-slope

Parametro di pendenza del Simple Morphological Filter (rapporto tra dislivello e distanza).

**Opzioni:** `<positive float>`

**Predefinito:** `0.15`

## smrf-threshold

Parametro di soglia di elevazione del Simple Morphological Filter (metri).

**Opzioni:** `<positive float>`

**Predefinito:** `0.5`

## smrf-window

Parametro del raggio della finestra del Simple Morphological Filter (metri).

**Opzioni:** `<positive float>`

**Predefinito:** `18.0`

## split

Numero medio di immagini per sottomodello. Quando si suddivide un dataset di grandi dimensioni in sottomodelli più piccoli, le immagini vengono raggruppate in cluster. Questo valore regola il numero medio di immagini che ciascun cluster dovrebbe avere.

**Opzioni:** `<positive integer>`

**Predefinito:** `999999`

## split-image-groups

Percorso al file dei gruppi di immagini che controlla come le immagini devono essere suddivise in gruppi. Il file deve usare il seguente formato: 

image_name group_name

**Opzioni:** `<path string>`

**Predefinito:** `None`

## split-overlap

Raggio della sovrapposizione tra i sottomodelli in metri. Dopo aver raggruppato le immagini in cluster, le immagini che si trovano a una distanza inferiore a questo raggio da un cluster vengono aggiunte al cluster. Questo viene fatto per garantire che i sottomodelli adiacenti si sovrappongano. Tutte le immagini necessitano di informazioni GPS.

**Opzioni:** `<positive integer>`

**Predefinito:** `150`

## texturing-keep-unseen-faces

Mantiene nella mesh le facce che non sono visibili in alcuna fotocamera.

**Predefinito:** `False`

## texturing-single-material

Genera file OBJ con un singolo materiale e un singolo file di texture invece di più materiali e texture.

**Predefinito:** `False`

## texturing-skip-global-seam-leveling

Salta la normalizzazione dei colori tra tutte le immagini. Utile durante l'elaborazione di dati radiometrici.

**Predefinito:** `False`

## tiles

Genera tile statiche per ortofoto e DEM adatte a visualizzatori come Leaflet o OpenLayers.

**Predefinito:** `False`

## use-3dmesh

Utilizza una mesh 3D completa per calcolare l'ortofoto invece di una mesh 2.5D. Questa opzione è un po' più veloce e fornisce risultati simili in aree pianeggianti.

**Predefinito:** `False`

## use-exif

Usa questo tag se disponi di un file GCP ma vuoi utilizzare invece le informazioni EXIF per la georeferenziazione.

**Predefinito:** `False`

## use-fixed-camera-params

Disattiva l'ottimizzazione dei parametri della fotocamera durante il bundle adjustment. Questo può a volte essere utile per migliorare risultati che presentano effetti di bombatura/incurvamento (doming/bowling) o quando le immagini sono state scattate con una fotocamera a rolling shutter.

**Predefinito:** `False`

## use-hybrid-bundle-adjustment

Esegue un bundle adjustment locale per ogni immagine aggiunta alla ricostruzione e un adjustment globale ogni 100 immagini. Velocizza la ricostruzione per dataset molto grandi.

**Predefinito:** `False`

## version

Mostra il numero di versione ed esce.

## video-limit

Numero massimo di fotogrammi da estrarre dai file video per l'elaborazione. Imposta a 0 per nessun limite.

**Opzioni:** `<positive integer>`

**Predefinito:** `500`

## video-resolution

La risoluzione massima di output dei fotogrammi video estratti, in pixel.

**Opzioni:** `<positive integer>`

**Predefinito:** `4000`
