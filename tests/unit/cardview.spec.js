import { createLocalVue, mount } from "@vue/test-utils";
import CardView from "@/components/cardView.vue";
import store from "@/store/index.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import flushPromises from "flush-promises";

const mock = new MockAdapter(axios);
describe("CardView.vue", () => {
  const localVue = createLocalVue();

  it("find the of daily count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const dailyCount = wrapper.find('[data-testid="daily-count"]');
    expect(dailyCount.exists()).toBe(true);
    wrapper.vm.$store.dispatch("getTodayExpenses");
    const msg = {
      error: false,
      data: [{ total: null }],
      msg: "Get Today expenses count",
    };
    const response = mock.onGet("/user/today-expenses").reply(200, msg);
    await flushPromises();
    expect(response).toBeDefined();
  });

  it("find the of weekly count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const weeklyCount = wrapper.find('[data-testid="weekly-count"]');
    expect(weeklyCount.exists()).toBe(true);
    wrapper.vm.$store.dispatch("getWeeklyExpenses");
    const msg = {
      error: false,
      data: [{ weekly_total: 1499 }],
      msg: "Get Today expenses count",
    };
    const response = mock.onGet("/user/weekly-expnses").reply(200, msg);
    await flushPromises();
    expect(response).toBeDefined();
  });

  it("find the id of monthly count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const monthlyCount = wrapper.find('[data-testid="monthly-count"]');
    expect(monthlyCount.exists()).toBe(true);
    wrapper.vm.$store.dispatch("getMonthlyExpenses");
    const msg = {
      error: false,
      data: [{ monthly_total: 1499 }],
      msg: "Get Today expenses count",
    };
    const response = mock.onGet("/user/monthly-expnses").reply(200, msg);
    await flushPromises();
    expect(response).toBeDefined();
  });
});
