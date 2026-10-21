---
title: Uso di Podman
template: doc
---

In alternativa a Docker, è possibile scegliere di eseguire WebODM utilizzando [Podman](https://podman.io). Per farlo, è sufficiente installare il pacchetto podman della propria distribuzione, oltre al suo livello di compatibilità con docker. Ad esempio, su Alpine Linux:

```bash
apk add podman podman-docker
```

La riga di comando di Podman è molto simile a quella di Docker, quindi fare riferimento alla sezione precedente e sostituire ogni invocazione del comando `docker` con `podman` è probabilmente sufficiente per apprenderne l'uso di base.

### Migrazione da Docker a Podman

Purtroppo, dato il numero di opzioni che `webodm.sh` offre per l'installazione, la migrazione tra le due piattaforme può richiedere del lavoro manuale prima del passaggio. Se le informazioni di WebODM erano memorizzate in directory tramite i flag `--media-dir` e `--db-dir`, allora i dati al loro interno devono essere di proprietà dell'utente che esegue i container Podman. Se si esegue in modalità rootless, assicurarsi di impostarlo sul proprio utente corrente. Se `media-dir` e `db-dir` si trovano all'interno del repository git, è possibile eseguire in sicurezza un chown ricorsivo dell'intero repository in questo modo:

```bash
sudo chown -R $(whoami) WebODM
```

Se `webodm.sh` è stato usato senza flag, è necessario un intervento diverso per migrare i dati.

```bash
docker volume export webodm-dbdata > webodm-dbdata.tar
docker volume export webodm-appmedia > webodm-appmedia.tar
```

Indipendentemente dalla posizione dei dati, sarà ora necessario disinstallare completamente Docker dal sistema secondo la documentazione del proprio sistema operativo. Si noti che, per impostazione predefinita, lo script `webodm.sh` potrebbe essersi preso la libertà di installare docker-compose. Per ripulirlo, eseguire quanto segue:

```bash
rm ~/.docker/cni-plugins-docker-compose
```

Ora installare Podman secondo la documentazione del proprio sistema operativo. Se in precedenza è stato necessario esportare le directory media e db da Docker, è ora possibile utilizzare Podman per importare i volumi.

```bash
podman volume import webodm-dbdata webodm-dbdata.tar
podman volume import webodm-appmedia webodm-appmedia.tar
```

A questo punto si consiglia di disconnettersi e riconnettersi al sistema per assicurarsi che tutte le variabili d'ambiente siano caricate correttamente.

Eseguendo ora `webodm.sh`, i dati utente dovrebbero risultare persistenti attraverso il passaggio.

### Per Versioni di podman-compose < 1.5.0

Le versioni di podman-compose precedenti alla 1.5.0 non supportano le variabili d'ambiente nei file docker-compose. Se la propria distribuzione non fornisce una versione aggiornata nei suoi repository, è possibile scegliere di fornire un proprio binario aggiornato oppure di utilizzare [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually) con podman stesso. In entrambi i casi, sarà necessario aggiornare la riga compose_providers del file `/etc/containers/containers.conf`.

Se si sceglie di utilizzare Docker Compose al posto di podman-compose, potrebbe essere necessario configurare alcune variabili d'ambiente aggiuntive per indicare a WebODM dove inviare le proprie richieste API Docker. La seguente configurazione dell'ambiente ha permesso a WebODM di avviarsi correttamente su Alpine Linux 3.22, sebbene dovrebbe funzionare in modo abbastanza indipendente dalla distribuzione.

```bash
export WEBODM_PODMAN_SOCKET=$(podman info --format '{{.Host.RemoteSocket.Path}}')
mkdir -p $(dirname WEBODM_PODMAN_SOCKET)
export DOCKER_HOST=unix://$WEBODM_PODMAN_SOCKET
```

Infine, avviare WebODM in questo modo:

```bash
podman system service --time=0 unix://$WEBODM_PODMAN_SOCKET & ./webodm.sh start
```

### Configurare Podman per l'Esecuzione Rootless

Uno dei principali vantaggi dell'uso di Podman rispetto a Docker risiede nella sua capacità di essere eseguito in modalità rootless. Il proprio sistema operativo potrebbe configurare o meno questa modalità automaticamente, ma istruzioni generiche su come farlo si trovano [nella documentazione ufficiale di Podman](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode). In sintesi, eseguire i seguenti comandi è probabilmente ciò che sarà necessario fare:

```bash
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
```

### macOS

In teoria, [installare](https://podman-desktop.io/docs/installation/macos-install) ed eseguire Podman Desktop dal sito ufficiale dovrebbe essere tutto ciò che serve per usare lo script `webodm.sh`. Installarlo e configurarlo sia per la [compatibilità con Docker](https://podman-desktop.io/docs/migrating-from-docker/customizing-docker-compatibility#enable-docker-compatibility) sia per la [funzionalità Compose](https://podman-desktop.io/docs/compose/setting-up-compose).
