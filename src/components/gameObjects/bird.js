// This is the Bird class
// Bird creates the player-controlled object
// This class also handles all the physics in terms of up and down movement
// NOTE: The bird does not move on the X-axis 
import wingsUp from "../../assets/bird1.png";
import wingsAlmostUp from "../../assets/bird2.png";
import wingsAlmostDown from "../../assets/bird3.png";
import wingsDown from "../../assets/bird4.png";


export default class Bird {
    constructor(x0, y0, world) {
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
        this.wingsAlmostUp = new Image()
        this.wingsAlmostDown = new Image()
        this.wingsDown = new Image()

        this.wingsUp.src = wingsUp
        this.wingsAlmostUp.src = wingsAlmostUp
        this.wingsAlmostDown.src = wingsAlmostDown
        this.wingsDown.src = wingsDown

        this.wingsUp.width = this.wingsUp.width/2
        this.wingsUp.height = this.wingsUp.height/2
        this.wingsAlmostUp.width = this.wingsAlmostUp.width/2
        this.wingsAlmostUp.height = this.wingsAlmostUp.height/2
        this.wingsAlmostDown.width = this.wingsAlmostDown.width/2
        this.wingsAlmostDown.height = this.wingsAlmostDown.height/2
        this.wingsDown.width = this.wingsDown.width/2
        this.wingsDown.height = this.wingsDown.height/2

        this.birdCenterPointX = this.x + 50
        this.birdCenterPointY = this.y + 4

        this.birdImages = []

    }

    drawBird(angle) {
        this.game_Environment.drawImage(this.wingsUp, this.x, this.y-this.wingsUp.height/2, this.wingsUp.width, this.wingsUp.height)
        //this.game_Environment.fillRect(this.birdCenterPointX, this.birdCenterPointY, 5, 5)

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
            
            this.velocityY += 0.02
            this.y += this.velocityY
            this.birdCenterPointY = this.y + 4
        }
        this.drawBird(angle)
    }

    dive(){
        this.velocityY = 1.2*(this.velocityY)
    }

    pythagorean(p1x, p1y, p2x, p2y){
        return (Math.sqrt(Math.pow((p2x-p1x), 2) + Math.pow((p2y-p1y), 2)))
      }
}
