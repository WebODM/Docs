---
title: Grandi Set di Dati
template: doc
---

Puoi suddividere dataset molto grandi in porzioni gestibili (chiamate sottomodelli), eseguire il software su ciascuna porzione e quindi produrre DEM, ortofoto e nuvole di punti uniti. Il processo è chiamato "split-merge".

Perché potresti usare la pipeline split-merge? Se hai un numero molto elevato di immagini nel tuo dataset, split-merge aiuterà a rendere l'elaborazione più gestibile su un sistema di grandi dimensioni (richiederà meno memoria). Se hai molti computer tutti connessi alla stessa rete, puoi anche elaborare i sottomodelli in parallelo, consentendo così la scalabilità orizzontale e l'elaborazione di migliaia di immagini più rapidamente.

Split-merge funziona in WebODM senza configurazioni aggiuntive, purché i nodi di elaborazione supportino split-merge, abilitando l'opzione `--split` quando si crea un nuovo task.

## Split-Merge Locale

Suddividere un dataset in sottomodelli più gestibili ed elaborare in sequenza tutti i sottomodelli sullo stesso computer è facile! Basta usare `--split` e `--split-overlap` per decidere rispettivamente il numero medio di immagini per sottomodello e la sovrapposizione (in metri) tra i sottomodelli:

```bash
docker run -ti --rm -v /my/project:/datasets/code webodm/odx --project-path /datasets --split 400 --split-overlap 100
```

Se sai già come vuoi suddividere il dataset, puoi fornire quell'informazione e verrà usata al posto dell'algoritmo di clustering.

Il raggruppamento può essere fornito aggiungendo un file chiamato `image_groups.txt` nella cartella principale del dataset. Il file deve avere una riga per immagine. Ogni riga deve contenere due parole: prima il nome dell'immagine e poi il nome del gruppo a cui appartiene. Per esempio:

```
01.jpg A
02.jpg A
03.jpg B
04.jpg B
05.jpg C
```

creerà 3 sottomodelli. Assicurati di passare `--split-overlap 0` se fornisci manualmente un file `image_groups.txt`.

## Split-Merge Distribuito

WebODM può anche distribuire automaticamente l'elaborazione di ogni sottomodello su più computer tramite nodi [NodeODX](https://github.com/WebODM/NodeODX), orchestrati tramite [ClusterODX](https://github.com/WebODM/ClusterODX).

![ClusterODX](/images/ClusterODX.webp)

### Primi Passi con lo Split-Merge Distribuito

Il primo passo è avviare ClusterODX:

```bash
docker run -ti -p 3001:3000 -p 8080:8080 webodm/clusterodx
```

Poi, su ogni computer che vuoi usare per l'elaborazione, avvia un'istanza di NodeODX tramite:

```bash
docker run -ti -p 3000:3000 webodm/nodeodx
```

Connettiti via telnet a ClusterODX e aggiungi gli indirizzi IP/porta dei computer che eseguono NodeODX:

```bash
$ telnet <cluster-odm-ip> 8080
Connected to <cluster-odm-ip>.
Escape character is '^]'.
[...]
# node add <node-odx-ip-1> 3000
# node add <node-odx-ip-2> 3000
[...]
# node list
1) <node-odx-ip-1>:3000 [online] [0/2] <version 1.5.1>
2) <node-odx-ip-2>:3000 [online] [0/2] <version 1.5.1>
```

A questo punto, usa semplicemente l'opzione `--sm-cluster` per abilitare lo split-merge distribuito.

### Comprendere il Cluster

Quando si è connessi via telnet, è possibile interrogare ciò che sta accadendo sul cluster. Per esempio, possiamo usare il comando HELP per scoprire i comandi disponibili:

```
# HELP
NODE ADD <hostname> <port> [token] - Add new node
NODE DEL <node number> - Remove a node
NODE INFO <node number> - View node info
NODE LIST - List nodes
NODE LOCK <node number> - Stop forwarding tasks to this node
NODE UNLOCK <node number> - Resume forwarding tasks to this node
NODE UPDATE - Update all nodes info
NODE BEST <number of images> - Show best node for the number of images
ROUTE INFO <taskId> - Find route information for task
ROUTE LIST [node number] - List routes
TASK LIST [node number] - List tasks
TASK INFO <taskId> - View task info
TASK OUTPUT <taskId> [lines] - View task output
TASK CANCEL <taskId> - Cancel task
TASK REMOVE <taskId> - Remove task
ASR VIEWCMD <number of images> - View command used to create a machine
!! - Repeat last command
```

Se l'istanza di NodeODX non era attiva quando ClusterODX è stato avviato, puoi eseguire un `NODE UPDATE`:

```
# NODE UPDATE
OK
# NODE LIST
1) localhost:3000 [online] [0/2] <version 1.5.3> [L]
```

### Accedere ai Log

Mentre un processo è in esecuzione, è anche possibile elencare i task e visualizzare l'output del task:

