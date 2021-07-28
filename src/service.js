/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from "axios";
require(`dotenv`).config();
axios.defaults.baseURL = process.env.API_END_POINT;
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        // NProgress.start(),
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized Request");
    }
    return Promise.reject(error);
  }
);
// axios.interceptors.response.use((response) => {
//   NProgress.done();
//   return response;
// });

export const apiCall = {
  getExpenses() {
    return axios.get(`/user/expenses-list`);
  },
  editExpenses(id, user_data) {
    return axios.put(`/user/update-expenses/${id}`, user_data);
  },
  deleteExpenses(id) {
    return axios.delete(`/user/delete-expenses/${id}`);
  },
  addExpenses(data) {
    return axios.post(`/user/expenses`, data);
  },
  getTodayExpenses() {
    return axios.get(`/user/today-expenses`);
  },
  getWeeklyExpenses() {
    return axios.get(`/user/weekly-expnses`);
  },
  getMonthlyExpense() {
    return axios.get(`/user/monthly-expnses`);
  },
  getUserDetails() {
    return axios.get(`/users/details`);
  },
  userSignup(data) {
    return axios.post(`/users`, data);
  },
};
