// commit from store
// dispatch from components
import Vuex from "vuex";
import Vue from "vue";
// import axios from "axios";
import { apiCall } from "../service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userExpenses: [],
    user: [],
    dailyCount: 0,
    weeklyCount: 0,
    monthlyCount: 0,
    showNavbar: false,
  },
  getters: {
    userExpenses: (state) => state.userExpenses,
    dailyCount: (state) => state.dailyCount,
    weeklyCount: (state) => state.weeklyCount,
    monthlyCount: (state) => state.monthlyCount,
    showNavbar: (state) => state.showNavbar,
    // userName: (state) => state.user.first_name,
  },
  mutations: {
    SET_EXPENSES(state, userExpenses) {
      if (localStorage.token) {
        this.state.showNavbar = true;
      }
      state.userExpenses = userExpenses;
    },
    EDIT_EXPENSES(state, payload) {
      const index = state.userExpenses.map((o) => o.id).indexOf(payload.id);
      state.userExpenses.splice(index, 1, payload.data);
      this.dispatch("getUserExpenses");
    },
    DELETE_EXPENSES(state, payload) {
      const index = state.userExpenses.findIndex(
        (expenses) => expenses.id == payload.id
      );
      state.userExpenses.splice(index, 1);
    },
    ADD_EXPENSES(state, payload) {
      state.userExpenses.push(payload);
    },
    TODAY_EXPENSES(state, payload) {
      state.dailyCount = payload;
      // console.log(payload.total)
      console.log(this.dailyCount);
    },
    WEEKLY_EXPENSES(state, payload) {
      state.weeklyCount = payload;
      // console.log(payload.total)
      console.log(this.dailyCount);
    },
    MONTHLY_EXPENSES(state, payload) {
      state.monthlyCount = payload;
      // console.log(payload.total)
      console.log(this.dailyCount);
    },
    SET_USER_DETAILS(state, payload) {
      state.user = payload;
      console.log(payload);
    },
    resetAllState(state) {
      state.userExpenses = [];
      state.dailyCount = 0;
      state.weeklyCount = 0;
      state.monthlyCount = 0;
      state.showNavbar = false;
    },
  },
  actions: {
    getUserExpenses({ commit }) {
      apiCall
        .getExpenses()
        .then((response) => {
          commit("SET_EXPENSES", response.data);
          this.dispatch("getTodayExpenses");
          this.dispatch("getWeeklyExpenses");
          this.dispatch("getMonthlyExpenses");
          this.dispatch("getUser");
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    async editExpenses({ commit }, { resolve, reject, payload }) {
      const data = await apiCall.editExpenses(payload.id, payload.data);
      console.log(data, "this is data");
      if (data.status === 200) {
        commit("EDIT_EXPENSES", payload);
        await this.dispatch("getTodayExpenses");
        await this.dispatch("getWeeklyExpenses");
        await this.dispatch("getMonthlyExpenses");
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
        resolve && resolve();
      } else {
        reject && reject();
      }
    },
    async addExpenses({ commit }, { resolve, reject, payload }) {
      console.log(payload.data, "this is payload data");
      let data = await apiCall.addExpenses(payload.data);
      console.log(data);
      if (data.status === 200) {
        await commit("ADD_EXPENSES", payload.data);
        await this.dispatch("getTodayExpenses");
        await this.dispatch("getWeeklyExpenses");
        await this.dispatch("getMonthlyExpenses");
        this.dispatch("getUserExpenses");
        resolve && resolve(data.statusText);
      } else {
        reject && reject();
      }
    },
    async getTodayExpenses({ commit }) {
      await apiCall
        .getTodayExpenses()
        .then((response) => {
          commit("TODAY_EXPENSES", response.data.data[0].total);
          console.log(response.data.data[0].total);
        })
        .catch((error) => console.error(error));
    },
    getWeeklyExpenses({ commit }) {
      apiCall
        .getWeeklyExpenses()
        .then((response) => {
          commit("WEEKLY_EXPENSES", response.data.data[0].weekly_total);
          console.log(response.data.data[0].weekly_total);
        })
        .catch((error) => console.error(error));
    },
    getMonthlyExpenses({ commit }) {
      apiCall
        .getMonthlyExpense()
        .then((response) => {
          commit("MONTHLY_EXPENSES", response.data.data[0].monthly_total);
          console.log(response.data.data[0].monthly_total);
        })
        .catch((error) => console.error(error));
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

    logout({ commit }) {
      commit("resetAllState");
    },
  },
});
