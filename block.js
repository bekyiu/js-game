// 砖块
let Block = function (game, x, y, hp) {
    this.image = game.getImgByName('block')
    this.x = x
    this.y = y
    // 是否活着
    this.alive = true
    this.hp = hp || 1

    this.hit = function () {
        this.hp--
        if (this.hp === 0) {
            this.alive = false
        }
    }

    this.collide = function (ball) {
        return this.alive && this.cc(ball)
    }

    // a∈[b1, b2]
    let between = function (a, b1, b2) {
        return a >= b1 && a <= b2
    }

    this.cc = function (ball) {
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