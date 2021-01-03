const Engine = function(time_step, update, render) {

    this.time_step = time_step;
    this.accumulated_time = 0;
    this.time = undefined;
    this.frame_request = undefined;

    this.updated = false;

    this.update = update;
    this.render = render;

    this.run = function(current_time) {

        this.accumulated_time += current_time - this.time;
        this.time = current_time;

         console.log(this.accumulated_time);

        if(this.accumulated_time >= this.time_step * 3) {
            this.accumulated_time = this.time_step;
        }

        while(this.accumulated_time >= this.time_step) {

            this.accumulated_time -= this.time_step;

            this.update();
            this.updated = true;

        }

        if(this.updated) {

            this.render();
            this.updated = false;

        }

        this.frame_request = window.requestAnimationFrame(this.handleRun);

    }

    this.handleRun = (time_step) => { this.run(time_step); }

}

Engine.prototype = {

    constructor: Engine,

    start: function() {

        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.frame_request = window.requestAnimationFrame(this.handleRun);

    },

    stop: function() {
        window.cancelAnimationFrame(this.frame_request);
    }

}
