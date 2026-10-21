---
title: Calibrazione della Fotocamera
template: doc
---

La calibrazione della fotocamera è una sfida particolare con le fotocamere di largo consumo. Variazioni di temperatura, vibrazioni, messa a fuoco e altri fattori possono influenzare i parametri derivati, con effetti sostanziali sui dati risultanti. La calibrazione automatica o autocalibrazione è possibile e desiderabile nei voli con drone, ma a seconda dello schema di volo, la calibrazione automatica potrebbe non rimuovere tutta la distorsione dai prodotti risultanti. James e Robson (2014), nel loro articolo [Mitigating systematic error in topographic models derived from UAV and ground‐based image networks](https://onlinelibrary.wiley.com/doi/full/10.1002/esp.3609), affrontano il tema di come minimizzare la distorsione derivante dall'autocalibrazione.

![Effetto bowling sulla nuvola di punti](/images/msimbasi_bowling.webp)

*Effetto bowling sulla nuvola di punti in un dataset di oltre 13.000 immagini raccolto dalla World Bank Tanzania sul bacino del Msimbasi, soggetto a inondazioni, a Dar es Salaam, Tanzania.*

Per mitigare questo effetto esistono alcune opzioni, ma le più semplici sono le seguenti: volare seguendo due schemi separati di 20° e, invece di utilizzare una fotocamera al nadir (puntata verticalmente verso il basso), usarne una inclinata in avanti di 5°.

![Pianificazione di volo ottimale](/images/flightplanning.webp)

Poiché questo approccio richiede più tempo rispetto all'acquisizione tradizionale, i piloti e i team possono applicare questa tecnica a un'area più piccola e utilizzare i dati raccolti per ottimizzare i voli futuri. WebODM può generare un file di calibrazione chiamato cameras.json a partire da un piccolo volo campione. Il file di calibrazione può essere utilizzato per voli futuri, mitigando l'effetto bowling senza sacrificare l'efficienza.

In alternativa, è possibile applicare il seguente metodo sperimentale: volare con una sovrapposizione molto più bassa, ma con due voli a *griglia incrociata* (crossgrid, talvolta detta crosshatch) separati di 20° con una fotocamera inclinata in avanti di 5°.

- Le percentuali di sovrapposizione dei voli a griglia incrociata possono essere inferiori a quelle dei voli paralleli. Per ottenere buoni risultati 3D, saranno necessari il 68% di overlap e sidelap, equivalenti a un 83% di overlap e sidelap.
- Per ottenere buoni risultati 2D e 2.5D (modello digitale di elevazione), saranno necessari il 42% di overlap e sidelap, equivalenti a un 70% di overlap e sidelap.

![Metodo sperimentale di rotazione](/images/rotation.webp)

Anche linee di volo separate verticalmente migliorano l'accuratezza, ma in misura minore rispetto a una fotocamera inclinata in avanti di 5°.

![Effetto delle linee di volo separate verticalmente](/images/forward_facing.webp)

*Da James e Robson (2014), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)*
