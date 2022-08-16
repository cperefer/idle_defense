import { canvas, ctx } from "../helpers/state.js";
import { config, TURRET } from "../config/config.js";


export class Projectile {
    constructor({position, target}) {
        this.position = position;
        this.target = target;

        this.speed = {
            x: (this.position.x - this.target.center.x) / TURRET.ATTACK_SPEED,
            y: (this.position.y - this.target.center.y) / TURRET.ATTACK_SPEED,
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