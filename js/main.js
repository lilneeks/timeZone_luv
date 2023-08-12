document.addEventListener('DOMContentLoaded', function() {
    const moon = document.querySelector('.moon');
    const sun = document.querySelector('.sun');
    const earth = document.querySelector('.earth');
    let moonDegree = 0;
    let sunDegree = 0;
    let earthRotation = 0;

    function createRandomStars() {
        const starCount = 200;
        const starSize = 1;
        const earthRect = earth.getBoundingClientRect();
        const fragment = document.createDocumentFragment();
        let createdStars = 0;

        while (createdStars < starCount) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            if (x >= earthRect.left && x <= earthRect.right && y >= earthRect.top && y <= earthRect.bottom) continue;
            if (y <= 100 || (window.innerHeight - y) <= 100) continue;

            const starElement = document.createElement("div");
            starElement.style.position = "absolute";
            starElement.style.top = y + "px";
            starElement.style.left = x + "px";
            starElement.style.width = starSize + "px";
            starElement.style.height = starSize + "px";
            starElement.style.backgroundColor = "white";
            starElement.style.borderRadius = "50%";
            fragment.appendChild(starElement);
            createdStars++;
        }

        document.body.appendChild(fragment);
    }

    function createShootingStar() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const shootingStar = document.createElement("div");
        shootingStar.style.left = x + "px";
        shootingStar.style.top = y + "px";
        shootingStar.classList.add("shooting-star");

        document.body.appendChild(shootingStar);

        setTimeout(() => {
            document.body.removeChild(shootingStar);
        }, 1500);

        setTimeout(createShootingStar, Math.random() * 10000 + 5000);
    }

    function updateTime(timeZone, elementId) {
        const options = { timeZone: timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        document.getElementById(elementId).textContent = currentTime;
    }

    function updateBothTimes() {
        updateTime('America/Los_Angeles', 'nicko-time');
        updateTime('Asia/Seoul', 'sunyoung-time');
    }

    function colorNames() {
        const names = document.querySelectorAll('.initial-name');
        names.forEach(el => {
            if (el.textContent.includes('Nicko')) {
                el.style.color = 'blue';
            } else if (el.textContent.includes('Sunyoung')) {
                el.style.color = 'pink';
            }
        });
    }

    function animateCelestialBodies() {
        moonDegree += 0.012;
        sunDegree += 0.0023;
        earthRotation += 0.005;

        moon.style.transform = `translateY(-50%) rotate(${moonDegree}deg) translateX(200px) rotate(-${moonDegree}deg)`;
        sun.style.transform = `translateY(-50%) rotate(${sunDegree}deg) translateX(350px) rotate(-${sunDegree}deg)`;
        earth.style.backgroundImage = `radial-gradient(circle at ${earthRotation%100}% 20%, #fff, #0077D9 20%)`;

        requestAnimationFrame(animateCelestialBodies);
    }

    updateBothTimes();
    setInterval(updateBothTimes, 1000);

    createRandomStars();
    createShootingStar();
    colorNames();
    requestAnimationFrame(animateCelestialBodies);
});
