import { createLocalVue, mount } from "@vue/test-utils";
import CardView from "@/components/cardView.vue";
// import Vuex from "vuex";
import store from "@/store/index.js";

describe("CardView.vue", () => {
  const localVue = createLocalVue();

  // let getters;
  // let store;

  // beforeEach(() => {
  //   getters = {
  //     dailyCount: () => "200",
  //     monthlyCount: () => "200",
  //     weeklyCount: () => "200",
  //   };

  //   store = new Vuex.Store({
  //     getters,
  //   });
  // });
  it("find the of daily count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const dailyCount = wrapper.find('[data-testid="daily-count"]');
    expect(dailyCount.exists()).toBe(true);
    // expect(dailyCount.text()).toBe(getters.dailyCount());
  });

  it("find the of weekly count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const weeklyCount = wrapper.find('[data-testid="weekly-count"]');
    expect(weeklyCount.exists()).toBe(true);
    // expect(weeklyCount.text()).toBe(getters.weeklyCount());
  });

  it("find the id of monthly count", async () => {
    const wrapper = mount(CardView, { localVue, store });
    const monthlyCount = wrapper.find('[data-testid="monthly-count"]');
    expect(monthlyCount.exists()).toBe(true);
    // expect(monthlyCount.text()).toBe(getters.monthlyCount());
  });
});
