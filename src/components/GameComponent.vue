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

  data: function(){
    return {
      canvas: null,
      canvas_width: window.innerWidth,
      canvas_height: window.innerHeight,
      game_Environment: null,
      bird : null,
      path: null,

      fps: null,
      times: [],

      pointStepSize: 5,

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
      //Updates the game with new positions, animations etc
      this.drawCanvas()
      this.drawImages()
      this.path.createPath()
      let groundPoint = this.findGroundPoint()
      this.bird.updateBird(groundPoint)
    },

    findGroundPoint() {
      // Finds the point straight below the bird
      // THIS CAN BE OPTIMIZED; For example birds X is fixed, dont have to look through whole array
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
      this.$refs.game_canvas.width = this.canvas_width
      this.$refs.game_canvas.height = this.canvas_height
      this.canvas = this.$refs.game_canvas;
      this.game_Environment = this.canvas.getContext('2d');
    },
    loadImages () {
      //Loads all the images later to be used for rendering
      let bgY_offset = 100
      this.ground_height = this.canvas_height - bgY_offset

      this.bg_width = this.canvas_width
      this.bg_height = this.ground_height

      this.bg_Image = new Image();
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
      //Instantiates the Bird
      let birdRadius = 30, x0offset = 100
      let birdx0 = birdRadius + x0offset
      let birdy0 = this.bg_height - birdRadius
      this.bird = new Bird(birdx0, birdy0, birdRadius, this.game_Environment)
    },

    createPath(){
      //Instantiates the Path
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
      //Draws the images to the screen
      let bgx0 = 0, bgy0 = 0
      this.game_Environment.drawImage(this.bg_Image, bgx0, bgy0, this.bg_width, this.bg_height)

    },

    initGameLoop() {
      //FPS på 50 ger att antalet refresh/sekund = 1000/50 = 20
      let refreshTimer = 10
      setInterval(() => this.update(), refreshTimer)

    },

    keyHandler(keypress) {
      //KeyFlag is used to prevent the user from spamming the button
      if (keypress.keyCode == 32 ){
        this.keyFlagRight += 1
        if(this.keyFlagRight == 3){
          this.keyFlagRight = 0
          this.movementHandler("dive")
        }
      }
    },

    movementHandler(message) {
      //If space is pressed perform action
      if(message == "dive"){
        this.bird.dive()
      }
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
