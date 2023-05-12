"use strict";
// Creat DOM element

const btnRegister = document.getElementById("btn-submit");
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-password-confirm");

btnRegister.addEventListener("click", function () {
  // 1. Lấy dữ liệu input
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );
  // 2. Hàm validate dữ liệu hợp lệ

  // 2.1 Hàm validate dữ liệu
  let isValidated = true;
  const validate = function () {
    // 2.1.1 không có trường nào bị bỏ trống
    if (user.firstName.trim().length === 0) {
      alert("Please fill First Name input!");
      isValidated = false;
    }
    if (user.lastName.trim().length === 0) {
      alert("Please fill Last Name input!");
      isValidated = false;
    }
    if (user.username.trim().length === 0) {
      alert("Please fill Username input!");
      isValidated = false;
    }
    if (user.password === "") {
      alert("Please fill Password input!");
      isValidated = false;
    }
    if (inputConfirmPassword.value === "") {
      alert("Please confirm Password!");
      isValidated = false;
    }
    // 2.1.2 username không được trùng với username đã có
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username === user.username) {
        alert("Username is already existed!");
        isValidated = false;
        break;
      }
    }
    // 2.1.3 password có nhiều hơn 8 ký tự
    if (user.password.length <= 8) {
      alert("Password must be more than 8 characters");
      isValidated = false;
    }
    // 2.1.4 password và confirm password phải giống nhau
    if (user.password !== inputConfirmPassword.value) {
      alert(`Password & Confirm Password must be the same`);
      isValidated = false;
    }
    return isValidated;
  };
  // Lưu dữ liệu hợp lệ
  isValidated = validate(user);
  if (isValidated) {
    // 3. Tạo user mới với các dữ liệu hợp lệ
    userArr.push(user);
    // 4. Thêm user vào mảng, lưu vào storage
    saveToStorage("user", userArr);
    // 4.2 Hàm chuyển từ class object sang class instance
    // function parseUser(data) {
    //   const user = new User(
    //     userData.firstname,
    //     userData.lastname,
    //     userData.username,
    //     userData.password
    //   );
    //   return user;
    // }
    // 5. Chuyển đến trang login
    window.location.href = "../pages/login.html";
  }
});
