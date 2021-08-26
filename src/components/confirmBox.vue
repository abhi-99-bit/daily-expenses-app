<template>
  <v-app>
    <v-layout row justify-center>
      <v-dialog v-model="show" persistent max-width="450">
        <v-card>
          <v-card-title
            class="headline font-weight-medium"
            color="gery--text darken-3"
            >Delete Expenses</v-card-title
          >
          <v-card-text color="grey light-1" class="font-weight-regular">
            <v-layout class="pa-1">
              <v-icon medium dark color="deep-purple darken-2"
                >error_outline</v-icon
              >
              <span
                id="confirmbox-span"
                color="grey--text darken-3"
                class="pl-1 pt-1"
              >
                Are you sure you want to delete {{ discription }} from list?
              </span>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              id="confirmbox-cancelbtn"
              color="grey darken-1"
              flat
              @click="cancel"
              >cancel</v-btn
            >
            <v-progress-circular
              v-if="isConfirm"
              indeterminate
              color="purple"
            ></v-progress-circular>
            <v-btn
              id="confirm-btn"
              v-else
              color="deep-purple darken-1"
              flat
              @click="confirm"
              >confirm</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  props: ["show", "discription", "cancel", "confirm", "isConfirm"],
};
</script>
