const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector("#btn-get");
const closeModalBtn = document.querySelector(".modal_close");

let timerId = setTimeout(openModalOnce, 10000);
let modalOpened = false;

function openModalOnce() {
  if (modalOpened === false) {
    openModal();
  }
}

function openModal() {
  modalOpened = true;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function scrollEnd() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= fullHeight - 5) {
    openModalOnce();
    window.removeEventListener("scroll", scrollEnd);
    clearTimeout(timerId);
  }
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("scroll", scrollEnd);
modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});
