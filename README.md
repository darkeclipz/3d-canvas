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
 * [Wireframe](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-wireframe.html)
 * [Cube surface](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-cube-surface.html)
 * [Clipping (removes weird artifacts)](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-clipping.html)
 * [Weird bug](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-weird-bug.html)
 * [Surface mesh](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-surface-mesh.html)
 * [Multivariable functions](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-multivariable-functions.html) (Paste `functions.push({f: function(x,y) { return x*y; }, equation:"x*y"})` to create a new function.)
 * [Surface mesh edges + faces](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-surface-mesh-faces.html)
 * [Light](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-light.html)
 * [Colors](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-colors.html)

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
  * Implement a better clipping algorithm. A mesh should not be displayed if _all of the points_ are outside of bounds.

## API

Documentation for the API's in the render engine.

### Rendering

Console commands to control the rendering.

  * `pause()` to halt rendering.
  * `resume()` to resume rendering.

### Modes

To toggle rendering modes. Called before the main render loop.

  * `toggleFaces()` render the faces.
  * `toggleWireframe()` render the wireframe.
  * `toggleCoordinates()` render the coordinates (only for small meshes).
  * `toggleVertices()` render the vertices.
  * `toggleLightning()` render the lightning (if there are any lights).

### Meshes

A mesh holds all the vertices, edges, and faces. More importantly, it enables us to perform maths on an entire mesh (all the vertices at once).

  * `meshes` holds all the meshes that are rendered, `push` a `Mesh` to render it.
    * A mesh has `vertices`, `edges`, and `faces`.
    * A mesh supports the following operations: `scale(scalar)`, `translate(vec3)`, `vmult(vec3)`, `rotateY(angle)`, `applyToY(f(x,y))`, `faceColor(c)`.
    * A face supports the following operations: `center(mesh.vertices)`.


A cube mesh can be created with `generateCubeMesh`, and a surface with `generateSurfaceMesh(width,height)`.

It is possible to create a `MeshGroup` and add meshes to `meshes`. It is useful to create a giant mesh from multiple objects, and be able to transform them with: `scale`, `translate`, `vmult`, and `rotateY`.

### Lights

List that holds all the lights that are rendered in the scene. The distance from a face to the light will be calculated. The color from the face is mixed with the color from the light. It requires `toggleLightning()` to render.

  * `lights` holds all the lights in the scene, `push` a `Light` to render it.

### Render loop

Initializing the renderer goes like:

 1. Initialize settings.
 2. Toggle display modes.
 2. Move camera.
 3. Add meshes.
 4. Add lights. 
 5. Call `render()`.

The main rendering algorithm is:

1. Handle keys
2. Apply movement
3. Animate meshes
4. Fill a depth buffer with the distance from a face to the camera.
5. Sort the depth buffer.
6. Draw the faces (furthest first).
7. Transform and clip coordinates.
  1. Find the distance from the face to the light source.
  2. Mix the color from the face and the light source based on the distance.
8. Draw the wireframe.
  0. Transform and clip coordinates.
9. Draw the vertices.
  0. Transform and clip coordinates.
  1. Draw the UI with coordinates.
10. Draw UI text.
11. Set timeout for next pass.

 It also handles a `mouseCallback` for mouse movement.

## License

I hereby grant you to do whatever you want with it. There is no license.