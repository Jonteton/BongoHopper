// This is the Bird class
// Bird creates the player-controlled object
// This class also handles all the physics in terms of up and down movement
// NOTE: The bird does not move on the X-axis 

export default class Bird {
    constructor(x0, y0, world, birdIMG) {
        this.x = x0;
        this.y = y0;
        this.r = 30;
        this.game_Environment = world;

        this.gravity = 0.08;
        this.velocityY = 0

        this.isFlying = null
        this.isOnGround = null
        this.startedFlying = 0

        this.wingsUp = new Image()

        this.wingsUp = birdIMG
        
        this.birdCenterPointX = this.x + 50
        this.birdCenterPointY = this.y + 4


    }

    drawBird() {
        this.game_Environment.drawImage(this.wingsUp, this.x, this.y-this.r, this.wingsUp.width/2, this.wingsUp.height/2)

    }

    updateBird(groundPoint, angle) {
        //Updates the birds position on the Y-axis
        
        let groundDistance = this.pythagorean(this.birdCenterPointX, this.birdCenterPointY, groundPoint.x, groundPoint.y)
        if(this.isFlying == false && groundDistance < this.r  ){
            //Bird not flying anymore

            this.y = groundPoint.y - this.r
            this.birdCenterPointY = this.y + 4
            this.velocityY = 0
        } else if (this.isFlying == true && groundDistance > this.r){
            //Bird still flying
            
            this.velocityY += 0.04
            this.y += this.velocityY
            this.birdCenterPointY = this.y + 4
        }
        this.drawBird(angle)
    }

    dive(){
        //Triggered when user pressens SPACE
        this.velocityY = 1.4*(this.velocityY)
    }

    pythagorean(p1x, p1y, p2x, p2y){
        return (Math.sqrt(Math.pow((p2x-p1x), 2) + Math.pow((p2y-p1y), 2)))
      }
}
