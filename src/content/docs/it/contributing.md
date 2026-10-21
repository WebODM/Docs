---
title: Contribuire
template: doc
---

Fare un contributo di codice può sembrare intimidatorio, ma non è troppo difficile:

1. Crea un fork del [repository WebODM](https://github.com/WebODM/WebODM/)
2. Clona il tuo repository in una directory
3. Crea un nuovo branch: `git checkout -b branchname`.
4. [Configura un ambiente di sviluppo](#configurare-un-ambiente-di-sviluppo) con docker.
5. Esegui il commit delle modifiche: `git commit -a -m "describe your changes"`
6. Esegui il push delle modifiche sul tuo repository: `git push origin branchname`
7. Crea una [pull request](https://github.com/WebODM/WebODM/compare) 

Non abbiamo molte regole. Segui le linee guida indicate nel documento [Contributing](https://github.com/WebODM/WebODM/blob/master/CONTRIBUTING.md), sii gentile con gli altri e andrà alla grande! :)

## Configurare un Ambiente di Sviluppo

Segui le [istruzioni di installazione docker di WebODM](https://github.com/WebODM/WebODM/#manual-installation-docker), quindi esegui:

`./webodm.sh start --dev`

È tutto! Puoi modificare qualsiasi file, inclusi i file SASS e React.js. Le modifiche verranno riflesse automaticamente nell'istanza WebODM in esecuzione.

## Eseguire gli Unit Test

Riteniamo che i test siano una parte necessaria per fornire software robusto. Cerchiamo di raggiungere una copertura di test completa per il codice backend e, come minimo, robusti smoke test per il codice frontend.

Per eseguire gli unit test, digita semplicemente:

`./webodm.sh test`

## Applicare le Modifiche in Produzione

Una volta terminate le modifiche, se avvii WebODM in modalità produzione (senza il flag `--dev`), noterai che le tue modifiche non sono presenti. Questo perché `webodm.sh` usa l'immagine docker `webodm/webodm_webapp` per avviare WebODM, che non contiene le tue modifiche. Per applicare le modifiche, devi ricostruire l'immagine docker localmente:

`docker build -t webodm/webodm_webapp .`

Puoi anche modificare il file `docker-compose.yml` per puntare a un'immagine diversa.

## Panoramica del Progetto

### Backend

Il backend si basa principalmente su [Django](https://www.djangoproject.com/) e [Django REST Framework](http://www.django-rest-framework.org/).

Non usiamo molto il sistema di template di Django, tranne che per le sezioni `Administration` e `Processing Nodes`. Usiamo invece Django per esporre una [API](/it/api/task/), che colleghiamo poi a un'app [React.js](https://facebook.github.io/react/).

Le directory di interesse sono elencate di seguito:

Directory | Descrizione
--------- | -----------
`/app`	  | Applicazione principale; include i componenti dell'interfaccia utente, l'API, i test e la logica di backend.
`/nodeodx`| Applicazione che fa da ponte per la comunicazione tra WebODM e [NodeODX](https://github.com/WebODM/NodeODX). Include i propri unit test e modelli.
`/webodm` | Directory principale del progetto Django. I file di impostazione si trovano qui.

### Frontend

Usiamo un'app [React.js](https://facebook.github.io/react/) (sintassi [ES6](https://leanpub.com/understandinges6/read/)) e [SCSS](http://sass-lang.com/) per vari componenti dell'interfaccia utente, come la dashboard. Usiamo [webpack](https://webpack.github.io/) per compilare i componenti intermedi in un bundle statico.

Le directory di interesse sono elencate di seguito:

Directory | Descrizione
--------- | -----------
`/app/templates/app` | Posizione dei template Django. Anche se non li usiamo molto, li utilizziamo per alcune pagine e come collante per inizializzare il codice React.
`/app/static/app/js` | Posizione dei file Javascript per tutti i componenti dell'interfaccia utente.
`/app/static/app/js/components` | Cerchiamo di separare i componenti in vari componenti React per favorirne la riusabilità. Ogni componente è memorizzato qui.
`/app/static/app/js/css` | Ogni componente dovrebbe avere il proprio file SCSS. Quei file sono memorizzati qui.

`/app/static/app/js/main.jsx` è il punto di ingresso dell'interfaccia utente. Se ti chiedi come colleghiamo Django e React.js, questo è il file da cui iniziare la tua ricerca.

### Documentazione

Usiamo [Astro](https://astro.build) per generare la nostra documentazione. Consulta la [documentazione](https://docs.astro.build/en/getting-started/) del loro progetto per informazioni su come apportare modifiche alla documentazione.
