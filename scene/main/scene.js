class Scene extends BaseScene {
    constructor(game) {
        super(game)
        this.score = 0
        // this.x = 100
        // this.y = 390
        // this.speed = 15
        // 构造一个板子
        this.paddle = new Paddle(game, 100, 390, 15)
        this.ball = new Ball(game, 100, 390 - 100, 4, 4)
        // 加载第一关
        this.blocks = loadLevel(1, game)

        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fire()
        })

        // 拖拽小球
        let drag = false
        let ox = 0, oy = 0
        game.canvas.addEventListener('mousedown',  (event) => {
            let x = event.offsetX
            let y = event.offsetY
            if (this.ball.hasPoint(x, y)) {
                ox = x - this.ball.x
                oy = y - this.ball.y
                drag = true
            }
        })
        game.canvas.addEventListener('mousemove', (event) => {
            let x = event.offsetX
            let y = event.offsetY

            if (drag) {
                // 减去ox, oy仅仅是为了让拖拽的体验更好
                // 可以直接赋值为x, y
                this.ball.x = x - ox
                this.ball.y = y - oy
            }
        })
        game.canvas.addEventListener('mouseup', (event) => {
            drag = false
        })
    }

    draw() {
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        for (let i = 0; i < this.blocks.length; i++) {
            let b = this.blocks[i]
            if (b.alive) {
                this.game.drawImage(b)
            }
        }
        this.game.ctx.font = "20px serif"
        this.game.ctx.fillText(`score: ${this.score}`, 10, 480)

    }

    update() {
        if (window.paused) {
            return
        }
        this.ball.move()
        // 判断是否游戏结束
        if (this.ball.y >= this.paddle.y) {
            let end = new SceneEnd(this.game,this. score)
            this.game.replaceScene(end)
            return
        }
        // 判断板子和球是否相撞
        if (this.paddle.collide(this.ball)) {
            // 反弹
            this.ball.rebound()
        }
        // 判断球和砖块是否相撞
        for (let i = 0; i < this.blocks.length; i++) {
            let b = this.blocks[i]
            if (b.collide(this.ball)) {
                b.hit()
                this.ball.rebound()
                if (!b.alive) {
                    this.score += 100
                }
            }
        }
    }
}