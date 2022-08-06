import { canvas, ctx } from "../helpers/state.js";
import { config, center } from "../config/Config.js";

export class Enemy {
    constructor({position, type}) {
        this.position = position;
        this.type = type;
        this.size = config.ENEMY[this.type].SIZE;
        this.speed = config.ENEMY[this.type].SPEED;
        this.hp = config.ENEMY[this.type].HP;

        this.targetMovement = {
            x: center.X - this.position.x,
            y: center.Y - this.position.y,
        };

        // console.log(this.targetMovement);
    }

    draw = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update = () => {
        this.position.x += this.speed;
        this.position.y += this.speed;
        this.draw();
    }
}