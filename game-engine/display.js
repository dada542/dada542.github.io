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
        alert(1);

        var width, height;

        height = document.documentElement.clientHeight;
        width  = document.documentElement.clientWidth;
        
        console.log(width, height);

        this.context.canvas.width = width;
        this.context.canvas.height = height;

        this.render();

    }
    
    this.handleResize = (event) => { this.resize(event); }

}

Display.prototype = {

    constructor: Display

}
