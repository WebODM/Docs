---
title: Flying Tips
template: doc
---

## Data Collection Effort, Full 3D

For best in class results with full 3D reconstruction, we recommend the following:

- 60% overlap nadir flight
- 70-80% overlap 45-degree gimbal angle cross-grid

The 45-degree cross-grid flight provides the basis for a fully tied together model, while the nadir flights provide the necessary texture for orthophoto texturing. The lower overlap meets the minimum requirement for orthophoto products as facilitated by feature matching from the much higher overlap cross-grid.

## Data Collection Effort, 2D and 2.5D Products

For best in class results for 2D and 2.5D products, we recommend the following:

- 70-80% overlap slightly off-nadir (5-10 degree off nadir)

For more complex buildings and vegetation, aim for closer to 80-83% overlap. If buildings, vegetation, and terrain changes are not complex, it's quite feasible to use closer to 70% overlap.

*(credit: derived from ongoing conversations with Ivan Gayton, Humanitarian OpenStreetMap Team)*

## Other Resources on Flying

The [Humanitarian OpenStreetMap team](https://www.hotosm.org/) has guidelines on [flying for UAV mapping](https://uav-guidelines.openaerialmap.org/):

- [Choosing the right UAV](https://uav-guidelines.openaerialmap.org/pages/05-choosing-the-right-uav/)
- [Choosing the right sensor](https://uav-guidelines.openaerialmap.org/pages/06-choosing-the-sensor/)
- [Mission preparation](https://uav-guidelines.openaerialmap.org/pages/07-preparing-for-the-uav-mission/)

The guidelines are intended for drone mapping projects on islands, but have general use for all drone mappers.

See also WebODM Lightning's guide on [Making Successful Maps](https://docs.webodm.net/references/create-successful-maps).

Finally, lens distortion is a challenge in projects requiring accurate 3D data. See our section on [Calibrating the Camera](/tutorials/calibrating-the-camera/).
