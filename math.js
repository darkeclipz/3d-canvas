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