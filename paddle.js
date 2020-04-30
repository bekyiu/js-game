// 返回一个板子对象
let Paddle = function (path, x, y, speed) {
    this.image = loadImage(path)
    this.x = x
    this.y = y
    this.speed = speed

    // 限定板子不能移出边界
    this.move = function (x) {
        if (x <= 0) {
            x = 0
        }
        else if (x + this.image.width >= 1000) {
            x = 1000 - this.image.width
        }
        this.x = x
    }

    this.moveLeft = function () {
        this.move(this.x - this.speed)
    }
    this.moveRight = function () {
        this.move(this.x + this.speed)
    }
    this.collide = function (ball) {
        if (ball.y + ball.image.height >= this.y) {
            if (ball.x >= this.x && ball.x + ball.image.width <= this.x + this.image.width) {
                return true
            }
        }
        return false
    }
}