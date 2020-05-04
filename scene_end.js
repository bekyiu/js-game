/**
 * 游戏结束的场景
 * @param {*} game 
 * @param {*} score 
 */
let SceneEnd = function (game, score) {
    this.game = game

    this.draw = function () {
        game.ctx.font = "30px serif"
        game.ctx.fillText(`game over, 你的得分是${score}`, 100, 300)

    }

    this.update = function () {
    }

}