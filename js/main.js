document.addEventListener('DOMContentLoaded', function() {
    function updateTime(timeZone, elementId) {
        const options = { timeZone: timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        document.getElementById(elementId).textContent = currentTime;
    }

    function updateTimes() {
        updateTime('America/Los_Angeles', 'nicko-time');
        updateTime('Asia/Seoul', 'sunyoung-time');
    }

    function updateColors() {
        const nickoZone = document.querySelector('.time-container:nth-child(1) .time-zone');
        const sunyoungZone = document.querySelector('.time-container:nth-child(2) .time-zone');
        
        const currentTime = new Date();
        const nickoColor = `hsl(${currentTime.getSeconds() * 15}, 90%, 50%)`;

        nickoZone.style.color = nickoColor;
        sunyoungZone.style.color = 'purple';
    }

    let simulationStartTime = null;

    function simulateDayCycle() {
        simulationStartTime = Date.now();
        requestAnimationFrame(stepSimulation);
    }

    function stepSimulation() {
        const elapsedTime = Date.now() - simulationStartTime;
        const totalSimulationTime = 6000; // 6 seconds for a faster simulation

        if (elapsedTime < totalSimulationTime) {
            const simulatedTime = (elapsedTime / totalSimulationTime) * 86400;
            const nickoHour = Math.floor(simulatedTime / 3600);
            const nickoMinute = Math.floor((simulatedTime - (nickoHour * 3600)) / 60);

            updateBackgroundColorForMinute(nickoHour, nickoMinute);
            requestAnimationFrame(stepSimulation);
        } else {
            updateBackgroundColor();
        }
    }

    function updateBackgroundColor() {
        const currentTimeNicko = new Date().getHours();
        updateBackgroundColorForMinute(currentTimeNicko, 0);
    }

    function updateBackgroundColorForMinute(nickoHour, nickoMinute) {
        const body = document.body;
        const currentTimeNicko = new Date(0, 0, 0, nickoHour, nickoMinute);
        const currentTimeSunyoung = new Date(currentTimeNicko.getTime() + 16 * 60 * 60 * 1000);

        let nickoLuminance = 0;
        let sunyoungLuminance = 0;

        if(currentTimeNicko.getHours() >= 6 && currentTimeNicko.getHours() <= 18) {
            nickoLuminance = ((currentTimeNicko.getHours() - 6) / 12) * 100;
        }
        if(currentTimeSunyoung.getHours() >= 6 && currentTimeSunyoung.getHours() <= 18) {
            sunyoungLuminance = ((currentTimeSunyoung.getHours() - 6) / 12) * 100 + 5; // Adding a 5% difference for variance
        }

        const nickoColor = `hsl(60, 100%, ${nickoLuminance}%)`;
        const sunyoungColor = `hsl(60, 100%, ${sunyoungLuminance}%)`; 

        body.style.backgroundImage = `linear-gradient(to bottom, ${nickoColor} 50%, ${sunyoungColor} 50%)`;
    }

    // Initial and periodic updates
    updateTimes();
    setInterval(updateTimes, 1000);
    updateColors();
    setInterval(updateColors, 500);
    setTimeout(simulateDayCycle, 100); // Delay to allow initial black background to render
});
