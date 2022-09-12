var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern: ", userClickedPattern);
  console.log("gamePattern: ", gamePattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log("currentLevel: ", currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log(
      "gamePattern[currentLevel] === userClickedPattern[currentLevel]: ",
      gamePattern[currentLevel] === userClickedPattern[currentLevel]
    );
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    setTimeout(function () {
      document.location.reload();
    }, 1000);
  }
}

function nextSequence() {
  userClickedPattern = [];
  console.log("userClickedPattern: ", userClickedPattern);

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log("gamePattern: ", gamePattern);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
