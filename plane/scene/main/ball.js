// 球
let Ball = function (game, x, y, speedX, speedY) {
    this.image = game.getImgByName('ball')
    this.x = x
    this.y = y
    this.speedX = speedX
    this.speedY = speedY
    this.fired = false

    this.fire = function () {
        this.fired = true
    }
    this.move = function () {
        if (this.fired) {
            if (this.x < 0 || this.x > 1000 - this.image.w) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y > 500 - this.image.h) {
                this.speedY *= -1
            }

            this.x += this.speedX
            this.y += this.speedY
        }
    }
    this.rebound = function () {
        this.speedY *= -1
    }

    // 给定坐标是否位于球中
    this.hasPoint = function(x, y){
        let xIn = x >= this.x && x <= this.x + this.image.w
        let yIn = y >= this.y && y <= this.y + this.image.h

        return xIn && yIn
    }

}