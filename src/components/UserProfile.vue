<template>
  <div>
    <v-container class="my-4">
      <v-card height="200">
        <v-layout row wrap>
          <v-flex xs4 align-self-right>
            <v-responsive class="pt-4 pl-5">
              <v-avatar size="137px">
                <img
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  alt="avatar"
                />
              </v-avatar>
            </v-responsive>
          </v-flex>
          <v-flex xs8 align-self-left>
            <span>
              <h5 class="headline">Abhishek Vishwakarma</h5>
            </span>
            <span>
              <h6 class="subheading">Abhishek@gmail.com</h6>
            </span>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-card-title class="headline">Activity</v-card-title>
        <v-sheet color="white" elevation="12">
          <v-sparkline
            :labels="labels"
            :value="value"
            color="dark purple"
            line-width="1"
            padding="16"
          ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    labels: ["12$", "3$", "6$", "9$", "12$", "3$", "6$", "9$"],
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
};
</script>
