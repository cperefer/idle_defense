import { config, TURRET, center } from "../config/config.js";
import { arrayEnemies, canvas, ctx } from "./state.js";
import { Enemy } from "../classes/Enemy.js";

function clearCanvas() {
    canvas.style.width = config.CANVAS.WIDTH;
    canvas.style.height = config.CANVAS.HEIGHT;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function isInShottingRange(position, center) {
    return position.x > center.x - TURRET.SHOOTING_RANGE && position.x < center.x + TURRET.SHOOTING_RANGE &&
        position.y > center.y - TURRET.SHOOTING_RANGE && position.y < center.y + TURRET.SHOOTING_RANGE;
}

function calcDistance(source, destiny) {
    const xDifference = source.position.x - destiny.position.x;
    const yDifference = source.position.y - destiny.position.y;
    return Math.hypot(xDifference, yDifference);
}

function createEnemy() {
    const maxX = center.x + config.MAX_DISTANCE_SPAWN,
        maxY = center.y + config.MAX_DISTANCE_SPAWN;

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
    
    // Think about generating new enemies
    const enemy = new Enemy({
        position,
        type: 'REGULAR',
    });

    arrayEnemies.push(enemy);
}

function getClosestEnemy() {
    const arraySortedClosestEnemy = arrayEnemies.map((enemy) => {
        enemy.distance = calcDistance(enemy, {position: {x: center.x, y: center.y}});
        return enemy;
    }).sort((a, b) => {
        return a.distance - b.distance
    });

    return arraySortedClosestEnemy[0];
}

export {
    isInShottingRange,
    calcDistance,
    clearCanvas,
    createEnemy,
    getClosestEnemy,
}