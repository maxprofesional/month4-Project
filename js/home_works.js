//REG EXP part 1
const gmailBtn = document.querySelector("#gmail_button");
const gmailInp = document.querySelector("#gmail_input");
const gmailResult = document.querySelector("#gmail_result");

const rgx = /^[a-zA-Z][a-zA-Z0-9]{3,15}@gmail\.com$/;

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

const width = Number(parentBlock.offsetWidth) - Number(childBlock.offsetWidth);
function MoveBlockRight(pixel = 0) {
  if (pixel < width) {
    childBlock.style.left = `${pixel}px`;
    requestAnimationFrame(() => MoveBlockRight(++pixel));
  } else {
    MoveBlockLeft();
  }
}
function MoveBlockLeft(pixel = width) {
  if (pixel > 0) {
    childBlock.style.left = `${pixel}px`;
    requestAnimationFrame(() => MoveBlockLeft(--pixel));
  } else {
    MoveBlockRight();
  }
}
MoveBlockRight();
