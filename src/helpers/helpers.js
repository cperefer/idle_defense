import { TURRET } from "../config/config.js";

function isInShottingRange(position, center) {
    return position.x > center.x - TURRET.SHOOTING_RANGE && position.x < center.x + TURRET.SHOOTING_RANGE &&
        position.y > center.y - TURRET.SHOOTING_RANGE && position.y < center.y + TURRET.SHOOTING_RANGE;
}

export {
    isInShottingRange,
}