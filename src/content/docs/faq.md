---
title: Frequently Asked Questions
template: doc
---

## The software is not using all of my CPU cores / memory / GPU all of the times. Is it normal?

Yes. The software tries to use all available resources, when possible, but not always. It’s normal to see 10-15% CPU utilization at several moments during processing and 0% GPU utilization for lots of times.

## Where Are My Files Stored?

When using Docker, all processing results are stored in a docker volume and are not available on the host filesystem. There are two specific docker volumes of interest:
1. Media (called webodm_appmedia): This is where all files related to a project and task are stored.
2. Postgres DB (called webodm_dbdata): This is what Postgres database uses to store its data.

For more information on how these two volumes are used and in which containers, please refer to the [docker-compose.yml](docker-compose.yml) file.

For various reasons such as ease of backup/restore, if you want to store your files on the host filesystem instead of a docker volume, you need to pass a path via the `--media-dir` and/or the `--db-dir` options:

```bash
./webodm.sh restart --media-dir /home/user/webodm_data --db-dir /home/user/webodm_db
```

Note that existing task results will not be available after the change. Refer to the [Migrate Data Volumes](https://docs.docker.com/engine/tutorials/dockervolumes/#backup-restore-or-migrate-data-volumes) section of the Docker documentation for information on migrating existing task results.

## Can I process two or more orthophoto GeoTIFFs to stitch them together?

No. WebODM is a photogrammetric software and orthophotos do not have the necessary camera information since the images have already been orthorectified. You can use this [QGIS plugin](https://github.com/uav4geo/QRasterMerge) to do that.

## If I use the native version of the software, how can I allocate more resources for processing?

No need; the native (non-docker) version of the software already uses all available resources.

## I want to build a commercial application that includes WebODM. Do I need a commercial license?

WebODM is free and open source software, released under the [AGPLv3](https://github.com/WebODM/WebODM/blob/master/LICENSE.md). You are free to build and sell applications with it, just make sure to comply with the requirements of the license, in particular the disclose source requirement and to follow our [trademark guidelines](https://github.com/WebODM/WebODM/blob/master/TRADEMARK.md).

## Are there other licensing options aside from the AGPLv3?

Nope, sorry!

## Your computer is running out of memory, what can you do?

1. First you can buy more RAM, this is the ultimate and final solution.
2. Alternatively you can resize the images when uploading and/or tweak your quality settings.
3. Configure a swapfile. In both Windows and Linux you will need preferably a fast SSD or an NVME drive, and the computing process will be still a LOT slower.

   - If you are using Windows with [Docker+WSL2](https://docs.docker.com/desktop/windows/wsl/) you can add two rows in your .wslconfig file so that Docker will use a swapfile. See also the full Microsoft documentation on [Advanced settings configuration in WSL](https://docs.microsoft.com/en-us/windows/wsl/wsl-config).

     ```
     swap=128GB
     swapfile=C:\temp\wsl-swap.vhdx
     ```

   - In Linux you can add a swap file or a partition dedicated to swap. For more information, please consult your search engine of choice as there are a lot of different distributions and methods to add swap.

