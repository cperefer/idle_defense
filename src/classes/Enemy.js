import { ctx } from "../helpers/state.js";
import { ENEMY, center } from "../config/config.js";

export class Enemy {
    constructor({position, type, speed}) {
        this.position = position;
        this.type = type;
        this.size = ENEMY[this.type].SIZE;
        // this.speed = ENEMY[this.type].SPEED;
        this.speed = {
            x: this.position.x - center.x,
            y: this.position.y - center.y,
        };
        this.hp = ENEMY[this.type].HP;
        this.velocity = {
            x: 0,
            y: 0,
        };

        console.log(this.speed);
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update() {
        this.draw();

        this.position.x -= this.speed.x / 100;
        this.position.y -= this.speed.y / 100;
    }
}