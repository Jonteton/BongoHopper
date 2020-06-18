<template>
  <div class="home">
    <div class = "startgamecontainer">
        <button class = "optionsbutton" v-on:click= "switchPage()">{{lang.start}}</button>
      
        <p class = "langText"> {{lang.langtext}} </p>

        <div class = "images">
          <img src="../../assets/swe_flag.png"  v-on:click= "toggleSwedish()" />
          <img src="../../assets/eng_flag.png"  v-on:click= "toggleEnglish()" />
        </div>




 </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {swe_lang} from "../../assets/lang/swe.js"
import {eng_lang} from "../../assets/lang/eng.js"
import eng_flag from "../../assets/eng_flag.png"
import swe_flag from "../../assets/swe_flag.png" 

export default {
  name: "Home",

 data: function(){
    return {
      lang: eng_lang,
    }
  },

  components: {
    HelloWorld
  },

  methods: {

    toggleSwedish(){
      this.lang = swe_lang
      document.cookie = "swedish; path=/"
    },

    toggleEnglish(){
      this.lang = eng_lang
      document.cookie = "english; path=/"
    },

    switchPage(){
      this.$router.push({ name: 'Game', params: {lang : this.lang}}) 
    }
  },

  mounted: function () {
    document.cookie = "english; path=/"
    this.lang = eng_lang
  },


};
</script>

<style scoped lang="scss">
.startgamecontainer{
display:flex;
height: 40vh; 
width: 40vw;
flex-direction: column;
justify-content: space-evenly;
}

.home{
background-color: rgba(32,32,32,1);
display: flex;
justify-content: center;
width: 100vw;
height: 100vh;
align-items: center;
}

.allbuttoncontainer{
display:block;
justify-content: center;
width: 100%;
}

.optionsbutton{
background:none;
width: 100%;
height: 50;
border-radius: 24px;
color: white;
border: 1px solid;
font-size: 50px;
transition: 0.6s;
font-family: arcade;
}

.langText{
  color: white;
  font-size: 50px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.images{
  display: flex;
  align-items: center;
  width: 50%;

}

</style>

