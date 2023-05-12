"use strict";
// Select DOM elements
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
// Select button Login
const btnLogin = document.getElementById("btn-submit");

// Tạo biến lưu giá trị người dùng đăng nhập thành công
let currentUser = {};
// Tạo biến kiểm tra
let isValidated = true;
// Hàm kiểm tra trường input
const validate = function () {
  if (inputUsername.value.trim().length === 0) {
    alert("Username and Password must be fulfilled!");
    isValidated = false;
  } else if (inputPassword.value.trim().length === 0) {
    alert("Username and Password must be fulfilled!");
    isValidated = false;
  }
  return isValidated;
};

// Chức năng login
btnLogin.addEventListener("click", function () {
  isValidated = validate();
  // Hàm tìm kiếm thông tin user được nhập

  const foundUser = userArr.find(
    (user) =>
      inputUsername.value === user.username &&
      inputPassword.value === user.password
  );

  if (foundUser) {
    alert("Successful login!");
    currentUser = foundUser;
    saveToStorage("currentUser", currentUser);
    window.location.href = "../index.html";
  } else {
    alert("Wrong identification!");
  }
});
