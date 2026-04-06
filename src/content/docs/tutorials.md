---
title: Tutorials
template: doc
---

Below you will find instructions for some common use cases.

## Creating High Quality Orthophotos

![Orthophoto](/images/orthophoto.webp)

Without any parameter tweaks, WebODM chooses a good compromise between quality, speed and memory usage. If you want to get higher quality results, you need to tweak some parameters:

- `--orthophoto-resolution` is the resolution of the orthophoto in cm/pixel. Decrease this value for a higher resolution result.

- `--texturing-data-term` should be set to `area` in forest areas.

- `--mesh-size` should be increased to `300000-600000` and `--mesh-octree-depth` should be increased to `10-11` in urban areas to recreate better buildings / roofs.

## Creating Digital Elevation Models

By default WebODM does not create digital elevation models (DEMs). To create a digital terrain model, make sure to pass the `--dtm` flag. To create a digital surface model, be sure to pass the `--dsm` flag.

![Digital surface model](/images/digitalsurfacemodel.webp)

For DTM generation, a Simple Morphological Filter (smrf) is used to classify points in ground vs. non-ground and only the ground points are used. The `smrf` filter can be controlled via several parameters:

- `--smrf-scalar` scaling value. Increase this parameter for terrains with lots of height variation.
- `--smrf-slope` slope parameter, which is a measure of "slope tolerance". Increase this parameter for terrains with lots of height variation. Should be set to something higher than 0.1 and not higher than 1.2.
- `--smrf-threshold` elevation threshold. Set this parameter to the minimum height (in meters) that you expect non-ground objects to be.
- `--smrf-window` window radius parameter (in meters) that corresponds to the size of the largest feature (building, trees, etc.) to be removed. Should be set to a value higher than 10.

