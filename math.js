// Transforms the point in 3D space to 2D screen coordinates.
var transform = function(vertex, camera) {
    var x = vertex.x - camera.position.x, y = vertex.y - camera.position.y, z = vertex.z - camera.position.z;

    var rotX = rotate2d(new Vec2(x,z), camera.rotation.x);
    x = rotX.x; z = rotX.y;

    var rotY = rotate2d(new Vec2(y,z), camera.rotation.y);
    y = rotY.x; z = rotY.y;

    var f = camera.fov / z;
    return new Vec2(x * f, y * f);
}

// Transforms the point in 3D space to 2D screen coordinates.
var projectionMatrix = null;
var transform2 = function(vertex, camera) {

    // Initialize the projection matrix if there isn't any (older demo support)
    if(!projectionMatrix) { projectionMatrix = perspectiveProjectionMatrix(camera.zoom.x, camera.zoom.y, 25, 0.1); }

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

    // If m44 is 1, this is an orthographic projection.
    var w = clipSpace.w;
    if(projectionMatrix.m44) {
        if(w < 0 || w < clipSpace.z) return false;
        
        //if( clip(clipSpace.z, -w, w) || clip(clipSpace.x, -w, w) || clip(clipSpace.y, -w, w) ) return false;
        //if(clip(clipSpace.z/w, -w, w)) return false;
    }
    // This is a perspective projection.
    else {
        //if(clipSpace.x < -w || clipSpace.x > w ) return false;
        //if(clipSpace.z < -w || clipSpace.z > w) { return false; }
        if(w < 0 || w < clipSpace.z) return false;
        //if( clip(clipSpace.z, -w, w) || clip(clipSpace.x, -w, w) || clip(clipSpace.y, -w, w) ) return false;
        //if(clip(clipSpace,z, -w, w)) return false;
        //if(clip(clipSpace.z/w, -1, 1)) return false;
    }

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
    if(x >= a && x <= b) return true;
    return false;
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

function floor(x) {
    return Math.floor(x);
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

function random (st) {
    return fract(Math.sin(st.dot(new Vec2(12.9898,78.233))*
        43758.5453123));
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
function noise (st) {
    var i = st.floor();
    var f = st.fract();

    // Four corners in 2D of a tile
    var a = random(new Vec2(0       ).add(i) );
    var b = random(new Vec2(1.0, 0.0).add(i) );
    var c = random(new Vec2(0.0, 1.0).add(i) );
    var d = random(new Vec2(1.0, 1.0).add(i) );

    var u = f.vmult(f).vmult( new Vec2(3).subtract( f.scale(2) ) );

    return interpolate(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

var OCTAVES = 4;
function fbm (st) {
    // Initial values
    var value = 1.61;
    var amplitude = 1;
    var frequency = 3;
    //
    // Loop of octaves
    for (var i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st.scale(frequency));
        st = st.scale(2);
        amplitude *= .5;
    }
    return value;
}