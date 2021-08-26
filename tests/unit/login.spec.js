import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import LoginComponent from "@/components/LoginComponent";
import route from "@/router/index.js";
import store from "@/store/index.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import flushPromises from "flush-promises";

const router = new VueRouter({ route });

const mock = new MockAdapter(axios);

describe("Login component test", () => {
  test("Check empty input fields errors", async () => {
    let localVue = new createLocalVue();
    const wrapper = mount(LoginComponent, { localVue, router, store });
    const email = "";
    const password = "";
    let emailInput = wrapper.find("#login-email");
    let passwordInput = wrapper.find("#login-password");
    let logingButton = wrapper.find("#login-button");
    emailInput.setValue(email);
    passwordInput.setValue(password);

    logingButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("E-mail is required");
    expect(wrapper.text()).toContain("password is required");
  });

  test("Mock axios call and check redirect routes", async () => {
    let localVue = new createLocalVue();

    const wrapper = mount(LoginComponent, { localVue, router, store });
    const email = "rahul@gmail.com";
    const password = "Test@12345";
    let emailInput = wrapper.find("#login-email");
    let passwordInput = wrapper.find("#login-password");
    emailInput.setValue(email);
    passwordInput.setValue(password);
    wrapper.find("#login-button").trigger("click");
    const msg = {
      auth: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsImlhdCI6MTYyOTM3MTY1NCwiZXhwIjoxNjI5NDU4MDU0fQ.mk47SRpcCutBkTcKG5OnaxkjOnxxMTWbhjvw2cwfZhs",
      results: [
        {
          user_id: 66,
          first_name: "test",
          last_name: "test",
          email: "rahul@gmail.com",
          password:
            "$2b$10$1GGJZWfYiXNmzKTtW0V8euoZUuEzKvV/j/TY8PpVgcm/a19onOObe",
        },
      ],
      code: 200,
      success: "login successful",
    };
    const response = mock.onPost("/user/login").reply(200, msg);
    await flushPromises();
    expect(response).toBeDefined();
    expect(wrapper.vm.$data.loader).toBe(false);
    expect(wrapper.vm.$route.path).toBe("/");
  });

  test("mock axios call for invalid details", async () => {
    let localVue = new createLocalVue();
    const wrapper = mount(LoginComponent, { localVue, router, store });
    const email = "Rahul@gmail.com";
    const password = "Test@123456666";
    let emailInput = wrapper.find("#login-email");
    let passwordInput = wrapper.find("#login-password");
    emailInput.setValue(email);
    passwordInput.setValue(password);
    wrapper.find("#login-button").trigger("click");

    const msg = { code: 204, error: "Email and password does not match" };
    const response = mock.onPost("/user/login").reply(200, msg);
    await flushPromises();
    expect(response).toBeDefined();
    expect(wrapper.vm.$data.loader).toBe(false);
    // expect(wrapper.vm.$route.path).toBe("/login");
  });
});
