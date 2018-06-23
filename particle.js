function Particle(pos, dir, col, alpha) {
    this.position = pos;
    this.direction = dir;
    this.color = col;

    // How bright the particle still is. This is getting smaller
    // every tick, so it can also be used as an indicator for
    // how long this particle has been alive.
    this.alpha = alpha;

    // Is used to draw the rectangle of the particle in different
    // sizes based on how bright it still is. 
    this.size = function() {
        if(this.alpha > 0.66) return 3;
        if(this.alpha > 0.33) return 2;
        return 1;
    }
}

/*
* Parameters:
*  - count : max amount of particles.
*  - tick  : particles created per tick.
*  - pos   : position of the new particles.
*  - speed : size of the direction vector (how quickly it moves).
*  - face  : how quickly it fades way; [0,1].
*  - radius: how far it starts from the generator.
*/
function ParticleGenerator(count, tick, pos, col, speed, fade, radius) {

    // Required for a mesh.
    this.vertices = [];
    this.edges = [];
    this.faces = [];
    this.type = "particle";

    // If null is returned, the bounding box is skipped.
    this.updateBoundingBox = function() { return null; } 

    // Mesh transformation functions.
    this.translate  = function(v)       { this.position = this.position.add(v); }
    this.scale      = function(scalar)  { this.position = this.position.scale(scalar); }
    this.rotateX    = function(angle)   { this.position = this.position.rotateX(angle); }
    this.rotateY    = function(angle)   { this.position = this.position.rotateY(angle); }
    this.rotateZ    = function(angle)   { this.position = this.position.rotateZ(angle); }

    // ------------------------------------------------------------------------------------

    // Create a dummy face, because we want to add that face to the depth buffer
    // to approximate the distance. There are simply too many particles too 
    // solve a square root for, to get the distance, and show everything properly.
    this.vertices.push(pos);
    this.faces.push(new Face([0], new Vec4(0)));

    // How quickly a particle fades away. (Between [0, 1])
    this.fade = fade;

    // The amount of particles that are created each tick.
    this.tick = tick;

    // List with the particles that are alive.
    this.particles = [];

    // The total amout of partices that are allowed to be created.
    this.particleCount = count;

    // The position of newly created particle.
    this.position = pos;

    // The color for the newly created particle.
    this.color = col;

    // Changes the size of the randomly generated direction vector. 
    this.speed = speed;

    // Changes how far the particles starts from the generator.
    this.radius = radius;

    // Update and create new particles every tick. Requires a 
    // <vec2> to generate random values for the direction vector.
    this.generate = function(st) {

        // Move and fade all the particles.
        for(var i=0; i < this.particles.length; i++) {

            var p = this.particles[i];

            // Advance the particle into the direction.
            this.particles[i].position = p.position.add(p.direction);

            // Fade out the particle.
            this.particles[i].alpha *= this.fade;
        }

        // Remove particles that are too dim.
        this.particles = this.particles.filter(function(p) { return p.alpha > 0.15; });

        // Add new particles.
        if(this.particles.length < this.particleCount) {

            for(var i=0; i < this.tick; i++) {

                // Create a random XYZ vector (it points somewhere)
                var x = random( st.add(new Vec2(0.01 + 0.0134324*i)) );
                var y = random( st.add(new Vec2(0.02 + 0.0345435*i)) );
                var z = random( st.add(new Vec2(0.03 + 0.0654654*i)) );

                // Random direction vector of the particle.
                var v = new Vec3(x,y,z).subtract(0.5).scale(2).scale(speed);

                // Create a new particle at the position of the generator which
                // is pointing in a random direction.
                var particle = new Particle(this.position.add(v.scale(this.radius)), v, this.color, 1 );
                this.particles.push(particle);
            }
        }
    }
}