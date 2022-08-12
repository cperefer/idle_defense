const config = {
    DEBUG: false,
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 800,
    },
    ENEMIES_PER_WAVE: 4,
    MIN_DISTANCE_SPAWN: 200,
    MAX_DISTANCE_SPAWN: 500,
};

const TURRET = {
    SIZE: 20,
    SHOOTING_RANGE: 175,
    ATTACK_SPEED: 1,
};

const ENEMY = {
    REGULAR: {
        SIZE: 15,
        SPEED: 3,
        HP: 10,
    }
};

const center = {
    x: config.CANVAS.WIDTH / 2,
    y: config.CANVAS.HEIGHT / 2
}

export {
    config,
    center,
    TURRET,
    ENEMY
}