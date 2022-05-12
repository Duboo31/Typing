// DOM
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

// VARIABLES
const GAME_TIME = 3;

let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;

//functions

init()

function init() {
    getWords();
}

function getWords() {
    const words = ["a", "b", "c", "d"];
}

wordInput.addEventListener('input', () => {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        score++
        scoreDisplay.innerText = score;
        wordInput.value = "";
    }
})


function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

buttonChange("PLAY");

function run() {
    isPlaying = true;
    time = GAME_TIME;
    timeInterval = setInterval(countDown, 1000);
}

button.addEventListener("click", run)

function buttonChange(text) {
    button.innerText = text;
    text === "PLAY" ? button.classList.remove("loading") : button.classList.add("loading"); 
}