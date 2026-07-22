---
title: Uso di Singularity
template: doc
---

[Singularity](https://sylabs.io/) è un'altra piattaforma di container in grado di eseguire immagini Docker. Singularity può essere eseguito sia su computer locali sia in contesti in cui l'utente non dispone di accesso root. Tra i contesti in cui un utente potrebbe non avere privilegi di root vi sono i cluster HPC e le risorse di cluster in cloud. Un container è un singolo file, senza nient'altro da installare.

### Creare un'Immagine Singularity da un'Immagine Docker

Singularity può utilizzare un'immagine Docker per creare un'immagine SIF.

Per l'immagine Docker ODX più recente (consigliato):

```bash
singularity build --disable-cache -f odx_latest.sif docker://webodm/odx:latest
```

### Usare l'Immagine SIF di Singularity

Una volta utilizzato uno dei comandi sopra riportati per scaricare e creare l'immagine `odx_latest.sif`, questa può essere eseguita con singularity. Posizionare le proprie immagini in una directory denominata "images" (ad esempio `/my/project/images`), quindi eseguire semplicemente:

```bash
singularity run --bind /my/project:/datasets/code odx_latest.sif --project-path /datasets
```

Come con docker, è possibile aggiungere opzioni e flag aggiuntivi al comando:

```bash
singularity run --bind /my/project:/datasets/code \
  --writable-tmpfs odx_latest.sif \
  --orthophoto-png --mesh-octree-depth 12 --dtm \
  --smrf-threshold 0.4 --smrf-window 24 --dsm --pc-csv --pc-las --orthophoto-kmz \
  --matcher-type flann --feature-quality ultra --max-concurrency 16 \
  --use-hybrid-bundle-adjustment --build-overviews --time --min-num-features 10000 \
  --project-path /datasets
```

### ClusterODX, NodeODX, SLURM, con Singularity su HPC

Se si lavora su HPC, è possibile scrivere uno script SLURM per pianificare e configurare i nodi disponibili con NodeODX a cui collegare ClusterODX. L'uso di SLURM ridurrà il tempo e il numero di operazioni necessari per configurare ogni volta i nodi per ClusterODX.

Per configurare l'HPC con SLURM, è necessario assicurarsi che SLURM sia installato.

Lo script SLURM sarà diverso da cluster a cluster, a seconda dei nodi presenti nel cluster. Tuttavia, l'idea di fondo è eseguire NodeODX una volta su ciascun nodo e, per impostazione predefinita, ogni NodeODX sarà in esecuzione sulla porta 3000. Successivamente, eseguire ClusterODX sul nodo principale (head node) e collegare i NodeODX in esecuzione a ClusterODX.

Ecco un esempio di script SLURM che assegna i nodi 48, 50 e 51 all'esecuzione di NodeODX:

```bash
#!/usr/bin/bash
#SBATCH --partition=8core
#SBATCH --nodelist-node [48,50, 51]
#SBATCH --time 20:00:00

cd $HOME
cd ODX/NodeODX/

# Avvio sul nodo 48
srun --nodes-1 apptainer run --writable node/ &

# Avvio sul nodo 50
srun --nodes-1 apptainer run --writable node/ &

# Avvio sul nodo 51
srun --nodes=1 apptainer run --writable node/ &
wait
```

È possibile verificare i nodi disponibili con `sinfo`, eseguire lo script con `sbatch sample.slurm` e controllare i job in esecuzione con `squeue -u $USER`.

SLURM non gestisce l'assegnazione dei job al nodo principale, quindi eseguire ClusterODX localmente. Connettersi poi alla CLI e collegare i NodeODX a ClusterODX:

```bash
telnet localhost 8080
> NODE ADD node48 3000
> NODE ADD node50 3000
> NODE ADD node51 3000
> NODE LIST
```

È anche possibile pre-popolare i nodi utilizzando JSON. Se si avvia ClusterODX da apptainer o docker, il file JSON pertinente è disponibile in `docker/data/nodes.json`:

```json
[
    {"hostname":"node48","port":"3000","token":""},
    {"hostname":"node50","port":"3000","token":""},
    {"hostname":"node51","port":"3000","token":""}
]
```

Dopo aver avviato ClusterODX sul nodo principale e averlo collegato ai NodeODX, è possibile creare un tunnel per verificare che ClusterODX funzioni come previsto:

```bash
ssh -L localhost:10000:localhost:10000 user@hostname
```

Aprire un browser e connettersi a `http://localhost:10000` (la porta 10000 è quella su cui è ospitata l'interfaccia web amministrativa di ClusterODX).

Quindi creare un tunnel sulla porta 3000 per l'assegnazione dei task:

```bash
ssh -L localhost:3000:localhost:3000 user@hostname
```

Connettersi a `http://localhost:3000` per assegnare i task e osservare i processi.
