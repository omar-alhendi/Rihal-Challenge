const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const icon = document.querySelectorAll(".icon");
const selects = document.querySelectorAll("select");
const logout = document.querySelector("#logout");

if (icon.length >= 6) {
  icon[5].style.background = "#7380ec";
}

// show sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// close sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// change theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  for (let i = 0; i < selects.length; i++) {
    selects[i].classList.toggle("dark");
  }
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

logout.addEventListener("click", () => {
  alert("I hope you liked it");
});

(function () {
  let current = location.pathname.split("/")[1];
  if (current === "") return;
  let menuItems = document.querySelectorAll("aside a");
  for (let i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
      menuItems[i].className += "active";
    }
  }
})();
