let timerInterval;
let elapsedTime = 0;
let running = false;
let laps = [];
let darkMode = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const progressBar = document.getElementById('progress-bar');
const lapList = document.getElementById('lapList');
const themeToggleBtn = document.getElementById('themeToggleBtn');

function formatTime(time) {
    let milliseconds = Math.floor(time % 1000);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(3, '0')
    };
}

function updateTimeDisplay() {
    const time = formatTime(elapsedTime);
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
    progressBar.style.width = `${(elapsedTime / 60000) * 100}%`; // Update progress bar
}

function toggleStartStop() {
    if (running) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.add('start-animation');
    } else {
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimeDisplay();
        }, 1);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}


function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    updateTimeDisplay();
    progressBar.style.width = '0%';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('start-animation');
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    lapList.innerHTML = '';
}


function recordLap() {
    if (running) {
        const time = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length + 1}: ${time.minutes}:${time.seconds}:${time.milliseconds}`;
        lapList.appendChild(lapItem);
        laps.push(time);
    }
}


function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '🌞';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleBtn.textContent = '🌙';
    }
}


startStopBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
themeToggleBtn.addEventListener('click', toggleTheme);
