// This is the Bird class
// Bird creates the player-controlled object
// This class also handles all the physics in terms of up and down movement
// NOTE: The bird does not move on the X-axis

export default class Bird {
    constructor(x0, y0, radius, world) {
        this.x = x0;
        this.y = y0;
        this.r = radius;
        this.game_Environment = world;

        this.gravity = 0.02;
        this.velocityY = 0
        this.accelerationY = 0

        this.isFlying = null

    }

    drawBird() {
        //Draws the bird to the screen
        this.game_Environment.beginPath();
        this.game_Environment.lineWidth = 1
        this.game_Environment.arc(this.x, this.y, this.r, 0, Math.PI*2,true);
        this.game_Environment.fillStyle = "green"
        this.game_Environment.fill()
        this.game_Environment.strokeStyle = "black"
        this.game_Environment.stroke();
        this.game_Environment.closePath();
    }

    updateBird(groundPoint) {
        //Updates the birds position on the Y-axis
        let groundDistance = this.pythagorean(this.x, this.y, this.x, groundPoint)
        if(groundDistance <= this.r && this.isFlying == false){
            //Bird not flying anymore
            this.y = groundPoint - this.r
            this.accelerationY = 0
        } else if (groundDistance > this.r && this.isFlying == true){
            //Bird still flying
            this.accelerationY += this.gravity
            this.y += this.accelerationY
        }
        this.drawBird()
    }

    dive(){
        this.accelerationY += 1.5
        this.velocityY = this.accelerationY
    }

    pythagorean(p1x, p1y, p2x, p2y){
        return (Math.sqrt(Math.pow((p2x-p1x), 2) + Math.pow((p2y-p1y), 2)))
      }
}
