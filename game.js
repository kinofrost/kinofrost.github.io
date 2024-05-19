var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
    level = 0;
    $("h1").text("Press A Key to Try Again");
}

function nextSequence() {
    //console.log("nextSequence");
    level++;
    $("h1").text("Level " + level);
    gamePattern.push(randomColour());
    playLevelSequence();
}

// Any key to start
$(document).on("keydown", function (event) {
    if (gameStart) {

    } else {
        nextSequence();
        gameStart = true;
    }
})
// Press title to start (mobile)
$("h1").on("click", function () {
    if (gameStart) {

    } else {
        nextSequence();
        gameStart = true;
    }
})


// Handle button clicks
$(".btn").on("click", function () {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    beep(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
})

function checkAnswer() {
    console.log("check if equal");
    console.log(userClickedPattern.toString());
    console.log(gamePattern.slice(0, userClickedPattern.length).toString());

    if (userClickedPattern.toString() === gamePattern.slice(0, userClickedPattern.length).toString()) {
        console.log("YES!");

        // Next Level!
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("NO YOU MORON!");
        gameOver();
    }


}

function gameOver() {
    beep("wrong");
    resetGame();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

function playLevelSequence() {
    //console.log("playLevelSequence");
    
    for (let i = 0; i <= gamePattern.length - 1; i++) {

        console.log(gamePattern);
        console.log(gamePattern[i]);    

        
        setTimeout(() => {
            animateFlash(gamePattern[i]);
            beep(gamePattern[i]);
        }, i * 1000);
          
    }
    
}


function beep(colour) {
    var beep = new Audio("./sounds/"+ colour +".mp3");
    beep.volume = 0.1;
    beep.play();
}

function randomColour() {
    var randomNumber = Math.floor(Math.random() * buttonColours.length)
    return buttonColours[randomNumber];
}

function animatePress(colour) {
    $("#"+colour).addClass("pressed");
    setTimeout(() => {
        $("#"+colour).removeClass("pressed");    
    }, 100);    
}

function animateFlash(colour) {
    //console.log("I've just been asked to animate this colour >"+colour+ "<");
    $("#"+colour).fadeOut(100).fadeIn(100);
}
