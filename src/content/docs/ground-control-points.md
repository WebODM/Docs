---
title: Ground Control Points
template: doc
---

Ground control points are useful for correcting distortions in the data and referencing the data to known coordinate systems.

A Ground Control Point (GCP) is a position measurement made on the ground, typically using a high precision GPS.

Ground control points can be set on existing structures like pavement corners, lines on a parking lot or contrasting color floor tiles, otherwise can be set using targets placed on the ground.

Targets can be purchased or built with an ample variety of materials ranging from bucket lids to floor tiles.

### Recommended Practices for GCP Setting

Keep ground control points visible for all camera locations. Consider the expected ground sampling distance, illumination, vegetation, buildings and all the existing obstacles.

Procure an evenly horizontal distribution of the GCPs within the project, covering high and low elevations. A minimum of 5 GCP works for most of the jobs, and for larger projects 8–10 are sufficient. Locate some points near the corners and others in the center, considering that GCP spacing should be larger than the image footprint so that you can't see more than one GCP in a single image.

In order to ensure GCPs are found in at least 5 images, separate the points 10 to 30 meters from the perimeter of the project. This distance is dependent on the overlap, so increasing overlap should reduce the required distance from the perimeter.

### GCP File Format

The format of the GCP file is simple.

- The first line should contain the name of the projection used for the geo coordinates. This can be specified either as a PROJ string (e.g. `+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`), EPSG code (e.g. `EPSG:4326`) or as a `WGS84 UTM <zone>[N|S]` value (e.g. `WGS84 UTM 16N`)
- Subsequent lines are the X, Y & Z coordinates, your associated pixels, the image filename and optional extra fields, separated by tabs or spaces
- Avoid setting elevation values to "NaN" to indicate no value. This can cause processing failures. Instead use 0.0
- Similarly decreasing the number of digits after the decimal place for `geo_x` and `geo_y` can also reduce processing failures
- The 7th column (optional) typically contains the label of the GCP

```
<projection>
geo_x geo_y geo_z im_x im_y filename [label] [extra1] [extra2]
...
```

Example:

```
+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs
544256.7 5320919.9 5 3044 2622 IMG_0525.jpg
544157.7 5320899.2 5 4193 1552 IMG_0585.jpg
544033.4 5320876.0 5 1606 2763 IMG_0690.jpg
```

:::note
 * The filename is case-sensitive. IMG_0001.jpg is not the same as IMG_0001.JPG.
 * The filename cannot contain spaces. Spaces can be encoded by using the %20 escape sequence. E.g. My Image.JPG should be referenced as My%20Image.JPG.
:::

If you supply a GCP file called `gcp_list.txt` then WebODM will automatically detect it. If you have a gcp file and want to do georeferencing with exif instead, then you can specify `--use-exif`. If you have high precision GPS measurements in your images (RTK) and want to use that information along with a gcp file, you can specify `--force-gps`.

It's important that you find high-contrast objects that are found in **at least** 3 photos, and that you find a minimum of 5 objects.

Sharp corners are good picks for GCPs. You should also place/find the GCPs evenly around your survey area.

The `gcp_list.txt` file must be created in the base of your project folder.

For good results your file should have a minimum of 15 lines after the header (5 points with 3 images to each point).

### Marking Checkpoints

Checkpoints are used for checking the accuracy of the reconstruction. They are left out from the reconstruction process and are instead used to measure the accuracy of the results at the end.

You can mark a checkpoint by labeling it with the prefix `CHK-`. For example:

```
+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs
544256.7 5320919.9 5 3044 2622 IMG_0525.jpg CHK-A
```


### User Interfaces

You can use one of two user interfaces for creating GCP files:

