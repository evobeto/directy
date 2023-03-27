let display = document.getElementById("display");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let saveButton = document.getElementById("save");
let zerarButton = document.getElementById("zerar");
resetButton.addEventListener("click", resetTimer);

let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;

function start() {
    timer = setInterval(function () {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stop() {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function reset() {
    stop();
    hours = 0;
    minutes = 0;
    seconds = 0;
    display.textContent = '00:00:00';
}

function zerar() {
    stop();
    hours = 0;
    minutes = 0;
    seconds = 0;
    display.textContent = '00:00:00';
}

function formatDate() {
    const currentDate = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };
    return currentDate.toLocaleString('pt-BR', options);
}

function formatTime(value) {
    return value.toString().padStart(2, '0');
}

function saveTime() {
    let currentDate = formatDate();
    let tempos = JSON.parse(localStorage.getItem('tempos') || '[]');
    tempos.push({ date: currentDate, hours, minutes, seconds });
    localStorage.setItem('tempos', JSON.stringify(tempos));
}

function resetTimer() {
    localStorage.removeItem("tempos");
    location.reload(); 
    localStorage.clear(); 
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
saveButton.addEventListener('click', saveTime);
zerarButton.addEventListener('click', zerar);
