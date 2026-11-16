let player = document.getElementById("player");
let clip = document.getElementById("clip");
let sceneImg = document.getElementById("sceneImg");
let sceneLabel = document.getElementById("sceneLabel");
let caption = document.getElementById("caption");
let message = document.getElementById("message");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let stopBtn = document.getElementById("stopBtn");
let volDownBtn = document.getElementById("volDownBtn");
let volUpBtn = document.getElementById("volUpBtn");
let thumbs = document.getElementsByClassName("thumb");

let sceneNames = ["Morning", "Afternoon", "Evening", "Night"];
let sceneImages = ["images/morning.jpg", "images/afternoon.jpg", "images/evening.jpg", "images/night.jpg"];
let sceneStarts = [0, 21, 42, 63];
let sceneCaptions = [
  "Crows on the rooftops wake the city up.",
  "Traffic, horns, rickshaws and a busy chai stall.",
  "Waves, seagulls and camel rides at Sea View beach.",
  "Crickets, a ceiling fan and dogs barking down the street."
];
let sceneColors = ["#fdf1e4", "#e3f2fb", "#fbe0cf", "#c9cfe6"];

let currentScene = 0;
let volume = 1.0;

function playAudio() {
  player.play();
}

function pauseAudio() {
  player.pause();
}

function stopAudio() {
  player.currentTime = 0;
  player.pause();
}

function volumeUp() {
  volume += 0.1;
  if (volume > 1.0) {
    volume = 1.0;
  }
  player.volume = volume;
  updateMessage();
}

function volumeDown() {
  volume -= 0.1;
  if (volume < 0.0) {
    volume = 0.0;
  }
  player.volume = volume;
  updateMessage();
}

function updateMessage() {
  let minutes = Math.floor(player.currentTime / 60);
  let seconds = Math.floor(player.currentTime) - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  message.innerHTML = "Time: " + minutes + ":" + seconds + " | Volume: " + Math.round(player.volume * 100) + "%";
}

function showScene(i) {
  sceneImg.src = sceneImages[i];
  sceneLabel.innerHTML = sceneNames[i];
  caption.innerHTML = sceneCaptions[i];
  document.body.style.backgroundColor = sceneColors[i];

  for (let j = 0; j < thumbs.length; j++) {
    if (j === i) {
      thumbs[j].style.borderColor = "black";
    } else {
      thumbs[j].style.borderColor = "transparent";
    }
  }
}

function playerStarted() {
  clip.play();
  sceneImg.style.filter = "none";
}

function playerPaused() {
  clip.pause();
  sceneImg.style.filter = "grayscale(100%)";
  message.innerHTML = "The soundscape is paused.";
}

function playerProgressed() {
  let scene = 0;
  for (let i = 0; i < sceneStarts.length; i++) {
    if (player.currentTime >= sceneStarts[i]) {
      scene = i;
    }
  }

  if (scene !== currentScene) {
    currentScene = scene;
    showScene(scene);
  }

  updateMessage();
}

function playerEnded() {
  message.innerHTML = "The day in Karachi is over. Press Play to hear it again.";
}

playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
stopBtn.addEventListener("click", stopAudio);
volUpBtn.addEventListener("click", volumeUp);
volDownBtn.addEventListener("click", volumeDown);

player.addEventListener("play", playerStarted);
player.addEventListener("pause", playerPaused);
player.addEventListener("timeupdate", playerProgressed);
player.addEventListener("ended", playerEnded);

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].addEventListener("click", function() {
    player.currentTime = sceneStarts[i];
    showScene(i);
    player.play();
  });
}

showScene(0);
sceneImg.style.filter = "grayscale(100%)";