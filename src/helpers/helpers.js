import { TURRET } from "../config/config.js";

function isInShottingRange(position, center) {
    return position.x > center.x - TURRET.SHOOTING_RANGE && position.x < center.x + TURRET.SHOOTING_RANGE &&
        position.y > center.y - TURRET.SHOOTING_RANGE && position.y < center.y + TURRET.SHOOTING_RANGE;
}

function calcDistance(source, destiny) {
    const xDifference = source.position.x - destiny.position.x;
    const yDifference = source.position.y - destiny.position.y;
    return Math.hypot(xDifference, yDifference);
}

export {
    isInShottingRange,
    calcDistance,
}