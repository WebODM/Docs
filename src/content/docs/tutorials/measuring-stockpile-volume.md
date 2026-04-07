---
title: Measuring Stockpiles
---

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
