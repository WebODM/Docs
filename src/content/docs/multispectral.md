---
title: Multispectral and Thermal
template: doc
---

## Multispectral Support

WebODM has support for radiometric normalization, which is able to generate reflectance orthophotos from multispectral cameras. Multispectral cameras capture multiple shots of the scene using different band sensors.

### Supported Sensors

While we aim to support as many cameras as possible, multispectral support has been developed using the following cameras, so they will work better:

- [MicaSense RedEdge-MX and Altum](https://www.micasense.com/)
- [Sentera 6X](https://sentera.com/products/fieldcapture/sensors/6x/)
- [DJI Phantom 4 Multispectral](https://www.dji.com/p4-multispectral)
- [DJI Mavic 3 Multispectral](https://ag.dji.com/mavic-3-m)

Other cameras might also work. You can help us expand this list by [sharing](https://webodm.org/community) datasets captured with other cameras.

### Creating Orthophotos from Multispectral Data

For supported sensors listed above (and likely other sensors), users can process multispectral data in the same manner as visible light images. Images from all sensor bands should be processed at once (do not separate the bands into multiple folders). Users have the option to pass the `--radiometric-calibration` parameter with options `camera` or `camera+sun` to enable radiometric normalization. If the images are part of a multi-camera setup, the resulting orthophoto will have N bands, one for each camera (+ alpha).

NDVI and other vegetation indices can be calculated from these stitched orthophotos using software such as [QGIS](https://www.qgis.org/).


## Thermal Support

WebODM has support for radiometric calibration of thermal data, which is able to generate temperature orthophotos from long-wave infrared (LWIR) cameras. LWIR images can be processed alone or as part of a multispectral dataset.

![Thermal imagery in WebODM](/images/thermal.webp)

### Hardware

While we aim to support as many cameras as possible, thermal support has been developed using the following cameras, so they will work better:

- [MicaSense Altum](https://www.micasense.com/)
- [DJI Zenmuse XT](https://www.dji.com/zenmuse-xt)
- [DJI Zenmuse H20 Series](https://enterprise.dji.com/zenmuse-h20-series)

These drones are also supported, but require pre-processing with 
[Thermal Tools](https://webodm.net/thermaltools):

 * Zenmuse H20N
 * Zenmuse H20 Series
 * Matrice 30 Series
 * Zenmuse XT S
 * Zenmuse H30 Series
 * Mavic 2 Enterprise Advanced
 * DJI Mavic 3 Enterprise
 * DJI Matrice 4 Series
 
Other cameras might also work. You can help us expand this list by [sharing](https://webodm.org/community) datasets captured with other cameras.

### Usage

:::note[For DJI drones only]

To get temperature values, preprocess the images with [Thermal Tools](https://webodm.net/thermaltools) before processing them with WebODM and use the standard settings (don't use `--radiometric-calibration`).

:::

Process the images using the `--radiometric-calibration camera` parameter to enable radiometric calibration.
