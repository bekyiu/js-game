/**
 * 游戏结束的场景
 * @param {*} game 
 * @param {*} score 
 */
let SceneEnd = function (game, score) {
    this.game = game

    this.draw = function () {
        game.ctx.font = "30px serif"
        game.ctx.fillText(`game over, 你的得分是${score}, 按r重新开始`, 100, 300)

    }

    this.update = function () {
    }

    game.registerAction('r', function () {
        let s = new Scene(game)
        game.replaceScene(s)
    })

}