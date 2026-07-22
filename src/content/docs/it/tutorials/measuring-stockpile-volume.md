---
title: Misurazione di Cumuli
template: doc
---

### Pianificazione del Lavoro sul Campo

Le condizioni meteorologiche modificano l'illuminazione e quindi influenzano i risultati fotografici. I migliori risultati si ottengono con cielo uniformemente coperto o sereno. Cercare inoltre condizioni di vento debole che consentano alla fotocamera di rimanere stabile durante il processo di raccolta dei dati.

Per evitare ombre che su un lato del cumulo possono ostacolare il rilevamento degli elementi e ridurre il numero di punti risultanti, preferire sempre i voli durante il mezzogiorno, quando il sole è al nadir, in modo che tutto sia illuminato in modo uniforme.

Assicurarsi inoltre che la distanza di visibilità orizzontale a occhio nudo sia congruente con le distanze di volo pianificate per il progetto specifico, in modo che la qualità delle immagini non sia influenzata negativamente da polvere, nebbia, fumo, cenere vulcanica o inquinamento.

### Schema di Volo

La maggior parte dei lavori di misurazione dei cumuli non richiede uno schema a griglia incrociata (crosshatch) o un gimbal inclinato, poiché l'angolo di riposo dei materiali del cumulo consente alla fotocamera di catturare interamente i lati del cumulo. Solo alcuni casi particolari, in cui l'erosione o le operazioni dei macchinari causano angoli ripidi sulle facce del cumulo, trarrebbero beneficio dallo schema di volo a griglia incrociata e dal gimbal della fotocamera inclinato; ma bisogna considerare che questi elementi aggiuntivi riconosciuti hanno un costo (in lavoro sul campo e tempo di elaborazione) e i miglioramenti risultanti sono talvolta trascurabili.

Nella maggior parte dei casi uno schema di volo "a tosaerba" (lawn mower) è in grado di produrre modelli di cumuli altamente accurati.

![Schema di volo a tosaerba](/images/lawnmower_pattern.webp)

La sovrapposizione longitudinale (overlap) consigliata è tra il 75% e l'80%, con una sovrapposizione laterale (sidelap) nell'ordine del 65%-70%. Si consiglia inoltre di aumentare leggermente overlap e sidelap all'aumentare dell'altezza di volo.

### Altezza di Volo

L'altezza di volo può essere influenzata dai diversi modelli di fotocamera, ma in linea generale, e al fine di garantire un equilibrio tra qualità delle immagini e ottimizzazione del volo, si raccomanda di eseguirlo ad altezze da 3 a 4 volte l'altezza del cumulo più alto. Quindi, per un cumulo di 10 metri, le immagini possono essere catturate a un'altezza di 40 metri.

All'aumentare dell'altezza di volo, si raccomanda anche di aumentare la sovrapposizione: per un volo a 40 metri di altezza si può impostare un sidelap del 65% e un overlap del 75%, ma per un'altezza pianificata di 80 metri un sidelap del 70% e un overlap dell'80%, consentendo agli elementi di essere riconosciuti ed elaborati correttamente.

### GCP

Per raggiungere livelli di accuratezza migliori del 3%, si consiglia l'uso dei GCP. In genere 5 GCP distribuiti sono sufficienti a garantire risultati accurati. Quando si posizionano o si misurano i GCP, l'accuratezza della strumentazione dovrebbe essere superiore al GSD. I ricevitori GNSS di grado topografico e le stazioni totali sono pensati per fornire l'accuratezza millimetrica richiesta.

Per ulteriori informazioni sull'uso dei GCP, fare riferimento alla [sezione Punti di Controllo a Terra (GCP)](/it/ground-control-points/).

### Parametri di Elaborazione

Un modello altamente accurato può essere ottenuto utilizzando le impostazioni predefinite ad alta risoluzione di WebODM. Successivamente è possibile regolare ulteriormente alcuni parametri secondo necessità.

Questi valori di riferimento possono aiutare a configurare le impostazioni di elaborazione:

- `--dsm`: true
- `--dem-resolution`: 2.0
- `--orthophoto-resolution`: 1.0
- `--feature-quality`: high
- `--pc-quality`: high

### Misurazione

Poiché quasi il 50% del materiale si trova nel primo 20% dell'altezza del cumulo, occorre prestare particolare attenzione a definire adeguatamente il piano di base.

![Distribuzione dell'altezza del cumulo](/images/stockpile.webp)

Nella Dashboard di WebODM, fare clic su "view map" per avviare una vista 2D del progetto.

Una volta nella vista mappa 2D, fare clic sul pulsante "Measure volume, area and length" (Misura volume, area e lunghezza).

![Pulsante di misurazione del volume](/images/measurement1.webp)

Quindi fare clic su "Create a new measurement" (Crea una nuova misurazione).

![Crea una nuova misurazione](/images/measurement2.webp)

Iniziare a posizionare i punti per definire il piano di base del cumulo.

![Definizione del piano di base del cumulo](/images/measurement3.webp)

Fare clic su "Finish measurement" (Termina misurazione) per completare il processo.

![Termina misurazione](/images/measurement4.webp)

La finestra di dialogo mostrerà il messaggio "Computing ..." per alcuni secondi e, al termine del calcolo, verrà visualizzato il valore della misurazione del volume.

![Risultato della misurazione del volume](/images/measurement7.webp)

Se si utilizza la riga di comando, è possibile usare i file dsm per misurare i volumi dei cumuli con altri programmi.

Si consideri inoltre che, una volta impostati i limiti del cumulo in software come [QGIS](https://www.qgis.org), si scoprirà che esistono diversi modi per determinare il piano di base. Per cumuli isolati i cui confini sono per lo più visibili, si può utilizzare un approccio lineare. Mentre per cumuli posti su pendii o in contenitori, il piano di base è meglio definito dal punto più basso. Per cumuli di grandi dimensioni si consiglia la creazione di una superficie 3D triangolata per definire il piano di base. Questo vale anche per cumuli posti su superfici irregolari.

### Accuratezza Attesa

Per progetti pianificati ed eseguiti con cura, e specialmente quando il GSD è inferiore a 1 cm, l'accuratezza attesa dovrebbe essere compresa tra l'1% e il 2%. L'accuratezza risultante è paragonabile a quella dei software di fotogrammetria disponibili in commercio e a quella ottenuta con strumentazione GNSS di grado topografico.
