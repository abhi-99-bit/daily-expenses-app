import { createLocalVue, mount } from "@vue/test-utils";
import DashboardComponent from "@/components/DashboadComponent";
import store from "@/store/index.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import flushPromises from "flush-promises";

const mock = new MockAdapter(axios);

describe("Dashboard Components unit testing", () => {
  beforeEach(() => {
    const msg1 = {
      error: false,
      data: [{ total: 2100 }],
      msg: "Get Today expenses count",
    };
    const msg2 = {
      error: false,
      data: [{ weekly_total: 2600 }],
      msg: "Get Today expenses count",
    };
    const msg3 = {
      error: false,
      data: [{ monthly_total: 2600 }],
      msg: "Get Today expenses count",
    };
    const msg4 = {
      auth: true,
      data: [
        {
          user_id: 66,
          first_name: "test",
          last_name: "test",
          email: "rahul@gmail.com",
          password:
            "$2b$10$1GGJZWfYiXNmzKTtW0V8euoZUuEzKvV/j/TY8PpVgcm/a19onOObe",
          accept_tc: 1,
        },
      ],
      status: "sucess",
    };
    mock.onGet("/user/today-expenses").reply(200, msg1);
    mock.onGet("/user/weekly-expnses").reply(200, msg2);
    mock.onGet("/user/monthly-expnses").reply(200, msg3);
    mock.onGet("/users/details").reply(200, msg4);
  });

  test("dialog box is opean on addlist button click", async () => {
    document.body.setAttribute("data-app", true);
    let localVue = new createLocalVue();
    const wrapper = mount(DashboardComponent, { localVue, store });
    expect(wrapper.find("#dash-addList").exists()).toBe(true);
    wrapper.find("#dash-addList").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.dialog).toBe(true);
  });
  test("unit testing for dialog box with empty fields", async () => {
    document.body.setAttribute("data-app", true);

    let localVue = new createLocalVue();
    const wrapper = mount(DashboardComponent, { localVue, store });
    const category = "";
    const cost = "";
    const date = "";
    const discription = "";

    let categoryInput = wrapper.find("#dash-category");
    categoryInput.setValue(category);

    let costInput = wrapper.find("#dash-cost");
    costInput.setValue(cost);

    let dateInput = wrapper.find("#dash-date");
    dateInput.setValue(date);

    let discriptionInput = wrapper.find("#dash-discription");
    discriptionInput.setValue(discription);

    await wrapper.find("#dash-savebutton").trigger("click");

    expect(wrapper.vm.$data.category).toBe("");
    expect(wrapper.vm.$data.price).toBe("");
    expect(wrapper.vm.$data.date).toBe("");
    expect(wrapper.vm.$data.discription).toBe("");
    expect(wrapper.vm.$data.isValid).toBe(false);
  });

  test("testing dialog box with valid fields and make Add expenses request", async () => {
    document.body.setAttribute("data-app", true);

    let localVue = new createLocalVue();
    const wrapper = mount(DashboardComponent, { localVue, store });

    const category = "Food";
    const cost = "200";
    const date = "2021-08-23";
    const discription = "spends on food";
    let categoryInput = wrapper.find("#dash-category");
    categoryInput.setValue(category);

    let costInput = wrapper.find("#dash-cost");
    costInput.setValue(cost);

    let dateInput = wrapper.find("#dash-date");
    dateInput.setValue(date);

    let discriptionInput = wrapper.find("#dash-discription");
    discriptionInput.setValue(discription);

    const title = wrapper.findAll(".v-date-picker-title__date").at(0);
    const header = wrapper.findAll(".v-date-picker-header__value div").at(0);

    await wrapper.find("#dash-savebutton").trigger("click");

    expect(title.text()).toBe("Mon, Aug 23");
    expect(header.text()).toBe("August 2021");
    const msg = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 244,
      serverStatus: 2,
      warningCount: 0,
      message: "",
      protocol41: true,
      changedRows: 0,
    };
    const response = mock.onPost("/user/expenses").reply(200, msg);
    mock.onGet("/user/today-expenses").reply(200, {
      error: false,
      data: [{ total: 2100 }],
      msg: "Get Today expenses count",
    });
    await flushPromises();
    expect(response).toBeDefined();
  });

  test("makes Edit request", async () => {
    document.body.setAttribute("data-app", true);

    let localVue = new createLocalVue();

    const wrapper = mount(DashboardComponent, { localVue, store });
    const msg = [
      {
        post_id: 239,
        category: "Entertainment",
        price: "500",
        date: "2021-08-20",
        discription: "spends on foods",
      },
      {
        post_id: 241,
        category: "Subscription",
        price: "600",
        date: "2021-08-23",
        discription: "spends on subscritption",
      },
      {
        post_id: 242,
        category: "Recharge",
        price: "500",
        date: "2021-08-23",
        discription: "spends on Recharge",
      },
      {
        post_id: 243,
        category: "Travelling",
        price: "500",
        date: "2021-08-23",
        discription: "travel expenses.",
      },
      {
        post_id: 244,
        category: "Shopping",
        price: "500",
        date: "2021-08-23",
        discription: "Expenses for shopping",
      },
    ];
    mock.onGet("/user/expenses-list").reply(200, msg);
    await flushPromises();
    let editBtn = wrapper.find("#dash-editBtn-239");
    editBtn.trigger("click");
    let saveBtn = wrapper.find("#dash-savebutton");
    saveBtn.trigger("click");
    const msg0 = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: "(Rows matched: 1  Changed: 1  Warnings: 0",
      protocol41: true,
      changedRows: 1,
    };
    const respones = mock.onPut("/user/update-expenses/239").reply(200, msg0);
    await flushPromises();
    expect(respones).toBeDefined();
    expect(wrapper.vm.$data.editedIndex).toBe(-1);
    expect(wrapper.vm.$data.progress).toBe(false);
  });

  test("make DELETE request", async () => {
    document.body.setAttribute("data-app", true);

    let localVue = new createLocalVue();

    const wrapper = mount(DashboardComponent, { localVue, store });
    const msg = [
      {
        post_id: 245,
        category: "Entertainment",
        price: "599",
        date: "2021-08-24",
        discription: "spends on entertainment\n",
      },
      {
        post_id: 247,
        category: "Shopping",
        price: "400",
        date: "2021-08-24",
        discription: "spends on shopping",
      },
      {
        post_id: 248,
        category: "Subscription",
        price: "400",
        date: "2021-08-24",
        discription: "spends on subscription",
      },
      {
        post_id: 249,
        category: "Food",
        price: "500",
        date: "2021-08-24",
        discription: "spends on food",
      },
    ];
    mock.onGet("/user/expenses-list").reply(200, msg);
    await flushPromises();
    let deletbtn = wrapper.find("#dash-deleteBtn-245");
    deletbtn.trigger("click");
    await wrapper.vm.confirm();
    const msg0 = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: "",
      protocol41: true,
      changedRows: 0,
    };
    mock.onDelete("/user/delete-expenses/245").reply(200, msg0);
    await flushPromises();

    expect(wrapper.vm.$data.showDialog).toBe(false);

    expect(wrapper.vm.$data.isConfirm).toBe(false);

    expect(wrapper.vm.$data.deleteIndex).toBe(-1);
  });
});
