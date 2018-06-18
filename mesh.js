function Mesh() {
    this.vertices = [];
    this.edges = [];
    this.faces = [];
    this.scale = function(scalar) {
        for(var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].scale(scalar);
        }
    }
    this.translate = function(v) {
        for(var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].add(new Vec3(v.x, v.y, v.z));
        }
    }
    this.vmult = function(v) {
        for(var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].vmult(v);
        }
    }
    this.rotateY = function(angle) {
        for(var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].rotateY(angle);
        }
    }
    this.applyToY = function(f) {
        for(var i=0; i<this.vertices.length; i++) {
            v = this.vertices[i];
            this.vertices[i] = new Vec3(v.x, f(v.x, v.z), v.z);
        }
    }
}

function MeshGroup() {
    this.meshes = [];
    this.scale = function(scalar) {
        for(var i=0; i < this.meshes.length; i++) {
            this.meshes[i].scale(scalar);
        }
    }
    this.translate = function(v) {
        for(var i=0; i < this.meshes.length; i++) {
            this.meshes[i].translate(v);
        }
    }
    this.vmult = function(v) {
        for(var i=0; i < this.meshes.length; i++) {
            this.meshes[i].vmult(v);
        }
    }
    this.rotateY = function(angle) {
        for(var i=0; i < this.meshes.length; i++) {
            this.meshes[i].rotateY(angle);
        }
    }
}

function Edge(a,b) {
    this.a = a;
    this.b = b;
}

function Face(vertices, color) {
    this.vertices = vertices;
    this.color = color;

    // Calculates the center vertex position.
    this.center = function(vertexLookup) {
        var x = 0, y = 0; z = 0;
        for(var i=0; i < this.vertices.length; i++) {
            v = vertexLookup[this.vertices[i]];
            x += v.x; y += v.y; z += v.z;
        }
        x /= this.vertices.length; y /= this.vertices.length; z /= this.vertices.length;
        return new Vec3(x,y,z);
    }
}

function generateCubeMesh() {
    mesh = new Mesh();
    mesh.vertices.push(new Vec3(-1,-1,-1));
    mesh.vertices.push(new Vec3(1,-1,-1));
    mesh.vertices.push(new Vec3(1,1,-1));
    mesh.vertices.push(new Vec3(-1,1,-1));
    mesh.vertices.push(new Vec3(-1,-1,1));
    mesh.vertices.push(new Vec3(1,-1,1));
    mesh.vertices.push(new Vec3(1,1,1));
    mesh.vertices.push(new Vec3(-1,1,1));
    mesh.edges.push(new Edge(0,1));
    mesh.edges.push(new Edge(1,2));
    mesh.edges.push(new Edge(2,3));
    mesh.edges.push(new Edge(3,0));
    mesh.edges.push(new Edge(4,5));
    mesh.edges.push(new Edge(5,6));
    mesh.edges.push(new Edge(6,7));
    mesh.edges.push(new Edge(7,4));
    mesh.edges.push(new Edge(0,4));
    mesh.edges.push(new Edge(1,5));
    mesh.edges.push(new Edge(2,6));
    mesh.edges.push(new Edge(3,7));
    mesh.faces.push(new Face([0,1,2,3], 'red'));
    mesh.faces.push(new Face([0,3,7,4], 'lime'));
    mesh.faces.push(new Face([5,4,7,6], 'blue'));
    mesh.faces.push(new Face([1,5,6,2], 'yellow'));
    mesh.faces.push(new Face([3,2,6,7], 'grey'));
    mesh.faces.push(new Face([0,1,5,4], 'grey'));
    return mesh;
}

function generateSurfaceMesh(w,h) {
    var mesh = new Mesh();
    for(var x=0; x<w; x++) {
        for(var y=0; y<h; y++) {
            mesh.vertices.push(new Vec3(interpolate(-1,1,x/w), 0, interpolate(-1,1,y/h)));
        }
    }
    return mesh;
}