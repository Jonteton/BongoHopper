// This is the Boss class
// Boss creates the lose game aspect
// This class also handles all the physics in terms of up and down movement for the boss
// NOTE: The dragon follows the path of the bird 
import bossIMG from "../../assets/boss1.png"

export default class Boss {
    constructor(world, loseCondition) {

        this.bossIMG = new Image()
        this.game_Environment = world
        

        this.bossIMG.src = bossIMG

        this.x = -this.bossIMG.width
        this.y = 0
        this.bossVelocityX = 5.5
        this.loseCondition = loseCondition
        this.gameLost = false


    }

    
    drawBoss() {
        this.game_Environment.drawImage(this.bossIMG, this.x, this.y)
    }

    updateBoss(birdVelocityX, birdPositionY, userPoints){
        //Updates boss position and movement
        if(birdVelocityX < this.bossVelocityX && this.x < 0){
            this.x += this.bossVelocityX/3
        }else if(birdVelocityX > this.bossVelocityX && this.x > -450){
            this.x -= this.bossVelocityX/3
        }
        if(this.x >= 0){
            this.gameLost = true
        }

        this.y = birdPositionY - this.bossIMG.height/1.5
        this.drawBoss()
    }
}
