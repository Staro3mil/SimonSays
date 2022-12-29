const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = 0;
var level = 0;
var streak = 0;

$(document).keypress(function(){
    if( gameStart == 0 || gameStart == -1) {
        gamePattern = [];
        level = 0;
        streak = 0;
        $("h1").text("Level " + level);
        gameStart = 1;
        nextSequence();
    }

})

function nextSequence() {
    if (gameStart == -1) 
        return;
    userClickedPattern = [];
    level++;
    streak = 0;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    if( gameStart == 0 || gameStart == -1) {
        return;
    }
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length);
    animatePress(userChosenColour);
    playSound(userChosenColour);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
        console.log("success");
        streak++;
        if ( streak == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        gameStart = -1;
        setTimeout(removeClass, 200, "wrong");
        $("body").addClass("game-over");

    }
}

function playSound(name){
    let beat = new Audio('sounds/'+ name +'.mp3');
    beat.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout( removeClass, 100, color);
}

function removeClass(color){
    if ( color == "wrong") {
        $("body").removeClass("game-over");
        return;
    }
    $("#" + color).removeClass("pressed");
}

