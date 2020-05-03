// 返回一个板子对象
let Paddle = function (game, x, y, speed) {
    this.image = game.getImgByName('paddle')
    this.x = x
    this.y = y
    this.speed = speed

    // 限定板子不能移出边界
    this.move = function (x) {
        if (x <= 0) {
            x = 0
        }
        else if (x + this.image.w >= 1000) {
            x = 1000 - this.image.w
        }
        this.x = x
    }

    this.moveLeft = function () {
        this.move(this.x - this.speed)
    }
    this.moveRight = function () {
        this.move(this.x + this.speed)
    }

    // a∈[b1, b2]
    let between = function (a, b1, b2) {
        return a >= b1 && a <= b2
    }

    this.collide = function (ball) {
        if (between(this.x, ball.x, ball.x + ball.image.w) ||
            between(ball.x, this.x, this.x + this.image.w)) {

            if (between(this.y, ball.y, ball.y + ball.image.h) ||
                between(ball.y, this.y, this.y + this.image.h)) {
                return true
            }
            
        }
        return false
    }
}