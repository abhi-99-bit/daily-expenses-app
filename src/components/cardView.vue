<template>
  <v-item-group>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 md4>
          <v-item>
            <v-card>
              <v-sheet
                class="v-sheet--offset ml-4 d-flex"
                color="purple lighten-3"
                elevation="6"
                width="80"
                height="80"
              >
                <v-icon size="40">timeline</v-icon>
              </v-sheet>
              <v-card-title primary-title>
                <div>
                  <h3 class="subheading font-weight-medium">
                    <v-icon>event</v-icon>Today
                  </h3>
                  <div>
                    <span class="display-1 font-weight-bold">{{
                      dailyCount
                    }}</span>
                    <span class="subheading"> Total</span>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>
        <v-flex xs12 md4>
          <v-item>
            <v-card>
              <v-sheet
                class="v-sheet--offset ml-4 d-flex"
                color="purple lighten-3"
                elevation="6"
                width="80"
                height="80"
              >
                <v-icon size="40">timeline</v-icon>
              </v-sheet>
              <v-card-title primary-title>
                <div>
                  <h3 class="subheading font-weight-medium">
                    <v-icon>date_range</v-icon> Weekly
                  </h3>
                  <div>
                    <span class="display-1 font-weight-bold">{{
                      weeklyCount
                    }}</span>
                    <span class="subheading">Total</span>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>
        <v-flex xs12 md4>
          <v-item>
            <v-card>
              <v-sheet
                class="v-sheet--offset ml-4 d-flex"
                color="purple lighten-3"
                elevation="6"
                width="80"
                height="80"
              >
                <v-icon size="40">timeline</v-icon>
              </v-sheet>
              <v-card-title primary-title>
                <div>
                  <h3 class="subheading font-weight-medium">
                    <v-icon>calendar_today</v-icon> Monthly
                  </h3>
                  <div>
                    <span
                      class="display-1 font-weight-bold"
                      color=" grey darken-3"
                      >{{ monthlyCount }}</span
                    >
                    <span class="subheading">Total</span>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
  }),
  computed: {
    ...mapGetters(["dailyCount", "weeklyCount", "monthlyCount"]),
  },
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
