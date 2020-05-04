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

window.paused = false

let enableDebugMode = function (enable, blocks, game) {
    if (!enable) {
        return
    }
    // 暂停功能
    window.addEventListener('keydown', function (event) {
        let k = event.key
        if (k === 'p') {
            window.paused = !window.paused
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

    let images = {
        ball: './img/ball.jpg',
        block: './img/block.jpg',
        paddle: './img/paddle.jpg',
    }

    let game = Game(60, images, function (game) {

        let scene = new SceneTitle(game)
        game.runWithScene(scene)

    })

}

_main()