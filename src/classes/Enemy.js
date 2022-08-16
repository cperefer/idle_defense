import { ctx } from "../helpers/state.js";
import { ENEMY, center } from "../config/config.js";

export class Enemy {
    constructor({position, type, speed}) {
        this.position = position;
        this.type = type;
        this.size = ENEMY[this.type].SIZE;
        // this.speed = ENEMY[this.type].SPEED;
        this.speed = {
            x: (this.position.x - center.x) / ENEMY[this.type].SPEED,
            y: (this.position.y - center.y) / ENEMY[this.type].SPEED,
        };

        this.center = {
            x: this.position.x + (this.size / 2),
            y: this.position.y + (this.size / 2)
        };

        this.health = ENEMY[this.type].HP;
        this.power = ENEMY[this.type].DAMAGE;

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.isTargeted = false;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update() {
        // Hay que darle una vuelta a la velocidad. Echar un vistazo a la formula de movimiento rectilineo uniforme
        this.draw();

        this.position.x -= this.speed.x ;
        this.position.y -= this.speed.y ;
    }
}