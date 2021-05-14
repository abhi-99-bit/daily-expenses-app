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
                    <h3 class="context grey--text darken-4">
                      it's quick and esay.
                    </h3>
                  </div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout row warp class="mx-auto my-auto">
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        outline
                        :counter="10"
                        :rules="nameRules"
                        v-model="name"
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
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-layout>
                  <v-flex xs12 sm6 md6>
                    <v-checkbox
                      label="accept terms & conditions"
                      :rules="[(v) => !!v || 'You must agree to continue!']"
                      v-model="checkbox"
                      required
                    ></v-checkbox>
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
          <v-flex xs12 sm3 md3> </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
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
};
</script>

<style scoped>
.v-btn {
  width: 200px;
  height: 40px;
}
</style>
