<template>
  <v-app>
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Daily</span>
        <span>Expenses</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
       <p class="grey--text font-weight-bold pr-3 pt-3">Hi, Smith</p>
      <v-avatar size="50" outline class="pl-2">
        <img src="../assets/avatar-5.jpg" alt="avatar" />
      </v-avatar>
    </v-toolbar>
    <h1 class="headline grey--text mt-3 ml-5">My Dashborad</h1>
    <v-container fulid class="my-4">
      <v-layout row wrap>
        <v-flex>
          <Tableview />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Tableview from "./Tableview";
export default {
  components: { Tableview },
  data() {
    return {
      expenses: [
        {
          category: "Gamming",
          cost: "200$",
          date: "5th May 2022",
          description: "Buy Pubg pc game.",
        },
        {
          category: "shopping",
          cost: "200$",
          date: "1st May 2021",
          description: "Buy new shoes from store.",
        },

        {
          category: "shopping",
          cost: "600$",
          date: "1st April 2021",
          description: "Buy new Iphone 12",
        },
        {
          category: "Travailing",
          cost: "20,000$",
          date: "1st jan 2020",
          description: "Going on vication with family",
        },
      ],
    };
  },
};
</script>
