# WebODM  Processing Parameter Selection Guide

This guide helps you choose the most appropriate WebODM processing parameters based on your drone, survey characteristics, and expected outputs.
Please note: this guide is not perfect; finding the right parameters is not always a deterministic process—more often than not, it is an art that transcends algorithms.
---
# Step 1 - Hardware Analysis

## Does your drone use a Global Shutter or a Rolling Shutter?

### If you are using a consumer drone (DJI Mini, DJI Air, Mavic, etc.)

**Recommended setting**
- `rolling-shutter: true`
**Why?**
Rolling shutter sensors introduce geometric distortion when images are captured while the drone is moving.
**Best practice**
For future surveys, if possible:
- reduce the flight speed;
- use **Stop-and-Hover** mode when taking photographs.
---
## Does your drone support RTK positioning?
### If the survey was performed using RTK
Check the image EXIF metadata for fields such as:
- `drone-dji:RtkStdLon`
- `drone-dji:RtkStdLat`
- `drone-dji:RtkStdHgt`

**Recommended setting**
Use the actual positioning accuracy reported by the camera:
```text
gps-accuracy: <value from EXIF>
```

---

# Step 2 - Survey Characteristics

## Was the flight performed at constant altitude with a nadir camera?

If the terrain is mostly flat:

**Recommended setting**
```text
sfm-algorithm: planar
```
### Benefits
- 5–10× faster initial reconstruction
- Lower memory consumption

---

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
bg-removal
```
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
min-num-features: 10000
```

### Effect
- increases the number of detectable feature points;
- improves reconstruction robustness;
- increases processing time.

---

## Does the project include buildings or vertical structures?
**Recommended settings**
```text
use-3dmesh: true
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

#### Use planar reconstruction when applicable ( planar nadir flight )

```text
sfm-algorithm: planar
```

Recommended for:

- flat terrain;
- roads;
- agricultural areas;
- large homogeneous surfaces.

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

Recent versions of ODX already generate Cloud Optimized GeoTIFFs (COGs), which normally include internal overviews.

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

# Step 7 - Accuracy Verification

## Are Ground Control Points (GCPs) available?

To obtain an independent accuracy assessment:

1. Select some control points as checkpoints.
2. Prefix their names with:

```text
CHK-
```

Checkpoint observations:

- do not influence the bundle adjustment;
- are used exclusively to compute independent accuracy statistics in the **Quality Report**.



---

# Quick Reference

| Situation | Recommended Parameter |
|------------|----------------------|
| Consumer drone | `rolling-shutter: true` |
| RTK drone | `gps-accuracy` |
| RTK + GCP | `force-gps: true` |
| Flat nadir survey | `sfm-algorithm: planar` |
| Images include sky | `sky-removal: true` |
| Dense vegetation | `min-num-features: 10000` |
| Urban survey | `use-3dmesh: true` |
| Better building edges | `pc-quality: high` |
| Very low GSD | `ignore-gsd: true` |
| Generate DTM | `dtm: true` |
| Fast orthophoto | `fast-orthophoto: true` |
| Blender export | `gltf: true` |
| Cesium export | `3d-tiles: true` |
| Accuracy validation | `CHK-` checkpoints |
