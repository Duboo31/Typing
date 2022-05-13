// DOM
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

// VARIABLES
const GAME_TIME = 9;

let words = [];
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;

//functions
init();

function init() {
    buttonChange("LOADING...")
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임/인터벌 시작 
function run() {
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("PLAYING");
}

// 게임 상태/종료
function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange("PLAY");
        clearInterval(checkInterval);
    }
}

// 단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=1000')
      .then(function (response) {
        // handle success
        response.data.forEach(word => {
            if(word.length < 10) {
                words.push(word);
            }
        })
        console.log(words)
        buttonChange("PLAY");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

// 타이핑 단어 체크
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

// 카운트 다운
function countDown() {
    time > 0 ? --time : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

// EVENT
button.addEventListener("click", run)

function buttonChange(text) {
    button.innerText = text;
    text === "PLAY" ? button.classList.remove("loading") : button.classList.add("loading");
}