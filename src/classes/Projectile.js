import { canvas, ctx } from "../helpers/state.js";
import { config } from "../config/config.js";


export class Projectile {
    constructor({position, target}) {
        this.position = position;
        this.target = target;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update() {
        this.draw();
    }
}