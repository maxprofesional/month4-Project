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

// converter home work #5

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

function converter(element, secondElement, thirtyElement) {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/currency.json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      if (element.id === "som") {
        secondElement.value = (element.value / data.usd).toFixed(2);
        thirtyElement.value = (element.value / data.eur).toFixed(2);
      }
      if (element.id === "usd") {
        secondElement.value = (element.value * data.usd).toFixed(2);
        thirtyElement.value = (secondElement.value / data.eur).toFixed(2);
      }
      if (element.id === "eur") {
        thirtyElement.value = (element.value * data.eur).toFixed(2);
        secondElement.value = (thirtyElement.value / data.usd).toFixed(2);
      }
      if (element.value === "") {
        secondElement.value = "";
        thirtyElement.value = "";
      }
    };
  };
}

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, usdInput, somInput);
