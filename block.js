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
        return this.alive &&
            (rectNested(this, ball) || rectNested(ball, this))
    }
}