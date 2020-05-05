class BaseImage {
    /**
     * 
     * @param {*} game 
     * @param {*} name 图片的名字
     */
    constructor(game, name) {
        this.texture = game.getTextureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
}

class Hero extends BaseImage {
    constructor(game, name) {
        super(game, name)
    }
}