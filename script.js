const appearedObjects = [];
const magicNumber = 11;

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tiles = document.querySelectorAll('.tile');
while (appearedObjects.length < 2) {
    for (let i=0; i < tiles.length; i++) {
        const yourNumber = randint(0,15);
        if (yourNumber === magicNumber){
            appearedObjects.push(tiles[i]);
            if (appearedObjects.length === 2) {
                break;
            };
        };

    };
};

for (const appearedObject of appearedObjects) {
    appearedObject.classList.toggle('appear')
}