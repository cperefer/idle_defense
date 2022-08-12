import { config, center, TURRET } from "./config/config.js";
import { canvas, ctx, arrayEnemies, arrayProjectiles } from "./helpers/state.js";
import { Turret } from "./classes/Turret.js";
import { Enemy } from "./classes/Enemy.js";

let player,
    numWave = 1;

function initialize() {
    canvas.width = config.CANVAS.WIDTH;
    canvas.height = config.CANVAS.HEIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = center.x;
    const centerY = center.y;
    const radius = 20;

    player = new Turret({
        position: {x: centerX, y: centerY},
        size: radius
    });

    spawnEnemiesRandomly();
    // const enemy = new Enemy({
    //     position: {
    //         x: 800,
    //         y: 100,
    //     },
    //     type: 'REGULAR',
    // });

    // arrayEnemies.push(enemy);
    
    animate();
}

function animate() {
    const animationId = requestAnimationFrame(animate);
    clearCanvas();
    player.update();
    arrayEnemies.forEach((enemy, index) => {
        enemy.update();

        const xDifference = enemy.position.x - player.position.x;
        const yDifference = enemy.position.y - player.position.y;
        const distance = Math.hypot(xDifference, yDifference);

        // Player has been hit
        if (distance < enemy.size) {
            arrayEnemies.splice(index, 1);
        }
    });
}

function clearCanvas() {
    canvas.style.width = config.CANVAS.WIDTH;
    canvas.style.height = config.CANVAS.HEIGHT;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function spawnEnemiesRandomly() {
    const maxX = center.x + config.MAX_DISTANCE_SPAWN,
        maxY = center.y + config.MAX_DISTANCE_SPAWN;

    for (let i = 0; i < config.ENEMIES_PER_WAVE * numWave; i++) {
        const position = {
            x: Math.random() * (maxX),
            y: Math.random() * (maxY),
        }

        config.DEBUG && console.log(position);

        const enemy = new Enemy({
            position,
            type: 'REGULAR',
        });

        arrayEnemies.push(enemy);
    }
}

document.addEventListener('DOMContentLoaded', () => initialize());