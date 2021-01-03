const Controller = function() {

this.keyUpDown = function(event) {

var down = (event.type == "keydown") ? true : false;

alert(event.key);

}

this.handleKeyUpDown = (event) => { this.keyUpDown(event); }

}

Controller.prototype = {

constructor: Controller

}
