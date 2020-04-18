

<template>
  <div>
    <canvas ref="game_canvas"></canvas>
  </div>
</template>

<script>

import game_background from "../assets/game_background.png";
import ground from "../assets/ground12.png";
import Bird from "./gameObjects/bird.js";
import Path from "./gameObjects/path.js"

export default {
  name: "Game",
  props: {
    msg: String
  },

  data: function(){
    return {
      canvas: null,
      canvas_width: 800,
      canvas_height: 600,
      game_Environment: null,
      bird : null,
      path: null,
      pointStepSize: 10,

      keyFlagRight: null,
      keyFlagLeft: null,

      bg_Image: null,
      ground_Image: null,

      bg_width: null,
      bg_height: null,
      ground_width: null,
      ground_height: null
    }
  },


  methods: {
    update(){
      this.drawCanvas()
      this.drawImages()
      this.path.createPath()
      let groundPoint = this.findGroundPoint()
      this.bird.updateBird(groundPoint)
    },

    findGroundPoint() {
      // Experimentera med antalet points för att optimera prestanda!
      for(let i = 0; i < this.path.points.length; i++){
        let groundYDistance = this.pythagorean(this.bird.x, this.bird.y, this.path.points[i].x, this.path.points[i].y)
        if(groundYDistance > this.bird.r && Math.abs(this.bird.x - this.path.points[i].x) < 10){
          //Bird is in the air
          this.bird.isFlying = true
          return this.path.points[i].y
        }
        else if (groundYDistance <= this.bird.r && Math.abs(this.bird.x - this.path.points[i].x) < 10){
          //Bird is not in the air
          this.bird.isFlying = false
          return this.path.points[i].y
        }
      }
    },

    createCanvas () {
      //Creates the canvas
      //Sets canvas width and height
      this.$refs.game_canvas.width = this.canvas_width
      this.$refs.game_canvas.height = this.canvas_height
      this.canvas = this.$refs.game_canvas;
      this.game_Environment = this.canvas.getContext('2d');
    },
    loadImages () {
      //Loads images
      this.bg_width = this.canvas_width
      this.ground_height = 100
      this.bg_height = this.canvas_height - this.ground_height

      this.bg_Image = new Image();
      //this.ground_Image = new Image();
      //this.ground_Image.src = ground;
      this.bg_Image.src = game_background;
    },

    loadAssets () {
      //Loads assets to be used, only exectued once
      this.createCanvas()
      this.loadImages()
      this.createPath()
      this.createBird()
      this.initGameLoop()
    },

    createBird() {
      //Creates the bird instance
      let birdRadius = 30, x0offset = 100
      let birdx0 = birdRadius + x0offset
      let birdy0 = this.bg_height - birdRadius
      this.bird = new Bird(birdx0, birdy0, birdRadius, this.game_Environment)
    },

    createPath(){
      //temporary
      let pathx0 = 0
      let pathy0 = this.bg_height
      this.path = new Path(pathx0, pathy0, this.canvas_width, this.canvas_height, this.game_Environment, this.pointStepSize)
    },

    drawCanvas() {
      //Draws the canvas to the screen
      this.game_Environment.fillStyle = "black";
      this.game_Environment.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawImages(){
      let bgx0 = 0, bgy0 = 0
      //let groundx0 = 0, groundy0 = this.bg_height
      //Draws images to the screen
      this.game_Environment.drawImage(this.bg_Image, bgx0, bgy0, this.bg_width, this.bg_height)

    },

    initGameLoop() {
      //FPS på 50 ger att antalet refresh/sekund = 1000/50 = 20
      let refreshTimer = 10
      setInterval(() => this.update(), refreshTimer)
    },

    keyHandler(keypress) {
      if (keypress.key == "d" || keypress.key == "ArrowRight" ){
        this.keyFlagRight += 1
        if(this.keyFlagRight == 1){
          this.keyFlagRight = 0
          this.movementHandler("right")
        }
      }
      if (keypress.key == "a" || keypress.key == "ArrowLeft" ){
        this.keyFlagLeft += 1
        if(this.keyFlagLeft == 2){
          this.keyFlagLeft = 0
          this.movementHandler("left")
        }
      }
    },

    movementHandler(message) {
      if(message == "right"){
          this.path.increaseVelocity()
      } 
      //else if (message == "left"){ THIS HANDLES LEFTWARD MOVEMENT
        //for(let i = 0; i < this.path.points.length; i++){
          //this.path.points[i].x += 10
        //}
      //}
    },

    pythagorean(p1x, p1y, p2x, p2y){
      return (Math.sqrt(Math.pow((p2x-p1x), 2) + Math.pow((p2y-p1y), 2)))
    }
  },

  mounted: function () {

    window.addEventListener("keydown", event => {
      this.keyHandler(event)
    });
    this.loadAssets()
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
