class Display {
    constructor(id, width, height){
        this.canvas = document.getElementById(id);
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        this.ctx = this.canvas.getContext('2d');
    }
    drawSprite(sprite, x, y) {
        this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h)
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

class Sprite{
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

class Bullet {
    constructor(sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    updateBullet() {
        this.y += this.speed;
    }
}

class UFO {
    constructor(sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    updateUFO() {
        this.y += this.speed;
    }
}

class InputGallery {
    constructor() {
        this.down = {};
        this.pressed = {};

        let thisClass = this;
        document.addEventListener("keydown", function(event) {
            thisClass.down[event.keyCode] = true;
        });
        document.addEventListener("keyup", function(event) {
            delete thisClass.down[event.keyCode];
            delete thisClass.pressed[event.keyCode];
        });
    }
    isDown(code) {
        return this.down[code];
    }
    isPressed(code) {
        if (this.pressed[code]) {
            return false;
        }
        else if (this.down[code]) {
            return this.pressed[code] = true;
        }
        return false;
    }
}


