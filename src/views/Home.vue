<template>
  <div class="home">   
    <!-- hej -->
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="yoho" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>