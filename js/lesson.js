// Home Work N3/
// Slider

const sliderBtnContainer = document.querySelector(".tab_content_items");
const sliderBtns = document.querySelectorAll(".tab_content_item");
const tabContentBlocks = document.querySelectorAll(".tab_content_block");

sliderBtnContainer.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
  }
  sliderBtns.forEach((btn, index) => {
    if (event.target === btn) {
      stopShowAutoSlide();
      showTabContent(index);
      showAutoSlide();
    }
  });
};

function hideTabContent() {
  tabContentBlocks.forEach((tab) => {
    tab.style.display = "none";
  });

  sliderBtns.forEach((btn) => {
    btn.classList.remove("tab_content_item_active");
  });
}

function showTabContent(index = 0) {
  hideTabContent();
  tabContentBlocks[index].style.display = "block";
  sliderBtns[index].classList.add("tab_content_item_active");
  currentIndex = index;
}

function showAutoSlide() {
  showIntervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabContentBlocks.length) {
      currentIndex = 0;
    }
    showTabContent(currentIndex);
  }, 5000);
}
function stopShowAutoSlide() {
  clearInterval(showIntervalId);
}

let showIntervalId = null;
let currentIndex = 0;

hideTabContent();
showTabContent();
showAutoSlide();
