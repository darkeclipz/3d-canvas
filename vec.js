function Vec4(x,y,z,w) {
    if(y == null && z == null && w == 0) {
        this.x=x; this.y=x; this.z=x; this.w=x;
    } else {
        this.x=x; this.y=y; this.z=z; this.w=w;
    }
    this.toString = function() {
        return "(" + rnd(this.x,2) + ", " + rnd(this.y,2) + ", " + rnd(this.z,2) + ", " + rnd(this.w,2) + ")";
    }
    this.add = function(v) {
        var value = parseFloat(v);
        if(!isNaN(value)) {
            v = new Vec4(value, value, value, value);
        }
        return new Vec4(this.x+v.x, this.y+v.y, this.z+v.z), this.w+v.w;
    }
    this.subtract = function(v) {
        var value = parseFloat(v);
        if(!isNaN(value)) {
            v = new Vec4(value, value, value, value);
        }
        return new Vec4(this.x-v.x, this.y-v.y, this.z-v.z, this.w-v.w);
    }
    this.vmult = function(v) {
        return new Vec4(this.x*v.x, this.y*v.y, this.z*v.z, this.w*v.w);
    }
    this.scale = function(scalar) {
        return new Vec4(scalar*this.x, scalar*this.y, scalar*this.z, scalar*this.w);
    }
    this.rotateX = function(angle) {
        return new Vec4(this.x,
                        this.y * Math.cos(angle) - this.z * Math.sin(angle),
                        this.y * Math.sin(angle) + this.z * Math.cos(angle),
                        this.w);        
    }
    this.rotateY = function(angle) {
        return new Vec4(this.x * Math.cos(angle) - this.z * Math.sin(angle),
                        this.y,
                        this.x * Math.sin(angle) + this.z * Math.cos(angle),
                        this.w);
    }
    this.rotateZ = function(angle) {
        return new Vec4(this.x * Math.cos(angle) - this.y * Math.sin(angle),
                        this.x * Math.sin(angle) + this.y * Math.cos(angle),
                        this.z,
                        this.w);        
    }
    this.dot = function(v) { 
        return this.x*v.x + this.y*v.y + this.z*v.z + this.w*v.w;
    }
    this.lengthSq = function() {
        return this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w;
    }
    this.length = function() {
        return Math.sqrt(this.lengthSq());
    }
    this.distanceSq = function(v) {
        x = this.x-v.x; y = this.y-v.y; z = this.z-v.z, w = this.w-v-w;
        return x*x + y*y + z*z + w*w;    
    }
    this.distance = function(v) {
        return Math.sqrt(this.distanceSq(v));
    }
    this.toRgba = function() {
        return "rgba(" + rnd(this.x, 2) + "," + rnd(this.y, 2) + "," + rnd(this.z, 2) + ", " + rnd(this.w, 2) + ")";
    }
    this.apply = function(f) {
        return new Vec4(f(this.x), f(this.y), f(this.z), f(this.w));
    }
    this.pow = function(exp) {
        return new Vec4( Math.pow(this.x, exp), Math.pow(this.y, exp), Math.pow(this.z, exp), Math.pow(this.w, exp) );
    }
    this.floor = function() {
        return this.apply(Math.floor);
    }
    this.fract = function() {
        return this.subtract(this.apply(Math.floor));
    }
    this.mix = function(v,alpha) {
        return new Vec3( (1-alpha) * this.x + alpha * v.x, 
                         (1-alpha) * this.y + alpha * v.y, 
                         (1-alpha) * this.z + alpha * v.z,
                         (1-alpha) * this.w + alpha * v.w);
    }
    this.to3D = function() {
        return new Vec3(this.x / this.w, this.y / this.w, this.z / this.w);
    }
}

