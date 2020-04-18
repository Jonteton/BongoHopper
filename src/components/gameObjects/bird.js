export default class Bird {
    constructor(x0, y0, radius, world) {
        this.x = x0;
        this.y = y0;
        this.r = radius;
        this.game_Environment = world;
        this.gravity = 0.1;
        this.velocityY = 0
        this.accelerationY = 0

        this.isFlying = null

    }

    drawBird() {
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
        let groundDistance = this.pythagorean(this.x, this.y, this.x, groundPoint)
        if(groundDistance <= this.r && this.isFlying == false){
            this.y = groundPoint - this.r
            this.accelerationY = 0
        } else if (groundDistance > this.r && this.isFlying == true){
            this.accelerationY += this.gravity
            this.y += this.accelerationY
        }
        this.drawBird()
    }

    pythagorean(p1x, p1y, p2x, p2y){
        return (Math.sqrt(Math.pow((p2x-p1x), 2) + Math.pow((p2y-p1y), 2)))
      }
}