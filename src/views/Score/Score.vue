<template>
  <div class="score">
    <router-link class = "backbuttoncontainer" to="/">
      <button class = "backbutton">
        BACK
      </button>
    </router-link>
    <div class = "high_score_text">
      <p> HIGH SCORES </p>
    </div>
    <div class="score_container">
      <div class ="ul_list" >
        <li v-for="scoreItem in even(scoreArr)" class= "i_score_text">
          <p>{{scoreItem.name}}</p>
          <p>{{scoreItem.score}}</p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "./Score.css";

export default {
  name: "Score",
  components: {
  },
  data() {
    return {
      scoreArr: [
        {name: 'jonas', score: '150'},
        {name: 'axel', score: '1213'},
        {name: 'Player1', score: '10123'},
        {name: 'player2', score: '4320'},
        {name: 'EliteKid', score: '3330'},
        {name: 'Baby Joda', score: '1250'}
      ]
    }
  },
  methods: {
     even: function(arr) {
       // Set slice() to avoid to generate an infinite loop!
       return arr.slice().sort(function(a, b) {
         return b.score - a.score;
       });
     }
   }
}
</script>
