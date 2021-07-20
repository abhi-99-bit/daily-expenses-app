<template>
  <v-toolbar flat app>
    <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-light">Daily</span>
      <span>Expenses</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-avatar size="50" outline class="pl-2" v-if="showNavbar">
      <img src="../assets/avatar-3.png" alt="avatar" />
    </v-avatar>

    <div class="text-xs-center" v-if="showNavbar">
      <v-menu offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <div>
            <span class="title grey--text font-weight-bold pt-3 ml-4" v-on="on">
              {{ userName }}<v-icon>arrow_drop_down</v-icon></span
            >
          </div>
        </template>

        <v-list>
          <v-list-tile
            v-for="(dashItem, i) in dashItems"
            :key="i"
            router
            :to="dashItem.route"
          >
            <v-list-tile-title
              ><v-icon>{{ dashItem.icon }}</v-icon>
              {{ dashItem.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <v-btn
      v-if="showNavbar"
      dark
      color="grey darken-1"
      class="subheading text-none"
      depressed
      flat
      @click="logout()"
    >
      <span>Logout</span>
      <v-icon right>logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userName: "",
      dashItems: [
        { title: "Profile", icon: "person", route: "/userprofile" },
        { title: "Dashboard", icon: "space_dashboard", route: "/" },
      ],
    };
  },
  mounted() {
    this.setUserName();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    setUserName() {
      this.userName = localStorage.fName + " " + localStorage.lName;
    },
  },
  computed: {
    ...mapGetters(["showNavbar"]),
  },
};
</script>
