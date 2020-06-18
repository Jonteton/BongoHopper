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
import Boss from "./gameObjects/boss.js"
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
      boss: null,
      
      pointStepSize: 5,

      keyFlagSpace: null,

      bg_Image: null,
      bird_Image: null,


      first_jump: true,
      first_landing: true,

      bg_width: null,
      bg_height: null,
      score_variable: 0,
      birdX0: 30 + 200,
      birdRadius : 30,

      lang : null,
      interval : null,
    }
  },


  methods: {
    update(){
      //Updates the game with new positions, animations etc
      this.render()
      this.path.createPath()
      this.updateBirdYPosition()
      this.boss.updateBoss(this.path.velocityX, this.bird.y, this.score_variable)

      if(this.boss.gameLost == true){
        clearInterval(this.interval)
        this.gameOver()
      }
    },

    render(){
      //Handles the View part of MVC. View components are also represented in bird, path and boss separately
      this.drawCanvas()
      this.drawImages()
      this.drawScore()

      if(this.score_variable < 100){
        //If first jump show tutorial
        this.drawTutorial1()
      } else if (this.score_variable > 100 && this.score_variable < 200){
        this.drawTutorial2()
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
      //If bird is in the air do this
        if(this.first_jump == true){
          //First jump by the bird
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
          
          this.upOrDown(pointBelowBird, nextPointBelowBird)

          if(this.bird.isFlying == false && this.bird.isOnGround == false){
            //If bird just hit ground increases birdX velocity depending on angle
            //Angle is negative going up and positive going down
              this.path.velocityX = this.path.velocityX + this.angle/25
          }
          this.bird.isOnGround = true


          this.bird.updateBird(pointBelowBird, this.angle)
    },

    getPointIndexBelowBird(){
      //Fetches the point straight below the bird, this point is used
      //to determine if bird is flying, moving up or moving down in vertical path
      for(let i = 0; i < this.path.points.length; i++){
        if(Math.abs(this.bird.birdCenterPointX - this.path.points[i].x) <= this.pointStepSize){
          //If above criteria is met it is the point below the bird thus return it
          return i
        }
      }
    },

    upOrDown(currentPoint, nextPoint){
      //Determines if bird is going up or down a hill
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
      this.path.velocityX = this.path.velocityX - Math.sin(this.angle)/50
      if(this.path.velocityX > this.path.maxVelocity){
        this.path.velocityX = this.path.maxVelocity
      }
    },

    birdGoingDown() {
      this.path.velocityX = this.path.velocityX + Math.sin(this.angle)/50 
      if(this.path.velocityX > this.path.maxVelocity){
        this.path.velocityX = this.path.maxVelocity
      }
    },

    drawTutorial1(){
      //Draws the instructions for movement
      this.game_Environment.fillStyle = "white"
      this.game_Environment.font = "30px Arial"
      this.game_Environment.fillText(this.lang.tutorial1, this.canvas.width/2 - 200, this.canvas_height/2)
      this.game_Environment.fillText(this.lang.tutorial12, this.canvas.width/2 - 200, this.canvas_height/2 + 40)

    },

    drawTutorial2(){
      //Draws instructions for the losing criteria
      this.game_Environment.fillStyle = "white"
      this.game_Environment.font = "30px Arial"
      this.game_Environment.fillText(this.lang.tutorial2, this.canvas.width/2 - 200, this.canvas_height/2)
    },

    drawScore() {
      //Draws the score to the screen
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

      this.bird_Image.src = birdIMG
      this.bg_Image.src = game_background;


    },

    loadAssets () {
      //Loads assets to be used, only exectued once
      this.loadLanguage()
      this.createCanvas()
      this.loadImages()
      this.createPath()
      this.createBoss()
      this.createBird()
      this.initGameLoop()

      if(this.boss.gameLost == true){
        //loss condition checked in boss class
        clearInterval(this.interval)
      }
    },

    loadLanguage(){
      //Checks the cookie for language option
      if(document.cookie == "english"){
        this.lang = eng_lang
      } else if (document.cookie == "swedish"){
        this.lang = swe_lang

      }
    },

    createBoss() {
      this.boss = new Boss(this.game_Environment, this.birdX0)
    },

    createBird() {
      //Instantiates the Bird

      let birdy0 = this.bg_height
      this.bird = new Bird(this.birdX0, birdy0, this.game_Environment, this.bird_Image)
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
      
      let audio1 = new Audio(introAudio)
      audio1.play()
      let refreshTimer = 10
      this.interval = setInterval(() => this.update(), refreshTimer)

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
      if (keypress.keyCode == 13 && this.boss.gameLost == true ){
        this.score_variable = 0
        this.loadAssets()

      }
    },

    movementHandler(message) {
      //If space is pressed perform action
      if(message == "dive"){
        this.bird.dive()
      }
    },

    gameOver(){
      //Triggered when game is over
      this.game_Environment.fillStyle = "white"
      this.game_Environment.font = "40px Arial"
      this.game_Environment.fillText(this.lang.endText1 + Math.round(this.score_variable) + this.lang.endText2, this.canvas_width /3, this.canvas_height/3)
      this.game_Environment.fillStyle = "black"
      this.game_Environment.fillText(this.lang.endText3, this.canvas_width /3, this.canvas_height/3 + 40)

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
