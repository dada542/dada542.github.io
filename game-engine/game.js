const Game = function() {

    this.colors = [0, 0, 0];
    this.shifts = [1, 1, 1];

    this.update = function() {

        for(let i = 0; i < 3; i++) {

            let color = this.colors[i];
            let shift = this.shifts[i];

            if(color + shift > 255 || color + shift < 0) {
                shift = (shift < 0) ? Math.floor(Math.random() * 2 + 1) : Math.floor(Math.random() * -2 - 1)
            }

            color += shift;

            this.colors[i] = color;
            this.shifts[i] = shift;

        }
        
        this.color = `rgb(${this.colors[0]},${this.colors[1]},${this.colors[2]})`;

    }

}

Game.prototype = {

    constructor: Game

}