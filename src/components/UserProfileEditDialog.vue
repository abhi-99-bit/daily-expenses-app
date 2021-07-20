<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Edit Profile
          <v-icon size="30px">account_circle</v-icon>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  color="purple"
                  label="First Name"
                  box
                  append-icon="drive_file_rename_outline"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  color="purple"
                  label="Last Name"
                  box
                  append-icon="drive_file_rename_outline"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  color="purple"
                  label="Email"
                  box
                  append-icon="mail"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat>Cancel</v-btn>
          <v-btn color="purple" @click="this.show = false" flat> Apply </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["show"],
};
</script>
