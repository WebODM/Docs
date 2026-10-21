---
title: Creazione di Ortofoto di Qualità
template: doc
---

![Ortofoto](/images/orthophoto.webp)

Senza alcuna modifica dei parametri, WebODM sceglie un buon compromesso tra qualità, velocità e utilizzo della memoria. Se si desidera ottenere risultati di qualità superiore, è necessario regolare alcuni parametri:

- `--orthophoto-resolution` è la risoluzione dell'ortofoto in cm/pixel. Diminuire questo valore per un risultato a risoluzione più elevata.

- `--mesh-size` dovrebbe essere aumentato a `300000-600000` e `--mesh-octree-depth` dovrebbe essere aumentato a `10-11` nelle aree urbane per ricostruire meglio edifici e tetti.
