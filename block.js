// 砖块
let Block = function (path, x, y, hp) {
    this.image = loadImage(path)
    this.x = x
    this.y = y
    this.w = this.image.width
    this.h = this.image.height
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