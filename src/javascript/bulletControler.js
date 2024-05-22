import Bullet from "./Bullet.js";
export default class BulletControler {
    bullets = [];
    timeTillNextBulletAllowed = 0
    constructor(canvas, maxBulletAtTime, bulletColor, soundenabled) {
        this.canvas = canvas;
        this.maxBulletAtTime = maxBulletAtTime;
        this.bulletColor = bulletColor;
        this.soundenabled = soundenabled;

        this.shootSound = new Audio("src/assets/sounds/shoot.wav");
        this.shootSound.volume = 0.1;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);
    
       this.bullet.forEach((bullet) => bullet.draw(ctx));
       if(this.timeFillNewBulletAllowod > 0 ) {
        this.timeFillNewBulletAllowod--; 
       }
    }
    collideWith(sprite) {
        const bulletThatWithSpriteIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite));

        if(bulletThatWithSpriteIndex >= 0) {
            this.bullets.splice(bulletThatWithSpriteIndex, 1);
            return true;
        }
        return false;
    }
    shoot(x, y, velocity, timeFillNextBulletAllowed = 0) {
        if(this.bullets.length < this.maxBulletAtTime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if(this.soundEnabled){
                this.shootSound.currentTime = 0;
                this.shootSound.play = 0;
                this.shootSound.play();
            }
            this.timeFillNewBulletAllowed = timeFillNextBulletAllowed;
        } 
    }
}