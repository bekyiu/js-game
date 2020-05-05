class SceneTitle extends BaseScene {
    constructor(game) {
        super(game)
    }

    draw() {
        this.game.ctx.font = "30px serif"
        this.game.ctx.fillText(`按k开始游戏`, 100, 300)
    }
}