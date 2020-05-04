<template>
  <div class="swag">
    <router-link class="backbuttoncontainer" to="/"
      ><button class="backbutton">Back</button></router-link>
    <div class="settings">
      <div class="buttoncontainer">

        <div class="allbuttoncontainer2">
          <div class="soundtextcontainer">
            <p class="soundtext">Sound</p>
          </div>
          <div class="soundslidercontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
          </div>
        </div>



        <router-link class="allbuttoncontainer" to="/game"
          ><button class="settingsbutton">Credits</button></router-link
        >
        <router-link class="allbuttoncontainer" to="/score"
          ><button class="settingsbutton">Scores</button></router-link
        >
        <router-link class="allbuttoncontainer" to="/settings"
          ><button class="settingsbutton">Settings</button></router-link
        >

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "./Settings.css";
export default {
  name: "Settings",
  components: {}
};
</script>
