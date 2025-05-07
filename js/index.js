document.addEventListener("DOMContentLoaded", function () {
  const headerElem = document.getElementById("header"),
    gnbElem = document.getElementById("gnb"),
    gnb_mainNav = gnbElem.querySelectorAll("li.main_nav"),
    gnb_subNav = gnbElem.querySelectorAll("ul.sub_nav"),
    langs_Btn = headerElem.querySelector(".langs button"),
    langs_list = headerElem.querySelector(".langs .lang_list"),
    allMenu_Btn = headerElem.querySelector("#allMenu_btn");

  /* header ################################ */
  // gnb hover 이벤트
  gnb_mainNav.forEach((mainNav, idx) => {
    mainNav.addEventListener("mouseenter", function () {
      headerElem.classList.add("on");
      gnb_mainNav.forEach((mainNav) => {
        mainNav.classList.remove("on");
      });
      this.classList.add("on");
    });
  });
  headerElem.addEventListener("mouseleave", function () {
    headerElem.classList.remove("on");
    gnb_mainNav.forEach((mainNav) => {
      mainNav.classList.remove("on");
    });
  });

  //  언어 선택 버튼
  let langsBtn_bool = true;
  langs_Btn.addEventListener("click", function () {
    if (langsBtn_bool !== false) {
      langs_list.style.display = "block";
      setTimeout(() => {
        langs_list.style.height = "69px";
      }, 10);
      langsBtn_bool = false;
    } else {
      langs_list.style.height = "0px";
      langs_list.addEventListener("transitionend", function handler(e) {
        if (e.propertyName === "height") {
          langs_list.style.display = "none";
          langs_list.removeEventListener("transitionend", handler);
        }
      });
      langsBtn_bool = true;
    }
  });

  /* visual ################################ */
  const visualElem = document.getElementById("visual"),
    slideWrapElem = visualElem.querySelector(".slideWrap"),
    slideElem_list = visualElem.querySelectorAll(".slide_list div"),
    slideElem_pageNav = visualElem.querySelectorAll(".paginavtion li"),
    slide_prevBtn = visualElem.querySelector(".slide_nav .prev"),
    slide_nextBtn = visualElem.querySelector(".slide_nav .next"),
    txtBoxElem = visualElem.querySelector(".txtBox"),
    txtBox_spanElem = txtBoxElem.querySelectorAll("span");

  let vsl_idx = 0;
  // visual 움직임
  function visual_ani(idx) {
    // 배경이미지
    slideElem_list.forEach((list) => {
      list.style.opacity = 0;
      list.style.transform = "scale(120%)";
    });
    slideElem_list[idx].style.opacity = 1;
    slideElem_list[idx].style.transform = "scale(100%)";

    // 페이지네이션
    slideElem_pageNav.forEach((pageNav) => {
      pageNav.classList.remove("on");
    });
    slideElem_pageNav[idx].classList.add("on");
  }

  // visual 인터벌 이벤트
  function visual_interval() {
    if (vsl_idx !== slideElem_list.length - 1) {
      vsl_idx++;
    } else {
      vsl_idx = 0;
    }
    visual_ani(vsl_idx); // visual 움직임
  }
  let vsl_intervalId = setInterval(visual_interval, 5000);

  // 페이지네이션 클릭 이벤트
  slideElem_pageNav.forEach((pageNav, idx) => {
    pageNav.addEventListener("click", function () {
      clearInterval(vsl_intervalId); // interval 정지
      vsl_idx = idx;
      visual_ani(idx);
      vsl_intervalId = setInterval(visual_interval, 5000); // interval 재실행
    });
  });
  // visual slide 이전 버튼
  slide_prevBtn.addEventListener("click", function () {
    clearInterval(vsl_intervalId); // interval 정지
    if (vsl_idx !== 0) {
      vsl_idx--;
    } else {
      vsl_idx = slideElem_list.length - 1;
    }
    visual_ani(vsl_idx);
    vsl_intervalId = setInterval(visual_interval, 5000); // interval 재실행
  });
  // visual slide 다음 버튼
  slide_nextBtn.addEventListener("click", function () {
    clearInterval(vsl_intervalId); // interval 정지
    if (vsl_idx < slideElem_list.length - 1) {
      vsl_idx++;
    } else {
      vsl_idx = 0;
    }
    visual_ani(vsl_idx);
    vsl_intervalId = setInterval(visual_interval, 5000); // interval 재실행
  });

  // visual 텍스트 이벤트
  txtBox_spanElem.forEach((spanElem) => {
    spanElem.style.opacity = 1;
    spanElem.style.transform = "translateY(0)";
  });
});
