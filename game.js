var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = -1;

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function restart(){
    start = false;
    userClickedPattern.length = 0;
    gamePattern.length =0;
    level = -1
}
function checking (currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("right");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
        }
        
    }
    else{
        console.log("wrong");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text(`Game Over, Press Any Key To Restart`);
        restart();
    }
}
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level+=1;
    $("h1").text(`Level ${level}`);
}

$(document).on("keydown", () => {
    if(start === false){
        start = true;
        nextSequence();
    }
});

$(".btn").on("click", function () {
    
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checking(userClickedPattern.length - 1);
    
});

