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
let currentCurrency = 0;

hideTabContent();
showTabContent();
showAutoSlide();

// converter home work #5

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const parentBlockInput = document.querySelector(".inner_converter");
const arrInput = parentBlockInput.querySelectorAll("input");

async function requestCurrency() {
  const request = await fetch("../data/currency.json");
  const data = await request.json();
  parentBlockInput.oninput = (event) => {
    arrInput.forEach((element, index) => {
      if (element.id === event.target.id) {
        if (index === 0) {
          arrInput[index + 1].value = (element.value / data.usd).toFixed(2);
          arrInput[index + 2].value = (element.value / data.eur).toFixed(2);
        }
        if (index === 1) {
          arrInput[index - 1].value = (element.value * data.usd).toFixed(2);
          arrInput[2].value = (arrInput[0].value / data.eur).toFixed(2);
        }
        if (index === 2) {
          arrInput[index + 1].value = (element.value / data.usd).toFixed(2);
        }
      }
    });
  };
}
requestCurrency();

// function converter(element, secondElement, thirtyElement) {
//   element.oninput = () => {
//     const request = new XMLHttpRequest();
//     request.open("GET", "../data/currency.json");
//     request.send();

//     request.onload = () => {
//       const data = JSON.parse(request.response);
//       if (element.id === "som") {
//         secondElement.value = (element.value / data.usd).toFixed(2);
//         thirtyElement.value = (element.value / data.eur).toFixed(2);
//       }
//       if (element.id === "usd") {
//         secondElement.value = (element.value * data.usd).toFixed(2);
//         thirtyElement.value = (secondElement.value / data.eur).toFixed(2);
//       }
//       if (element.id === "eur") {
//         thirtyElement.value = (element.value * data.eur).toFixed(2);
//         secondElement.value = (thirtyElement.value / data.usd).toFixed(2);
//       }
//       if (element.value === "") {
//         secondElement.value = "";
//         thirtyElement.value = "";
//       }
//     };
//   };
// }

// converter(somInput, usdInput, eurInput);
// converter(usdInput, somInput, eurInput);
// converter(eurInput, usdInput, somInput);

// CARD SWITCHER

const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const card = document.querySelector(".card");

const todosURL = "https://jsonplaceholder.typicode.com/todos";
const postsURL = "https://jsonplaceholder.typicode.com/posts";

let index = 0;

async function request(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function move(event = null) {
  const data = await request(todosURL);
  if (event?.target === btnPrev) index--;
  if (event?.target === btnNext) index++;
  if (index < 0) index = data.length - 1;
  if (index > data.length - 1) index = 0;

  card.innerHTML = `
  <h2>${data[index].id}</h2>
  <span>${data[index].title}</span>
  <p style='color: ${data[index].completed ? "green" : "red"}'>${
    data[index].completed
  }</p>
  `;
}

move();

btnPrev.onclick = move;
btnNext.onclick = move;

// part 2 home work 6

// request(postsURL).then((data) => {
//   console.log(data);
// });

// Weather

const searchInput = document.querySelector(".cityName");
const searchButton = document.querySelector("#search");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const API_KEY = "e417df62e04d3b1b111abeab19cea714";

searchButton.onclick = () => {
  const geo = searchInput.value;
  request(
    `http://api.openweathermap.org/data/2.5/weather?q=${geo}&units=metric&appid=${API_KEY}`
  ).then((data) => {
    city.textContent = data.name;
    temp.textContent = data.main.temp;
  });
};
