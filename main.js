// 加载关卡
let loadLevel = function (n, game) {
    n--
    let blockPos = level[n]
    let blocks = []
    for (let i = 0; i < blockPos.length; i++) {
        const pos = blockPos[i];
        let b = new Block(game, pos[0], pos[1], pos[2])
        blocks.push(b)
    }
    return blocks
}

let paused = false

let enableDebugMode = function (enable, blocks, game) {
    if (!enable) {
        return
    }
    // 暂停功能
    window.addEventListener('keydown', function (event) {
        let k = event.key
        if (k === 'p') {
            paused = !paused
            log('暂停/启动')
        } else if ('12345'.includes(k)) {
            log(`载入第${k}关`)
            // 清空数组
            blocks.length = 0
            let levelK = loadLevel(Number(k), game)
            for (const i in levelK) {
                blocks[i] = levelK[i]
            }
        }
    })

    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        let curFps = Number(event.target.value) + 1
        window.fps = curFps
        log(`fps调整为${curFps}`)
    })
}

let _main = function () {

    let x = 100
    let y = 390
    let speed = 15
    let score = 0

    let images = {
        ball: './ball.jpg',
        block: './block.jpg',
        paddle: './paddle.jpg',
    }

    let game = Game(60, images, function (game) {
        // 构造一个板子
        let paddle = new Paddle(game, x, y, speed)
        let ball = new Ball(game, x, y - 100, 4, 4)
        // 加载第一关
        let blocks = loadLevel(1, game)
        // 注册操作
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

        game.update = function () {
            if (paused) {
                return
            }
            ball.move()
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

        game.draw = function () {
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
    })
}

_main()