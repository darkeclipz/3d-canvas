// XYZ Vector: encapsulated vector maths.
function Vec3(x,y,z) {
    this.x=x;
    this.y=y;
    this.z=z;
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
    this.vmult = function(v) {
        return new Vec3(this.x*v.x, this.y*v.y, this.z*v.z);
    }
    this.scale = function(scalar) {
        return new Vec3(scalar*this.x, scalar*this.y, scalar*this.z);
    }
    this.rotateY = function(angle) {
        return new Vec3(this.x * Math.cos(angle) - this.z * Math.sin(angle),
                        this.y,
                        this.x * Math.sin(angle) + this.z * Math.cos(angle));
    }
    // Sorry, no X or Z: check http://mathworld.wolfram.com/RotationMatrix.html, and implement it yourself.

    this.dot = function(v) { 
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }
    this.length = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    this.distance = function(v) {
        x = this.x-v.x; y = this.y-v.y; z = this.z-v.z;
        return Math.sqrt(x*x + y*y + z*z);
    }
    this.toRgb = function() {
        return "rgb(" + this.x + "," + this.y + "," + this.z + ")";
    }
    this.apply = function(f) {
        return new Vec3(f(this.x), f(this.y), f(this.z));
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