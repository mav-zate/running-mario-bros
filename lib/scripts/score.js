// Initialize Firebase
const scoreScript = () => {
  var config = {
    apiKey: "AIzaSyAlcgIhzR1whJNrO1HzCxom3mwZ6y3oSi8",
    authDomain: "running-mario-bros.firebaseapp.com",
    databaseURL: "https://running-mario-bros.firebaseio.com",
    projectId: "running-mario-bros",
    storageBucket: "running-mario-bros.appspot.com",
    messagingSenderId: "752893416417"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  // render highscores
  let highscoreMenu = document.createElement('div');
  highscoreMenu.setAttribute('id', 'high-score-menu');
  let highscoreTitleDiv = document.createElement('div');
  let highscoreTitle = document.createElement('p');
  let highscoresDiv = document.createElement('div');
  highscoresDiv.setAttribute('id', 'high-scores');
  highscoreTitle.textContent = 'HIGH SCORES:';
  highscoreTitleDiv.appendChild(highscoreTitle);
  highscoreMenu.appendChild(highscoreTitleDiv);
  highscoreMenu.appendChild(highscoresDiv);
  let gameSpace = document.getElementById('game-space');
  gameSpace.appendChild(highscoreMenu);



  database.ref('scores/').limitToLast(5)
  .orderByValue().once('value').then(function(snapshot) {
    snapshot.forEach(function(snap) {
      let name = snap.key;
      let score = snap.val();
      let highscoreEntry = document.createElement('div');
      highscoresDiv.insertBefore(highscoreEntry, highscoresDiv.firstChild);
      let username = document.createElement('p');
      username.textContent = name;
      highscoreEntry.appendChild(username);
      let highscore = document.createElement('p');
      highscore.textContent = score;
      highscoreEntry.appendChild(highscore);
    });
  });

  // write score to database
  let writeInt = window.setInterval(() => {
    let playerNameTag = document.getElementById('player-name');
    let playerScoreTag = document.getElementById('player-score');
    if (playerNameTag && playerScoreTag) {
      let username = playerNameTag.textContent.toUpperCase();
      let updateKey = 'scores/' + username;

      let score = parseInt(playerScoreTag.textContent);
      database.ref().update({
        [updateKey]: score,
      });
      window.clearInterval(writeInt);
      location.reload();
    }
  }, 100);
};

export default scoreScript;
