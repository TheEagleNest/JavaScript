"use strict";
// Lấy data người dùng đang đăng nhập từ storage
const currentUser = getFromStorage("currentUser") || [];

if (currentUser) {
  // Tạo mảng todoArr lưu trữ class task
  const todoArr = getFromStorage("todo") || [];
  // Tạo biến lưu trữ DOM element
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");
  // const liEl = document.querySelectorAll("#todo-list li");

  // Bắt sự kiện click nút Add
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim() != 0) {
      //Lấy dữ liệu từ input
      const newTask = new Task(inputTask.value, currentUser.username, false);
      // thêm vào todoArr
      todoArr.push(newTask);
      // lưu vào storage
      saveToStorage("todo", todoArr);
      // Lấy dữ liệu từ storage
      getFromStorage("todo");
      // Hiển thị task
      displayTask();
      inputTask.value = "";
    } else {
      alert("Please insert your tasks");
    }
  });
  // toggleTask();

  // // Hàm toggle task hoàn thành
  const toggleTask = function () {
    //   // Bắt sự kiện click vào task
    document.querySelectorAll("#todo-list li").forEach(function (li) {
      console.log(li);
      li.addEventListener("click", function (returnt) {
        console.log(returnt);
        // Bỏ qua nút delete
        if (returnt.target != li.children[0]) {
          // toggle class checked
          li.classList.toggle("checked");
          // Update giá trị cuả tham số isDone
          const updateIsDone = todoArr.find(
            (currentTask) =>
              currentTask.owner == currentUser.username &&
              currentTask.task == li.textContent.slice(0, -1)
          );

          updateIsDone.isDone = li.classList.contains("checked") ? true : false;
          saveToStorage("todo", todoArr);
        }
      });
    });
  };

  // Hàm xoá task
  const deleteTask = function () {
    //   // Bắt sự kiện click vào nút close
    document.querySelectorAll("#todo-list .close").forEach(function (close) {
      close.addEventListener("click", function (returnt) {
        // Xác nhận xoá
        const confirmDelete = confirm("Are you sure?");
        if (confirmDelete) {
          // Tìm kiếm object task cần delete
          const deleteIndex = todoArr.findIndex(
            (currentTask) =>
              currentTask.owner == currentUser.username &&
              currentTask.task == close.parentElement.textContent.slice(0, -1)
          );
          // Xoá object task trong mảng
          todoArr.splice(deleteIndex, 1);
          // Lưu mảng vào storage
          saveToStorage("todo", todoArr);
          // In lên bảng
          displayTask();
        }
      });
    });
  };
  //Hàm hiển thị Task
  const displayTask = function () {
    let html = "";
    todoArr
      .filter((list) => list.owner == currentUser.username)
      .forEach(function (list) {
        html += `
        <li ${list.isDone ? "class= checked" : ""}>${
          list.task
        }<span class="close">×</span></li>
      `;
        toggleTask();
      });
    todoList.innerHTML = html;
    // toggleTask;
    toggleTask();
    deleteTask();
  };
  displayTask();
} else {
  alert("Please log in first!");
}
