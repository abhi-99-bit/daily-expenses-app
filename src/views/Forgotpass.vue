<template>
  <div>
    <v-app class="grey lighten-3">
      <v-container class="mt-5 pt-5" justify-center>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex md3></v-flex>
            <v-flex md6>
              <v-card
                height="400px"
                elevation="12"
                class="text-xs-center ml-5 ma-5 mt-5 my-auto"
                color="#FFFFFF"
                width="500px"
              >
                <v-card-title>
                  <div>
                    <h3
                      class="display-1 pt-4 black--text darken-5 font-weight-medium"
                    >
                      Reset Your Password
                    </h3>
                    <h5 class="subheading">
                      Fear not. we'll email you instruction to reset your
                      password
                    </h5>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    single-line
                    outline
                    size="40"
                    append-icon="email"
                    color="grey darken-3"
                    class="pt-2"
                    requried
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    dark
                    block
                    color="deep-purple darken-1"
                    depressed
                    class="mx-2 text-nones"
                    height="60px"
                    >Reset Password</v-btn
                  >
                </v-card-actions>
                <v-card-title class="justify-center">
                  <span class="heading"> Return to login ? </span
                  ><span class="pl-1"><a href="/login">Click Here</a></span>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex md4></v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>
