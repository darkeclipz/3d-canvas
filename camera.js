function Camera(fov) {
    this.position = new Vec3(0,0,-5);
    this.rotation = new Vec2(0);
    this.fov = fov;

    // Used in projection matrices.
    this.zoom = new Vec2(1);
    this.far = 25;
    this.near = 0.01;
}