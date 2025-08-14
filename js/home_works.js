//REG EXP part 1
const gmailBtn = document.querySelector("#gmail_button");
const gmailInp = document.querySelector("#gmail_input");
const gmailResult = document.querySelector("#gmail_result");

const rgx = /^[a-zA-Z] \w{3,15}@gmail\.com$/;

gmailBtn.addEventListener("click", () => {
  const text = gmailInp.value;

  if (rgx.test(text)) {
    gmailResult.textContent = "Валидный адрес";
    gmailResult.style.color = "green";
  } else {
    gmailResult.textContent = "Не валидный адрес";
    gmailResult.style.color = "red";
  }
});

//part 2
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

const width = parentBlock.clientWidth - childBlock.clientWidth;
const height = parentBlock.clientHeight - childBlock.clientHeight;
let posX = 0;
let posY = 0;
function MoveBlock() {
  childBlock.style.left = `${posX}px`;
  childBlock.style.top = `${posY}px`;

  if (posX < width && posY === 0) {
    posX++;
  } else if (posX === width && posY < height) {
    posY++;
  } else if (posY === height && posX > 0) {
    posX--;
  } else if (posX === 0 && posY > 0) {
    posY--;
  }
  requestAnimationFrame(() => MoveBlock());
}

MoveBlock();

//Timer HomeWork 2

const resultTimerBlock = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let interval = null;
let count = 0;

startBtn.onclick = () => {
  if (interval === null) interval = setInterval(timer, 1000);
};
resetBtn.onclick = () => {
  clearInterval(interval);
  count = 0;
  resultTimerBlock.textContent = 0;
  interval = null;
};
stopBtn.onclick = () => {
  clearInterval(interval);
  interval = null;
};

function timer() {
  count++;
  resultTimerBlock.textContent = count;
}

//Characters Home work #4

const charactersList = document.querySelector(".characters-list");

let characters = [];
let page = 8;

function renderCard(data) {
  if (page > characters.length) removeEventListener("scroll", scrollEnd);
  charactersList.innerHTML = "";
  data.forEach((item, index) => {
    if (index <= page - 1) {
      const card = document.createElement("DIV");
      card.classList.add("character-card");
      card.innerHTML = `
      <div class="character-photo">
        <img
          src="${item.photo}"
          alt=""
        />
      </div>
      <p>Имя: ${item.name}</p>
      <p>Возраст: ${item.age}</p>
    `;
      charactersList.appendChild(card);
    }
  });
  page += 8;
}

window.addEventListener("scroll", scrollEnd);

const request = new XMLHttpRequest();
request.open("GET", "../data/characters.json");
request.send();

request.onload = () => {
  characters = JSON.parse(request.response);
  renderCard(characters);
};

function scrollEnd() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= fullHeight - 3) {
    renderCard(characters);
  }
}

const bioRequest = new XMLHttpRequest();
bioRequest.open("GET", "../data/bio.json");
bioRequest.send();

bioRequest.onload = () => {
  const data = JSON.parse(bioRequest.response);

  let formatData = `
    ФИО: ${data.firstName} ${data.lastName}
    Возраст: ${data.age}
    Увлечения: ${data.hobbies.join(", ")}
    Работа: ${data.job.position} в ${data.job.location}
    Любимые языки программирования: ${data.favoriteProgrammingLanguages.join(
      ", "
    )}
  `;

  console.log(formatData);
};
