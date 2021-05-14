<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title class="grey--text">MY LIST OF EXPENSES</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn flat class="mb-2" v-on="on">
            <v-icon color="grey" size="33" right>playlist_add</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-select
                    prepend-icon="category"
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
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Cost"
                    :rules="[(v) => !!v || 'Cost is required']"
                    type="number"
                    v-model="editedItem.cost"
                    prepend-icon="attach_money"
                    v-bind="cost"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-menu>
                    <v-text-field
                      slot="activator"
                      label="Date"
                      :value="date"
                      :rules="[[(v) => !!v || 'Cost is required']]"
                      prepend-icon="event"
                      v-bind="date"
                      v-model="editedItem.date"
                      required
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.date"
                      required
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-textarea
                    label="Description"
                    prepend-icon="description"
                    v-model="editedItem.description"
                    v-bind="description"
                    :counter="50"
                    :rules="desciptionBoxRules"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="expenses"
      class="elevation-1"
      hide-actions
      :pagination.sync="pagination"
    >
      <template v-slot:items="props">
        <td>{{ props.item.category }}</td>
        <td class="justify-center">{{ props.item.cost }}</td>
        <td class="justify-center">{{ props.item.date }}</td>
        <td class="justify-center">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2 black--text" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small class="red--text" @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    vaild: "true",
    desciptionBoxRules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length <= 50) || "Description must be less then 50 characters",
    ],
    search: "",
    pagination: {},
    dialog: false,
    headers: [
      {
        text: "Category",
        align: "left",
        sortable: false,
        value: "category",
      },
      { text: "Cost", value: "cost" },
      { text: "Date", value: "date" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "category", sortable: false },
    ],
    expenses: [],
    editedIndex: -1,
    editedItem: {
      category: "",
      cost: null,
      date: null,
      description: "",
    },
    defaultItem: {
      category: "",
      cost: null,
      date: null,
      description: "",
    },
  }),

  computed: {
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.expenses = [
        {
          category: "Shopping",
          cost: 2000,
          date: "2021-04-01",
          description: "Buy new clothes",
        },
        {
          category: "Travelling",
          cost: 50000,
          date: "2020-07-01",
          description: "Trip to Goa...🚗",
        },
        {
          category: "Shopping",
          cost: 2500,
          date: "2021-05-01",
          description: "Buy new clothes...🛒",
        },
        {
          category: "Gamming",
          cost: 3000,
          date: "2021-04-01",
          description: "Spend money on pc bulid",
        },
        {
          category: "food",
          cost: 300,
          date: "2021-05-01",
          description: "order pizza...🍕",
        },
        {
          category: "COD",
          cost: 159,
          date: "2021-05-01",
          description: "Buy new clothes",
        },
        {
          category: "Shopping",
          cost: 2500,
          date: "2021-05-01",
          description: "Buy new clothes...🛒",
        },
        {
          category: "Shopping",
          cost: 2500,
          date: "2021-05-01",
          description: "Buy new clothes...🛒",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.expenses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.expenses.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.expenses.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.expenses[this.editedIndex], this.editedItem);
      } else {
        this.expenses.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
