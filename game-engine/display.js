const Display = function(canvas) {

    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");

    this.drawBackground = function(color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

    }

    this.render = function() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    this.resize = function(event) {

        var width, height;

        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;

        this.context.canvas.width = width;
        this.context.canvas.height = height;

        this.render();

    }
    
    this.handleResize = (event) => { this.resize(event); }

}

Display.prototype = {

    constructor: Display

}