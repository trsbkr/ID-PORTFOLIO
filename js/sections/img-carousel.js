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

    radiusMobile: 320,

    radiusDesktop: 500

};

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

window.addEventListener(
    'resize',
    positionCards
);
