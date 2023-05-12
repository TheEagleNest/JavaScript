"use strict";
// Tạo biến lưu trữ DOM elements
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");
const currentUser = getFromStorage("currentUser") || [];
btnSave.addEventListener("click", function () {
  const optionUser = function (user) {
    user.pageSize = inputPageSize.value;
    user.category = inputCategory.value;
    saveToStorage("currentUser", user);
  };
  optionUser(currentUser);
});
