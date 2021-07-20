<template>
  <v-app>
    <h1 class="grey--text mt-5 ml-5 font-weight-black">MY DASHBOARD</h1>
    <CardView />
    <v-container fulid class="my-4">
      <v-layout row wrap>
        <v-flex class="mt-4">
          <!--  TABLE VIEW -->
          <div>
            <v-toolbar flat color="white">
              <v-toolbar-title class="grey--text"
                >MY LIST OF EXPENSES</v-toolbar-title
              >
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn flat class="mb-2" v-on="on" color="grey" dark>
                    Add List
                    <v-icon color="grey" size="33" right
                      >playlist_add</v-icon
                    ></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title class="headline" primary-title>
                    <span class="headline font-weight-medium">{{
                      formTitle
                    }}</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-form ref="dialogForm" v-model="isValid" lazy-validation>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md12>
                            <v-select
                              prepend-icon="category"
                              color="deep-purple darken-1"
                              :items="[
                                'Gamming',
                                'Travelling',
                                'Entertainment',
                                'Food',
                                'Shopping',
                              ]"
                              :rules="[(v) => !!v || 'Item is required']"
                              label="Select Category*"
                              v-model="editedItem.category"
                              v-bind="category"
                              required
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              color="deep-purple darken-1"
                              label="Cost"
                              :rules="[(v) => !!v || 'Cost is required']"
                              type="number"
                              v-model="editedItem.price"
                              prepend-icon="attach_money"
                              v-bind="price"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-menu>
                              <v-text-field
                                color="deep-purple darken-1"
                                slot="activator"
                                label="Date"
                                :value="date"
                                :rules="[(v) => !!v || 'Date is required']"
                                prepend-icon="event"
                                v-bind="date"
                                v-model="editedItem.date"
                                required
                              ></v-text-field>
                              <v-date-picker
                                color="deep-purple darken-1"
                                header-color="deep-purple darken-1"
                                v-model="editedItem.date"
                                required
                              ></v-date-picker>
                            </v-menu>
                          </v-flex>
                          <v-flex xs12 sm6 md12>
                            <v-textarea
                              color="deep-purple darken-1"
                              label="discription"
                              prepend-icon="description"
                              v-model="editedItem.discription"
                              v-bind="discription"
                              :counter="50"
                              :rules="[
                                (v) => !!v || 'discription is required',
                                (v) =>
                                  (v && v.length <= 50) ||
                                  'discription must be less then 50 characters',
                              ]"
                            ></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="deep-purple darken-1" flat @click="close"
                        >Cancel</v-btn
                      >
                      <v-progress-circular
                        v-if="progress"
                        indeterminate
                        color="purple"
                      ></v-progress-circular>
                      <v-btn
                        v-else
                        color="deep-purple darken-1"
                        flat
                        @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="userExpenses"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>
                  <v-chip color="purple lighten-3" text-color="black">
                    <v-avatar>
                      <v-icon>category</v-icon>
                    </v-avatar>
                    {{ props.item.category }}
                  </v-chip>
                </td>
                <td class="justify-center">{{ props.item.price }}</td>
                <td class="justify-center">{{ props.item.date }}</td>
                <td class="justify-center">{{ props.item.discription }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2 black--text"
                    @click.prevent="editItem(props.item)"
                  >
                    edit
                  </v-icon>

                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-icon
                    small
                    class="red--text"
                    @click.prevent="deleteItem(props.item)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </div>
          <!-- /// -->
        </v-flex>
      </v-layout>
    </v-container>
    <ConfirmBox
      :show="showDialog"
      :discription="value"
      :cancel="cancel"
      :confirm="confirm"
      :isConfirm="isConfirm"
    />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ConfirmBox from "./confirmBox.vue";
import CardView from "./cardView.vue";

export default {
  components: {
    ConfirmBox,
    CardView,
  },
  data() {
    return {
      items: [{ title: "Today" }, { title: "Week" }, { title: "Month" }],
      isValid: true,
      userName: "",
      vaild: "true",
      search: "",
      dialog: false,
      // expensesList: [],
      headers: [
        {
          text: "Category",
          align: "left",
          sortable: false,
          value: "category",
        },
        { text: "Cost", value: "price" },
        { text: "Date", value: "date" },
        { text: "Discription", value: "discription" },
        { text: "Actions", value: "category", sortable: false },
      ],
      progress: false,
      category: "",
      price: "",
      date: "",
      discription: "",
      value: "",
      isConfirm: false,
      showDialog: false,
      editedIndex: -1,
      deleteIndex: -1,
      editedItem: {
        category: "",
        price: null,
        date: new Date().toISOString().substr(0, 10),
        discription: "",
      },
      newItem: {
        category: "",
        price: null,
        date: new Date().toISOString().substr(0, 10),
        discription: "",
      },
      defaultItem: {
        category: "",
        cost: null,
        date: new Date().toISOString().substr(0, 10),
        discription: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userExpenses"]),
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  // Life Cycle_Hook
  mounted() {
    this.userExpensesInitialization();
  },
  methods: {
    userExpensesInitialization() {
      this.$store.dispatch("getUserExpenses");
    },
    clickMe() {
      console.log("hello");
    },
    editItem(item) {
      // this.editedIndex = this.userExpenses.indexOf(item);
      this.editedIndex = item.post_id;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.showDialog = true;
      this.deleteIndex = item.post_id;
      this.value = item.category;
      console.log(this.deleteIndex);
    },

    close() {
      this.dialog = false;
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      // }, 300);
    },
    cancel() {
      this.editedIndex = -1;
      this.$refs.dialogForm.resetValidation();
      this.$refs.dialogForm.reset();
      this.showDialog = false;
    },
    confirm() {
      console.log("confirm");
      this.isConfirm = true;
      let payload = { id: this.deleteIndex };
      let isPromise = new Promise((resolve, reject) => {
        this.$store.dispatch("deleteExpenses", { resolve, reject, payload });
      });
      isPromise
        .then(() => {
          this.isConfirm = false;
          this.deleteIndex = -1;
          this.showDialog = false;
        })
        .catch(() => {
          this.isConfirm = false;
          this.deleteIndex = -1;
          this.showDialog = false;
        });
    },
    save() {
      if (this.editedIndex > -1) {
        console.log("this is edit item", this.editedIndex, this.editedItem);
        let payload = {
          id: this.editedIndex,
          data: this.editedItem,
        };
        console.log(payload);
        this.progress = true;
        let promise = new Promise((resolve, reject) => {
          this.$store.dispatch("editExpenses", { resolve, reject, payload });
        });
        promise
          .then((resolve) => {
            this.progress = false;
            console.log("promise" + " " + resolve);
            this.$refs.dialogForm.reset();
            this.editedIndex = -1;
            this.close();
          })
          .catch(() => {
            this.progress = false;
            this.$refs.dialogForm.reset();
            this.close();
            this.editedIndex = -1;
          });
      } else {
        if (this.$refs.dialogForm.validate() == true) {
          let payload = {
            data: this.editedItem,
          };
          console.log(payload);
          this.progress = true;
          let getPromise = new Promise((resolve, reject) => {
            this.$store.dispatch("addExpenses", { resolve, reject, payload });
          });
          getPromise
            .then((resolve) => {
              this.progress = false;
              console.log(resolve);
              this.$refs.dialogForm.resetValidation();
              this.$refs.dialogForm.reset();
              this.close();
            })
            .catch(() => {
              this.progress = false;
              this.$refs.dialogForm.resetValidation();
              this.$refs.dialogForm.reset();
              this.close();
            });
        }
      }
      this.$refs.dialogForm.resetValidation();
      this.close();
    },
  },
};
</script>
<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
