<template>
  <div class="Game">
    <h1>Hej och välkommen till vårt spel, hora</h1>
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

