const appearedObjects = [];
const disappearedObjects = [];
const magicNumber = 11;
const chosenOne = [];
const options = [];
const optionContainers = [];
const tiles = document.querySelectorAll('.tile');

for (let i=0; i < 4; i++) {
    const optionContainer = document.getElementById(`option${i+1}`);
    optionContainers.push(optionContainer);
}; // initializes containers for options


function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


while (appearedObjects.length < 2) {
    for (let i = tiles.length - 1; i >= 0; i--) {
        const yourNumber = randint(0,tiles.length);
        if (yourNumber === magicNumber && !appearedObjects.includes(tiles[i])) {
            appearedObjects.push(tiles[i]);
            if (appearedObjects.length === 2) {
                break;
            };
        };
    };
}; // picks two tiles to appear randomly


function iterateAppear() {
    for (const appearedObject of appearedObjects) {
        appearedObject.classList.toggle('appear')
}
};

iterateAppear();

function shuffleArray(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = randint(0, i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function oneTile() {
    disappearedObjects.length = 0;
    chosenOne.length = 0;
    options.length = 0;

    for (const ogTile of tiles) {
        if (!appearedObjects.includes(ogTile)) {
            disappearedObjects.push(ogTile);
        }
    }

    if (disappearedObjects.length === 0) {
        return;
    }

    const correctTile = disappearedObjects[randint(0, disappearedObjects.length - 1)];
    correctTile.classList.add('win', 'challenge');
    chosenOne.push(correctTile);
    options.push(correctTile);

    const remainingTiles = disappearedObjects.filter((tile) => tile !== correctTile);
    const shuffledRemaining = shuffleArray(remainingTiles).slice(0, 3);

    for (const tile of shuffledRemaining) {
        options.push(tile);
    }

    const shuffledOptions = shuffleArray(options);
    options.length = 0;
    options.push(...shuffledOptions);
};

oneTile();

function determineOptions() {
    const shuffledOptions = shuffleArray(options);
    options.length = 0;
    options.push(...shuffledOptions);
};

determineOptions();

function makeOptionsVisible() {
    for (let i=0; i < 4; i++) {
        const copiedChoice = options[i].cloneNode(true);
        copiedChoice.id = `opt${i+1}`;
        copiedChoice.classList.remove('appear', 'challenge');
        const computedPosition = window.getComputedStyle(options[i]).backgroundPosition;
        copiedChoice.style.backgroundPosition = computedPosition;
        copiedChoice.style.visibility = 'visible';
        copiedChoice.style.width = '100%';
        copiedChoice.style.height = '100%';
        optionContainers[i].appendChild(copiedChoice)
    };
};

makeOptionsVisible();

function checkAnswer() {
    for (let i=0; i < optionContainers.length; i++) {
        optionContainers[i].addEventListener('click', () => {
            const child = optionContainers[i].querySelector(`#opt${i+1}`);
                if (child.classList.contains('win')) {
                    console.log('W');
                }
                else {
                    console.log('L');
                };
        });
    };
};

checkAnswer();