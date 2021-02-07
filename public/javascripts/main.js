// Declaration of some Variables
var esSound, enSound, word, vocabulary, newIndex, previousIndex;
// Removing the overlay programatically
var button = document.getElementById("okButton");
button.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("messageWindow").style.display = "none";
});

// Main code
annyang.setLanguage('es-MX');

if (!vocabulary) {
    $.ajax({
        url: "/api/vocabulary",
        dataType: "json",
        success: function (data) {
            vocabulary = data;
            console.log(vocabulary);
            nextWord();
        }
    });
}
else{nextWord();}

// Now function declarations start



function nextWord() {
    let commands = {};
    do{newIndex = getRandomInt(0,vocabulary.length-1);}
    while(newIndex==previousIndex)
    previousIndex=newIndex;
    word = vocabulary[newIndex]
    enSound = new Audio("https://audio1.spanishdict.com/audio?lang=en&text=" + word.english);
    enSound.load();
    enSound.play();
    $('#word').text(word.english);
    $('#hint').text("(" + word.spanish + ")");
    commands[word.spanish] = spanishDetected;
    commands["otra vez"] = repeatDetected;
    commands["no sé"] = nextDetected;
    annyang.removeCommands();
    annyang.addCommands(commands);
    annyang.start({continuous:true});

}

async function spanishDetected() {
    annyang.pause();
    esSound = new Audio("https://audio1.spanishdict.com/audio?lang=es&text=" + word.spanish);
    esSound.load();
    esSound.play();
    $('#word').text(word.spanish);
    $("#wordContainer").css("background-color", "#09E85E");
    setTimeout(() => {
        annyang.resume();
        $("#wordContainer").css("background-color", "#fdf9ee");
        nextWord();
    }, 1000 + word.spanish.length * 70); // time while the right word stays green
}

function repeatDetected() {
    enSound.load();
    enSound.play();
}

function nextDetected() {
    annyang.pause();
    esSound = new Audio("https://audio1.spanishdict.com/audio?lang=es&text=" + word.spanish);
    esSound.load();
    esSound.play();
    $('#word').text(word.spanish);
    $("#wordContainer").css("background-color", "#ff0000");
    setTimeout(() => {
        annyang.resume();
        $("#wordContainer").css("background-color", "#fdf9ee");
        nextWord();
    }, 1000 + word.spanish.length * 70); // time while the right word stays green
}

// Helper functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



