<template>
  <v-card>
    <v-snackbar
      v-model="snackbar.showing"
      bottom
      :timeout="4000"
      multi-line
      :color="snackbar.color"
      right
    >
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.showing = false"> Close </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>
