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
    this.rotateY = function(angle) {
        for(var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].rotateY(angle);
        }
    }
}

function Edge(a,b) {
    this.a = a;
    this.b = b;
}

function Face(vertices) {
    this.vertices = vertices;
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
    return mesh;
}