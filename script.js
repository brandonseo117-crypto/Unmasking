const appearedObjects = [];
const disappearedObjects = [];
const magicNumber = 11;
const chosenOne = [];
const choices = [];
const optionContainers = [];

for (let i=0; i < 4; i++) {
    const optionContainer = document.getElementById(`option${i+1}`);
    optionContainers.push(optionContainer);
};


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
    for (let i=0; i < disappearedObjects.length - 1; i++) {
        theNumber = randint(0, disappearedObjects.length-1);
        secondMagicNumber = 0;
        if (theNumber === secondMagicNumber) {
            disappearedObjects[i].classList.add('win');
            console.log(disappearedObjects)
            chosenOne.push(disappearedObjects[i]);
            choices.push(disappearedObjects[i]);
            disappearedObjects[i].classList.toggle('challenge');
            break;

        };

    };
};

while (choices.length < 4) {
    for (let i=0; i < disappearedObjects.length-1; i++) {
        anotherNumber = randint(0, choices.length - 1)
        thirdMagicNumber = 0
        if (anotherNumber === thirdMagicNumber && !choices.includes(disappearedObjects[i]) && choices.length != 4) {
            anotherNotherNumber = randint(0,1)
            if (anotherNotherNumber === 1) {
                choices.push(disappearedObjects[i])
            }
            else {
                choices.unshift(disappearedObjects[i])
            }
        };
    };
};

for (let i=0; i < 4; i++) {
    const copiedChoice = choices[i].cloneNode(true);
    copiedChoice.id = `opt${i+1}`;
    copiedChoice.classList.remove('appear', 'challenge');
    const computedPosition = window.getComputedStyle(choices[i]).backgroundPosition;
    copiedChoice.style.backgroundPosition = computedPosition;
    copiedChoice.style.visibility = 'visible';
    copiedChoice.style.width = '100%';
    copiedChoice.style.height = '100%';
    optionContainers[i].appendChild(copiedChoice)
}

console.log(optionContainers);

for (let i=0; i < optionContainers.length; i++) {
    optionContainers[i].addEventListener('click', () => {
        const child = optionContainers[i].querySelector(`#opt${i+1}`);
            if (child.classList.contains('win')) {
                console.log('W')
            }
            else {
                console.log('L')
            };
    });
};