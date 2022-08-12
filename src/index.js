import { config, center, TURRET } from "./config/config.js";
import { canvas, ctx, arrayEnemies, arrayProjectiles } from "./helpers/state.js";
import { isInShottingRange } from "./helpers/helpers.js";
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
    
    animate();
}

function animate() {
    const animationId = requestAnimationFrame(animate);
    clearCanvas();
    player.update();
    arrayEnemies.forEach((enemy, index) => {
        enemy.update();

        if (index === 0) {
            console.log(enemy.position);
        }

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
        // setTimeout(() => {
            const position = {
                x: 0,
                y: 0,
            };
            // Generate random position until enemy is not in shooting range
            do {
                position.x = Math.random() * (maxX);
                position.y = Math.random() * (maxY);
            } while (isInShottingRange(position, center));
    
            config.DEBUG && console.log(position);
    
            const enemy = new Enemy({
                position,
                type: 'REGULAR',
            });
    
            arrayEnemies.push(enemy);
        // }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => initialize());