---
title: Installazione
template: doc
---

:::tip[Lo Sapevi?]

Puoi saltare l'installazione ed eseguire WebODM da [webodm.net](https://webodm.net), che supporta lo sviluppo del software ❤ Provalo [gratuitamente](https://webodm.net).

:::

## Installazione sul tuo computer

Se utilizzi Windows o macOS, il modo più semplice è [scaricare](https://webodm.org/download) l'installer per la tua piattaforma da [webodm.org](https://webodm.org).

Se utilizzi Linux, devi usare docker (vedi sotto).

:::note

OpenDroneMap, con cui [non siamo più affiliati](https://webodm.org/blog/announcement/), vende installer per un fork di WebODM. Sappi che gli installer ufficiali di WebODM sono gratuiti da scaricare e utilizzare e che l'acquisto da OpenDroneMap non supporta WebODM.

:::

### Docker

Per installare WebODM sul tuo computer con docker, installa prima:

  - [Git](https://git-scm.com/downloads)
  - [Docker](https://www.docker.com/)

Gli utenti Windows e macOS dovrebbero installare Docker Desktop. Poi:

1. Assegna a Docker un numero sufficiente di CPU (predefinito 2) e di RAM (>4Gb, 16Gb è meglio ma lasciane un po' per il sistema operativo) andando su `Settings -- Resources`
2. Seleziona dove sul tuo disco rigido vuoi che risiedano i dischi rigidi virtuali (`Settings -- Resources -- Advanced`).

Poi:

* Apri Git Bash (Windows), oppure dalla riga di comando (Mac / Linux / WSL), digita:

```bash
git clone https://github.com/WebODM/WebODM --config core.autocrlf=input --depth 1
cd WebODM
./webodm.sh start
```

* Se riscontri problemi nell'ultimo passaggio su Linux, assicurati che il tuo utente faccia parte del gruppo docker:

```bash
sudo usermod -aG docker $USER
exit
(riavvia la shell disconnettendoti e riconnettendoti)
./webodm.sh start
```

🎉 **Congratulazioni!** Dovrebbe essere tutto operativo. Apri un browser all'indirizzo http://localhost:8000

Per fermare WebODM premi CTRL+C oppure esegui:

```
./webodm.sh stop
```

Per aggiornare WebODM all'ultima versione usa:

```
./webodm.sh update
```

:::note[Archiviazione su Disco]

Per impostazione predefinita i dati vengono archiviati in volumi docker con nome. Vedi [Dove Sono Memorizzati i Miei File?](/it/faq/#dove-sono-memorizzati-i-miei-file)

Per cambiare questa impostazione, vedi sotto.

:::


Se prevedi di elaborare grandi quantità di dati o stai esaurendo lo spazio su disco, configura `--media-dir` e/o `--node-dir`:

```
./webodm.sh restart --media-dir /storage/media --node-dir /storage/node
```

| Argomento     | Descrizione                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--node-dir`  | Percorso in cui verranno archiviati i file temporanei durante l'elaborazione quando si utilizza il nodo predefinito. Può essere cambiato senza rischi.                                                                 |
| `--media-dir` | Dove vengono archiviati in modo permanente tutti i file relativi a un progetto e a un task. Cerca di non cambiare questa cartella dopo il primo avvio, se non nell'ambito di una [migrazione](#backup-e-ripristino). |

## Installazione su altri sistemi

### Google Compute, Amazon AWS

Questi passaggi sono per Google Cloud, ma possono essere utilizzati anche per Amazon AWS e altre piattaforme cloud con piccole modifiche:

1. Avvia un'istanza Google Cloud di Ubuntu LTS.
2. Apri il terminale SSH - Google offre SSH tramite il sito web.
3. Esegui `sudo apt-get update`
4. Esegui `sudo apt-get upgrade`
5. Installa [docker-compose](https://docs.docker.com/compose/install/). Non installarlo tramite apt dalla versione 24.04 in poi.
6. Esegui `sudo apt-get install python-pip`
7. Esegui `git clone https://github.com/WebODM/WebODM --config core.autocrlf=input --depth 1`
8. cd WebODM (Linux distingue tra maiuscole e minuscole)
9. `sudo ./webodm.sh start`
10. Ora puoi accedere a WebODM tramite l'indirizzo IP pubblico della tua istanza Google. Ricorda la porta predefinita 8000.
11. Verifica che il firewall della tua istanza consenta connessioni TCP in ingresso sulla porta 8000! Se dimentichi questo passaggio non potrai connetterti a WebODM.
12. Apri http://publicip:8000

Per configurare il firewall su Google Cloud, apri l'istanza, al centro della pagina delle impostazioni dell'istanza trova NIC0. Aprila, quindi aggiungi la porta TCP 8000 per l'ingresso (ingress) e l'uscita (egress) sul firewall.


### NAS (Qnap)

Se utilizzi [Lightning](https://webodm.net) o un altro nodo di elaborazione, i requisiti di WebODM sono abbastanza bassi da permetterne l'esecuzione su un dispositivo a bassa potenza come un NAS. I test sono stati effettuati su un Qnap-TS264 con 32Gb di RAM (processore Celeron N5095).
Per installare WebODM su un NAS Qnap:

1. Abilita l'accesso ssh al NAS nel pannello di controllo
2. Installa git. Questo può essere fatto facilmente usando il [qgit qkpg](https://www.myqnap.org/product/qgit/)
3. Segui le istruzioni "Installazione con Docker" riportate sopra.
4. Una nuova applicazione "webodm" dovrebbe apparire in Container Station insieme a quattro container individuali per l'app.
5. WebODM dovrebbe essere disponibile sulla porta 8000 del NAS.
6. Configura un account Lightning online e impostalo in "nodi di elaborazione". È anche possibile configurare un computer più potente per eseguire i task di elaborazione al posto di Lightning.


## Configurazioni Avanzate

### Gestione dei Nodi di Elaborazione

WebODM può essere collegato a uno o più nodi di elaborazione che utilizzano la [NodeODX API](https://github.com/WebODM/NodeODX/blob/master/docs/index.adoc), come [NodeODX](https://github.com/WebODM/NodeODX), [NodeMICMAC](https://github.com/OpenDroneMap/NodeMICMAC/), [ClusterODX](https://github.com/WebODM/ClusterODX) e [Lightning](https://webodm.net). La configurazione predefinita include un nodo di elaborazione "node-odx-1" che viene eseguito sullo stesso sistema di WebODM, giusto per aiutarti a iniziare. Man mano che acquisisci familiarità con WebODM, potresti voler installare nodi di elaborazione su sistemi separati.

Aggiungere più nodi di elaborazione ti permetterà di eseguire più lavori in parallelo.

Puoi anche configurare un nodo [ClusterODX](https://github.com/WebODM/ClusterODX) per eseguire un singolo task su più sistemi con lo [split-merge distribuito](https://docs.opendronemap.org/large/?highlight=distributed#getting-started-with-distributed-split-merge) ed elaborare decine di migliaia di immagini più rapidamente, con meno memoria.

Se non hai bisogno del nodo predefinito "node-odx-1", passa semplicemente il flag `--default-nodes 0` all'avvio di WebODM:

`./webodm.sh restart --default-nodes 0`.

Poi dall'interfaccia web rimuovi semplicemente in modo manuale il nodo "node-odx-1".


### Abilitare SSL

WebODM ha la capacità di richiedere e installare automaticamente un certificato SSL tramite [Let’s Encrypt](https://letsencrypt.org/), oppure puoi specificare manualmente la tua coppia chiave/certificato.

 - Configura il tuo record DNS (webodm.myorg.com --> IP del server).
 - Assicurati che le porte 80 e 443 siano aperte.
 - Esegui quanto segue:

```bash
./webodm.sh restart --ssl --hostname webodm.myorg.com
```

Ecco fatto! Il certificato si rinnoverà automaticamente quando necessario.

Se vuoi specificare la tua coppia chiave/certificato, passa semplicemente le opzioni `--ssl-key` e `--ssl-cert` a `./webodm.sh`. Vedi `./webodm.sh --help` per maggiori informazioni.

Nota! Non puoi passare un indirizzo IP al parametro hostname! È necessario un record DNS configurato.

### Abilitare l'Autenticazione OIDC

WebODM supporta l'autenticazione [OIDC](https://openid.net/) (OpenID Connect), il che significa che puoi fornire un'esperienza di Single Sign On (SSO) utilizzando un provider di autenticazione come Google. Per abilitare uno o più provider, crea un file `local_settings.py` con il seguente contenuto:

```python
OIDC_AUTH_PROVIDERS = [
    {
        'name': 'Google',
        'icon': 'fab fa-google', # icona Font-Awesome valida, o lascia vuoto
        'client_id': '<OAUTH2_CLIENT_ID>',
        'client_secret': '<OAUTH2_CLIENT_SECRET>',
        'auth_endpoint': 'https://accounts.google.com/o/oauth2/v2/auth',
        'token_endpoint': 'https://oauth2.googleapis.com/token',
        'userinfo_endpoint': 'https://openidconnect.googleapis.com/v1/userinfo'
    },
    # Aggiungi altri provider qui sotto
]

# Opzionale, imposta restrizioni su chi può accedere
# se non impostato, chiunque abbia un'email Google può accedere
OIDC_AUTH_EMAILS = ["@myorg.com", "user@gmail.com"]
```

I valori `client_id` e `client_secret` sono forniti dal provider di autenticazione. Dovrai registrare un'applicazione. Con Google, puoi farlo dalla [Google Cloud Console](https://console.cloud.google.com).

Quando registri l'applicazione, imposta gli **Authorized redirect URIs** con:

 * `https://webodm.myorg.com/oidc/callback/`

Gli URL degli endpoint sono spesso pubblicati a un URL `.well-known/openid-configuration`. Ad esempio, Google pubblica i propri su https://accounts.google.com/.well-known/openid-configuration.

Poi riavvia WebODM con:

```
./webodm.sh restart --settings /path/to/local_settings.py
```

### Abilitare IPv6

La tua installazione deve prima avere un indirizzo IPv6 pubblico.
Per abilitare IPv6 sulla tua installazione, devi attivare IPv6 in Docker aggiungendo quanto segue a un file situato in /etc/docker/daemon.json:

```bash
{
  "ipv6": true,
  "fixed-cidr-v6": "fdb4:4d19:7eb5::/64"
}
```
Riavvia Docker:
`systemctl restart docker`

Per aggiungere IPv6, esegui semplicemente:

`./webodm.sh restart --ipv6`

Nota: quando si utilizza la modalità `--ssl`, non puoi passare un indirizzo IP al parametro hostname; devi configurare un record DNS AAAA. Senza la modalità `--ssl` abilitata, accedi al sito all'indirizzo (ad esempio, http://[2001:0db8:3c4d:0015::1]:8000). Le parentesi quadre attorno all'indirizzo IPv6 sono essenziali!
Puoi aggiungere un nuovo nodo NodeODX in WebODM specificando un indirizzo IPv6. Non dimenticare di includere le parentesi quadre attorno all'indirizzo! ad esempio, [2001:0db8:fd8a:ae80::1]

### Abilitare MicMac

WebODM può utilizzare [MicMac](https://github.com/OpenDroneMap/micmac) come motore di elaborazione tramite [NodeMICMAC](https://github.com/OpenDroneMap/NodeMICMAC/). Per aggiungere MicMac, esegui semplicemente:

`./webodm.sh restart --with-micmac`

Questo creerà un nodo di elaborazione "node-micmac-1" sullo stesso sistema che esegue WebODM. Tieni presente che NodeMICMAC è in sviluppo attivo ed è attualmente sperimentale. Se riscontri problemi, [segnalali](https://github.com/OpenDroneMap/NodeMICMAC/issues) sul repository di NodeMICMAC.

## Risoluzione dei Problemi Comuni

| Sintomi                                                                                                                                                                          | Possibili Soluzioni                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Esaurimento della memoria                                                                                                                                                                 | Assicurati che il tuo ambiente Docker abbia abbastanza RAM allocata: [Istruzioni per MacOS](http://stackoverflow.com/a/39720010), [Istruzioni per Windows](https://docs.docker.com/desktop/settings/windows/#advanced)                                                                                                                                                                                                                                                                 |
| Su Windows, docker-compose fallisce con `Failed to execute the script docker-compose`                                                                               | Assicurati di aver abilitato la virtualizzazione VT-x nel BIOS                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Impossibile accedere a WebODM usando Microsoft Edge su Windows 10                                                                                                                           | Prova a modificare le proprietà internet secondo [queste istruzioni](http://www.hanselman.com/blog/FixedMicrosoftEdgeCantSeeOrOpenVirtualBoxhostedLocalWebSites.aspx)                                                                                                                                                                                                                                                                                       |
| Ricevi un errore `No space left on device`, ma il disco rigido ha ancora spazio sufficiente                                                                                                   | Docker su Windows per impostazione predefinita alloca solo 20GB di spazio alla docker-machine predefinita. Devi aumentare quella quantità. Vedi [questo link](http://support.divio.com/local-development/docker/managing-disk-space-in-your-docker-vm) e [questo link](https://www.howtogeek.com/124622/how-to-enlarge-a-virtual-machines-disk-in-virtualbox-or-vmware/)                                                                                                                      |
| Impossibile avviare WebODM tramite `./webodm.sh start`, i messaggi di errore sono diversi a ogni tentativo                                                                                           | Potresti stare esaurendo la memoria. Assicurati di avere abbastanza RAM disponibile. 2GB dovrebbero essere il minimo raccomandato, a meno che tu non sappia cosa stai facendo                                                                                                                                                                                                                                                                                                                         |
| Su Windows, lo spazio di archiviazione mostrato nella pagina di diagnostica di WebODM non corrisponde a quanto effettivamente impostato nelle impostazioni di Docker.                                                   | Da Hyper-V Manager, fai clic con il tasto destro su "DockerDesktopVM", vai su Edit Disk, quindi scegli di espandere il disco e fai corrispondere la dimensione massima alle impostazioni specificate nelle impostazioni di docker. Dopo aver apportato le modifiche, riavvia docker.                                                                                                                                                                                                                                                     |
| Su Linux o WSL, avviso: `GPU use was requested, but no GPU has been found`                                                                                                      | Esegui `nvidia-smi` (nativamente) o `docker run --rm --gpus all nvidia/cuda:11.2.2-devel-ubuntu20.04 nvidia-smi` (docker) per verificare con il [driver NVIDIA](https://www.nvidia.com/drivers/unix/) e il [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).                                                                                                                                                          |
| Ricevi un errore `Connection error: HTTPSConnectionPool(host='spark1.webodm.net', port=443): Max retries exceeded [Errno 11002] Lookup timed out` quando invii immagini a Lightning | Per qualche motivo il sistema DNS sul tuo computer è configurato in modo errato o viene filtrato da software AV/VPN/di rete installato sul sistema. Puoi provare a modificare il tuo file `hosts` per mappare manualmente l'indirizzo IP di `spark1.webodm.net`. Vedi [come modificare il file hosts su Windows](https://www.howtogeek.com/784196/how-to-edit-the-hosts-file-on-windows-10-or-11/) e [usa questo indirizzo IP](https://mxtoolbox.com/SuperTool.aspx?action=a%3aspark1.webodm.net&run=toolpage) |


## Attività di Amministrazione Comuni

Gestire un'installazione di WebODM è abbastanza semplice. Ecco un elenco delle operazioni comuni che potresti dover eseguire:

### Reimpostare la Password di Amministratore

Se hai dimenticato la password che hai scelto la prima volta che hai effettuato l'accesso a WebODM, per reimpostarla digita semplicemente:

```bash
./webodm.sh start && ./webodm.sh resetadminpassword newpass
```

La password verrà reimpostata a `newpass`. Il comando ti dirà anche quale nome utente hai scelto.

### Backup e Ripristino

Se vuoi spostare WebODM su un altro sistema, devi solo trasferire i volumi docker (a meno che tu non stia archiviando i file sul file system).

Sul vecchio sistema:

```bash
mkdir -v backup
docker run --rm --volume webodm_dbdata:/temp --volume `pwd`/backup:/backup ubuntu tar cvf /backup/dbdata.tar /temp
docker run --rm --volume webodm_appmedia:/temp --volume `pwd`/backup:/backup ubuntu tar cvf /backup/appmedia.tar /temp
```

I tuoi file di backup verranno archiviati nella directory `backup` appena creata. Trasferisci la directory `backup` sul nuovo sistema, quindi sul nuovo sistema:

```bash
ls backup # --> appmedia.tar  dbdata.tar
./webodm.sh down # Assicurati che WebODM sia fermo
docker run --rm --volume webodm_dbdata:/temp --volume `pwd`/backup:/backup ubuntu bash -c "rm -fr /temp/* && tar xvf /backup/dbdata.tar"
docker run --rm --volume webodm_appmedia:/temp --volume `pwd`/backup:/backup ubuntu bash -c "rm -fr /temp/* && tar xvf /backup/appmedia.tar"
./webodm.sh start
```

### Aggiornamento

Se usi docker, l'aggiornamento è semplice come eseguire:

```bash
./webodm.sh update
```

### Personalizzazione ed Estensione

Piccole personalizzazioni come la modifica dei colori dell'applicazione, del nome, del logo o l'aggiunta di CSS/HTML/Javascript personalizzati possono essere effettuate direttamente dai pannelli Customize -- Brand/Theme all'interno di WebODM. Non è necessario creare un fork o modificare il codice.

Personalizzazioni più avanzate possono essere realizzate [scrivendo plugin](/it/plugin-development-guide/). Questo è il modo preferito per aggiungere nuove funzionalità a WebODM poiché richiede meno sforzo rispetto alla manutenzione di un fork separato. Il sistema di plugin offre segnali lato server che possono essere usati per essere notificati di vari eventi, un sistema di build ES6/React, una API dinamica lato client per aggiungere elementi all'interfaccia utente, un data store integrato, un esecutore di task asincroni, hook per aggiungere voci di menu e funzioni per iniettare rapidamente CSS, Javascript e viste Django.

Per saperne di più, inizia dalla [guida allo sviluppo di plugin](https://docs.webodm.org/plugin-development-guide/). È anche utile studiare il codice sorgente dei [plugin esistenti](https://github.com/WebODM/WebODM/tree/master/coreplugins).

Se un particolare hook / segnale per il tuo plugin non esiste ancora, [richiedilo](https://github.com/WebODM/WebODM/issues). Stiamo aggiungendo hook e segnali man mano che procediamo.


## Requisiti Hardware

Per eseguire un'installazione standalone di WebODM (l'interfaccia utente), incluso il componente di elaborazione ([NodeODX](https://github.com/WebODM/NodeODX)), raccomandiamo come minimo:

* 100 GB di spazio libero su disco
* 16 GB di RAM

Non aspettarti di elaborare più di qualche centinaio di immagini con queste specifiche. Per elaborare dataset più grandi, aggiungi RAM in modo lineare rispetto al numero di immagini che vuoi elaborare:

| Numero di Immagini | RAM o RAM + Swap (GB) |
| ---------------- | ---------------------- |
| 40               | 4                      |
| 250              | 16                     |
| 500              | 32                     |
| 1500             | 64                     |
| 2500             | 128                    |
| 3500             | 192                    |
| 5000             | 256                    |

:::note

Queste sono stime conservative. Molti fattori influenzano l'utilizzo della memoria, come le dimensioni delle immagini, l'altitudine di volo e le impostazioni di elaborazione. Quindi potresti riuscire a elaborare più immagini con meno memoria rispetto a quanto riportato sopra.

:::

Una CPU con più core velocizzerà l'elaborazione, ma può aumentare l'utilizzo della memoria. L'accelerazione GPU è supportata anche su Linux e WSL. Per sfruttare la tua scheda grafica compatibile CUDA, assicurati di passare `--gpu` all'avvio di WebODM. In questo caso è necessario avere nvidia-docker installato, vedi https://github.com/NVIDIA/nvidia-docker e https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker per informazioni sulla configurazione docker/NVIDIA.

WebODM funziona al meglio su Linux, ma funziona bene anche su Windows e Mac.

WebODM di per sé è solo un'interfaccia utente e non richiede molte risorse. WebODM può essere caricato su un sistema con solo 1 o 2 GB di RAM e funzionare bene senza [NodeODX](https://github.com/WebODM/NodeODX). Puoi usare un servizio di elaborazione come [webodm.net](https://webodm.net) oppure eseguire NodeODX su un computer separato e più potente.
