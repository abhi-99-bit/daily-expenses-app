<template>
  <div id="signup">
    <v-app>
      <v-container grid-list-md class="mt-5 pt-3">
        <v-layout row wrap class="mx-auto my-auto">
          <v-flex xs12 sm3 md3> </v-flex>
          <v-flex xs12 sm6 md6>
            <v-card color="#FFFFFF" width="500px" class="mt-5" elevation="12">
              <v-card-title primary-title>
                <div class="ml-3">
                  <h1 class="display-1 back--text darken-4">
                    Create an account
                  </h1>
                  <div>
                    <h3 class="subheading black--text">it's quick and esay.</h3>
                  </div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                  <v-layout row warp class="mx-auto my-auto">
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        outline
                        :counter="10"
                        :rules="nameRules"
                        v-model="firstname"
                        label="First name"
                        append-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        outline
                        v-model="lastname"
                        :counter="10"
                        :rules="lastnameRules"
                        label="Last name"
                        append-icon="edit"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout class="pa-auto">
                    <v-flex xs12 sm6 md12>
                      <v-text-field
                        outline
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        append-icon="mail"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout class="pa-auto">
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        outline
                        v-model="password"
                        :rules="passwordRules"
                        type="password"
                        label="New password"
                        append-icon="lock_open"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 class="mx-auto">
                      <v-text-field
                        outline
                        type="password"
                        v-model="confirmPassword"
                        :rules="confrimPassRules"
                        label="Confirm password"
                        append-icon="lock"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-layout>
                    <v-flex xs12 sm6 md6>
                      <v-checkbox
                        label="accept terms & conditions"
                        :rules="[(v) => !!v || 'You must agree to continue!']"
                        v-model="checkbox"
                        color="black--text"
                        required
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 md6 text-xs-center class="mt-2">
                      <v-progress-circular
                        v-if="loader"
                        indeterminate
                        color="purple"
                      ></v-progress-circular>
                      <v-btn
                        v-else
                        block
                        color="deep-purple darken-1 white--text"
                        size="80"
                        :disabled="!valid"
                        @click="validate"
                        >Sign Up</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-form>
              <v-layout justify-center row wrap>
                <v-flex text-xs-center xs12>
                  <span class="subheading"> Already Have Account ?</span
                  ><span class="pl-1"
                    ><router-link to="/login">Click Here</router-link></span
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm3 md3> </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data: () => ({
    valid: true,
    loader: false,
    user_data: {},
    firstname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less then 10 characters",
    ],
    lastname: "",
    lastnameRules: [
      (v) => !!v || "Lastname is required",
      (v) => (v && v.length <= 10) || "Name must be less then 10 characters",
    ],
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
    confirmPassword: "",
    confrimPassRules: [
      (v) => !!v || "confirm password is required",
      (v) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          v
        ) || "same as password you enter",
    ],
    checkbox: false,
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate() == false) {
        this.snackbar = true;
        this.$store.dispatch("setSnackbar", {
          showing: true,
          color: "error",
          text: "Enter Valid Details",
        });
      } else {
        this.user_data = {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          accept_tc: this.checkbox == true ? 1 : 0,
        };
        let payload = {
          data: this.user_data,
        };
        console.log(payload);
        this.loader = true;
        let signupPromise = new Promise((resolve, reject) => {
          this.$store.dispatch("signupUser", { resolve, reject, payload });
        });
        signupPromise
          .then(() => {
            this.loader = false;
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "success",
              text: "User Signup Sucessfully!",
            });
            this.$router.push("/login");
          })
          .catch(() => {
            this.$store.dispatch("setSnackbar", {
              showing: true,
              color: "error",
              text: "email is already in use",
            });
            console.error();
            this.loader = false;
          });
        // axios({
        //   method: "POST",
        //   url: "http://localhost:3000/users",
        //   data: payload,
        // })
        //   .then((response) => {
        //     console.log(response);
        //     if (response.status === 200) {
        //       // this.$router.push("/login");
        //     }
        //   })
        //   .catch( (error) => {
        //     console.log(error);
        //   });
      }
    },
  },
};
</script>

<style scoped>
.v-btn {
  width: 200px;
  height: 40px;
}
</style>
