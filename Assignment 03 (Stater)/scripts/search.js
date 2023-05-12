"use strict";
// Tạo biến lưu trữ DOM element
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const navPageNum = document.getElementById("nav-page-num");
const newsContainer = document.getElementById("news-container");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

const currentUser = getFromStorage("currentUser") || [];
let totalResult = 0;
let keyword = "";

//Bắt sự kiện nút Search
btnSubmit.addEventListener("click", function () {
  keyword = inputQuery.value;
  // Kiểm tra dữ liệu khung input
  if (inputQuery.value.trim() == 0) {
    alert("please insert searching content!");
  }
  // console.log(keyword);
  getNews(keyword, 1);
});
// lấy api theo value input
async function getNews(keyword, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=0f646bb2190145f382aa7454060510ca`
    );
    // chuyển sang dạng array thay vì string bằng lệnh JSON
    const data = await response.json();
    console.log(data);
    // Kiểm tra kết quả của từ khoá tìm kiếm
    if (data.totalResults == 0) {
      // Nếu không có kết quả, hiện thông báo và ẩn chuyển trang
      alert("No results!");
      // Ẩn navPageNum
      navPageNum.style.display = "none";
    } else {
      // nếu có kết quả => gọi hàm in tin tức lên trang
      displayNews(data);
    }
  } catch (err) {
    // Câu lệnh thông báo lỗi cho người dùng
    alert("Error: " + err.message);
  }
}
// hàm in tin tức lên trang
const displayNews = function (data) {
  inputQuery.style.display = "block";
  totalResult = data.totalResults;

  // Xử lý hiện thông tin
  let html = "";
  data.articles.forEach(function (article) {
    html += `<div class="card flex-row flex-wrap">
  <div class="row no-gutters">
  <div class="col-md-4">
    <img src=${article.urlToImage} class="card-img"
      alt=${article.title}>
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.content}</p>
      <a href=${article.url}
        class="btn btn-primary">View</a>
    </div>
  </div>
</div>
</div>
      </div>`;
    newsContainer.innerHTML = html;
    // Gọi hàm kiểm tra nút chuyển trang
    checkPrev();
    checkNext();
  });
};
////////////////////////////////////////////////
// Chuyển trang cho các bài viết

// trang 1 ẩn nút Previous
const checkPrev = function () {
  if (pageNum.textContent === "1") {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
};
// Hiện thông tin tương ứng số trang
btnPrev.addEventListener("click", function () {
  getNews(keyword, --pageNum.textContent);
});
// Trang cuối ẩn nút Next
const checkNext = function () {
  if (pageNum.textContent == Math.ceil(totalResult / currentUser.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};
btnNext.addEventListener("click", function () {
  // Hiện thông tin tương ứng số trang
  getNews(keyword, ++pageNum.textContent);
});
