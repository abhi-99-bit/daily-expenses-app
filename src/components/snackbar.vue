<template>
  <v-card>
    <v-snackbar
      v-model="snackbar.showing"
      :timeout="4000"
      multi-line
      :color= "snackbar.color"
      top
    >
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.showing = false"> Close </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState(["snackbar"])
  }
};
</script>
