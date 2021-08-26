import { createLocalVue, mount } from "@vue/test-utils";
import ConfirmBox from "@/components/confirmBox.vue";

describe("Confirmbox unit testing", () => {
  test("test discription props in Cofirmbox", () => {
    document.body.setAttribute("data-app", true);
    const discription = "-----Hello there----";
    let confirm = () => {};
    let cancel = () => {};
    const show = true;
    let localVue = new createLocalVue();
    const wrapper = mount(ConfirmBox, {
      localVue,
      propsData: { show, discription, confirm, cancel },
    });
    expect(wrapper.find("#confirmbox-span").text()).toContain(
      "-----Hello there----"
    );
  });

  test("test isConfirm props when false in Cofirmbox", () => {
    document.body.setAttribute("data-app", true);
    let confirm = () => {};
    let cancel = () => {};
    const show = true;
    const isConfirm = false;
    let localVue = new createLocalVue();
    const wrapper = mount(ConfirmBox, {
      localVue,
      propsData: { show, isConfirm, confirm, cancel },
    });
    // expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
    expect(wrapper.find("#confirm-btn").exists()).toBe(true);
  });

  test("test isConfirm props when true in Cofirmbox", () => {
    document.body.setAttribute("data-app", true);
    const show = true;
    let confirm = () => {};
    let cancel = () => {};
    const isConfirm = true;
    let localVue = new createLocalVue();
    const wrapper = mount(ConfirmBox, {
      localVue,
      propsData: { show, isConfirm, confirm, cancel },
    });
    expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
    // expect(wrapper.find("#confirm-btn").exists()).toBe(true);
  });
  test("test confirm and cancel props in confirbox component", async () => {
    document.body.setAttribute("data-app", true);
    let show = true;
    let confirm = () => {};
    let cancel = () => {};
    let localVue = new createLocalVue();
    const wrapper = mount(ConfirmBox, {
      localVue,
      propsData: { show, confirm, cancel },
    });
    wrapper.find("#confirmbox-cancelbtn").trigger("click");
  });
});
