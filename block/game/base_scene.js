class BaseScene {
    constructor(game) {
        this.game = game
        window.addEventListener('keydown', (event) => {
            let k = event.key
            if(k === 'r' || k === 'k')
            {
                let s = new Scene(game)
                game.replaceScene(s)
            }
        })
    }

    draw() {

    }
    update() {

    }
}