/**
 * 游戏结束的场景
 */
class SceneEnd extends BaseScene {
    constructor(game, score) {
        super(game)
        this.score = score
        game.registerAction('r', function () {
            let s = new Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.ctx.font = "30px serif"
        this.game.ctx.fillText(`game over, 你的得分是${this.score}, 按r重新开始`, 100, 300)
    }
}