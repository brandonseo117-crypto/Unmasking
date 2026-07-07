const appearedObjects = [];
const disappearedObjects = [];
const magicNumber = 11;
const chosenOne = [];

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tiles = document.querySelectorAll('.tile');

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
};

for (const appearedObject of appearedObjects) {
    appearedObject.classList.toggle('appear')
};

for (const ogTile of tiles) {
    if (!appearedObjects.includes(ogTile)) {
        disappearedObjects.push(ogTile)
    }
}
while (chosenOne.length < 1) {
    for (let i=0; i < disappearedObjects.length; i++) {
        theNumber = randint(0, disappearedObjects.length-1);
        secondMagicNumber = 0;
        if (theNumber === secondMagicNumber) {
            chosenOne.push(disappearedObjects[i]);
            disappearedObjects[i].classList.toggle('challenge');
            break;

        };

    };
};