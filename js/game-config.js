const game = {
    display: '',
    displayWidth: 800,
    displayHeight: 600,
    enemies: [],
    bullets: [],
    enemyBullets: [],
    ufo: [],

    spaceKey: 32,
    leftArrow: 37,
    rightArrow: 39,
    downArrow: 40,
    upArrow: 38,
    enter: 13,

    spriteImg: '',
    bulletSprite: '',
    enemySprite: '',
    bulletEnemySprite: '',
    explosionSprite: '',
    spaceShip: '',
    shipSprite: '',
    ufoSprite: '',
    ufoY: -35,
    ufoNum: 350,

    frames: 30,
    direction: 1,
    levelFrame: 30,
    spriteFrame: 0,
    shipFrame: 0,

    score: 0,
    gameOn: true,
};

function checkCollision(aX, aY, aW, aH, bX, bY, bW, bH) {
   return aX < bX + bW &&
       aX + aW > bX &&
       aY < bY + bH &&
       aY + aH > bY;
}

