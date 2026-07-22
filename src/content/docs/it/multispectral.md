---
title: Multispettrale e Termico
template: doc
---

## Supporto Multispettrale

WebODM supporta la normalizzazione radiometrica, che consente di generare ortofoto di riflettanza da fotocamere multispettrali. Le fotocamere multispettrali acquisiscono più scatti della scena utilizzando sensori con bande diverse.

### Sensori Supportati

Sebbene il nostro obiettivo sia supportare quante più fotocamere possibile, il supporto multispettrale è stato sviluppato utilizzando le seguenti fotocamere, che quindi funzioneranno meglio:

- [MicaSense RedEdge-MX e Altum](https://www.micasense.com/)
- [Sentera 6X](https://sentera.com/products/fieldcapture/sensors/6x/)
- [DJI Phantom 4 Multispectral](https://www.dji.com/p4-multispectral)
- [DJI Mavic 3 Multispectral](https://ag.dji.com/mavic-3-m)

Anche altre fotocamere potrebbero funzionare. Puoi aiutarci ad ampliare questo elenco [condividendo](https://webodm.org/community) dataset acquisiti con altre fotocamere.

### Creazione di Ortofoto da Dati Multispettrali

Per i sensori supportati elencati sopra (e probabilmente per altri sensori), gli utenti possono elaborare i dati multispettrali allo stesso modo delle immagini a luce visibile. Le immagini di tutte le bande dei sensori devono essere elaborate insieme (non separare le bande in più cartelle). Gli utenti hanno la possibilità di passare il parametro `--radiometric-calibration` con le opzioni `camera` o `camera+sun` per abilitare la normalizzazione radiometrica. Se le immagini fanno parte di una configurazione multi-camera, l'ortofoto risultante avrà N bande, una per ogni fotocamera (+ alpha).

L'NDVI e altri indici di vegetazione possono essere calcolati da queste ortofoto mosaicate utilizzando software come [QGIS](https://www.qgis.org/).


## Supporto Termico

WebODM supporta la calibrazione radiometrica dei dati termici, che consente di generare ortofoto di temperatura da fotocamere a infrarossi a onda lunga (LWIR). Le immagini LWIR possono essere elaborate da sole o come parte di un dataset multispettrale.

![Immagini termiche in WebODM](/images/thermal.webp)

### Hardware

Sebbene il nostro obiettivo sia supportare quante più fotocamere possibile, il supporto termico è stato sviluppato utilizzando le seguenti fotocamere, che quindi funzioneranno meglio:

- [MicaSense Altum](https://www.micasense.com/)
- [DJI Zenmuse XT](https://www.dji.com/zenmuse-xt)
- [DJI Zenmuse H20 Series](https://enterprise.dji.com/zenmuse-h20-series)

Anche questi droni sono supportati, ma richiedono una pre-elaborazione con 
[Thermal Tools](https://webodm.net/thermaltools):

 * DJI Zenmuse H20N
 * DJI Matrice 30 Series
 * DJI Zenmuse XT S
 * DJI Zenmuse H30 Series
 * DJI Mavic 2 Enterprise Advanced
 * DJI Mavic 3 Enterprise
 * DJI Matrice 4 Series
 
Anche altre fotocamere potrebbero funzionare. Puoi aiutarci ad ampliare questo elenco [condividendo](https://webodm.org/datasets) dataset acquisiti con altre fotocamere.

### Utilizzo

:::note[Solo per droni DJI]

Per ottenere i valori di temperatura, pre-elabora le immagini con [Thermal Tools](https://webodm.net/thermaltools) prima di elaborarle con WebODM e usa le impostazioni standard (non usare `--radiometric-calibration`).

:::

Elabora le immagini utilizzando il parametro `--radiometric-calibration camera` per abilitare la calibrazione radiometrica.
