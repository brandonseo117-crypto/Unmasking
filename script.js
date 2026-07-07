const appearedObjects = [];
const magicNumber = 11;

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tiles = document.querySelectorAll('.tile');

while (appearedObjects.length < 2) {
    for (let i = tiles.length - 1; i >= 0; i--) {
        const yourNumber = randint(0,15);
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

