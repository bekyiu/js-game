window.paused = false

let _main = function () {

    let images = {
        background: './img/background.png',
        hero: './img/hero1.png',
        enemy: './img/enemy1.png',
    }

    let game = new Game(60, images, function (game) {

        let scene = new Scene(game)
        game.runWithScene(scene)

    })

    game.enableDebugMode(true)

}

_main()