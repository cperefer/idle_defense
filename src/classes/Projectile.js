import { canvas, ctx } from "../helpers/state.js";
import { config } from "../config/config.js";


export class Projectile {
    constructor({position, target}) {
        this.position = position;
        this.target = target;

        this.speed = {
            x: (this.position.x - this.target.position.x) / 150,
            y: (this.position.y - this.target.position.y) / 150,
        };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }

    update() {
        this.draw();

        this.position.x -= this.speed.x;
        this.position.y -= this.speed.y;
    }
}