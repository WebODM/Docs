---
title: Options Selection Guide
template: doc
---

This guide helps you choose the most appropriate WebODM processing parameters based on your drone, survey characteristics, and expected outputs.
Please note: this guide is not perfect; finding the right parameters is not always a deterministic process—more often than not, it is an art that transcends algorithms.

---
# Step 1 - Hardware Analysis

## Does your drone use a Global Shutter or a Rolling Shutter?

### If you are using a consumer drone (DJI Mini, DJI Air, Mavic, etc.)

**Recommended setting**
- `rolling-shutter: true`
**Why?**
Rolling shutter sensors introduce geometric distortion when images are captured while the drone is moving ('doming' effect: the ground appears unnaturally arched).
**Best practice**
For future surveys, if possible:
- reduce the flight speed;
- use **Stop-and-Hover** mode when taking photographs.


## Rolling-shutter is on but you notice 'doming' effects (where the ground appears unnaturally arched) and want to maximize the precision of the camera positioning?

 Enable use-hybrid-bundle-adjustment. This increases the frequency of global and local optimization cycles during the SFM phase

## Do you have a pre-existing, precise calibration file for your lens, or do you want to force the software to trust the focal data in your photo metadata without further optimization?

Enable use-fixed-camera-params. This prevents the software from attempting to auto-calibrate the optical parameters 


## Are you using a multispectral or thermal sensor (e.g., for precision agriculture or temperature analysis)?
### if yes

- File Selection: Ensure you upload all image files for all available bands for each capture simultaneously.
- Processing Preset: Select the "Multispectral" preset, which already includes specific parameters such as radiometric calibration.
- Radiometric Calibration (`radiometric-calibration`): Set to "camera" or "camera+sun" (if the drone has a DLS incident light sensor) to convert raw pixel values ​​into reflectance or, for LWIR sensors, into degrees Celsius.
- Data Preservation (`texturing-skip-global-seam-leveling`): Enable this option (set to "true") to prevent the software from applying global color balancing, which would alter the purity of the radiometric data required for scientific analysis.
- Band Alignment (`skip-band-alignment`): Leave this option disabled so that WebODM can correct minor geometric misalignments between the multispectral camera's different physical sensors.
- Primary Band Selection (`primary-band`): By default, the software selects the band with the lowest index, but you can force the use of a specific band (e.g., NIR or Red-Edge) for SfM reconstruction if the automatic choice does not yield satisfactory results.

#### Output Analysis

Once the process is complete, use the "Plant Health" tab in the map view to apply algorithms like NDVI, or the "Thermal" tab to view heat maps.


---

# Step 2 - Survey Characteristics

## Do you want the software to automatically restrict the reconstruction to the specific perimeter where the drone photos were taken, avoiding unnecessary background processing?

### If yes
Enable auto-boundary. This creates a polygon around camera positions to limit the reconstruction area. You can refine the width of this boundary using auto-boundary-distance
```text
auto-boundary: true
```

## Do the images include the sky or horizon?
### If yes
**Recommended setting**
```text
sky-removal: true
```
### Benefits
- Less reconstruction noise
- Cleaner point cloud
- Better mesh quality

## For close-range object reconstruction
Use:
```text
bg-removal:true
```

## Are you processing image frames extracted from a video file?

### Video Parameters
- video-limit: Defines the maximum number of frames to extract from the video. The default value is 500. Increasing this value can improve coverage, but it also proportionally increases processing time and memory (RAM) usage.
- video-resolution: Sets the resolution (in pixels) of the extracted frames. For example, if a 4K video (3840×2160) is processed with this parameter set to 2000, the extracted frames will have a resolution of 2000×1125 pixels.
###  Matching Optimization
matcher-order: Perform image matching with the nearest N images based on image filename order. Can speed up processing of sequential images, such as those extracted from video. It is applied only on non-georeferenced datasets. 

