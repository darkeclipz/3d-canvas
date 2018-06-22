function Mat4() {
    this.m11 = 0, this.m12 = 0, this.m13 = 0, this.m14 = 0,
    this.m21 = 0, this.m22 = 0, this.m23 = 0, this.m24 = 0,
    this.m31 = 0, this.m32 = 0, this.m33 = 0, this.m34 = 0,
    this.m41 = 0, this.m42 = 0, this.m43 = 0, this.m44 = 0;

    this.mult = function(v) {
        return new Vec4( v.x * (this.m11 + this.m21 + this.m31 + this.m41),
                         v.y * (this.m12 + this.m22 + this.m32 + this.m42),
                         v.z * (this.m13 + this.m23 + this.m33 + this.m43),
                         v.z * (this.m14 + this.m24 + this.m34 + this.m44) );
    }

    this.toString = function() {
        return  rnd(this.m11, 2) + '\t' + rnd(this.m12, 2) + '\t' + rnd(this.m13, 2) + '\t' + rnd(this.m14, 2) + '\n' 
        + ' ' + rnd(this.m21, 2) + '\t' + rnd(this.m22, 2) + '\t' + rnd(this.m23, 2) + '\t' + rnd(this.m24, 2) + '\n' 
        + ' ' + rnd(this.m31, 2) + '\t' + rnd(this.m32, 2) + '\t' + rnd(this.m33, 2) + '\t' + rnd(this.m34, 2) + '\n' 
        + ' ' + rnd(this.m41, 2) + '\t' + rnd(this.m42, 2) + '\t' + rnd(this.m43, 2) + '\t' + rnd(this.m44, 2);
    }
}

var identityMatrix = function() {
    var M = new Mat4();
    M.m11 = 1, M.m22 = 1, M.m33 = 1, M.m44 = 1;
    return M;
}

var perspectiveProjectionMatrix = function(zoomX, zoomY, far, near) {
    var M = new Mat4();
    M.m11 = zoomX, 
    M.m22 = zoomY, 
    M.m33 = ( far + near ) / ( far - near ), 
    M.m34 = 1,
    M.m43 = -2 * near * far / ( far - near );
    return M;
}

var orthographicProjectionMatrix = function(zoomX, zoomY, far, near) {
    var M = new Mat4();
    M.m11 = zoomX, 
    M.m22 = zoomY, 
    M.m33 = 2 / ( far - near ), 
    M.m43 = -( far + near ) / ( far - near ),
    M.m44 = 1;
    return M;
}