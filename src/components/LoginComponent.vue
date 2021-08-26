/* eslint-disable vue/no-parsing-error */
<template>
  <div>
    <v-app class="grey lighten-3">
      <v-container class="mt-5 pt-5" justify-center>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap>
            <v-flex md3></v-flex>
            <v-flex md6>
              <v-card
                height="400px"
                elevation="12"
                class="text-xs-center ml-5 ma-5 mt-5 my-auto"
                color="#FFFFFF"
              >
                <v-card-title>
                  <h3 class="display-1 black--text darken-5 font-weight-bold">
                    Login Here
                  </h3>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    outline
                    id="login-email"
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
                    id="login-password"
                    :rules="passwordRules"
                    :type="showpassword ? 'text' : 'password'"
                    label="password"
                    :append-icon="
                      showpassword ? 'visibility' : 'visibility_off'
                    "
                    @click:append="showpassword = !showpassword"
                    required
                  />
                  <span
                    class="subheading light-blue--text lighten-1"
                    id="login-resetpassword"
                  >
                    <router-link to="/resetpassword"
                      >Forgot Password?</router-link
                    >
                  </span>
                </v-card-text>
                <v-card-actions>
                  <v-flex xs12>
                    <v-progress-circular
                      v-if="loader"
                      indeterminate
                      color="purple"
                    ></v-progress-circular>
                    <v-btn
                      v-else
                      dark
                      block
                      id="login-button"
                      color="deep-purple darken-1"
                      depressed
                      class="mx-auto"
                      text-nones
                      @click="validateData()"
                      >login</v-btn
                    >
                  </v-flex>
                </v-card-actions>
                <v-card-title class="justify-center">
                  <span class="heading"> Don't Have Account ?</span
                  ><span class="pl-1"
                    ><router-link to="/register">Click Here</router-link></span
                  >
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
// import axios from "axios";
export default {
  name: "LoginPage",
  data: () => ({
    loader: false,
    showpassword: false,
    valid: true,
    user: {},
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "password is required",
      (v) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          v
        ) || "password must be valid",
    ],
  }),
  methods: {
    async validateData() {
      if (this.$refs.form.validate() === true) {
        this.user = {
          email: this.email,
          password: this.password,
        };
        let payload = {
          data: this.user,
        };
        this.loader = true;
        console.log(this.user);
        let loginPromise = new Promise((resolve, reject) => {
          this.$store.dispatch("loginUser", { resolve, reject, payload });
        });
        loginPromise
          .then((response) => {
            console.log(response);
            this.loader = false;
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "success",
              text: "logging successfully",
            });
            this.$router.push("/").catch(() => {});
          })
          .catch((error) => {
            this.loader = false;
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "error",
              text: "Enter valid details",
            });
            console.log(error);
          });
      } else {
        console.log("Enter Valid Fields");
        this.$store.dispatch("setSnackbar", {
          showing: true,
          color: "error",
          text: "Enter Logging details",
        });
      }
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
