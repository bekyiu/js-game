class Game {
    /**
     * 
     * @param {*} fps 每秒刷新多少次 
     * @param {*} images 一个对象, key是图片的引用, value是图片的路径
     * @param {*} callback game初始化好之后的回调
     */
    constructor(fps, images, callback) {
        window.fps = fps
        this.callback = callback
        this.canvas = document.querySelector('#id-canvas')
        this.ctx = this.canvas.getContext('2d')
        // 当前显示的场景
        this.scene = null
        // 要被注册的操作
        this.actions = {}
        // 记录被按下的键
        this.keydowns = {}
        // 加载所有的图片
        this.images = images

        // 注册事件
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    drawImage(obj) {
        this.ctx.drawImage(obj.image.image, obj.x, obj.y)
    }

    getImgByName(name) {
        let img = this.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    // update和draw的都应该是某一个场景, 而不是具体的内容
    // 想要替换游戏展示的内容时, 只要替换场景即可
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }

    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps);
    }
    replaceScene(scene) {
        this.scene = scene
    }

    init() {
        let loads = []
        for (const key in this.images) {
            let path = this.images[key]
            let img = new Image()
            img.src = path
            img.onload = () => {
                // 存入
                this.images[key] = img
                loads.push(1)
                log(`载入图片${img.src}`)
                if (loads.length == Object.keys(this.images).length) {
                    // 加载完所有图片后开始运行游戏
                    this._start()
                }
            }
        }
    }

    // 移动图片
    runloop() {
        // 调用注册的函数
        let keys = Object.keys(this.actions)
        for (const key of keys) {
            if (this.keydowns[key]) {
                log('execute anction')
                // 如果按键被按下, 就调用对应的函数
                this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()

        setTimeout(() => this.runloop(), 1000 / window.fps)
    }

    _start() {
        this.callback(this)
    }
}