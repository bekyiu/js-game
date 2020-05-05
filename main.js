window.paused = false

let _main = function () {

    let images = {
        ball: './img/ball.jpg',
        block: './img/block.jpg',
        paddle: './img/paddle.jpg',
    }

    let game = new Game(60, images, function (game) {

        let scene = new SceneTitle(game)
        game.runWithScene(scene)

    })

    game.enableDebugMode(true)

}

_main()