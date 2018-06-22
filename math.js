// Transforms the point in 3D space to 2D screen coordinates.
var projectionMatrix = null;
var transform = function(vertex, camera) {
    // Move the 3D point into camera space.
    var x = vertex.x - camera.position.x, y = vertex.y - camera.position.y, z = vertex.z - camera.position.z;
    var rotX = rotate2d(new Vec2(x,z), camera.rotation.x);
    x = rotX.x; z = rotX.y;
    var rotY = rotate2d(new Vec2(y,z), camera.rotation.y);
    y = rotY.x; z = rotY.y;

    // Create homogeneous 4D vector.
    var v = new Vec4(x,y,z,1);

    // Transform vector to clip space, aka the projection.
    var clipSpace = projectionMatrix.mult(v);

    // Clip anything that is not in the view frustum:
    // X should be: -w < x < w (1)
    // Y should be: -w < y < w (2)
    // Z should be: -w < z < w (3)
    var w = clipSpace.w;
    if(clipSpace.x < -w || clipSpace.x > w || clipSpace.y < -w || clipSpace.y > w || clipSpace.z < -w || clipSpace.z > w) return false;
    //if(clipSpace.z < 0 || clipSpace.z > clipSpace.w) { return false; } <<-- use for orthographic.

    // Clip space to NDC space.
    var normalizedDeviceCoordinates = v.to3D().to2D();

    // NDC space to device coordinates.
    var deviceMinResolution = Math.min(innerWidth, innerHeight);
    deviceCoordinates = normalizedDeviceCoordinates.vmult(new Vec2(deviceMinResolution));

    // Return result.
    return new Vec2(deviceCoordinates.x, deviceCoordinates.y);
}

// Performs a rotation in 2D.
var rotate2d = function(v, theta) {
    return new Vec2(v.y * Math.sin(theta) + v.x * Math.cos(theta),
                    v.y * Math.cos(theta) - v.x * Math.sin(theta));
}

// Rounding function with decimals.
var rnd = function(value,decimals) {
    factor=Math.pow(10,decimals)
    return Math.round(value*factor)/factor;
}

// Returns true if the value is within bounds, false otherwise.
// Clipping is now done in the transform function within clip space.
var clip = function(x,a,b) {
    return true;
    //if(x >= a && x <= b) return true;
    //return false;
}

// Interpolate on an interval.
var interpolate = function(a,b,alpha) {
    return a + (b - a) * alpha;
}

// Return the index of an element in a grid.
function index(x, y, width) { 
    return width * y + x; 
}

// Returns lowest value in a list.
function min(l) {
    var x = l[0];
    for(var i=0; i < l.length; i++) {
        if(l[i] < x) x = l[i];
    }
    return x;
}

// Returns highest value in a list.
function max(l) {
    var x = l[0];
    for(var i=0; i < l.length; i++) {
        if(l[i] > x) x = l[i];
    }
    return x;
}

// Keep a variable bound within a range.
function clamp(x,a,b) {
    if(x < a) return a;
    if(x > b) return b;
    return x;
}

// Step function.
function step(a,x) {
    if(x < a) return 0;
    return 1;
}

// Smoothstep function.
function smoothstep(a,b,x) {
    x = clamp((x - a) / (b - a), 0, 1);
    return x*x * (3 - 2*x);
    // return x * x * x * (x * (x * 6 - 15) + 10);
}

// Wrap a value to a range of 0-1.
function wrap(x) {
    return (x % 1 + 1) % 1;
}

// Return the fractional part.
function fract(x) {
    return x - Math.floor(x);
}

// -- Obsolete: but used in demos --

var bool2int = function(b) {
    return b ? 1 : 0;
}

function mix(v,u,alpha) {
    return new Vec3( (1-alpha) * v.x + alpha * u.x, 
                     (1-alpha) * v.y + alpha * u.y, 
                     (1-alpha) * v.z + alpha * u.z);
}