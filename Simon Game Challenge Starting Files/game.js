var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var isGameStarted = false;
var level = 0;

$(document).keydown(function(){
    if(!isGameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        isGameStarted = true;
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);
    generateGameContent();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
});

function playSound(name){
    var audio = new Audio("./sounds/"+name+ ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}
function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
    }
    
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false; 
        }
    }
    return true; 
}

function generateGameContent(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        isGameStarted = false; 
        gamePattern = [];
        level = 0;
    }
}



