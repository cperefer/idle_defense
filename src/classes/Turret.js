import { canvas, ctx } from "../helpers/state.js";
import { config } from "../config/Config.js";
import { Shot } from "./Shot.js";


export class Turret {
    constructor({position, size}) {
        this.position = position;
        this.size = size;
        
        this.shottingRange = config.TURRET.SHOOTING_RANGE;
        this.target = {
            position: {
                x: undefined,
                y: undefined,
            },
            hp: 100,
        };
    }

    draw = () => {
        // Build turret
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        // Build attack zone
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.shottingRange, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }

    update = (arrayEnemies) => {
        this.draw();

        // console.log(this.target);
    }

    // shoot = () => {
    //     // Build turret
    //     ctx.beginPath();
    //     ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
    //     ctx.fillStyle = 'white';
    //     ctx.fill();
    // }
}