<template>
  <div>
    <v-app class="grey lighten-3">
      <v-container class="mt-5 pt-5" justify-center>
        <v-layout row wrap>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-card
              height="400px"
              elevation="12"
              class="text-xs-center ml-5 ma-5 mt-5 my-auto"
              color="#FFFFFF"
            >
              <v-card-titlte>
                <h3
                  class="display-1 pt-4 black--text darken-5 font-weight-bold"
                >
                  Login Here
                </h3>
              </v-card-titlte>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    outline
                    label="Email"
                    :rules="emailRules"
                    size="40"
                    append-icon="email"
                    color="grey darken-3"
                    requried
                  />
                  <v-text-field
                    outline
                    color="grey"
                    v-model="password"
                    :rules="passwordRules"
                    :type="showpassword ? 'text' : 'password'"
                    label="password"
                    :append-icon="
                      showpassword ? 'visibility' : 'visibility_off'
                    "
                    @click:append="showpassword = !showpassword"
                    required
                  />
                  <span class="subheading light-blue--text lighten-1"
                    ><a>forgot password?</a></span
                  >
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  dark
                  block
                  color="deep-purple darken-1"
                  depressed
                  class="mx-2"
                  text-nones
                  >login</v-btn
                >
              </v-card-actions>
              <v-card-title class="justify-center">
                <span class="heading"> dont have account</span
                ><span class="pl-1"><a href="/register">clickhere</a></span>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex md4></v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => ({
    showpassword: false,
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password:"",
    passwordRules:[
      (v) => !!v || "password is required",
      (v) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) || "password must be valid"
    ]
  }),
};
</script>

<style>

a {
  text-decoration: none;
}
</style>
