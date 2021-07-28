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
                    ><a href="/resetpassword">Forgot Password?</a></span
                  >
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    dark
                    block
                    color="deep-purple darken-1"
                    depressed
                    class="mx-2"
                    text-nones
                    @click="validateData()"
                    >login</v-btn
                  >
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
import axios from "axios";
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
        let userData = {
          email: this.email,
          password: this.password,
        };
        console.log(userData);
        await axios({
          method: "POST",
          url: "http://localhost:3000/user/login",
          data: userData,
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("fName", response.data.results[0].first_name);
            localStorage.setItem("lName", response.data.results[0].last_name);
            localStorage.setItem("email", response.data.results[0].email);
            localStorage.setItem("user_id", response.data.results[0].user_id);
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "success",
              text: "logging successfully",
            });
            this.$router.push("/");
          })
          .catch((error) => {
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "error",
              text: "Enter valid details",
            });
            console.log(error);
          });
      } else {
        this.$store.dispatch("setSnackbar", {
          showing: true,
          color: "error",
          text: "Enter Logging details",
        });
        console.log("Enter Valid Fields");
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
