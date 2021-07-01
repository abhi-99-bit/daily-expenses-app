<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  background: url("./assets/back-6.jpg");
  background-size: cover;
}
</style>
