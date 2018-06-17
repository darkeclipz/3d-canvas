// Creates a unit cube.
function Cube() {
    this.vertices = [];
    this.edges = [];

    // Create the vertices.
    this.vertices.push(new Vec3(-1,-1,-1));
    this.vertices.push(new Vec3(1,-1,-1));
    this.vertices.push(new Vec3(1,1,-1));
    this.vertices.push(new Vec3(-1,1,-1));
    this.vertices.push(new Vec3(-1,-1,1));
    this.vertices.push(new Vec3(1,-1,1));
    this.vertices.push(new Vec3(1,1,1));
    this.vertices.push(new Vec3(-1,1,1));
    
    // Connect the edges.
    this.edges.push(new Vec2(0,1));
    this.edges.push(new Vec2(1,2));
    this.edges.push(new Vec2(2,3));
    this.edges.push(new Vec2(3,0));
    this.edges.push(new Vec2(4,5));
    this.edges.push(new Vec2(5,6));
    this.edges.push(new Vec2(6,7));
    this.edges.push(new Vec2(7,4));
    this.edges.push(new Vec2(0,4));
    this.edges.push(new Vec2(1,5));
    this.edges.push(new Vec2(2,6));
    this.edges.push(new Vec2(3,7));
    
    // Scale the cube.
    this.scale = function(scalar) {
        for(var i=0; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].scale(scalar);
        }
    }
    
    // Translate the cube.
    this.translate = function(v) {
        for(var i=0; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].add(v);
        }
    }

    // Rotate around a fixed axis, in this case Y.
    this.rotate = function(theta) {
        for(var i=0; i < this.vertices.length; i++) {
            var x = this.vertices[i].x * Math.cos(theta) - this.vertices[i].z * Math.sin(theta);
            var y = this.vertices[i].y;
            var z = this.vertices[i].x * Math.sin(theta) + this.vertices[i].z * Math.cos(theta);
            this.vertices[i] = new Vec3(x,y,z);
        }
    }
}