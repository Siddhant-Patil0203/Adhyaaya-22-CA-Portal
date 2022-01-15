const toggle = document.querySelector("i");
let flag = false;
toggle.addEventListener("click", () => {
  if (!flag) {
    document.querySelector(".nav-links").style.top = "120%";
    flag = true;
    document.getElementById("toggle_icon").classList.remove("bx-menu");
    document.getElementById("toggle_icon").classList.add("bx-x");
  } else {
    document.querySelector(".nav-links").style.top = "-500%";
    flag = false;
    document.getElementById("toggle_icon").classList.remove("bx-x");
    document.getElementById("toggle_icon").classList.add("bx-menu");
  }
});

//scrole to top visible or hidden
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