This is a key parameter when processing videos. Since the extracted frames are sequential, forcing the software to match images based only on their temporal order (for example, by setting a  low value of 10 or 20) prevents every frame from being compared with all the others, saving hours of unnecessary computation.

### Geolocation (GPS) 
**'.srt' File**: If you are using a DJI drone, the video is often accompanied by a subtitle file with the **same name** (for example, video.mp4 and video.srt). If you upload both files, WebODM will use the .srt file to extract GPS data and correctly associate it with the extracted frames.

## Important Notes
- Resize Images: The standard Resize Images option available in the task settings does not affect video files. To reduce the size of the frames extracted from a video, you must use the video-resolution parameter described above.

- Quality: WebODM automatically filters out frames that are too dark or blurry during extraction to improve the quality of the final reconstruction.
- Restart: If you change video-limit or video-resolution and want to restart the processing workflow, you will need to start again from the Load Dataset stage.

- If you need to display the video on the map as supporting documentation (without processing it for photogrammetry), you can upload it using the Media button associated with an existing completed task







---
# Step 3 - Surveyed Scene
## Does the area contain vegetation or low-texture surfaces?
Examples:
- forests
- grasslands
- agricultural fields
- sand
- snow

**Recommended setting**
```text
min-num-features: 20000
```

### Effect
- increases the number of detectable feature points;
- improves reconstruction robustness;
- increases processing time.

---

## Does the project include buildings or vertical structures?
**Recommended settings**
```text
pc-quality: high
```

### Benefits
- More accurate orthophotos
- Better reconstruction of vertical walls
- Sharper building edges



---

# Step 4 - Ground Sampling Distance (GSD)
## Do you need to preserve the camera's full native resolution?
When flying very low (GSD below approximately 2 cm), WebODM may automatically reduce the processing resolution.
To disable this optimization:

```text
ignore-gsd: true
```

### Warning
This significantly increases:
- RAM usage
- Disk space
- Processing time

---

# Step 5 - Desired Output
## Priority: Detailed 3D Mesh
Main parameter:
```text
mesh-octree-depth
```
Recommended values:
| Scenario | Value |
|----------|------:|
| Flat terrain | 6–8 |
| General purpose | 11 |
| Complex architecture | 12 |

If increasing this value, also increase:
```text
mesh-size
```

to avoid excessive mesh simplification.

### Do you need a 3D mesh that is geometrically complete even in areas 'unseen' by the cameras (closed faces without color)?
Enable `texturing-keep-unseen-faces`.

---

## Priority: Digital Terrain Model (DTM)

Enable:
```text
dtm: true
```
Adjust these parameters:
| Parameter | Recommendation |
|-----------|----------------|
| `smrf-slope` | 0.1 for flat terrain, up to 1.2 for mountainous terrain |
| `smrf-threshold` | Minimum object height to remove |

### Do you have an extremely dense point cloud and want to speed up DSM/DTM generation by simplifying the source data?
Use `dem-decimation`. For example, a value of 50 tells the software to use only 2% of the points, significantly reducing file writing times

### Does your orthophoto or DEM have jagged edges or 'dragging' artifacts at the borders that you want to trim away cleanly?

 Set the `crop` parameter (in meters) to shrink the final boundary and remove interpolation artifacts.

### Does your terrain model have 'holes' (areas without data) that you want to fill more accurately using multiple interpolation passes?

Increase the `dem-gapfill-steps` to control the number of iterations the algorithm uses to fill empty cells.

---



## Priority: Fast Processing
Enable:
```text
fast-orthophoto: true
```

### Effect

Skips dense MVS reconstruction and generates the orthophoto directly from the sparse point cloud.

---

## Priority: Very Fast Processing

When the main goal is to obtain a result as quickly as possible (for example during emergency response, rapid assessment, field verification, or preliminary analysis), apply the following optimizations.

### Flight planning recommendations

The fastest processing starts with an optimized acquisition strategy:

