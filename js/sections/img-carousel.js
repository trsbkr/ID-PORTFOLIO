const cylinder = document.querySelector(
    '.carousel-cylinder'
);

const cards = document.querySelectorAll(
    '.carousel-card'
);

const gallery = document.querySelector(
    '.img-carousel-gallery'
);

const prevButton = document.querySelector(
    '.carousel-nav.prev'
);

const nextButton = document.querySelector(
    '.carousel-nav.next'
);

/*
------------------------------------
CONFIGURATION
------------------------------------
*/

const CONFIG = {

    visibleArcMobile: 120,

    visibleArcDesktop: 120,

    visibleArcLaptop: 110,

    radiusMobile: 180,

    radiusDesktop: 460,

    radiusLaptop: 500,

    autoGlideInterval: 2500,

    autoResumeDelay: 5000

};

function getVisibleArc() {

    if (window.innerWidth >= 1200) {

        return CONFIG.visibleArcLaptop;
    }

    if (window.innerWidth >= 768) {

        return CONFIG.visibleArcDesktop;
    }

    return CONFIG.visibleArcMobile;
}

const VISIBLE_SLOTS = 5;

let currentIndex = 0;

let navigationDirection = 1;

let swipeDirection = 1;

let autoGlidePaused = false;

let autoResumeTimeout = null;

let touchStartX = 0;

let touchEndX = 0;

let isDragging = false;

const SWIPE_THRESHOLD = 50;

let uploadedImages = [];

let controlsTimeout = null;



uploadedImages = [

    'https://picsum.photos/id/10/500/900',
    'https://picsum.photos/id/20/500/900',
    'https://picsum.photos/id/30/500/900',
    'https://picsum.photos/id/40/500/900',
    'https://picsum.photos/id/50/500/900',

    'https://picsum.photos/id/60/500/900',
    'https://picsum.photos/id/70/500/900',
    'https://picsum.photos/id/80/500/900',
    'https://picsum.photos/id/90/500/900',
    'https://picsum.photos/id/100/500/900'

];

/*
------------------------------------
CALCULATE RADIUS
------------------------------------
*/

function getRadius() {

    if (window.innerWidth >= 1200) {

        return CONFIG.radiusLaptop;
    }

    if (window.innerWidth >= 768) {

        return CONFIG.radiusDesktop;
    }

    return CONFIG.radiusMobile;
}

function getVisibleImages() {

    const visible = [];

    for (

        let i = 0;

        i < VISIBLE_SLOTS;

        i++

    ) {

        let index =
            (currentIndex + i) %
            uploadedImages.length;

        visible.push(

            uploadedImages[index]

        );

    }

    return visible;

}

/*
------------------------------------
RENDER VISIBLE CARDS
------------------------------------
*/

function updateVisibleCards() {

    const visibleImages =
        getVisibleImages();

    cards.forEach((card, index) => {

        const image =
            visibleImages[index];

        const placeholder =
            card.querySelector(
                '.placeholder-content'
            );

        if (!image) {

            placeholder.style.display =
                'flex';

            card.style.backgroundImage =
                '';

            return;
        }

        placeholder.style.display =
            'none';

        card.style.backgroundImage =
            `url(${image})`;

        card.style.backgroundSize =
            'cover';

        card.style.backgroundPosition =
            'center';

    });

}

/*
------------------------------------
AUTO GLIDE
------------------------------------
*/

function autoGlide() {

    if (autoGlidePaused) {

        return;

    }

    currentIndex++;

    if (
        currentIndex >=
        uploadedImages.length
    ) {

        currentIndex = 0;

    }

    updateVisibleCards();

}

/*
------------------------------------
POSITION CARDS
------------------------------------
*/

