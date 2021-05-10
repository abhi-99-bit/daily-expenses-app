<template>
  <div id="signup">
    <v-app>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex sm6> </v-flex>
          <v-flex xs12 sm6>
            <v-card color="#FFFFFF" width="500px" class="mt-5" elevation="12">
              <v-card-title primary-title>
                <div class="ml-3">
                  <h1 class="display-1 back--text darken-4">
                    Create an account
                  </h1>
                  <div>
                    <h3 class="context grey--text darken-4">
                      it's quick and esay.
                    </h3>
                  </div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <v-layout>
                    <v-flex xs12 md6>
                      <v-text-field
                        outline
                        label="First name"
                        append-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        outline
                        label="Last name"
                        append-icon="edit"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout class="pa-auto">
                    <v-flex xs12 md12>
                      <v-text-field
                        outline
                        label="Email"
                        append-icon="mail"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout class="pa-auto">
                    <v-flex xs12 md6>
                      <v-text-field
                        outline
                        type="password"
                        label="New password"
                        append-icon="lock_open"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 class="mx-auto">
                      <v-text-field
                        outline
                        type="password"
                        label="Confirm password"
                        append-icon="lock"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-layout>
                  <v-flex md6>
                    <v-checkbox label="accept Terms & conditions"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 md6 class="mt-2">
                    <v-btn
                      depressed
                      dark
                      block
                      color="deep-purple darken-1"
                      size="80"
                      >Sign Up</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<style scoped>
#signup {
  background-image: url("");
}
.v-btn {
  width: 200px;
}
</style>
