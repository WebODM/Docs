---
title: Uso di Maschere di Immagine
template: doc
---

È possibile fornire maschere di immagine per indicare al software di saltare la ricostruzione in determinate aree. Questo è utile nei casi in cui il cielo sia stato accidentalmente incluso nelle foto di input da scatti obliqui, o semplicemente per limitare la ricostruzione a un singolo soggetto.

Per aggiungere una maschera, è sufficiente creare una nuova immagine in bianco e nero delle stesse dimensioni dell'immagine di destinazione che si desidera mascherare (è possibile utilizzare un programma come GIMP per farlo). Colorare in nero le aree da escludere dalla ricostruzione.

![Immagine di destinazione](/images/target_image.webp)

![Maschera di immagine](/images/target_image_mask.webp)

![Risultato 3D con maschera applicata](/images/3D_result.webp)

Nominare il file:

`<filename>_mask.JPG`

Ad esempio, `DJI_0018.JPG` può avere una maschera creando un file `DJI_0018_mask.JPG` e includendolo nell'elenco delle immagini. Per le maschere di immagine è possibile utilizzare i formati `.JPG`, `.PNG`, `.BMP` e `.TIF`.
