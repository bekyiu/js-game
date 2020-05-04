let Scene = function (game) {
    this.game = game

    let x = 100
    let y = 390
    let speed = 15
    let score = 0

    // 构造一个板子
    let paddle = new Paddle(game, x, y, speed)
    let ball = new Ball(game, x, y - 100, 4, 4)
    // 加载第一关
    let blocks = loadLevel(1, game)

    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    enableDebugMode(true, blocks, game)

    // 拖拽小球
    let drag = false
    let ox = 0, oy = 0
    game.canvas.addEventListener('mousedown', function (event) {
        let x = event.offsetX
        let y = event.offsetY
        if (ball.hasPoint(x, y)) {
            ox = x - ball.x
            oy = y - ball.y
            drag = true
        }
    })
    game.canvas.addEventListener('mousemove', function (event) {
        let x = event.offsetX
        let y = event.offsetY

        if (drag) {
            // 减去ox, oy仅仅是为了让拖拽的体验更好
            // 可以直接赋值为x, y
            ball.x = x - ox
            ball.y = y - oy
        }
    })
    game.canvas.addEventListener('mouseup', function (event) {
        drag = false
    })



    this.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }
        game.ctx.font = "20px serif"
        game.ctx.fillText(`score: ${score}`, 10, 480)

    }

    this.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断是否游戏结束
        if (ball.y >= paddle.y) {
            let end = new SceneEnd(game, score)
            game.replaceScene(end)
            return
        }
        // 判断板子和球是否相撞
        if (paddle.collide(ball)) {
            // 反弹
            ball.rebound()
        }
        // 判断球和砖块是否相撞
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            if (b.collide(ball)) {
                b.hit()
                ball.rebound()
                if (!b.alive) {
                    score += 100
                }
            }
        }
    }

}