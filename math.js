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
var clip = function(x,a,b) {
    if(x >= a && x <= b) return true;
    return false;
}

// Still used in the first demo.
var bool2int = function(b) {
    return b ? 1 : 0;
}

// Interpolate on an interval.
var interpolate = function(a,b,alpha) {
    return a + (b - a) * alpha;
}

// Keep a variable bound within a range.
var rbound = function(x,a,b) {
    if(x < a) return a;
    if(x > b) return b;
    return x;
}

// Return the index of an element in a grid.
function index(x, y, width) { 
    return width * y + x; 
}

// Mix two vectors.
function mix(v,u,alpha) {
    return new Vec3( (1-alpha) * v.x + alpha * u.x, 
                     (1-alpha) * v.y + alpha * u.y, 
                     (1-alpha) * v.z + alpha * u.z);
}

function min(l) {
    var x = l[0];
    for(var i=0; i < l.length; i++) {
        if(l[i] < x) x = l[i];
    }
    return x;
}

function max(l) {
    var x = l[0];
    for(var i=0; i < l.length; i++) {
        if(l[i] > x) x = l[i];
    }
    return x;
}

function angle2(v,u) {

}