- Perform a **planar nadir flight** whenever possible.
- Maintain a constant altitude above ground.
- Use regular image spacing and consistent overlap.
- Avoid unnecessary oblique images if a 2D orthophoto is the primary goal.
- Avoid capturing large areas outside the survey boundary.
- Use a slower and more stable flight path when using rolling shutter cameras.

---

### Recommended WebODM settings

#### Use fast orthophoto generation

```text
fast-orthophoto: true
```

Generates the orthophoto without performing the complete dense reconstruction phase.

---

#### Reduce image resolution during processing

```text
resize-to: 2048
```

or a lower value depending on the required output quality.

Benefits:

- significantly reduced processing time;
- lower RAM consumption;
- faster feature matching.

---

#### Disable unnecessary outputs

Generate only the products required for the task.

Avoid producing:
- dense point cloud (the most important!)
```text
fast-orthophoto: true
```

- textured 3D mesh;
```text
skip-3dmodel: true
```
- (if unnecessary) DEM products.
```text
dsm: false
dtm: false
```

- report
```text
skip-report:true
```


Example:

- Emergency mapping → Orthophoto only
- Preliminary inspection → Orthophoto + low-resolution DSM
- Final survey → Full processing workflow

---

#### Reduce point cloud density
(only if you need the point cloud)
Use:

```text
pc-quality: low
```

or

```text
pc-quality: medium
```

when a detailed 3D model is not required.

Benefits:

- faster reconstruction;
- lower disk usage.

---

#### Limit mesh generation

If a mesh is not required:

```text
mesh: false
```

Avoiding mesh generation can save a significant amount of processing time.

---

### Additional operational recommendations

For maximum speed:

1. Upload only the required images.
2. Remove blurred or duplicated images before processing.
3. Avoid images with large amounts of sky or irrelevant background.
4. Use an area-based workflow instead of processing very large datasets at once.
5. Split very large surveys into smaller independent blocks when possible.
6. Use local processing hardware with GPU acceleration when available.

---
# Step 6 - Target Software

## QGIS

Enable:

```text
build-overviews: true
```

### Note

Recent versions of ODX already generate Cloud Optimized GeoTIFFs (COGs) if you use the `--cog` option, which already include internal overviews.

---

## Blender

Enable:

```text
texturing-single-material: true
gltf: true
```

### Benefits

- Easier import
- Single texture material
- Modern compressed 3D format

---

## Cesium or Web Visualization

Enable:

```text
3d-tiles: true
```

This generates optimized 3D Tiles suitable for web streaming.

---

# Step 7 - Accuracy Verification / Alignment and Multitemporal Surveys

##  Are Ground Control Points (GCPs) available?

To obtain an independent accuracy assessment:

1. Select some control points as checkpoints.
2. Prefix their names with:

```text
CHK-
```

Checkpoint observations:

- do not influence the bundle adjustment;
- are used exclusively to compute independent accuracy statistics in the **Quality Report**.


## Are you conducting a follow-up survey of an area processed previously, and do you need the new model (point cloud or DTM) to align perfectly with the old one?

    Action: Use the align parameter. In the WebODM interface, select the reference task from the "Alignment" field. This instructs the software to ignore the original GPS/GCP data of the new survey and anchor it geometrically to the existing reconstruction.



---

# Quick Reference

| Situation | Recommended Parameter |
|------------|----------------------|
| Consumer drone | `rolling-shutter: true` |
| RTK drone | `gps-accuracy` |
| RTK + GCP | `force-gps: true` |
| Images include sky | `sky-removal: true` |
| Dense vegetation | `min-num-features: 20000` |
| Better building edges | `pc-quality: high` |
| Very low GSD | `ignore-gsd: true` |
| Generate DTM | `dtm: true` |
| Fast orthophoto | `fast-orthophoto: true` |
| Blender export | `gltf: true` |
| Cesium export | `3d-tiles: true` |
| Accuracy validation | `CHK-` checkpoints |
