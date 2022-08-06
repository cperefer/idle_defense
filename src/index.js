import { config, center } from "./config/Config.js";
import { canvas, ctx } from "./helpers/state.js";
import { Turret } from "./classes/Turret.js";
import { Enemy } from "./classes/Enemy.js";

let player,
    arrayEnemies = [];

function initialize() {
    canvas.width = config.CANVAS.WIDTH;
    canvas.height = config.CANVAS.HEIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = center.X;
    const centerY = center.Y;
    const radius = 20;

    player = new Turret({
        position: {x: centerX, y: centerY},
        size: radius
    });

    const enemy = new Enemy({
        position: {x: 300, y: 300},
        type: 'REGULAR',
    });
    // const enemy = new Enemy({
    //     position: {x: 100, y: 100},
    //     type: 'REGULAR',
    // });

    arrayEnemies.push(enemy);
    
    player.draw();
    enemy.draw();

    animate();
}

function animate() {
    requestAnimationFrame(animate());
    clearCanvas();
    player.update(arrayEnemies);
    // for (const enemy in arrayEnemies) {
    //     arrayEnemies[enemy].update();
    // }
    arrayEnemies[0].draw()
}

function clearCanvas() {
    canvas.style.width = config.CANVAS.WIDTH;
    canvas.style.height = config.CANVAS.HEIGHT;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', () => initialize());