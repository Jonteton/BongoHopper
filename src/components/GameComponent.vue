<template>
  <div>
    <canvas ref="game_canvas"></canvas>
  </div>
</template>

<script>

import game_background from "../assets/beach.png";
import birdIMG from "../assets/bird2.png";
import bossIMG from "../assets/boss1.png"
import ground from "../assets/ground12.png";
import Bird from "./gameObjects/bird.js";
import Path from "./gameObjects/path.js"
import introAudio from "../assets/intro.mp3"

import {swe_lang} from "../assets/lang/swe.js"
import {eng_lang} from "../assets/lang/eng.js"

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
      
      pointStepSize: 5,

      keyFlagSpace: null,

      bg_Image: null,
      bird_Image: null,
      boss_Image: null,

      first_jump: true,
      first_landing: true,

      bg_width: null,
      bg_height: null,
      score_variable: 0,

      lang : null
    }
  },


  methods: {
    update(){
      //Updates the game with new positions, animations etc
      this.render()
      this.path.createPath()
      this.updateBirdYPosition()
    },

    render(){
      //Handles the View part of MVC. View components are also represented in bird and path separately
      this.drawCanvas()
      this.drawImages()
      this.drawScore()

      if(this.first_jump == false && this.first_landing == true){
        //If first jump show tutorial
        this.drawPopUp()
      }
    },

    updateBirdYPosition() {
      // Finds the point straight below the bird
      // THIS CAN BE OPTIMIZED; For example birds X is fixed, dont have to look through whole array
      let pointIndexBelowBird = this.getPointIndexBelowBird()
      let nextPointIndex = pointIndexBelowBird + 1
      
      let pointBelowBird = this.path.points[pointIndexBelowBird]
      let nextPointBelowBird = this.path.points[nextPointIndex]
      
      let groundYDistance = this.pythagorean(this.bird.birdCenterPointX, this.bird.y, pointBelowBird.x, pointBelowBird.y)

      if(groundYDistance > this.bird.r){
        //Bird is in the air
        this.birdInAir(pointBelowBird)
      }
      else if (groundYDistance <= this.bird.r){
        //Bird is not in the air
        this.birdOnGround(pointBelowBird, nextPointBelowBird)
      }
    },

    birdInAir(pointBelowBird){
        if(this.first_jump == true){
          this.first_jump = false
        }
        this.bird.isFlying = true
        if(this.bird.isFlying == true && this.bird.isOnGround == true){
          //If bird just left the ground increase birdY velocity
        }
        this.bird.isOnGround = false

        this.bird.updateBird(pointBelowBird, this.angle)

    },

    birdOnGround(pointBelowBird, nextPointBelowBird){
          //Bird is not in the air
          if(this.first_landing == true && this.first_jump == false){
            this.first_landing = false
          }
          this.bird.isFlying = false
          if(this.bird.isFlying == false && this.bird.isOnGround == false){
            //If bird just hit ground increases birdX velocity
            this.path.velocityX = this.path.velocityX + this.bird.velocityY*0.09
          }
          this.bird.isOnGround = true


          this.upOrDown(pointBelowBird, nextPointBelowBird)
          this.bird.updateBird(pointBelowBird, this.angle)
    },

    getPointIndexBelowBird(){
      //Fetches the point straight below the bird, this point is used
      //to determine if bird is flying, moving up or moving down in vertical path
      for(let i = 0; i < this.path.points.length/2; i++){
        if(Math.abs(this.bird.birdCenterPointX - this.path.points[i].x) <= this.pointStepSize){
          //If above criteria is met it is the point below the bird thus return it
          return i
        }
      }
    },

    upOrDown(currentPoint, nextPoint){
      let deltaX = nextPoint.x - currentPoint.x
      let deltaY = nextPoint.y - currentPoint.y

      this.angle = Math.atan(deltaY/deltaX)*180/Math.PI
      if(this.angle < 0){
        this.birdGoingUp()
      } else if(this.angle >= 0){  
        this.birdGoingDown()
      }
    },

    angleNextPoint(currentPoint, nextPoint){
      //Calculates the angle between current point and next point on the track
      let deltaX = nextPoint.x - currentPoint.x
      let deltaY = nextPoint.y - currentPoint.y

      this.angle = Math.atan(deltaY/deltaX)*180/Math.PI
      return this.angle
    },

    birdGoingUp() {
      this.path.velocityX = this.path.velocityX + 0.0005*this.angle
      if(this.path.velocityX > this.path.maxVelocity){
        this.path.velocityX = this.path.maxVelocity
      }
    },

    birdGoingDown() {
      this.path.velocityX = this.path.velocityX - 0.004*this.angle
      if(this.path.velocityX > this.path.maxVelocity){
        this.path.velocityX = this.path.maxVelocity
      }
    },

    drawPopUp(){
      this.game_Environment.fillStyle = "white"
      this.game_Environment.font = "30px Arial"
      this.game_Environment.fillText(this.lang.tutorial, this.canvas.width/2 - 200, this.canvas_height/2)
    },

    drawScore() {
      this.score_variable += 0.2
      this.game_Environment.fillStyle = "white"
      this.game_Environment.font = "48px Arial"
      this.game_Environment.fillText(this.lang.scoretext + Math.round(this.score_variable), this.canvas.width - 500, 45)
    },

    createCanvas () {
      //Creates the canvas
      this.$refs.game_canvas.width = this.canvas_width 
      this.$refs.game_canvas.height = this.canvas_height - 5
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
      this.bird_Image = new Image();
      this.boss_Image = new Image();

      this.bird_Image.src = birdIMG
      this.bg_Image.src = game_background;
      this.boss_Image.src = bossIMG


    },

    loadAssets () {
      //Loads assets to be used, only exectued once
      this.loadLanguage()
      this.createCanvas()
      this.loadImages()
      this.createPath()
      this.createBird()
      this.initGameLoop()
    },

    loadLanguage(){
      if(document.cookie == "english"){
        this.lang = eng_lang
      } else if (document.cookie == "swedish"){
        this.lang = swe_lang

      }
    },

    createBird() {
      //Instantiates the Bird
      let x0offset = 100
      let birdx0 = 30 + x0offset
      let birdy0 = this.bg_height
      this.bird = new Bird(birdx0, birdy0, this.game_Environment, this.bird_Image)
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
      this.game_Environment.drawImage(this.boss_Image, 0, 0)


    },

    initGameLoop() {
      //FPS på 50 ger att antalet refresh/sekund = 1000/50 = 20
      let audio1 = new Audio(introAudio)
      audio1.play()
      let refreshTimer = 10
      setInterval(() => this.update(), refreshTimer)

    },

    keyHandler(keypress) {
      //KeyFlag is used to prevent the user from spamming the button
      if (keypress.keyCode == 32 ){
        this.keyFlagSpace += 1
        if(this.keyFlagSpace == 3){
          this.keyFlagSpace = 0
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
