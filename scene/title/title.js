let SceneTitle = function (game) {
    this.game = game

    this.draw = function () {
        game.ctx.font = "30px serif"
        game.ctx.fillText(`按k开始游戏`, 100, 300)

    }

    this.update = function () {
    }

    // 按k开始游戏
    game.registerAction('k', function () {
        let s = new Scene(game)
        game.replaceScene(s)
    })
}