function Light(position, color, brightness, alpha) {
    this.position = position;       // Position of the light, XYZ.
    this.color = color;             // Color of the light, Vec3 RGB.
    this.brightness = brightness;   // Used as the radius for distance calculation.
    this.alpha = alpha;             // Controls the mixing of the light.
}