- [POSM GCPi](https://github.com/posm/posm-gcpi)
- [GCP Editor Pro](https://github.com/uav4geo/GCPEditorPro)

#### POSM GCPi

The POSM GCPi is loaded by default on WebODM. To use this with known ground control XYZ values, one would do the following:

Create a GCP list that only includes gcp name, x, y, and z, with a header with a proj4 string of your GCPs (make sure they are in a planar coordinate system, such as UTM). It should look something like this:

```
+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs
gcp01 529356.250827686 9251137.5643209 8.465
gcp02 530203.125367657 9250140.80991621 15.781
gcp03 530292.136003818 9250745.02372435 11.977
gcp04 530203.125367657 9250140.80991621 15.781
gcp05 530292.136003818 9250745.02372435 11.977
```

Then one can load this GCP list into the interface, load the images, and place each of the GCPs in the image.

#### GCP Editor Pro

:::tip[Did You Know?]

[GCP Editor Pro](https://gcp.uav4geo.com) is built by the developers of WebODM. Purchasing it directly supports the development of WebODM. ❤

:::

[GCP Editor Pro](https://gcp.uav4geo.com) needs to be purchased, but provides a smoother workflow compared to POSM GCPi.

To use it, create a CSV file that includes the GCP names, northing, easting and elevation.

```
GCP Label,Northing,Easting,Elevation
gcp01,529356.250827686,9251137.5643209,8.465
gcp02,530203.125367657,9250140.80991621,15.781
...
```

Then import the CSV from the main screen and type `+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs` in the `EPSG/PROJ` box. You can find a database of EPSG codes at https://epsg.io

The following screen will display a map from where to select the GCPs to tag and import the respective images.

## Map Accuracy

Accuracy can be defined as the degree or closeness to which the information on a map matches the values in the real world. Therefore, when we refer to accuracy, we are talking about quality of data and about number of errors contained in a certain dataset (Pascual 2011).

**Relative or Local accuracy**

Local or relative accuracy can be defined as the degree to which the distances between two points on a map correspond to the actual distances between those points in the real world.

Relative accuracy is independent of the location of the map in the world, so a map can have a high relative accuracy (in size and shape) but its position in the world can be shifted.

![Model showing high relative accuracy](/images/rel_accuracy.webp)

*Figure 1. Model showing high relative accuracy but misplaced according to its real world position*

**Absolute or Global Accuracy**

Absolute accuracy is the accuracy of the reconstruction in relation to its true position on the planet (Pix4D 2019). Figure 2 shows a relative and absolute accurate model, as the points are correctly placed according to its real world position.

![Model showing high absolute accuracy](/images/abs_accuracy.webp)

*Figure 2. Model showing high relative and absolute accuracy. Placed correctly according to its real world position*

**An Accuracy Level for Each Project**

Each project has specific accuracy needs to be met. For instance assessing the progress in a construction site or measuring an area affected by a fire does not require the use of GCP, since absolute accuracy will not impact the decision making process. On the other hand, there are tasks on which accuracy is critical, for example project compliance evaluations and land title surveying, which require a higher relative and absolute accuracy.

### What to Expect

In general terms, one can expect the relative accuracy to be in the order of 1 to 3 times the average GSD for the dataset. And as for the absolute accuracy, one must consider that it is dependent on the GPS unit mounted in the UAV but the horizontal accuracy of a standard GPS is usually in the range of 2 to 6 meters and the vertical accuracy between 3 to 4 times the horizontal accuracy.

When using GCP, absolute accuracy can be improved to 2.5 times GSD for the horizontal accuracy and 4 times the GSD for the vertical accuracy (Madawalagama 2016).

At a GSD of 1cm, the accuracy is to that of the RTK GNSS, and is within 1:200 scales according to NSDI & FGDC mapping accuracy standards during sub-optimal conditions (Barry 2013).

### Aspects Impacting Map Accuracy

**Weather** — Weather conditions have direct impact in the photogrammetry results, so it is important to consider cloud coverage, wind speed, humidity, sun's altitude and other factors influencing the UAV stability and terrain illumination.

**Cameras** — Bigger and better sensors produce less noise and more clearly focused images. Also consider that rolling shutter cameras produce distorted images when the UAV is moving, so global or mechanical shutter cameras are advised for mapping jobs.

**Flight altitude** — The higher the flight altitude, the larger the image footprint and GSD. The resulting larger GSD the accuracy will be decreased as there will be less detail in the recognizable features. When a smaller GSD is required an altitude of 3 to 4 times the height of the highest point is recommended.

**Flight speed** — Flight speed has special effect in cameras equipped with rolling shutter, while those equipped with global or mechanical shutter tend to reduce this effect. UAV equipped with RTK positioning systems are also affected with the speed, but with hover at each photo taken, you can get very good accuracy. If instead you are moving during each photo take, the accuracy is going to be limited by two factors: the speed at which you are moving multiplied by the 1 second increments of RTK (Mather 2020).

## Improving Relative Accuracy

Georeferencing by default is done using GPS (GNSS) or GCPs (if provided).

WebODM can also align two tasks. When that happens, the reconstruction will be initially performed using GPS/GCPs and will subsequently be aligned to the reference model via a linear scaling/rotation/shift operation.

### Multi-temporal Datasets

When previously mapped sites need revisited, WebODM can align multiple versions of a dataset through time by using a prior point cloud or digital elevation model. 

**Workflow for multi-temporal datasets:**

1. Process your original data. This step doesn't require a ground control point file, but use one if absolute accuracy is a project requirement
2. Upload another dataset that aligns with the previous one and look for the **Align** option, then select the original task.

### Aligning Large Datasets

When attempting to process very large datasets it may be the case that one needs to divide a large set of images into smaller more manageable chunks for ease of processing. This process, however, may introduce some uncertainty with respect to the alignment of all the processed outputs. To make sure that all point clouds and terrain/surface models are seamlessly aligned in preparation for merging we follow the simple techniques outlined below.

## Image Geolocation Files

By default WebODM will use the GPS information embedded in the images, if it is available. Sometimes images do not contain GPS information, or a user wishes to override the information with more accurate data (such as RTK).

You can also use a geolocation file to specify GPS centroids of images.

The format of the image geolocation file is simple.

- The first line should contain the name of the projection used for the geo coordinates. This can be specified either as a PROJ string (e.g. `+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`), EPSG code (e.g. `EPSG:4326`) or as a `WGS84 UTM <zone>[N|S]` value (e.g. `WGS84 UTM 16N`)
- Subsequent lines are the image filename, X, Y & Z (optional) coordinates, the camera angles (optional, currently used only for radiometric calibration) and the horizontal/vertical accuracy (optional)
- Camera angles can be set to `0` if they are not available
- The 10th column (optional) can contain extra fields, such as a label

```
<projection>
filename geo_x geo_y [geo_z] [yaw (degrees)] [pitch (degrees)] [roll (degrees)] [horz accuracy (meters)] [vert accuracy (meters)] [extras...]
...
```

Example:

```
EPSG:4326
DJI_0028.JPG    -91.9942096111111   46.84252125 198.609
DJI_0032.JPG    -91.9938293055556   46.8424584444444    198.609
```

If you supply a file called `geo.txt` then WebODM will automatically detect it. If it has another name you can specify using `--geo <path>`.

The `geo.txt` file must be created in the base of your project folder or when using WebODM, uploaded with the raw jpg or tif input files.

## References

- Barry, P., & Coakley, R. ["Accuracy of UAV photogrammetry compared with Network RTK GPS."](http://uav.ie/PDF/Accuracy_UAV_compare_RTK_GPS.pdf) Baseline Surveys. 2013.
- Drone Deploy. [How Do I Use Ground Control Points?: A guide to using ground control points with drone mapping software.](https://www.dronedeploy.com/blog/what-are-ground-control-points-gcps/) 2017.
- Madawalagama, S.L., Munasinghe, N., Dampegama, S.D.P.J. and Samarakoon, L. "Low-cost aerial mapping with consumer grade." 37th Asian Conference on Remote Sensing. Colombo, Sri Lanka, 2016.
- Mather, Stephen. [OpenDroneMap.](https://community.opendronemap.org/t/the-accuracy-of-webodm-using-rtk-uavs/3937) 2020.
- Pascual, Manuel S. [GIS Lounge: GIS Data: A Look at Accuracy, Precision, and Types of Errors.](https://www.gislounge.com/gis-data-a-look-at-accuracy-precision-and-types-of-errors/) 2011.
- Pix4D. ["What is accuracy in an aerial mapping project?"](https://www.pix4d.com/blog/accuracy-aerial-mapping) 2019.