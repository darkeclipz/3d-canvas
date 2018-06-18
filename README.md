# Simple 3D to 2D projection

This example shows a 3D to 2D projection of a cube.

## What?

The basic idea is to have a bunch of vertices in 3D space. Those vertices are getting transformed from 3D to 2D. After the vertex coordinates have been transformed, it uses basic 2D drawing operations, such as drawing a line, to render the scene.

## How?

We need a simple camera, with position `(0, 0, -5)`, looking at `(0, 0, 0)`. Next, we iterate over every vertex and calculate `f=fov/z`. Now to find the 2D coordinates: `cx=x*f` and `cy=y*f`. A fov of `200` will work, but using `min(innerWidth, innerHeight)` gives a nicer image. Notice that there is no front or back, if you go through the cube, it just reappears. This is a very basic perspective projection.

## Live demo

[Check out the latest live demo.](https://darkeclipz.github.io/simple-3d-to-2d-projection)

More examples (previous versions):

 * [Single cube](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-single-cube.html)
 * [3x3 grid](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-3x3-grid.html)
 * [Faces](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-faces.html)
 * [Depth buffer + controls](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-depth-buffer.html)
 * [Cube surface](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-cube-surface.html)
 * [Wireframe](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-wireframe.html)

## Controls

The widget supports the following keys:

 * `W`, `A`, `S`, `D` to move around.
 * `E`, `Q` to go up/down.
 * Toggle the faces with `Z`.
 * Toggle the wireframe with `X`.
 * Toggle the vertices with `V`.
 * Toggle coordinates `C`.

 The angle of the camera can be changed with the mouse, _click on the canvas_ to lock the pointer.

 ## Improvements

 Things that can be improved:

  * Implement forward/backward: Add a ray class, and find the angle between the camera, and the object we are looking at. If the angle is within bounds, the object is visible and in front of us. Otherwise, the object is on the sides, or back, and we do not want to draw it.
 * The Y-axis is upside down, so the entire coordinate system is upside down.

## License

I hereby grant you to do whatever you want with it. There is no license.