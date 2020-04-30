// 砖块
let Block = function (path, x, y) {
    this.image = loadImage(path)
    this.x = x
    this.y = y
    this.w = this.image.width
    this.h = this.image.height
    // 是否活着
    this.alive = true

    this.kill = function () {
        this.alive = false
    }

    this.collide = function (ball) {
        return this.alive &&
            (rectNested(this, ball) || rectNested(ball, this))
    }
}