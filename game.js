let Game = function (fps) {
    let canvas = document.querySelector('#id-canvas')
    let ctx = canvas.getContext('2d')
    let g = {
        canvas: canvas,
        ctx: ctx,
        // 要被注册的操作
        actions: {},
        // 记录被按下的键
        keydowns: {},
    }
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    g.drawImage = function (obj) {
        g.ctx.drawImage(obj.image, obj.x, obj.y)
    }

    // 注册事件
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })


    window.fps = fps
    // 移动图片
    let runloop = function() {
        // 调用注册的函数
        let keys = Object.keys(g.actions)
        for (const key of keys) {
            if (g.keydowns[key]) {
                log('execute anction')
                // 如果按键被按下, 就调用对应的函数
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.ctx.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }
    setTimeout(function run () {
        runloop()
        setTimeout(run, 1000 / window.fps)
    }, 1000 / window.fps);

    return g
}