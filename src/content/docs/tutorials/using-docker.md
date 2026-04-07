---
title: Using Docker
---

Since many users employ docker to deploy WebODM, it can be useful to understand some basic commands in order to interrogate the docker instances when things go wrong, or we are curious about what is happening. Docker is a containerized environment intended, among other things, to make it easier to deploy software independent of the local environment. In this way, it is similar to virtual machines.

### Listing Docker Machines

We can start by listing available docker machines on the current machine we are running as follows:

```
> docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
2518817537ce        webodm/odm       "bash"                   36 hours ago        Up 36 hours                                  zen_wright
1cdc7fadf688        webodm/nodeodm   "/usr/bin/nodejs /va…"   37 hours ago        Up 37 hours         0.0.0.0:3000->3000/tcp   flamboyant_dhawan
```

If we want to see machines that may not be running but still exist, we can add the `-a` flag:

```
> docker ps -a
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS                    PORTS                    NAMES
2518817537ce        webodm/odm       "bash"                   36 hours ago        Up 36 hours                                        zen_wright
1cdc7fadf688        webodm/nodeodm   "/usr/bin/nodejs /va…"   37 hours ago        Up 37 hours               0.0.0.0:3000->3000/tcp   flamboyant_dhawan
cd7b9585b8f6        webodm/odm       "bash"                   3 days ago          Exited (1) 37 hours ago                            nostalgic_lederberg
e31010c00b9a        webodm/odm       "python /code/run.py…"   3 days ago          Exited (2) 3 days ago                              suspicious_kepler
c44e0d0b8448        webodm/nodeodm   "/usr/bin/nodejs /va…"   3 days ago          Exited (0) 37 hours ago                            wonderful_burnell
```

### Accessing Logs on the Instance

Using either the `CONTAINER ID` or the name, we can access any logs available on the machine as follows:

```bash
docker logs 2518817537ce
```

This is likely to be unwieldy large, but we can use a pipe `|` character and other tools to extract just what we need from the logs. For example we can move through the log slowly using the `more` command:

```
> docker logs 2518817537ce | more
[INFO]    DTM is turned on, automatically turning on point cloud classification
[INFO]    Initializing ODM app - Mon Sep 23 01:30:33  2019
[INFO]    ==============
[INFO]    build_overviews: False
[INFO]    camera_lens: auto
[INFO]    crop: 3
[INFO]    debug: False
[INFO]    dem_decimation: 1
[INFO]    dem_euclidean_map: False
...
```

Pressing `Enter` or `Space`, arrow keys or `Page Up` or `Page Down` keys will now help us navigate through the logs. The lower case letter `Q` will let us escape back to the command line.

We can also extract just the end of the logs using the `tail` command as follows:

```
> docker logs 2518817537ce | tail -5
[INFO]    Cropping /datasets/code/odm_orthophoto/odm_orthophoto.tif
[INFO]    running gdalwarp -cutline /datasets/code/odm_georeferencing/odm_georeferenced_model.bounds.gpkg ...
Using band 4 of source image as alpha.
Creating output file that is 111567P x 137473L.
Processing input file /datasets/code/odm_orthophoto/odm_orthophoto.original.tif.
```

The value `-5` tells the tail command to give us just the last 5 lines of the logs.

### Command Line Access to Instances

Sometimes we need to go a little deeper in our exploration of the process for OpenDroneMap. For this, we can get direct command line access to the machines using `docker exec`:

```bash
> docker exec -ti 2518817537ce bash
root@2518817537ce:/code#
```

Now we are logged into our docker instance and can explore the machine.

### Cleaning Up After Docker

Docker has a lamentable use of space and by default does not clean up excess data and machines when processes are complete. This can be advantageous if we need to access a process that has since terminated, but carries the burden of using increasing amounts of storage over time. Maciej Łebkowski has an [excellent overview of how to manage excess disk usage in docker](https://lebkowski.name/docker-volumes/).