Changing these options can affect the result of DTMs significantly. The best source to read to understand how the parameters affect the output is to read the original paper [An improved simple morphological filter for the terrain classification of airborne LIDAR data](https://www.researchgate.net/publication/258333806_An_Improved_Simple_Morphological_Filter_for_the_Terrain_Classification_of_Airborne_LIDAR_Data).

Overall the `--smrf-threshold` option has the biggest impact on results.

SMRF is good at avoiding Type I errors (small number of ground points mistakenly classified as non-ground) but only "acceptable" at avoiding Type II errors (large number non-ground points mistakenly classified as ground). This needs to be taken in consideration when generating DTMs that are meant to be used visually, since objects mistaken for ground look like artifacts in the final DTM.

![SMRF filter](/images/smrf.webp)

Two other important parameters affect DEM generation:

- `--dem-resolution` which sets the output resolution of the DEM raster (cm/pixel)
- `--dem-gapfill-steps` which determines the number of progressive DEM layers to use. For urban scenes increasing this value to `4-5` can help produce better interpolation results in the areas that are left empty by the SMRF filter.

Example of how to generate a DTM:

```bash
docker run -ti --rm -v /my/project:/datasets/code <my_odm_image> --project-path /datasets --dtm --dem-resolution 2 --smrf-threshold 0.4 --smrf-window 24
```

## Using Potree 3D Viewer Module on WebODM

### Cameras

Activate this function to display camera positions.

You can also click in the camera icon to display single images in a frame on the upper right corner. A click on the image frame toggles into full screen mode.

Within the image frame there are links to download the image and the GeoJSON camera file.

![Camera locations](/images/cameras.webp)

### Textured Model

Activate this function to show load the textured model. Depending on the file size and connection speed, it may take several seconds to load.

![Textured model](/images/texturedmodel.webp)

### Appearance

#### Point Budget

For both appearance and performance purposes, the point budget on the scene can be managed. Some old and less capable machines would benefit from a 500,000 point budget while most mid-range specs machine are capable of handling 1 to 2 million point budget.

A 5 to 7 million point budget produces a smooth point cloud 3d model, but may result in a high resource demanding process.

Default point budget value is set to 1,000,000.

#### Field of View

In order to control model elements to be included within the scene the field of view can be adjusted. Default value is set to 60 degrees.

![Field of view adjustment](/images/FOV_animation.webp)

#### Eye Dome-lighting

The Potree Point Cloud 3d viewer module can implement eye dome-lighting, a lighting model that accentuates the shapes of objects.

Eye Dome-lighting group objects, shade their outlines and enhances depth perception in scientific visualization images. It is useful for recognition and measurement of structures within a model. It can be modified by adjusting Radius, Strength and Opacity.

By default, Eye Dome-Lighting is enabled on Potree 3D viewer, but it can be disabled by clicking on the enable option.

![Eye dome lighting adjustment](/images/EDL_animation.webp)

#### Background

Potree 3D viewer background can be modified. Available options are **Skybox** / **Gradient** / **Black** / **White** / **None**

![Background selection](/images/Background_animation.webp)

#### Other

**Splat Quality** — Splat quality can be adjusted to standard or high quality, to improve the appearance of the model.

**Min node size** — Min node size option will impact the point density of the nodes represented.

**Box** — Display the boxes of the nodes.

**Lock view** — Lock the point cloud view, preventing to load or unload points to the model.

### Tools

#### Measurement

Potree 3D viewer module provides several tools for measurement. This tool set consist of 12 elements. It also has controls for showing or hiding the resulting measurement labels.

Measurements are performed by left clicking on the desired points and for some tools right clicking is needed in order to terminate the process.

![Measurement tools](/images/measurement.webp)

**Angle** — This tool measures the tridimensional angle formed by the lines connecting 3 points. To start a measurement, click on the angle icon, then left click on 3 point and the process will be automatically ended. Further information can also be obtained from selecting this element under the scene section.

**Point** — This tool highlights a selected point and display its XYZ coordinate. To start a measurement, click on the point icon, then click on the desired point and the process will be automatically ended. Further information can also be obtained from selecting this element under the scene section.

**Distance** — This tool measures the tridimensional distance of the lines connecting a series of points. To start a measurement, click on the distance icon and start clicking on the desired points (two or more). Right click to finish measurement. Further information such as Total length can also be obtained from selecting this element under the scene section.

**Height** — This tool measures the height or vertical distance between two points. To start a measurement, click on the height icon and then click on the desired two points. The process will be automatically ended. Further information can also be obtained from selecting this element under the scene section.

![Height measurement](/images/height_animation.webp)

**Circle** — This tool measures the radius of a circle formed by three points. To start a measurement, click on the circle icon and then click on the desired two points. The process will be automatically ended. Further information such as Circumference can also be obtained from selecting this element under the scene section.

**Azimuth** — This tool measures the azimuthal angle of a line. This line is formed by two points selected by the user, the angle is measured in degrees, clockwise from 0 to 360 and starting from the geographical north. To start a measurement, click on the azimuth icon and then click on the desired two points. The process will be automatically ended. Further information can also be obtained from selecting this element under the scene section.

**Area** — This tool measures the horizontal area formed by a polygon. To start a measurement, click on the area icon and start clicking on the points forming the desired polygon (three or more). Right click to finish measurement. Further information can also be obtained from selecting this element under the scene section.

**Volume (cube)** — This tool measures the volume formed by a cube. To start a measurement, click on the volume (cube) icon and click on the model to place the cube. It is possible relocate, redimension and rotate the cube using the displayed handlers. Right click to finish measurement. Further information can also be obtained from selecting this element under the scene section.

**Volume (sphere)** — This tool measures the volume formed by a sphere. To start a measurement, click on the volume (sphere) icon and click on the model to place the sphere. It is possible relocate, redimension and rotate the sphere using the displayed handlers. Right click to finish measurement. Further information can also be obtained from selecting this element under the scene section.

**Height profile** — This tool creates a height profile formed by a line on the model. To start a measurement, click on the Height profile icon and then form a line on the model by clicking on the desired points (two or more). Right click to finish measurement. Further information and options, such as "Show 2d Profile", can also been obtained from selecting this element under the scene section.

![Height profile](/images/height_profile.webp)

**Annotation** — This tool creates an annotation label on a highlighted point on the model. To start a measurement, click on the annotation icon and then click on the desired point. The process will be automatically ended. To edit the annotation, select this element under the scene section, then edit Title and Description.

**Remove measurements** — This tool removes all measurements on the model. To remove all measurement, click on the "Remove measurements" icon.

#### Clipping

![Clipping tools](/images/clipping.webp)

Point cloud can be clipped by selecting an area. Clipping options include **None** / **Highlight** / **Inside** / **Outside**

To clip a point cloud, click on the volume clip icon, place the cube on the model and relocate, redimension and rotate to contain the desired area. Highlight is set by default as the clipping method. If display only the points contained within the cube click on "Inside", otherwise click on "Outside".

To remove the clipping volume or polygons click on the "Remove all measurements" icon.

![Clipping](/images/clipping_animation.webp)

#### Navigation

![Navigation controls](/images/navigation.webp)

Potree 3D viewer have 4 Navigation controls which define its behavior.

**Earth Control** — Earth control navigated as anchored to the ground. Mouse left button moves the model horizontally, mouse wheel controls zoom and right button orbits the model.

**Fly control** — Fly control moves the camera as in birds eye using the keyboard. Keys "W" and "S" moves forward and backwards, respectively and in the direction of the camera, while "A" and "D" moves left and right respectively. Also, the "R" and "F" keys moves the camera up and down. The mouse left button changes the direction of the camera, mouse wheel controls zoom, and right button moves the camera in the XYZ axis. The speed for these movements can be controlled using the sliding control.

**Helicopter control** — Helicopter control moves the camera as in an aircraft using the keyboard. Keys "W" and "S" moves forward and backwards, respectively restricted in a horizontal plane, while "A" and "D" moves left and right respectively. Also, the "R" and "F" keys moves the camera up and down. The mouse left button changes the direction of the camera, mouse wheel controls zoom, and right button moves the model in the XY axis. The speed for these movements can be controlled using the sliding control.

**Orbit Control** — Orbit Control is the default navigation behavior. The mouse left button orbits the model, the wheel controls zoom and the right button moves the model in the XYZ axis.

**Full extent** — Full extent button restores the model view.

**Navigation cube** — Navigation cube displays a wireframe cube containing the model.

**Compass** — Compass button displays a compass on the upper right corner.

**Camera animation** — The camera animation button creates a camera animation path. Position of the camera is defined by the points on the green line while the points in the blue line are the location towards the camera is intended to be facing. To create an animation, adjust the points for the camera locations and camera direction, then select the camera element under the Scene section to create more point, change animation speed or play the animation.

![Camera animation](/images/camera_animation.webp)

### Scene

The Scene section displays a file tree containing all the scene elements. Elements are arranged in six groups, which are **Point clouds** / **Measurements** / **Annotations** / **Other** / **Vector** / **Images**

Each element under these groups can be selected to get further information or to control its properties.

For instance, point clouds properties can be modified to show elevation and also the color ramp can be customized.

![Point cloud elevation](/images/pointcloud_elevation.webp)

## Measuring Stockpile Volume

### Fieldwork Planning

Weather conditions modify illumination and thus impact the photography results. Best results are obtained with evenly overcast or clear skies. Also look for low wind speeds that allow the camera to remain stable during the data collection process.

In order to avoid shadows which on one side of the stockpile can obstruct feature detection and lessen the number of resulting points, always prefer the flights during the midday, when the sun is at the nadir so everything is consistently illuminated.

Also ensure that your naked eye horizontal visibility distance is congruent with the planned flight distances for the specific project, so image quality is not adversely impacted by dust, fog, smoke, volcanic ash or pollution.

### Flight Pattern

Most stockpile measurement jobs does not require a crosshatch pattern or angled gimbal as the resting angle of stockpile materials allows the camera to capture the entire stockpile sides. Only some special cases where erosion or machinery operations causes steep angles on the faces of the stockpile would benefit of the crosshatch flight pattern and angled camera gimbal but consider that these additional recognized features come at a cost, (in field labor and processing time) and the resulting improvements are sometimes negligible.

In most of the cases a lawn mower flight pattern is capable of producing highly accurate stockpile models.

![Lawnmower flight pattern](/images/lawnmower_pattern.webp)

Recommended overlap would be between 75% and 80% with a sidelap in the order of 65% to 70%. It is also recommended to slightly increase overlap and sidelap as the flight height is increased.

### Flight Height

Flight height can be influenced by different camera models, but in a general way and in order to ensure a balance between image quality and flight optimization, it is recommended to be executed at heights 3 to 4 times the tallest stockpile height. So for a 10 meter stockpile, images can be captured at a height of 40 meters.

As the flight height is increased, it is also recommended to increase overlap, so for a 40 meter height flight you can set a 65% sidelap and 75% overlap, but for a planned height of 80 meters a 70% sidelap and 80% overlap allowing features to be recognized and properly processed.

### GCPs

To achieve accuracy levels better than 3%, the use of GCP's is advised. Typically 5 distributed GCP are sufficient to ensure accurate results. When placing or measuring GCP, equipment accuracy should be greater than the GSD. Survey grade GNSS and total stations are intended to provide the required millimetric accuracy.

For further information on the use of GCPs, please refer to the [Ground Control Points section](/ground-control-points/).

### Processing Parameters

A highly accurate model can be achieved using WebODM high resolution predefined settings. Then you can further adjust some parameters as necessary.

These reference values can help you configure the process settings:

- `--dsm`: true
- `--dem-resolution`: 2.0
- `--orthophoto-resolution`: 1.0
- `--feature-quality`: high
- `--pc-quality`: high

### Measuring

As almost 50% of the material will be found in the first 20% of the stockpile height, special care should be taken in adequately defining the base plane.

![Stockpile height distribution](/images/stockpile.webp)

In WebODM Dashboard, click on "view map" to start a 2D view of your project.

Once in the 2D map view, click on the "Measure volume, area and length" button.

![Measure volume button](/images/measurement1.webp)

Then click on "Create a new measurement".

![Create a new measurement](/images/measurement2.webp)

Start placing the points to define the stockpile base plane.

![Define the stockpile base plane](/images/measurement3.webp)

Click on "Finish measurement" to finish the process.

![Finish measurement](/images/measurement4.webp)

Dialog box will show the message "Computing ..." for a few seconds, and after the computing is finished the volume measurement value will be displayed.

![Volume measurement result](/images/measurement7.webp)

If you are using the command line you can use the dsm files to measure the stockpile volumes using other programs.

Also consider that once the limits of the stockpile are set in software like [QGIS](https://www.qgis.org), you will find there are some ways to determine the base plane. So for isolated stockpiles which boundaries are mostly visible, a linear approach can be used. While for stockpiles set in slopes or in bins, the base plane is better defined by the lowest point. Creation of a triangulated 3D surface to define the base plane is advised for large stockpiles. This is also valid for stockpiles placed on irregular surfaces.

### Expected Accuracy

For carefully planned and executed projects, and specially when GSD is less than 1 cm, the expected accuracy should be in the range of 1% to 2%. The resulting accuracy is comparable to the commercially available photogrammetry software and the obtained using survey grade GNSS equipment.

## Using Docker

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

## Using Podman

As an alternative to Docker, one may choose to run WebODM using [Podman](https://podman.io). To do so, simply install your distribution's podman package as well as its compatibility layer for docker. For example, on Alpine Linux:

```bash
apk add podman podman-docker
```

The Podman command line bears strong resemblance to the Docker one, so referring to the past section and replacing every `docker` command invocation with `podman` is likely sufficient to teach its basic use.

### Migrating from Docker to Podman

Unfortunately, given the number of options `webodm.sh` provides for deployment, migrating between the two may require some manual work before switching platforms. If WebODM's information was stored in directories using the `--media-dir` and `--db-dir` flags, then the data within those needs to be owned by the user running the Podman containers. If running rootlessly, be sure to set this to your current user. You should be safe to recursively chown the whole git repository as such if your `media-dir` and `db-dir` lives within it:

```bash
sudo chown -R $(whoami) WebODM
```

If `webodm.sh` was used without flags, then a different intervention is necessary to migrate their data.

```bash
docker volume export webodm-dbdata > webodm-dbdata.tar
docker volume export webodm-appmedia > webodm-appmedia.tar
```

Regardless of data location, you'll now need to uninstall Docker completely from your system according to your operating system's documentation. Note that, by default, the `webodm.sh` script may have taken the liberty of installing docker-compose for you. To clean that up, run the following:

```bash
rm ~/.docker/cni-plugins-docker-compose
```

Now, install Podman according to your operating system's documentation. If you needed to export the media and db dirs from Docker before, you may now use it to import the volumes.

```bash
podman volume import webodm-dbdata webodm-dbdata.tar
podman volume import webodm-appmedia webodm-appmedia.tar
```

It is recommended that you log out and log back in to your system at this point to ensure all environment variables are properly sourced.

Running `webodm.sh` now should result in user data persisting between the switch.

### For Versions of podman-compose < 1.5.0

podman-compose versions lower than 1.5.0 lack support for environment variables in docker-compose files. If your distribution does not provide an up to date version in its repositories, you can choose to either provide your own up-to-date binary or use [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually) with podman itself. In either case, you'll need to update the compose_providers line of the `/etc/containers/containers.conf` file.

If you choose to use Docker Compose instead of podman-compose, you might need to configure a few extra environment variables to tell WebODM where to send its Docker API requests to. The following environment configuration resulted in WebODM successfully spawning in Alpine Linux 3.22, though it should be fairly agnostic across distros.

```bash
export WEBODM_PODMAN_SOCKET=$(podman info --format '{{.Host.RemoteSocket.Path}}')
mkdir -p $(dirname WEBODM_PODMAN_SOCKET)
export DOCKER_HOST=unix://$WEBODM_PODMAN_SOCKET
```

Finally, start WebODM as such:

```bash
podman system service --time=0 unix://$WEBODM_PODMAN_SOCKET & ./webodm.sh start
```

### Configuring Podman to Run Rootlessly

A major benefit of using Podman instead of Docker is due to its ability to run rootlessly. Your specific operating system may or may not configure this for you manually, but generic instructions on doing so can be found [in Podman's official documentation](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode). To surmise, executing the following commands is likely what you'll need to do:

```bash
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
```

### macOS

In theory, [installing](https://podman-desktop.io/docs/installation/macos-install) and running Podman Desktop from the official website should be all you need to use the `webodm.sh` script. Install and configure it for both [Docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/customizing-docker-compatibility#enable-docker-compatibility) and [Compose functionality](https://podman-desktop.io/docs/compose/setting-up-compose).

## Calibrating the Camera

Camera calibration is a special challenge with commodity cameras. Temperature changes, vibrations, focus, and other factors can affect the derived parameters with substantial effects on resulting data. Automatic or self calibration is possible and desirable with drone flights, but depending on the flight pattern, automatic calibration may not remove all distortion from the resulting products. James and Robson (2014) in their paper [Mitigating systematic error in topographic models derived from UAV and ground‐based image networks](https://onlinelibrary.wiley.com/doi/full/10.1002/esp.3609) address how to minimize the distortion from self-calibration.

![Bowling effect on point cloud](/images/msimbasi_bowling.webp)

*Bowling effect on point cloud over 13,000+ image dataset collected by World Bank Tanzania over the flood prone Msimbasi Basin, Dar es Salaam, Tanzania.*

To mitigate this effect, there are a few options but the simplest are as follows: fly two patterns separated by 20°, and rather than having a nadir (straight down pointing) camera, use one that tilts forward by 5°.

![Optimum flight planning](/images/flightplanning.webp)

As this approach takes longer than traditional imaging, pilots and teams may apply this technique to a smaller area and use the collected data to optimize future flights. WebODM can generate a calibration file called cameras.json from a small sample flight. The calibration file can be used for future flights, mitigating the bowling effect without sacrificing efficiency.

Alternatively, the following experimental method can be applied: fly with much lower overlap, but two *crossgrid* flights (sometimes called crosshatch) separated by 20° with a 5° forward facing camera.

- Crossgrid overlap percentages can be lower than parallel flights. To get good 3D results, you will require 68% overlap and sidelap for an equivalent 83% overlap and sidelap.
- To get good 2D and 2.5D (digital elevation model) results, you will require 42% overlap and sidelap for an equivalent 70% overlap and sidelap.

![Experimental rotation method](/images/rotation.webp)

Vertically separated flight lines also improve accuracy, but less so than a camera that is forward facing by 5°.

![Effect of vertically separated flight lines](/images/forward_facing.webp)

*From James and Robson (2014), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)*

## Using Image Masks

Starting from WebODM `2.0` people can supply image masks to inform the software to skip reconstruction over certain areas. This is useful for cases where the sky was accidentally included in the input photos from oblique shots, or simply to limit the reconstruction of a single subject.

To add a mask, simply create a new black and white image of the same dimension as the target image you want to mask (you can use a program such as GIMP to do this). Color in black the areas to exclude from the reconstruction.

![Target image](/images/target_image.webp)

![Image mask](/images/target_image_mask.webp)

![3D result with mask applied](/images/3D_result.webp)

Name your file:

`<filename>_mask.JPG`

For example, `DJI_0018.JPG` can have a mask by creating a `DJI_0018_mask.JPG` file and include that in the list of images. You can use `.JPG`, `.PNG`, `.BMP` and `.TIF` formats for image masks.

## Using Singularity

[Singularity](https://sylabs.io/) is another container platform able to run Docker images. Singularity can be run both on local machines and in instances where the user does not have root access. Instances where a user may not have root privileges include HPC clusters and cloud cluster resources. A container is a single file without anything else to install.

### Build Singularity Image from Docker Image

Singularity can use Docker image to build SIF image.

For latest WebODM Docker image (Recommended):

```bash
singularity build --disable-cache -f odm_latest.sif docker://webodm/odm:latest
```

For latest WebODM GPU Docker image:

```bash
singularity build --disable-cache -f odm_gpu.sif docker://webodm/odm:gpu
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

## Development and Testing of ODM

Development and testing of code changes can be difficult. The simplest way to do so is modify the code and rebuild docker images from source, much as documented in the [README for the WebODM repository](https://github.com/WebODM/ODM?tab=readme-ov-file#build-docker-images-from-source).

However, having to do a full docker rebuild for each change is time consuming and wasteful. What might be better is to have a dedicated, long running node that allows us to test out changes in near real time.

### Fork and Clone Repository

First, let's fork the WebODM repo, and checkout a new branch locally that will function as our development branch.

```bash
git checkout -b my_clever_new_change
# Switched to a new branch 'my_clever_new_change'
```

### Set Up Local NodeODM Docker Instance

Next, we will set up a NodeODM instance with a locally mounted volume that points to our development branch of ODM:

```bash
docker run -d --restart unless-stopped -p 3000:3000 -v /path/to/cloned/ODM/repository/data:/code webodm/nodeodm
```

### Modify Code

For our test today, we will attempt to upgrade Ceres Solver to version 2.2.0. Most external libraries like Ceres can be found in the Superbuild directory. In this case we edit `SuperBuild/cmake/External-Ceres.cmake`, and set it to use version 2.2.0.

![Vimdiff showing Ceres change](/images/vimdiff_ceres_change.webp)

Now that we've made that small, but substantive change, we need to rebuild Ceres on the docker image for testing.

### Connect to NodeODM Instance

Let us find out our container name:

```
docker ps
CONTAINER ID   IMAGE                        COMMAND                  CREATED         STATUS         PORTS                                       NAMES
c997a4c5611b   webodm/nodeodm         "/usr/bin/node /var/…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   affectionate_yalow
```

Now connect to that instance:

```bash
docker exec -it affectionate_yalow bash
```

### Install and Use Changes

Get the environment prepared for testing:

```bash
root@c997a4c5611b:/var/www# cd /code
./configure.sh install
mkdir /code/SuperBuild/build
cd /code/SuperBuild/build
```

Next rebuild Ceres:

```bash
cmake ../.
make -j$(nproc) ceres
```

Success! Now we can either run WebODM directly inside this container, use the NodeODM interface to process data, or connect in with WebODM for additional testing.
