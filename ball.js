// 球
let Ball = function (path, x, y, speedX, speedY) {
    this.image = loadImage(path)
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
            if (this.x < 0 || this.x > 1000 - this.image.width) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y > 500 - this.image.height) {
                this.speedY *= -1
            }

            this.x += this.speedX
            this.y += this.speedY
        }
    }
    this.rebound = function () {
        this.speedY *= -1
    }

}