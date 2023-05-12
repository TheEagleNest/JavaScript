"use strict";

// Tạo class chứa thông tin người dùng
const User = class {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize;
    this.category;
  }
};
// Tạo class lưu trữ thông tin task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
