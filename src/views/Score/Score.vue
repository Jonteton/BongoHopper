<template>
  <div class="home">
    <div class = "startgamecontainer">
      <router-link class = "allbuttoncontainer" to="/"><button class ="optionsbutton">Home</button></router-link>
        <router-link class = "allbuttoncontainer" to="/game"><button class ="optionsbutton">Start Game</button></router-link>
         <router-link class = "allbuttoncontainer" to="/"><button class ="optionsbutton">High Scores</button></router-link>
          <router-link class = "allbuttoncontainer" to="/"><button class ="optionsbutton">Settings</button></router-link>

 </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "./Score.css";
export default {
  name: "Score",
  components: {
  }
};
</script>
