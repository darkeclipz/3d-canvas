// Create a new animation.
// s : start
// e : end
// f : animation function
// m : mesh
// r : repeat
function Animation(s,e,f,m,r) {

    // Frame when the animation needs to start.
    this.start = s;

    // Frame when the animation should be done.
    this.end = e;

    // Length of the animation in frames.
    this.duration = this.end - this.start;

    // Animation step.
    this.dt = 1 / this.duration;

    // Mesh that is animated, is given with f.
    this.mesh = m;

    // Function which holds the animation.
    this.f = f;     // Example of a function:
                    //
                    // function(m, t, dt) { m.translate(new Vec3(0,5,0).scale(dt); ) } // Move (0,5,0) over the duration of the animation.
                    //
                    // where m is the mesh object, t is the normalized time of the animation (between [0,1]) to know where we are in the animation,
                    // and dt which is one animation step.


    // Animates the mesh.
    this.animate = function(m, t, dt) {
        this.f(m, t, dt);
    }

    // Replay the animation (pushed to the back of the queue);
    this.repeat = r;
}

function Animator() {

    // Holds the playing or not yet started animations.
    this.animations = [];

    // Update all the animations.
    this.animate = function (t) {

        var endedAnimations = this.animations.filter(function (f) { return f.end <= t});

        // Add the animation to the back of the queue if it should be replayed.
        for(var i=0; i < endedAnimations.length; i++) {
            var anim = endedAnimations[i];

            if(!anim.repeat) continue;

            this.new(this.animations[this.animations.length - 1].end, 
                     this.animations[this.animations.length - 1].end + anim.duration, 
                     anim.f, 
                     anim.mesh, 
                     anim.repeat);
        }

        // Remove ended animations.
        this.animations = this.animations.filter(function (f) { return f.end > t})

        // If the animation has started, proceed a frame.
        for(var i=0; i < this.animations.length; i++) {

            if(this.animations[i].start <= t) {
                this.animations[i].animate( this.animations[i].mesh, (this.animations[i].start - t) / this.duration,  this.animations[i].dt );
            }
        }
    }

    // Create a new animation.
    // s : start
    // e : end
    // f : animation function
    // m : mesh
    // r : repeat
    this.new = function (s,e,f,m,r) {
        var animation = new Animation(s,e,f,m,r);
        this.animations.push(animation);
    }

}