// XYZ Vector: encapsulated vector maths.
function Vec3(x,y,z) {
    if(y == null && z == null) {
        this.x=x; this.y=x; this.z=x;
    } else {
        this.x=x; this.y=y; this.z=z;
    }
    this.toString = function() {
        return "(" + rnd(this.x,2) + ", " + rnd(this.y,2) + ", " + rnd(this.z,2) + ")";
    }
    this.add = function(v) {
        var value = parseFloat(v);
        if(!isNaN(value)) {
            v = new Vec3(value, value, value);
        }
        return new Vec3(this.x+v.x, this.y+v.y, this.z+v.z);
    }
    this.subtract = function(v) {
        var value = parseFloat(v);
        if(!isNaN(value)) {
            v = new Vec3(value, value, value);
        }
        return new Vec3(this.x-v.x, this.y-v.y, this.z-v.z);
    }
    this.vmult = function(v) {
        return new Vec3(this.x*v.x, this.y*v.y, this.z*v.z);
    }
    this.scale = function(scalar) {
        return new Vec3(scalar*this.x, scalar*this.y, scalar*this.z);
    }
    this.rotateX = function(angle) {
        return new Vec3(this.x,
                        this.y * Math.cos(angle) - this.z * Math.sin(angle),
                        this.y * Math.sin(angle) + this.z * Math.cos(angle));        
    }
    this.rotateY = function(angle) {
        return new Vec3(this.x * Math.cos(angle) - this.z * Math.sin(angle),
                        this.y,
                        this.x * Math.sin(angle) + this.z * Math.cos(angle));
    }
    this.rotateZ = function(angle) {
        return new Vec3(this.x * Math.cos(angle) - this.y * Math.sin(angle),
                        this.x * Math.sin(angle) + this.y * Math.cos(angle),
                        this.z);        
    }
    this.dot = function(v) { 
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }
    this.lengthSq = function() {
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }
    this.length = function() {
        return Math.sqrt(this.lengthSq());
    }
    this.distanceSq = function(v) {
        x = this.x-v.x; y = this.y-v.y; z = this.z-v.z;
        return x*x + y*y + z*z;    
    }
    this.distance = function(v) {
        return Math.sqrt(this.distanceSq(v));
    }
    this.toRgb = function() {
        return "rgb(" + rnd(this.x, 2) + "," + rnd(this.y, 2) + "," + rnd(this.z, 2) + ")";
    }
    this.apply = function(f) {
        return new Vec3(f(this.x), f(this.y), f(this.z));
    }
    this.pow = function(exp) {
        return new Vec3( Math.pow(this.x, exp), Math.pow(this.y, exp), Math.pow(this.z, exp) );
    }
    this.angle = function(v) {
        return Math.acos( Math.abs( v.dot(u) ) / Math.sqrt( this.lengthSq()*v.lengthSq() ) );
    }
    this.floor = function() {
        return this.apply(Math.floor);
    }
    this.fract = function() {
        return this.subtract(this.apply(Math.floor));
    }
    this.mix = function(v,alpha) {
        return new Vec3( (1-alpha) * this.x + alpha * v.x, 
                         (1-alpha) * this.y + alpha * v.y, 
                         (1-alpha) * this.z + alpha * v.z);
    }
    this.toVec4 = function() {
        return new Vec4(this.x, this.y, this.z, 1);
    }
    this.to2D = function() {
        return new Vec2(this.x / this.z, this.y / this.z);
    }
}

// XY Vector: encapsulated vector maths.
function Vec2(x,y) {
    this.x=x;
    this.y=y;
    if(this.y == null) this.y=this.x;

    this.toString = function() {
        return "(" + rnd(this.x,2) + ", " + rnd(this.y,2) + ")";
    }
    this.add = function(v) {
        return new Vec2(this.x+v.x, this.y+v.y);
    }
    this.scale = function(scalar) {
        return new Vec2(scalar*this.x, scalar*this.y);
    }
    this.vmult = function(v) {
        return new Vec2(this.x*v.x, this.y*v.y);
    }
    this.dot = function(v) {
        return this.x*v.x + this.y*v.y;
    }
    this.length = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    this.distance = function(v) {
        x = this.x-v.x; y = this.y-v.y;
        return Math.sqrt(x*x + y*y);
    }
}

// Rounding function with decimals.
var rnd = function(value,decimals) {
    factor=Math.pow(10,decimals)
    return Math.round(value*factor)/factor;
}