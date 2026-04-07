---
title: Creating High Quality Orthophotos
---

![Orthophoto](/images/orthophoto.webp)

Without any parameter tweaks, WebODM chooses a good compromise between quality, speed and memory usage. If you want to get higher quality results, you need to tweak some parameters:

- `--orthophoto-resolution` is the resolution of the orthophoto in cm/pixel. Decrease this value for a higher resolution result.

- `--mesh-size` should be increased to `300000-600000` and `--mesh-octree-depth` should be increased to `10-11` in urban areas to recreate better buildings / roofs.
