"use strict";
// Tạo biến lưu trữ DOM elements
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
let totalResult = 0;
const currentUser = getFromStorage("currentUser") || [];
// nếu đã đăng nhập -> hiện tin tức
if (currentUser) {
  // tạo biến DOM element
  const newsContainer = document.getElementById("news-container");
  // 1. get api ( sử dụng hàm async await xử lý bất đồng bộ)
  async function getNews(country, page) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=0f646bb2190145f382aa7454060510ca`
      );
      // 2. chuyển sang dạng array thay vì string bằng lệnh JSON
      const data = await response.json();
      console.log(data);
      // 3. gọi hàm in tin tức lên trang
      displayNews(data);
    } catch (err) {
      // Câu lệnh thông báo lỗi cho người dùng
      alert("Error: " + err.message);
    }
  }
  // 3. gọi hàm in tin tức lên trang
  getNews("us", 1);
  // 4. viết hàm in lên trang bằng html
  const displayNews = function (data) {
    totalResult = data.totalResults;
    // Gọi hàm kiểm tra nút chuyển trang
    checkPrev();
    checkNext();
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
    });
  };
  ////////////////////////////////////////////////
  // Chuyển trang cho các bài viết
  // hàm tổng số bài tin tức
  // const totalResult = 0;
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
    getNews("us", --pageNum.textContent);
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
    getNews("us", ++pageNum.textContent);
  });
}
// Nếu chưa đăng nhập hiện thông báo
else {
  alert(`Please log in first!`);
}
