document.addEventListener('DOMContentLoaded', function() {
    const moon = document.querySelector('.moon');
    const sun = document.querySelector('.sun');
    const earth = document.querySelector('.earth');

    let earthRotationSpeed = 360 / (24 * 60 * 60); 
    let moonOrbitSpeed = 360 / (27.3 * 24 * 60 * 60); 
    let sunOrbitSpeed = 360 / (365.25 * 24 * 60 * 60); 

    earthRotationSpeed *= 10;
    moonOrbitSpeed *= 10;
    sunOrbitSpeed *= 10;

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
            starElement.className = "star";
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
        moonDegree += moonOrbitSpeed;
        sunDegree += sunOrbitSpeed;
        earthRotation += earthRotationSpeed;

        earth.style.transform = `translateY(-50%) rotate(${earthRotation}deg) translateX(250px) rotate(-${earthRotation}deg)`;
        moon.style.transform = `translateY(-50%) rotate(${moonDegree}deg) translateX(70px) rotate(-${moonDegree}deg)`;

        requestAnimationFrame(animateCelestialBodies);
    }

    // Initial and periodic updates
    updateBothTimes();
    setInterval(updateBothTimes, 1000);

    createRandomStars();
    createShootingStar();
    colorNames();
    requestAnimationFrame(animateCelestialBodies);

    // Handle the resize event
    window.addEventListener('resize', function() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());

        createRandomStars();
    });
});