```
# TASK LIST
# TASK OUTPUT <taskId> [lines]
```

### Autoscaling di ClusterODX

ClusterODX include anche la possibilità di effettuare l'autoscaling su più piattaforme, tra cui Amazon e Digital Ocean. Questo consente agli utenti di ridurre i costi associati alle istanze sempre attive, oltre a poter scalare l'elaborazione in base alla domanda.

Per configurare l'autoscaling devi:

- Avere una versione funzionante di NodeJS installata e quindi installare ClusterODX:

```bash
git clone https://github.com/WebODM/ClusterODX
cd ClusterODX
npm install
```

- Assicurarti che docker-machine sia installato.
- Configurare un bucket compatibile S3 per l'archiviazione dei risultati.
- Creare un file di configurazione per [DigitalOcean](https://github.com/WebODM/ClusterODX/blob/master/docs/digitalocean.md) o [Amazon Web Services](https://github.com/WebODM/ClusterODX/blob/master/docs/aws.md).

Puoi quindi avviare ClusterODX con:

```bash
node index.js --asr configuration.json
```

Dovresti vedere nella console qualcosa di simile ai seguenti messaggi:

```
info: ASR: DigitalOceanAsrProvider
info: Can write to S3
info: Found docker-machine executable
```

Dovresti sempre avere almeno un nodo NodeODX statico collegato a ClusterODX, anche se prevedi di usare l'autoscaler per tutta l'elaborazione. Se configuri l'autoscaling, non puoi avere zero nodi e affidarti al 100% all'autoscaler. Devi collegare un nodo NodeODX che funga da "nodo di riferimento", altrimenti ClusterODX non saprà come gestire determinate richieste. A questo scopo, dovresti aggiungere un nodo NodeODX "fittizio" e bloccarlo:

```bash
telnet localhost 8080
> NODE ADD localhost 3001
> NODE LOCK 1
> NODE LIST
1) localhost:3001 [online] [0/2] <version 1.5.1> [L]
```

In questo modo tutti i task verranno inoltrati automaticamente all'autoscaler.

## Limitazioni

Le mesh 3D texturizzate attualmente non vengono unite come parte del flusso di lavoro (vengono unite solo nuvole di punti, DEM e ortofoto).

I GCP sono pienamente supportati; tuttavia, devono esserci almeno 3 punti GCP su ogni sottomodello affinché la georeferenziazione abbia luogo. Se un sottomodello ha meno di 3 GCP, verrà usata al loro posto una combinazione dei GCP rimanenti + dati EXIF (che risulterà meno accurata). Raccomandiamo di usare il file `image_groups.txt` per controllare con precisione la suddivisione dei sottomodelli quando si usano i GCP.

## Stimare lo Sforzo di Raccolta Dati

I dataset più grandi possono essere raccolti con UAV specializzati ad ala fissa, UAV a decollo e atterraggio verticale (VTOL), e raccolti in modo piuttosto efficiente in determinate condizioni. In molti casi, tuttavia, siamo vincolati a effettuare la raccolta dati con quadricotteri di uso comune. In questi casi, una domanda frequente riguarda il tempo di raccolta dati in condizioni ideali con attrezzatura di uso comune.

### Sforzo di Raccolta Dati, 3D Completo

Per risultati di prima classe con ricostruzione 3D completa e risoluzione di 5 cm, è fattibile raccogliere 1–2 km² per persona, al giorno. Questo richiede il seguente insieme di voli:

- volo nadirale con sovrapposizione del 60%
- griglia incrociata con angolo del gimbal a 45 gradi e sovrapposizione del 70-80%

Il volo a griglia incrociata a 45 gradi fornisce la base per un modello completamente collegato, mentre i voli nadirali forniscono la texture necessaria per la texturizzazione dell'ortofoto. La sovrapposizione più bassa soddisfa il requisito minimo per i prodotti ortofoto, agevolata dal feature matching reso possibile dalla griglia incrociata a sovrapposizione molto più elevata.

### Sforzo di Raccolta Dati, Prodotti 2D e 2.5D

Per risultati di prima classe per prodotti 2D e 2.5D e risoluzione di 5 cm, è fattibile raccogliere 2–4 km² per persona, al giorno. Questo richiede il seguente insieme di voli:

- sovrapposizione del 70-80% leggermente fuori nadir (5-10 gradi fuori nadir)

Per edifici e vegetazione più complessi, punta a una sovrapposizione più vicina all'80%. Se edifici, vegetazione e variazioni del terreno non sono complessi, è del tutto fattibile usare una sovrapposizione più vicina al 70%.

*(credito: derivato da conversazioni in corso con Ivan Gayton, Humanitarian OpenStreetMap Team)*

## Riconoscimenti

Un enorme ringraziamento a Pau, Yann e al team di Mapillary per i loro straordinari contributi a OpenSfM, che è un componente chiave della pipeline split-merge.
