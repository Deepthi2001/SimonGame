var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var maxlevel=0;


function buttonClick1() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}
function buttonClick2() {
    playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Exited !!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

    level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        $("#level-title").text("Good Keep going !!");
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      if(level>=maxlevel){
        $("#level-title").text("Game Over!! Score: "+ level + " 🥇🏆");
        alert("Congratulations. You have crossed old high score !!");
      }
      else{
        $("#level-title").text("Game Over!! Score: "+ level);
      }
      

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      level = 0;
      gamePattern = [];
      started = false;
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  
  if(level>maxlevel){
    $("#level-title").text("Hurray crossed highscore, Level " + level);
    maxlevel=level;
  }
  else{
    $("#level-title").text("Level " + level);
  }
  $("#highscore").text("HighScore: " + maxlevel);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

