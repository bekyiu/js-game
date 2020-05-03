/**
 * @param {*} fps 每秒刷新多少次  
 * @param {*} images 一个对象, key是图片的引用, value是图片的路径
 */
let Game = function (fps, images, callback) {
    let canvas = document.querySelector('#id-canvas')
    let ctx = canvas.getContext('2d')
    let g = {
        canvas: canvas,
        ctx: ctx,
        // 要被注册的操作
        actions: {},
        // 记录被按下的键
        keydowns: {},
        // 加载所有的图片
        images: {},
    }
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    g.drawImage = function (obj) {
        g.ctx.drawImage(obj.image.image, obj.x, obj.y)
    }

    g.getImgByName = function(name) {
        let img = g.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    // 注册事件
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })


    window.fps = fps


    let loads = []
    for (const key in images) {
        let path = images[key]
        let img = new Image()
        img.src = path
        img.onload = function () {  
            // 存入
            g.images[key] = img
            loads.push(1)
            log(`载入图片${img.src}`)
            if(loads.length == Object.keys(images).length)
            {
                exec()
            }
        }
    }



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

    let exec = function() {
        callback(g)
        setTimeout(function run () {
            runloop()
            setTimeout(run, 1000 / window.fps)
        }, 1000 / window.fps);
    }

    return g
}