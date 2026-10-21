---
title: Architettura
template: doc
---

[WebODM](https://github.com/WebODM/WebODM) è composto da diversi componenti.

- [ODX](https://github.com/WebODM/ODX) è un toolkit a riga di comando che elabora immagini aeree. Gli utenti a proprio agio con la riga di comando probabilmente possono usare questo componente da solo.
- [NodeODX](https://github.com/WebODM/NodeODX) è un'interfaccia leggera e un'API (Application Program Interface) costruita direttamente sopra [ODX](https://github.com/WebODM/ODX). Gli utenti non a proprio agio con la riga di comando possono usare questa interfaccia per elaborare immagini aeree, e gli sviluppatori possono usare l'API per realizzare applicazioni. Funzionalità come l'autenticazione degli utenti, la visualizzazione delle mappe, ecc. non sono fornite.
- [WebODM](https://github.com/WebODM/WebODM) aggiunge ulteriori funzionalità come l'autenticazione degli utenti, la visualizzazione delle mappe, la visualizzazione 3D, un'API di livello più alto e la capacità di orchestrare più nodi di elaborazione (eseguire job in parallelo). I nodi di elaborazione sono semplicemente server che eseguono [NodeODX](https://github.com/WebODM/NodeODX).

![webodm](https://cloud.githubusercontent.com/assets/1951843/25567386/5aeec7aa-2dba-11e7-9169-aca97b70db79.png)

WebODM è costruito pensando alla scalabilità e alle prestazioni. Mentre la configurazione predefinita colloca tutti i database e le applicazioni sullo stesso sistema, gli utenti possono separarne i componenti per aumentare le prestazioni (es. collocare un worker Celery su un computer separato per eseguire task in background).

![Architettura](https://user-images.githubusercontent.com/1951843/36916884-3a269a7a-1e23-11e8-997a-a57cd6ca7950.png)

Alcune cose da notare:
 * Usiamo worker Celery per eseguire task in background, come il ridimensionamento delle immagini e l'elaborazione dei risultati dei task, ma usiamo un meccanismo di scheduling ad-hoc per comunicare con NodeODX (che elabora le ortofoto, i modelli 3D, ecc.). La scelta di usare due sistemi separati per lo scheduling dei task è dovuta alla flessibilità che un meccanismo ad-hoc ci offre per determinate operazioni (cattura dell'output dei task, persistenza dei dati e possibilità di riavviare i task a metà, comunicazione tramite chiamate REST, ecc.).
 * Se distribuiti su più computer, i worker Celery dovrebbero condividere tutti la loro directory `app/media` con l'applicazione Django (tramite condivisioni di rete). Puoi gestire i worker tramite `./worker.sh`
