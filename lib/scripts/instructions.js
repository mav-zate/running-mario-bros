const makeModal = (modalContent) => () => {
  let modal = document.createElement("div");
  let modalClose = '<button id="instructions-close">X</button>';
  modal.setAttribute('id', 'instructions-modal');
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(modal);

  modal.innerHtml = modalClose + modalContent;
};

document.addEventListener('DOMContentLoaded', () => {
  let instructionsButton = document.getElementById('instructions-button');
  instructionsButton.addEventListener('click', makeModal('something'));
});
