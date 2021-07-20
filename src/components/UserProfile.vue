`
<template>
  <div>
    <div>
      <h3 class="grey--text mt-5 ml-5 font-weight-black display-1">
        My Profile
      </h3>
    </div>
    <v-container  class="my-4">
      <v-card height="200" flat>
        <v-layout row wrap>
          <v-flex xs4>
            <v-responsive class="pl-5 ml-5 pt-3 mt-2">
              <v-avatar size="137px">
                <img
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  alt="avatar"
                />
              </v-avatar>
            </v-responsive>
          </v-flex>
          <v-flex xs8>
            <div class="mt-3">
              <h2 class="display-3 font-weight-bold">{{ userName }}</h2>
              <h6 class="title">
                {{ userEmail }} <v-chip outline color="green">verified</v-chip>
              </h6>
            </div>
            <v-btn
              dark
              color="purple"
              class="subheading text-none"
              flat
              outline
              @click="showDialogBox()"
            >
              <span class="body-2">Edit</span>
              <v-icon right>edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-container>
      <v-card flat>
        <v-card-title class="body-2">Activity</v-card-title>
        <v-sheet color="white">
          <v-sparkline
            :labels="labels"
            :value="value"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            line-width="1"
            padding="16"
            stroke-linecap="round"
            smooth
          ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-container>
    <!-- EDIT USER DETAILS DIALOG -->
    <div class="text-xs-center">
      <v-dialog v-model="showDialog" width="500">
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
                    v-model="editUser.firstName"
                    append-icon="drive_file_rename_outline"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    color="purple"
                    label="Last Name"
                    box
                    v-model="editUser.lastName"
                    append-icon="drive_file_rename_outline"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    color="purple"
                    label="Email"
                    box
                    v-model="editUser.email"
                    append-icon="mail"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="cancel()">Cancel</v-btn>
            <v-btn color="purple" flat> Apply </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    showDialog: false,
    editUser: {
      firstName: "",
      lastName: "",
      email: "",
    },
    labels: ["$200", "$290", "$600", "$330", "$700", "$790", "$810"],
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
  computed: {
    ...mapGetters([]),
    userName() {
      return localStorage.fName + " " + localStorage.lName;
    },
    userEmail() {
      return localStorage.email;
    },
  },
  methods: {
    showDialogBox() {
      this.showDialog = true;
      this.editUser = Object.assign(
        {},
        {
          firstName: localStorage.fName,
          lastName: localStorage.lName,
          email: localStorage.email,
        }
      );
    },
    cancel() {
      this.showDialog = false;
    },
  },
};
</script>
