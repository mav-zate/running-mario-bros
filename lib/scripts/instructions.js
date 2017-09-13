const contents = [
  'PRESS SPACE BAR TO JUMP',
  'JUMP ON ENEMIES FOR EXTRA POINTS!',
];

const modalizeInstructions = (modalContents) => {
  // make modal
  let modal = document.createElement("div");
  modal.setAttribute('id', 'instructions-modal');
  // add close button
  let buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'close-button-container');
  let closeButton = document.createElement('button');
  closeButton.setAttribute('id', 'instructions-close');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', (e) => {
    document.getElementById('instructions-modal').remove();
  });
  buttonContainer.appendChild(closeButton);
  modal.appendChild(buttonContainer);
  // add inner text(s)
  for (let i = 0; i < modalContents.length; i++) {
    let text = document.createElement("p");
    text.setAttribute('class', 'instructions-text');
    text.textContent = modalContents[i];
    modal.appendChild(text);
  }
  // make modal appear on page
  let gameSpace = document.getElementById('game-space');
  console.log(modal.children);
  gameSpace.appendChild(modal);
};


document.addEventListener('DOMContentLoaded', () => {
  let instructionsButton = document.getElementById('instructions-button');
  instructionsButton.addEventListener('click', () => {
    if (document.getElementById('instructions-modal')) {
      document.getElementById('instructions-modal').remove();
    } else {
      modalizeInstructions(contents);
    }
  });
});
