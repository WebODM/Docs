---
title: Modelli Digitali di Elevazione
template: doc
---

Per impostazione predefinita WebODM non crea modelli digitali di elevazione (DEM). Per creare un modello digitale del terreno, assicurarsi di passare il flag `--dtm`. Per creare un modello digitale di superficie, assicurarsi di passare il flag `--dsm`.

![Modello digitale di superficie](/images/digitalsurfacemodel.webp)

Per la generazione del DTM viene utilizzato un Simple Morphological Filter (smrf) per classificare i punti in punti a terra e non a terra, e vengono utilizzati solo i punti a terra. Il filtro `smrf` può essere controllato tramite diversi parametri:

- `--smrf-scalar` valore di scala. Aumentare questo parametro per terreni con molte variazioni di quota.
- `--smrf-slope` parametro di pendenza, che è una misura della "tolleranza alla pendenza". Aumentare questo parametro per terreni con molte variazioni di quota. Dovrebbe essere impostato a un valore superiore a 0.1 e non superiore a 1.2.
- `--smrf-threshold` soglia di elevazione. Impostare questo parametro all'altezza minima (in metri) che ci si aspetta abbiano gli oggetti non a terra.
- `--smrf-window` parametro del raggio della finestra (in metri) che corrisponde alla dimensione dell'elemento più grande (edificio, alberi, ecc.) da rimuovere. Dovrebbe essere impostato a un valore superiore a 10.

La modifica di queste opzioni può influenzare significativamente il risultato dei DTM. La migliore fonte da consultare per capire come i parametri influenzano il risultato è il documento originale [An improved simple morphological filter for the terrain classification of airborne LIDAR data](https://www.researchgate.net/publication/258333806_An_Improved_Simple_Morphological_Filter_for_the_Terrain_Classification_of_Airborne_LIDAR_Data).

Nel complesso l'opzione `--smrf-threshold` ha il maggiore impatto sui risultati.

SMRF è efficace nell'evitare errori di Tipo I (un piccolo numero di punti a terra erroneamente classificati come non a terra) ma solo "accettabile" nell'evitare errori di Tipo II (un grande numero di punti non a terra erroneamente classificati come a terra). Questo deve essere preso in considerazione quando si generano DTM destinati a un uso visivo, poiché gli oggetti scambiati per terreno appaiono come artefatti nel DTM finale.

![Filtro SMRF](/images/smrf.webp)

Altri due parametri importanti influenzano la generazione del DEM:

- `--dem-resolution` che imposta la risoluzione in uscita del raster DEM (cm/pixel)
- `--dem-gapfill-steps` che determina il numero di layer DEM progressivi da utilizzare. Per scene urbane, aumentare questo valore a `4-5` può aiutare a produrre migliori risultati di interpolazione nelle aree lasciate vuote dal filtro SMRF.

Esempio di come generare un DTM:

```bash
docker run -ti --rm -v /my/project:/datasets/code <my_odm_image> --project-path /datasets --dtm --dem-resolution 2 --smrf-threshold 0.4 --smrf-window 24
```
