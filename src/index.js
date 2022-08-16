import { config, center, TURRET } from "./config/config.js";
import { canvas, ctx, arrayEnemies, arrayProjectiles } from "./helpers/state.js";
import { isInShottingRange, calcDistance, clearCanvas, createEnemy, getClosestEnemy } from "./helpers/helpers.js";
import { Turret } from "./classes/Turret.js";
import { Projectile } from "./classes/Projectile.js";

let player,
    numWave = 0;

// Vars to control spawning time and spawningInterval
let isSpawning = true;
let intervalSpawingId = '';

function initialize() {
    // Initialize canvas
    canvas.width = config.CANVAS.WIDTH;
    canvas.height = config.CANVAS.HEIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set center of canvas to draw player
    const centerX = center.x;
    const centerY = center.y;
    const radius = 20;

    player = new Turret({
        position: {x: centerX, y: centerY},
        size: radius
    });

    // Spawn enemies and begin game
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

    // Check enemy to be shot
    const validEnemy = getClosestEnemy(center);
    if (validEnemy && isInShottingRange(validEnemy.position, center) && !player.isShotting) {
        arrayProjectiles.push(
            new Projectile({
                position: {...center},
                target: validEnemy,
            })
        );
        player.isShotting = true;
    }

    // Projectiles array
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

                // If there are no more enemies left we need to spawn a new wave
                if (arrayEnemies.length < 1) {
                    isSpawning = true;
                }
            }
            arrayProjectiles.splice(i, 1);
        }
    };

    // End of wave
    if (arrayEnemies.length < 1 && isSpawning) {
        isSpawning = false;
        numWave++;
        spawnEnemiesRandomly();
    }
}

function spawnEnemiesRandomly() {
    let numEnemies = 0;

    intervalSpawingId = setInterval(() => {
        if (numEnemies < config.ENEMIES_PER_WAVE * numWave) {
            numEnemies++;
            createEnemy();
        } else {
            clearInterval(intervalSpawingId);
        }        
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => initialize());