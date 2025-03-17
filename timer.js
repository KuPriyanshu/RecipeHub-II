document.addEventListener("DOMContentLoaded", function () {
    const timerInput = document.getElementById("timerInput");
    const startButton = document.getElementById("startTimer");
    const timerDisplay = document.getElementById("timerDisplay");

    let countdown;

    startButton.addEventListener("click", function () {
        let time = parseInt(timerInput.value) * 60;

        if (isNaN(time) || time <= 0) {
            alert("Enter a valid time");
            return;
        }

        clearInterval(countdown);

        countdown = setInterval(() => {
            if (time <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Time's up!";
            } else {
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                time--;
            }
        }, 1000);
    });
});
