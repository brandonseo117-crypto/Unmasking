const revealedTiles = [];
const optionContainers = [];
const tiles = Array.from(document.querySelectorAll('.tile'));
let currentTargetTile = null;
let currentOptions = [];

for (let i = 0; i < 4; i++) {
    const optionContainer = document.getElementById(`option${i + 1}`);
    optionContainers.push(optionContainer);
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = randint(0, i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderBoard() {
    for (const tile of tiles) {
        const isRevealed = revealedTiles.includes(tile);
        tile.classList.remove('challenge');
        tile.classList.toggle('appear', isRevealed);
        tile.style.visibility = isRevealed ? 'visible' : 'hidden';
    }
}

function buildOptions() {
    const hiddenTiles = tiles.filter((tile) => !revealedTiles.includes(tile));
    const remainingCount = hiddenTiles.length;

    if (remainingCount === 0 || !currentTargetTile) {
        currentOptions = [];
        return;
    }

    const optionSource = remainingCount <= 3
        ? tiles.filter((tile) => tile !== currentTargetTile)
        : hiddenTiles.filter((tile) => tile !== currentTargetTile);

    const distractors = shuffleArray(optionSource)
        .slice(0, 3);

    currentOptions = shuffleArray([currentTargetTile, ...distractors]);
}

function renderOptions() {
    for (const container of optionContainers) {
        container.innerHTML = '';
    }

    for (let i = 0; i < currentOptions.length; i++) {
        const copiedChoice = currentOptions[i].cloneNode(true);
        copiedChoice.id = `opt${i + 1}`;
        copiedChoice.classList.remove('appear', 'challenge');

        const computedPosition = window.getComputedStyle(currentOptions[i]).backgroundPosition;
        copiedChoice.style.backgroundPosition = computedPosition;
        copiedChoice.style.visibility = 'visible';
        copiedChoice.style.width = '100%';
        copiedChoice.style.height = '100%';
        optionContainers[i].appendChild(copiedChoice);
    }
}

function startRound() {
    renderBoard();

    const hiddenTiles = tiles.filter((tile) => !revealedTiles.includes(tile));
    if (hiddenTiles.length === 0) {
        currentTargetTile = null;
        currentOptions = [];
        for (const container of optionContainers) {
            container.innerHTML = '';
        }
        return;
    }

    currentTargetTile = shuffleArray(hiddenTiles)[0];
    currentTargetTile.classList.add('challenge');
    currentTargetTile.style.visibility = 'visible';

    buildOptions();
    renderOptions();
}

function initializeBoard() {
    revealedTiles.length = 0;
    const initialTiles = shuffleArray(tiles).slice(0, 2);
    revealedTiles.push(...initialTiles);
    startRound();
}

function checkAnswer() {
    for (let i = 0; i < optionContainers.length; i++) {
        optionContainers[i].addEventListener('click', () => {
            const child = optionContainers[i].querySelector(`#opt${i + 1}`);
            if (!child || !currentTargetTile) {
                return;
            }

            const selectedPosition = child.style.backgroundPosition;
            const targetPosition = window.getComputedStyle(currentTargetTile).backgroundPosition;

            if (selectedPosition === targetPosition) {
                revealedTiles.push(currentTargetTile);
                currentTargetTile.classList.remove('challenge');
                currentTargetTile.classList.add('appear');
                currentTargetTile.style.visibility = 'visible';
                startRound();
            }
        });
    }
}

initializeBoard();
checkAnswer();