function positionCards() {

    const totalCards = cards.length;

    const visibleArc =
    getVisibleArc();

const startAngle =
    -visibleArc / 2;

const step =
    visibleArc /
    (totalCards - 1);

    const radius = getRadius();

    cards.forEach((card, index) => {

        const angle =
            startAngle +
            (index * step);

        let scale = 1;

        if (
            index === 0 ||
            index === totalCards - 1
        ) {

            scale = 0.70;

        } else if (
            index === 1 ||
            index === totalCards - 2
        ) {

            scale = 0.85;
        }

        card.style.transform = `
            translate(-50%, -50%)
            rotateY(${angle}deg)
            translateZ(${radius}px)
            scale(${scale})
        `;

        card.style.opacity =
            scale < 0.8
            ? 0.65
            : 1;
    });
}

positionCards();

updateVisibleCards();

window.addEventListener(
    'resize',
    positionCards
);

function pauseAutoGlide() {

    autoGlidePaused = true;

    clearTimeout(
        autoResumeTimeout
    );

}

function resumeAutoGlide() {

    clearTimeout(
        autoResumeTimeout
    );

    autoResumeTimeout =
        setTimeout(() => {

            autoGlidePaused = false;

        },

        CONFIG.autoResumeDelay

    );

}

function goNext() {

    const maxIndex =

        uploadedImages.length -

        VISIBLE_SLOTS;

    if (

        currentIndex >= maxIndex

    ) {

        navigationDirection = -1;

        return;

    }

    currentIndex++;

    updateVisibleCards();

}

function goPrevious() {

    if (

        currentIndex <= 0

    ) {

        navigationDirection = 1;

        return;

    }

    currentIndex--;

    updateVisibleCards();

        }

function pendulumStep() {

    if (

        navigationDirection === 1

    ) {

        goNext();

    } else {

        goPrevious();

    }

}

function showControls() {

    if (
        window.innerWidth < 1200
    ) {

        return;
    }

    prevButton.classList.add(
        'visible'
    );

    nextButton.classList.add(
        'visible'
    );

    clearTimeout(
        controlsTimeout
    );

    controlsTimeout =
        setTimeout(() => {

            hideControls();

        }, 5000);
}

function hideControls() {

    prevButton.classList.remove(
        'visible'
    );

    nextButton.classList.remove(
        'visible'
    );
}

function handleSwipe() {

    const distance =

        touchEndX -

        touchStartX;

    if (

        Math.abs(distance)

        <

        SWIPE_THRESHOLD

    ) {

        return;

    }

    pauseAutoGlide();

    if (distance < 0) {

        goNext();

    } else {

        goPrevious();

    }

    resumeAutoGlide();

}


cylinder.addEventListener(

    'touchstart',

    (event) => {

        touchStartX =

            event.touches[0].clientX;

        isDragging = true;

        pauseAutoGlide();

    }

);

cylinder.addEventListener(

    'touchmove',

    (event) => {

        if (!isDragging) {

            return;

        }

        touchEndX =

            event.touches[0].clientX;

    }

);

cylinder.addEventListener(

    'touchend',

    () => {

        isDragging = false;

        handleSwipe();

    }

);


cylinder.addEventListener(

    'mousedown',

    (event) => {

        touchStartX =

            event.clientX;

        isDragging = true;

        pauseAutoGlide();

    }

);

window.addEventListener(

    'mousemove',

    (event) => {

        if (!isDragging) {

            return;

        }

        touchEndX =

            event.clientX;

    }

);

window.addEventListener(

    'mouseup',

    () => {

        if (!isDragging) {

            return;

        }

        isDragging = false;

        handleSwipe();

    }

);

gallery.addEventListener(

    'mouseenter',

    showControls

);

gallery.addEventListener(

    'mousemove',

    showControls

);

prevButton.addEventListener(

    'click',

    () => {

        pauseAutoGlide();

        goPrevious();

        resumeAutoGlide();

    }

);

nextButton.addEventListener(

    'click',

    () => {

        pauseAutoGlide();

        goNext();

        resumeAutoGlide();

    }

);

setInterval(

    autoGlide,

    CONFIG.autoGlideInterval

);
