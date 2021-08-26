// commit from store
// dispatch from components
import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import { apiCall } from "../service";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userExpenses: [],
    user: {},
    dailyCount: 0,
    weeklyCount: 0,
    monthlyCount: 0,
    showNavbar: false,
    loading: false,
    snackbar: {},
  },
  getters: {
    userExpenses: (state) => state.userExpenses,
    dailyCount: (state) => state.dailyCount,
    weeklyCount: (state) => state.weeklyCount,
    monthlyCount: (state) => state.monthlyCount,
    showNavbar: (state) => state.showNavbar,
    user: (state) => state.user,
    userFullName: (state) => state.user.first_name + " " + state.user.last_name,
    loadTable: (state) => state.loading,
  },
  mutations: {
    SET_EXPENSES(state, userExpenses) {
      if (localStorage.token) {
        this.state.showNavbar = true;
      }
      (state.loading = false), (state.userExpenses = userExpenses);
    },
    EDIT_EXPENSES(state, payload) {
      const index = state.userExpenses.map((o) => o.id).indexOf(payload.id);
      state.userExpenses.splice(index, 1, payload.data);
      this.dispatch("getUserExpenses");
    },

    DELETE_EXPENSES(state, payload) {
      const index = state.userExpenses.findIndex(
        (expenses) => expenses.id === payload.id
      );
      state.userExpenses.splice(index, 1);
    },
    ADD_EXPENSES(state, payload) {
      state.userExpenses.push(payload);
    },
    TODAY_EXPENSES(state, payload) {
      state.dailyCount = payload;
    },
    WEEKLY_EXPENSES(state, payload) {
      state.weeklyCount = payload;
    },
    MONTHLY_EXPENSES(state, payload) {
      (state.loading = false), (state.monthlyCount = payload);
    },
    SET_USER_DETAILS(state, payload) {
      state.user = payload[0];
      if (localStorage.token) {
        this.state.showNavbar = true;
      }
    },
    USER_SIGNUP() {},
    resetAllState(state) {
      state.userExpenses = [];
      state.dailyCount = 0;
      state.weeklyCount = 0;
      state.monthlyCount = 0;
      state.showNavbar = false;
    },
    LOGIN_USER() {},
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },
  },
  actions: {
    async getUserExpenses({ commit }) {
      await apiCall
        .getExpenses()
        .then((response) => {
          (this.state.loading = true), commit("SET_EXPENSES", response.data);
          this.dispatch("getTodayExpenses");
          this.dispatch("getWeeklyExpenses");
          this.dispatch("getMonthlyExpenses");
          this.dispatch("getUser");
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    async editExpenses({ commit }, { resolve, reject, payload }) {
      const data = await apiCall.editExpenses(payload.id, payload.data);
      if (data.status === 200) {
        commit("EDIT_EXPENSES", payload);
        this.dispatch("getTodayExpenses");
        this.dispatch("getWeeklyExpenses");
        this.dispatch("getMonthlyExpenses");
        this.dispatch("getUserExpenses");
        resolve(data.statusText);
      } else {
        reject && reject();
      }
    },
    async deleteExpenses({ commit }, { resolve, reject, payload }) {
      const data = await apiCall.deleteExpenses(payload.id);
      if (data.status === 200) {
        await commit("DELETE_EXPENSES", payload);
        await this.dispatch("getTodayExpenses");
        await this.dispatch("getWeeklyExpenses");
        await this.dispatch("getMonthlyExpenses");
        await this.dispatch("getUserExpenses");
        resolve && resolve();
      } else {
        reject && reject();
      }
    },
    async addExpenses({ commit }, { resolve, reject, payload }) {
      let data = await apiCall.addExpenses(payload.data);
      if (data.status === 200) {
        commit("ADD_EXPENSES", payload.data);
        this.dispatch("getTodayExpenses");
        this.dispatch("getWeeklyExpenses");
        this.dispatch("getMonthlyExpenses");
        this.dispatch("getUserExpenses");
        resolve && resolve(data.statusText);
      } else {
        reject && reject();
      }
    },
    getTodayExpenses({ commit }) {
      apiCall
        .getTodayExpenses()
        .then((response) => {
          commit("TODAY_EXPENSES", response.data.data[0].total);
        })
        .catch(() => console.error());
    },
    getWeeklyExpenses({ commit }) {
      apiCall
        .getWeeklyExpenses()
        .then((response) => {
          commit("WEEKLY_EXPENSES", response.data.data[0].weekly_total);
        })
        .catch(() => console.error());
    },
    getMonthlyExpenses({ commit }) {
      apiCall
        .getMonthlyExpense()
        .then((response) => {
          commit("MONTHLY_EXPENSES", response.data.data[0].monthly_total);
        })
        .catch(() => console.error());
    },
    setSnackbar({ commit }, snackbar) {
      commit("SET_SNACKBAR", snackbar);
    },
    getUser({ commit }) {
      apiCall
        .getUserDetails()
        .then((response) => {
          if (response.data.auth === true) {
            commit("SET_USER_DETAILS", response.data.data);
          }
        })
        .catch((error) => console.error(error));
    },
    async loginUser({ commit }, { resolve, reject, payload }) {
      let userData = await apiCall.userLogin(payload.data);
      if (userData.data.code === 200 && userData.data.auth === true) {
        commit("LOGIN_USER");
        localStorage.setItem("token", userData.data.token);
        localStorage.setItem("fName", userData.data.results[0].first_name);
        localStorage.setItem("lName", userData.data.results[0].last_name);
        localStorage.setItem("email", userData.data.results[0].email);
        localStorage.setItem("user_id", userData.data.results[0].user_id);
        resolve && resolve();
      } else {
        reject && reject();
      }
    },
    async signupUser({ commit }, { resolve, reject, payload }) {
      let data = await apiCall.userSignup(payload.data);
      if (data.data.errors) {
        commit("USER_SIGNUP");
        reject && reject();
      } else {
        resolve && resolve();
      }
    },
    logout({ commit }) {
      commit("resetAllState");
    },
  },
});
