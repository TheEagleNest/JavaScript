"use strict";
// ////////////////////////////////////////////////////
//Lưu dữ liệu dưới local storage
// Hàm lưu dữ liệu
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
// Hàm lấy dữ liệu
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
//Tạo mảng lưu thông tin người dùng đăng kí
const userArr = getFromStorage("user") || [];
