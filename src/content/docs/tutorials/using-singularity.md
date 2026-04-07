---
title: Using Singularity
---

[Singularity](https://sylabs.io/) is another container platform able to run Docker images. Singularity can be run both on local machines and in instances where the user does not have root access. Instances where a user may not have root privileges include HPC clusters and cloud cluster resources. A container is a single file without anything else to install.

### Build Singularity Image from Docker Image

Singularity can use Docker image to build SIF image.

For latest ODM Docker image (Recommended):

```bash
singularity build --disable-cache -f odm_latest.sif docker://webodm/odm:latest
```

### Using Singularity SIF Image

Once you have used one of the above commands to download and create the `odm_latest.sif` image, it can be ran using singularity. Place your images in a directory named "images" (for example `/my/project/images`), then simply run:

```bash
singularity run --bind /my/project:/datasets/code odm_latest.sif --project-path /datasets
```

Like with docker, additional options and flags can be added to the command:

```bash
singularity run --bind /my/project:/datasets/code \
  --writable-tmpfs odm_latest.sif \
  --orthophoto-png --mesh-octree-depth 12 --dtm \
  --smrf-threshold 0.4 --smrf-window 24 --dsm --pc-csv --pc-las --orthophoto-kmz \
  --matcher-type flann --feature-quality ultra --max-concurrency 16 \
  --use-hybrid-bundle-adjustment --build-overviews --time --min-num-features 10000 \
  --project-path /datasets
```

### ClusterODM, NodeODM, SLURM, with Singularity on HPC

You can write a SLURM script to schedule and set up available nodes with NodeODM for ClusterODM to be wired to if you are on the HPC. Using SLURM will decrease the amount of time and processes needed to set up nodes for ClusterODM each time.

To setup HPC with SLURM, you must make sure SLURM is installed.

SLURM script will be different from cluster to cluster, depending on which nodes in the cluster that you have. However, the main idea is to run NodeODM on each node once, and by default, each NodeODM will be running on port 3000. After that, run ClusterODM on the head node and connect the running NodeODMs to the ClusterODM.

Here is an example of a SLURM script assigning nodes 48, 50, 51 to run NodeODM:

```bash
#!/usr/bin/bash
#SBATCH --partition=8core
#SBATCH --nodelist-node [48,50, 51]
#SBATCH --time 20:00:00

cd $HOME
cd ODM/NodeODM/

# Launch on Node 48
srun --nodes-1 apptainer run --writable node/ &

# Launch on node 50
srun --nodes-1 apptainer run --writable node/ &

# Launch on node 51
srun --nodes=1 apptainer run --writable node/ &
wait
```

You can check for available nodes using `sinfo`, run the script with `sbatch sample.slurm`, and check running jobs with `squeue -u $USER`.

SLURM does not handle assigning jobs to the head node, so run ClusterODM locally. Then connect to the CLI and wire the NodeODMs to ClusterODM:

```bash
telnet localhost 8080
> NODE ADD node48 3000
> NODE ADD node50 3000
> NODE ADD node51 3000
> NODE LIST
```

It is also possible to pre-populate nodes using JSON. If starting ClusterODM from apptainer or docker, the relevant JSON is available at `docker/data/nodes.json`:

```json
[
    {"hostname":"node48","port":"3000","token":""},
    {"hostname":"node50","port":"3000","token":""},
    {"hostname":"node51","port":"3000","token":""}
]
```

After hosting ClusterODM on the head node and wiring it to NodeODM, you can tunnel to see if ClusterODM works as expected:

```bash
ssh -L localhost:10000:localhost:10000 user@hostname
```

Open a browser and connect to `http://localhost:10000` (port 10000 is where ClusterODM's administrative web interface is hosted).

Then tunnel port 3000 for task assignment:

```bash
ssh -L localhost:3000:localhost:3000 user@hostname
```

Connect to `http://localhost:3000` to assign tasks and observe processes.
