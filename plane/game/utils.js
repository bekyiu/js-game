let log = console.log.bind(console)

// 根据路径加载图片
let loadImage = function (path) {
    let img = new Image()
    img.src = path
    return img
}

// b在a里面
let rectNested = function (a, b) {
    if (b.x >= a.x && b.x <= a.x + a.image.w) {
        if (b.y >= a.y && b.y <= a.y + a.image.h) {
            return true
        }
    }
    return false
}