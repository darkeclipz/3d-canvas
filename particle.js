function Particle(pos, dir, col, alpha) {
    this.position = pos;
    this.direction = dir;
    this.color = col;
    this.alpha = alpha;
    this.size = function() {
        if(this.alpha > 0.66) return 3;
        if(this.alpha > 0.33) return 2;
        return 1;
    }
}

function ParticleGenerator(count, tick, pos, col, speed, fade) {
    
    this.vertices = [];
    this.edges = [];
    this.faces = [];
    this.alpha = 1;
    this.fade = fade;
    this.tick = tick;

    this.particles = [];
    this.type = "particle";

    this.particleCount = count;

    this.position = pos;
    this.vertices.push(pos);
    this.faces.push(new Face([0], new Vec4(0)));

    this.color = col;

    this.speed = speed;

    this.generate = function(st) {

        // Move and fade all the particles.
        for(var i=0; i < this.particles.length; i++) {
            var p = this.particles[i];
            this.particles[i].position = p.position.add(p.direction);
            this.particles[i].alpha *= this.fade;
        }

        // Remove particles that are too dim.
        this.particles = this.particles.filter(function(p) { return p.alpha > 0.025; });

        // Add new particles.
        if(this.particles.length < this.particleCount) {
            for(var i=0; i < this.tick; i++) {
                var x = random( st.add(new Vec2(0.01 + 0.0134324*i)) );
                var y = random( st.add(new Vec2(0.02 + 0.0345435*i)) );
                var z = random( st.add(new Vec2(0.03 + 0.0654654*i)) );
                var particle = new Particle(this.position.add(new Vec3(x,y,z)), new Vec3(x,y,z).subtract(0.5).scale(2).scale(speed), this.color, 1 );
                this.particles.push(particle);
            }
        }
    }
}