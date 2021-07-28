<template>
  <v-app>
    <Navbar />
    <Snackbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Snackbar from "@//components/snackbar.vue";

export default {
  name: "App",
  components: { Navbar , BottomNav ,Snackbar },
 
};
</script>

<style>
#app {
  background: url("./assets/back-6.jpg");
  background-size: cover;
}
</style>
