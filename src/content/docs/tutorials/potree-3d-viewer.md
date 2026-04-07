---
title:  Using The 3D Viewer
---

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
