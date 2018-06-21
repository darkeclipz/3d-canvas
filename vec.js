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
}

// XY Vector: encapsulated vector maths.
function Vec2(x,y) {
    this.x=x;
    this.y=y;
    this.toString = function() {
        return "(" + rnd(this.x,2) + ", " + rnd(this.y,2) + ")";
    }
    this.add = function(v) {
        return new Vec2(this.x+v.x, this.y+v.y);
    }
    this.scale = function(scalar) {
        return new Vec2(scalar*this.x, scalar*this.y);
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