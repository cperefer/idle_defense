const config = {
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 800,
    },
    FPS: 20,
    TURRET: {
        SIZE: 20,
        SHOOTING_RANGE: 175,
        ATTACK_SPEED: 1,
    },
    ENEMY: {
        REGULAR: {
            SIZE: 15,
            SPEED: 5,
            HP: 10,
        }
    }
};

const center = {
    X: config.CANVAS.WIDTH / 2,
    Y: config.CANVAS.HEIGHT / 2
}

export {
    config,
    center
}