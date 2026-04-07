---
title: Using Image Masks
---

People can supply image masks to inform the software to skip reconstruction over certain areas. This is useful for cases where the sky was accidentally included in the input photos from oblique shots, or simply to limit the reconstruction of a single subject.

To add a mask, simply create a new black and white image of the same dimension as the target image you want to mask (you can use a program such as GIMP to do this). Color in black the areas to exclude from the reconstruction.

![Target image](/images/target_image.webp)

![Image mask](/images/target_image_mask.webp)

![3D result with mask applied](/images/3D_result.webp)

Name your file:

`<filename>_mask.JPG`

For example, `DJI_0018.JPG` can have a mask by creating a `DJI_0018_mask.JPG` file and include that in the list of images. You can use `.JPG`, `.PNG`, `.BMP` and `.TIF` formats for image masks.
