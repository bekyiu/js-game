class BaseScene {
    constructor(game) {
        this.game = game
        // 存所有的图片
        this.elements = []
    }

    draw() {
        for (const e of this.elements) {
            this.game.drawImage(e)
        }
    }
    update() {

    }

    addElements(baseImg){
        this.elements.push(baseImg)
    }
}