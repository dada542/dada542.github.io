const Display = function(canvas) {

    this.buffer = document.createElement("canvas").getContext("2d");
    this.canvas = canvas;

    this.drawBackground = function(color) {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

    }

    this.render = function() {
        this.canvas.getContext("2d").drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    this.resize = function(event) {

        var width, height;

        height = document.documentElement.clientHeight;
        width  = document.documentElement.clientWidth;
        
        this.canvas.width = width;
        this.canvas.height = height;

        this.render();

    }
    
    this.handleResize = (event) => { this.resize(event); }

}

Display.prototype = {

    constructor: Display

}
