import { config, center, TURRET } from "./config/config.js";
import { canvas, ctx, arrayEnemies, arrayProjectiles } from "./helpers/state.js";
import { isInShottingRange, calcDistance } from "./helpers/helpers.js";
import { Turret } from "./classes/Turret.js";
import { Enemy } from "./classes/Enemy.js";
import { Projectile } from "./classes/Projectile.js";

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

    for (let i = arrayEnemies.length - 1; i >= 0; i--) {
        const enemy = arrayEnemies[i];
        enemy.update();

        const distance = calcDistance(enemy, player);

        if (isInShottingRange(enemy.position, center) && !player.isShotting) {
            arrayProjectiles.push(
                new Projectile({
                    position: {...center},
                    target: enemy,
                })
            );
            player.isShotting = true;
        }
        // Player has been hit
        if (distance < enemy.size) {
            player.health -= enemy.power;
            arrayEnemies.splice(i, 1);

            // Game Over
            if (player.health < 1) {
                cancelAnimationFrame(animationId);
            }
        }
    }

    for (let i = arrayProjectiles.length - 1; i >= 0; i--) {
        const projectile = arrayProjectiles[i];
        projectile.update();

        const distance = calcDistance(projectile, projectile.target);

        if (distance < projectile.target.size) {
            const target = projectile.target;
            target.health -= player.power;

            if (target.health < 0) {
                const enemyIndex = arrayEnemies.findIndex(enemy => enemy === target);
                arrayEnemies.splice(enemyIndex, 1);
                player.isShotting = false;
            }
            // console.log(arrayProjectiles);
            arrayProjectiles.splice(i, 1);
            // console.log(arrayProjectiles);
        }
    };

    // End of wave
    // if (arrayEnemies.length < 1) {
    //     numWave++;
    //     spawnEnemiesRandomly();
    // }
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