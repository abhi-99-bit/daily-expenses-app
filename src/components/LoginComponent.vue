<template>
  <v-app class="grey lighten-3">
    <v-container>
      <v-card
        width="400"
        elevation="6"
        height="600"
        class="text-xs-center ml-5 ma-5"
        color="#FFFFFF"
      >
        <v-avatar size="100" class="mt-3">
          <img src="../assets/avatar-4.png" />
        </v-avatar>
        <v-card-titlte>
          <h3 class="subheading mt-2 grey--text darken-5">
            Sign in your Account
          </h3>
        </v-card-titlte>
        <v-card-text>
          <v-form>
            <v-text-field
              outline
              label="Email"
              size="40"
              append-icon="email"
              color="grey darken-3"
            />
            <v-text-field
              outline
              round
              color="grey"
              :type="showpassword ? 'text' : 'password'"
              label="password"
              :append-icon="showpassword ? 'visibility' : 'visibility_off'"
              @click:append="showpassword = !showpassword"
            />
            <span class="light-blue--text lighten-1">Forgot Password?</span>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-layout>
            <v-flex>
              <v-btn dark color="deep-purple darken-1" round class=""
                >Sign in</v-btn
              >
              <v-btn
                round
                outline
                color="deep-purple darken-2"
                class="mx-auto ml-2"
                >Sign up</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-actions>
        <v-card-title class="mx-auto">
          <v-layout>
            <v-flex>
              <h5 class="caption grey--text">OR LOGIN WITH</h5>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-action>
          <v-layout>
            <v-flex>
              <v-btn fab small color="#FFFFFF">
                <v-icon dark color="primary">fab fa-facebook-f</v-icon>
              </v-btn>
              <v-btn fab small color="#FFFFFF">
                <v-icon dark color="pink">fab fa-google</v-icon>
              </v-btn>
              <v-btn fab small color="#FFFFFF">
                <v-icon dark color="primary">fab fa-twitter</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-action>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      showpassword: false,
    };
  },
};
</script>

<style>
#app {
  background: url("../assets/cool-background-4.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
