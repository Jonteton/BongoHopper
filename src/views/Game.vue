<template>
  <div class="Game">
    <GameComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameComponent from "@/components/GameComponent.vue";

export default {
  name: "Home",
  components: {
    GameComponent
  }
};
</script>

