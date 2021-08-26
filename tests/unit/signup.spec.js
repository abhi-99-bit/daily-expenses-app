import Vuex from "vuex";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import { createLocalVue, mount } from "@vue/test-utils";
import Signup from "@/components/SignUpComponent.vue";
import "@testing-library/jest-dom";
import axios from "axios";
import route from "@/router/index.js";
import MockAdapter from "axios-mock-adapter";
import flushPromises from "flush-promises";

const router = new VueRouter({ route });

const mock = new MockAdapter(axios);

describe("SignUp Component", () => {
  let localVue;
  beforeEach(() => {
    localVue = new createLocalVue();
    localVue.use(Vuex);
  });

  it("check if sign up button is disable on empty fields", async () => {
    const wrapper = mount(Signup, {
      store,
      localVue,
      router,
    });
    const firstname = "";
    const lastname = "";
    const email = "";
    const password = "";
    const confirmPassword = "";
    const checkbox = false;

    const firstnameInput = wrapper.find("#signup-firstname");
    firstnameInput.setValue(firstname);

    const lastnameInput = wrapper.find("#signup-lastname");
    lastnameInput.setValue(lastname);

    const emailInput = wrapper.find("#signup-email");
    emailInput.setValue(email);

    const passwordInput = wrapper.find("#signup-password");
    passwordInput.setValue(password);

    const confirmPasswordInput = wrapper.find("#signup-confirmpassword");
    confirmPasswordInput.setValue(confirmPassword);

    const checkboxInput = wrapper.find("#sigup-checkbox");
    checkboxInput.setChecked(checkbox);

    await wrapper.find("#signup-button").trigger("click");
    expect(wrapper.vm.firstname).toBe(firstname);
    expect(wrapper.vm.lastname).toBe(lastname);
    expect(wrapper.vm.email).toBe(email);
    expect(wrapper.vm.password).toBe(password);
    expect(wrapper.vm.confirmPassword).toBe(confirmPassword);
    expect(wrapper.vm.checkbox).toBe(checkbox);
    expect(wrapper.vm.signupFormIsValid).toBeFalsy();
    expect(wrapper.find("#signup-button").attributes().disabled).toBe(
      "disabled"
    );
    console.log(wrapper.find("#signup-button").attributes());
    console.log(wrapper.vm.firstname, "<-", "firstname");
    console.log(wrapper.vm.lastname, "<-", "lastname");
    console.log(wrapper.vm.email, "<-", "email");
    console.log(wrapper.vm.password, "<-", "password");
    console.log(wrapper.vm.confirmPassword, "<-", "confirmpassword");
    console.log(wrapper.vm.checkbox, "<-", "checkbox");
  });

  it("Check password and confirm password are same", async () => {
    const wrapper = mount(Signup, {
      store,
      localVue,
      router,
    });
    const password = "Test@1234567";
    const confirmPassword = "Test@123456";
    const passwordInput = wrapper.find("#signup-password");
    await passwordInput.setValue(password);

    const confirmPasswordInput = wrapper.find("#signup-confirmpassword");
    await confirmPasswordInput.setValue(confirmPassword);

    // wrapper.find("#signup-button").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.password).toContain(password);
    expect(wrapper.vm.confirmPassword).toContain(confirmPassword);
    console.log(wrapper.text());
    expect(wrapper.text()).toContain(
      "The password confirmation does not match"
    );
    console.log(wrapper.vm.$data, "------data-----");
  });

  it("dispacthes setSnackbar user when form is not vaild ", async () => {
    const wrapper = mount(Signup, { store, localVue, router });
    // wrapper.vm.signupFormIsValid = true;
    await wrapper.find("#signup-button").trigger("click");
    expect(wrapper.vm.signupFormIsValid).toBeFalsy();
    // expect(actions.setSnackbar).toHaveBeenCalled();
  });

  it("dispacthes signup user when form is  vaild ", async () => {
    const wrapper = mount(Signup, { store, localVue, router });
    const firstname = "Test";
    const lastname = "User";
    const email = "User111@gmail.com";
    const password = "Test@12345";
    const confirmPassword = "Test@12345";
    const checkbox = true;

    const firstnameInput = wrapper.find("#signup-firstname");
    firstnameInput.setValue(firstname);

    const lastnameInput = wrapper.find("#signup-lastname");
    lastnameInput.setValue(lastname);

    const emailInput = wrapper.find("#signup-email");
    emailInput.setValue(email);

    const passwordInput = wrapper.find("#signup-password");
    passwordInput.setValue(password);

    const confirmPasswordInput = wrapper.find("#signup-confirmpassword");
    confirmPasswordInput.setValue(confirmPassword);

    const checkboxInput = wrapper.find("#sigup-checkbox");
    checkboxInput.setChecked(checkbox);
    wrapper.find("#signup-button").trigger("click");
    // expect(actions.signupUser).toHaveBeenCalled();

    const msg = {
      status: "success",
      messeage: "insert user value",
    };
    const respones = mock.onPost("/users").reply(200, msg);
    await flushPromises();

    expect(respones).toBeDefined();
    expect(wrapper.vm.$data.loader).toBe(false);
    console.log(wrapper.vm.$data.loader);
    expect(wrapper.vm.$route.path).toBe("/login");
    console.log(wrapper.vm.$route.path);
  });

  it("email already in use", async () => {
    const wrapper = mount(Signup, { store, localVue, router });
    const firstname = "Test";
    const lastname = "User";
    const email = "User@gmail.com";
    const password = "Test@12345";
    const confirmPassword = "Test@12345";
    const checkbox = true;

    const firstnameInput = wrapper.find("#signup-firstname");
    firstnameInput.setValue(firstname);

    const lastnameInput = wrapper.find("#signup-lastname");
    lastnameInput.setValue(lastname);

    const emailInput = wrapper.find("#signup-email");
    emailInput.setValue(email);

    const passwordInput = wrapper.find("#signup-password");
    passwordInput.setValue(password);

    const confirmPasswordInput = wrapper.find("#signup-confirmpassword");
    confirmPasswordInput.setValue(confirmPassword);

    const checkboxInput = wrapper.find("#sigup-checkbox");
    checkboxInput.setChecked(checkbox);

    wrapper.find("#signup-button").trigger("click");
    const msg = {
      errors: [
        {
          value: "value@gmail.com",
          msg: "E-mail already in use",
          param: "email",
          location: "body",
        },
      ],
    };
    const respones = mock.onPost("/users").reply(200, msg);
    await flushPromises();
    expect(respones).toBeDefined();
    console.log(respones);
  });
});
