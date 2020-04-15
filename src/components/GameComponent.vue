

<template>
  <div>
    <canvas ref="game_canvas" width="700" height = "512"></canvas>
    <h1> tjo </h1>
  </div>
</template>

<script>

import game_background from "../assets/game_background.png";

export default {
  name: "Game",
  props: {
    msg: String
  },


  methods: {
    draw () {
      let canvas = this.$refs.game_canvas;
      let ctx = canvas.getContext('2d');
      let bg = new Image();
      bg.src = game_background;
      bg.onload = function () {
        ctx.drawImage(bg, 0, 0)
      }
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  },

  mounted: function () {
    this.draw()
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
