function Light(position, color, brightness, alpha) {
    this.position = position;       // Position of the light, XYZ.
    this.color = color;             // Color of the light, Vec3 RGB.
    this.brightness = brightness;   // Used as the radius for distance calculation.
    this.alpha = alpha;             // Controls the mixing of the light.
    this.translate = function(v)    { this.position = this.position.add(v); }
    this.scale = function(scalar)   { this.position = this.position.scale(v); }
    this.rotateX = function(angle)  { this.position = this.position.rotateX(angle); }
    this.rotateY= function(angle)   { this.position = this.position.rotateY(angle); }
    this.rotateZ = function(angle)  { this.position = this.position.rotateZ(angle); }
}