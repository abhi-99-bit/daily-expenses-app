<template>
  <div class="loginContainer">
    <form>
      <div class="container">
        <label class="label"><b>Firstname</b></label>
        <input type="text" placeholder="Enter Firstname" name="uname" />

        <label class="label"><b>Lastname</b></label>
        <input type="text" placeholder="Enter Lastname" name="uname" />

        <label class="label"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="uname" />

        <label class="label"><b>Password</b></label>
        <input type="text" placeholder="Enter password" name="uname" />

        <label class="label"><b>ConfirmPassword</b></label>
        <input type="password" placeholder="Enter Password" name="psw" />

        <button type="submit">SignUp</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.loginContainer {
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
form {
  border: 3px solid #f1f1f1;
}

.label {
  margin-right: 305px;
  padding-right: 30px;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}
</style>
