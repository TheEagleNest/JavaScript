"use strict";
//DOM selectors
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Kiểm tra nếu đã có người dùng đăng nhập và hiện màn hình tương ứng
// Lấy data người dùng đang đăng nhập từ storage
const currentUser = getFromStorage("currentUser");

if (currentUser) {
  // Ẩn màn hình đăng ký
  loginModal.style.display = "none";
  // Hiện màn hình thể hiện thông tin người dùng đăng nhập
  mainContent.style.display = "block";
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;

  //////////////////////////////////////////////////////////////////
  //Chức năng Logout
  // bắt sự kiện click nút Log out
  btnLogout.addEventListener("click", function () {
    // Xoá array người dùng đăng nhập trong storage
    localStorage.removeItem("currentUser");
    // Ẩn màn hình đăng nhập thành công
    mainContent.style.display = "none";
    // Hiện màn hình đăng kí/ đăng nhập
    loginModal.style.display = "block";
    // Đưa về trang log in
    window.location.href = "../pages/login.html";
  });
}
