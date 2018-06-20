# Simple 3D to 2D projection

This example shows a 3D to 2D projection of a cube. Update: it became a simple 3D render engine in canvas.

## What?

The basic idea is to have a bunch of vertices in 3D space. Those vertices are getting transformed from 3D to 2D. After the vertex coordinates have been transformed, it uses basic 2D drawing operations, such as drawing a line, to render the scene.

## How?

I have written a [small explanation for the perspective projection](https://darkeclipz.github.io/simple-3d-to-2d-projection/simple-perspective-projection.html).

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
 * [requestAnimationFrame](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-request-animation-frame.html) (Improved FPS)
 * [STL loader](https://darkeclipz.github.io/simple-3d-to-2d-projection/demo-stl-loader.html) (+ improved lightning)

## Controls

The widget supports the following keys:

 * `W`, `A`, `S`, `D` to move around.
 * `E`, `Q` to go up/down.
 * Toggle the faces with `Z`.
 * Toggle the wireframe with `X`.
 * Toggle the vertices with `V`.
 * Toggle coordinates with `C`, only works for small meshes.
 * Toggle UI with `U`.

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
  * `mouseSensitivity` to change the mouse sensitivity, default is `500`.
  * `camera.fov` to change the fov, default is `min(innerWidth, innerHeight)`.
  * `wireframeThickness` to change the wireframe thickness, default is `1`.
  * `verbose` is a bool to display debug logging.

### Modes

To toggle rendering modes. Called before the main render loop.

  * `toggleFaces()` render the faces.
  * `toggleWireframe()` render the wireframe.
  * `toggleCoordinates()` render the coordinates (only for small meshes).
  * `toggleVertices()` render the vertices.
  * `toggleLightning()` render the lightning (if there are any lights).

### Meshes

A mesh holds all the vertices, edges, and faces. More importantly, it enables us to apply transformation on an entire mesh (all the vertices at once).

  * A global variable `meshes` holds all the meshes that are rendered, `push` a `Mesh` to render it.
    * A mesh has `vertices`, `edges`, and `faces`.
    * A mesh supports the following operations: `scale(scalar)`, `translate(vec3)`, `vmult(vec3)`, `rotateY(angle)`, `applyToY(f(x,y))`, `faceColor(c)`.
    * A face supports the following operations: `center(mesh.vertices)`.


A cube mesh can be created with `generateCubeMesh`, and a surface with `generateSurfaceMesh(width,height)`.

It is possible to create a `MeshGroup` and add meshes to it. It is useful to create a giant mesh from multiple objects, and be able to transform them with: `scale`, `translate`, `vmult`, and `rotateY`. However, the mesh still need to be pushed into the global `meshes` list. It is merely a reference.

### Lights

A global variable `lights` holds all the lights that are rendered in the scene. The distance from a face to the light will be calculated. The color from the face is mixed with the color from the light. It requires `toggleLightning()` to render.

  * `lights` holds all the lights in the scene, `push` a `Light` to render it.

A light can be created with `new Light(vec3 pos, vec3 color, brightness)`.

### Camera

A global object `camera` holds a `Camera` object which has a `position`, `rotation`, and a field of fiew `fov`. 

 * `camera.position` is a `vec3` with the position.
 * `camera.rotation` is a `vec2` with the rotation XY.
 * `camera.fov` is the field of view.

As an example, use `camera.rotation = camera.rotation.add(new Vec2(0.01,0))` in the main render loop to rotate the camera.

### Render loop

Initializing the renderer goes like:

 1. Initialize settings.
 2. Toggle display modes.
 2. Move camera.
 3. Add meshes.
 4. Add lights. 
 5. Call `render()`.

The main rendering algorithm is:

1. Handle keys.
2. Apply movement.
3. Animate meshes.
4. Fill a depth buffer with the distance from a face to the camera.
5. Sort the depth buffer.
6. Draw the faces (furthest first).
    * Transform and clip coordinates.
    * Find the distance from the face to the light source.
    * Mix the color from the face and the light source based on the distance.
8. Draw the wireframe.
    * Transform and clip coordinates.
9. Draw the vertices.
    * Transform and clip coordinates.
    * Draw the UI with coordinates.
10. Draw UI text.
11. Set timeout for next pass.

 It also handles a `mouseCallback` for mouse movement.

### Controls

Holds all the functionality for keyboard and mouse events. Register events with:

 * `bindKeydown(callback)`
 * `bindKeyup(callback)`
 * `bindMouse(callback)`
 * `bindClick(callback)`

All the keys that are toggled are stored in `keysToggled`, and any keys that are pressed at this moment are in `keysDown`. It is a list with `e.keyCode` as index.
 
A pointer lock can be requested by adding a click event to the canvas which has a callback to `pointerLockCallback`. To request a pointer lock:

  1. Create on click event `bindClick(pointerLockCallback)`.
  2. Register the mouse `registerMouse()`, which requires a function `mouseCallback`.

### Math

The following math functions are defined:

 * `transform(vec3, camera)` transform a 3D coordinate to a 2D coordinate.
 * `rotate2d(vec2, angle)` rotate a 2D vector.
 * `rnd(value, decimal)` round a number, with decimal places.
 * `clip(x,a,b)` returns `true` if x is a < x < b, else `false`.
 * `bool2int(b)` convert a Boolean value to `0` or `1`.
 * `interpolate(a,b,alpha)` interpolate between two values.
 * `rbound(x,a,b)` keep a value between [a,b]. 
 * `index(x,y,width)` returns the index in a list for an item in a x*y grid with width w.
 * `mix(vec3, vec3, alpha)` mix two vectors, useful for mixing colors.

### Vec3

The `Vec3` object provides quick access to vector maths. The following functions are implemented:

 * `toString()` outputs `(x,y,z)`.
 * `add(vec3)` or `add(scalar)` vector addition.
 * `vmult(vec)` vector-vector multiplication.
 * `scale(scalar)` vector-scalar multiplication.
 * `rotateY(angle)` rotate around the Y-axis.
 * `dot(vec3)` dot product between two vectors.
 * `length()` length of the vector.
 * `distance(v)` distance between this vector and `v`.
 * `toRgb()` returns `rgb(x,y,z)`.
 * `apply(f)` apply a function f to (f(x), f(y), f(z)).

### Draw

This are functions for drawing on the canvas. To initialize a new canvas:

 1. Create the global `canvas` and `ctx` variables with `createGlobalCanvas("id")`.
 2. Optionally: draw in the center of the screen with `setScreenCenterOffset()`.

The following functions can be used to draw:

 * `clear()` clears the canvas, uses `backgroundColor` as default color.
 * `rectangle(x,y,w,h)` draws a rectangle.
 * `circle(x,y,r)` draw a circle.
 * `line(x1,y1,x2,y2,thickness)` draws a line.
 * `polygon(points[])` draws a polygon for the provided points (`{x:0, y:0}`).
 * `fillColor(c)` set the fill color.
 * `strokeColor(c)` set the stroke color.
 * `color(c)` set both the fill and stroke color.
 * `font(f)` set a font, e.g.: `12px Arial`.
 * `uitext(x,y,text)` draw a text without the offset.
 * `text(x,y,text)` draw a text with the offset.

## License

I hereby grant you to do whatever you want with it. There is no license.