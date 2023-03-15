function State() {
  this.container = null;
  this.btnClose = null;
}
const state = new State();

export function init() {
  state.container = document.querySelector("#codal-contact");
  state.btnClose = document.querySelector("#modal-contact-close");
  

  state.btnClose.addEventListener("click", handleBtnCloseClick);
  state.container.addEventListener("click", handleContainerClick);
}

export function showModal() {
  state.container.classList.add("active");
}

export function closeModal() {
  state.container.classList.remove("active");
}

function handleContainerClick(event) {
  //o This em uma função chama o objeto que criou a função.
  event.preventDefault();
  if (event.target === this) {
    closeModal();
  }
  
}

function handleBtnCloseClick(event) {
  event.preventDefault(); //Usar em botões para não fazer o lançamento dos dados sem especificar
  closeModal();
}
