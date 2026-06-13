const cylinder = document.querySelector(
    '.carousel-cylinder'
);

const cards = document.querySelectorAll(
    '.carousel-card'
);

/*
------------------------------------
CONFIGURATION
------------------------------------
*/

const CONFIG = {

    visibleArc: 120,

    radiusMobile: 180,

    radiusDesktop: 260,

    autoGlideInterval: 2500

};

const VISIBLE_SLOTS = 5;

let currentIndex = 0;

let uploadedImages = [];



uploadedImages = [



    null,

    null,

    null,

    null,

    null,



    null,

    null,

    null,

    null,

    null



];

/*
------------------------------------
CALCULATE RADIUS
------------------------------------
*/

function getRadius() {

    return window.innerWidth < 768

        ? CONFIG.radiusMobile

        : CONFIG.radiusDesktop;
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

    const startAngle =
        -CONFIG.visibleArc / 2;

    const step =
        CONFIG.visibleArc /
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

setInterval(

    autoGlide,

    CONFIG.autoGlideInterval

);
