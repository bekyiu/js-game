class SceneTitle extends BaseScene {
    constructor(game) {
        super(game)
        // 按k开始游戏
        game.registerAction('k', function () {
            let s = new Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.ctx.font = "30px serif"
        this.game.ctx.fillText(`按k开始游戏`, 100, 300)
    }
}