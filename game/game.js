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
        // 当前显示的场景
        scene: null,
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

    // update和draw的都应该是某一个场景, 而不是具体的内容
    // 想要替换游戏展示的内容时, 只要替换场景即可
    g.update = function() {
        g.scene.update()
    }
    g.draw = function() {
        g.scene.draw()
    }
    g.runWithScene = function (scene) {
        g.scene = scene
        setTimeout(function run () {
            runloop()
            setTimeout(run, 1000 / window.fps)
        }, 1000 / window.fps);
    }
    g.replaceScene = function (scene) {  
        g.scene = scene
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
                // 加载完所有图片后开始运行游戏
                _start()
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

    let _start = function() {
        callback(g)
    }
    return g
}