// Generate secret code
let secretCode = generateCode();
let attempts = 0;

function generateCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
    }
    console.log("Secret Code (for testing):", code); // Remove this in production
    return code;
}

function checkGuess() {
    const guess = document.getElementById('guess').value;
    if (guess.length !== 4 || isNaN(guess)) {
        alert("Enter a valid 4-digit number!");
        return;
    }

    attempts++;
    let correctPos = 0;
    let correctDigits = 0;
    let secretArr = secretCode.split('');
    let guessArr = guess.split('');

    // First pass for correct positions
    for (let i = 0; i < 4; i++) {
        if (guessArr[i] === secretArr[i]) {
            correctPos++;
            secretArr[i] = guessArr[i] = null; // Mark as matched
        }
    }

    // Second pass for correct digits in wrong positions
    for (let i = 0; i < 4; i++) {
        if (guessArr[i] != null) {
            const index = secretArr.indexOf(guessArr[i]);
            if (index !== -1) {
                correctDigits++;
                secretArr[index] = null;
            }
        }
    }

    document.getElementById('result').innerHTML = 
        `Attempt ${attempts}: ${guess}<br>Correct Digits: ${correctDigits}, Correct Positions: ${correctPos}`;

    document.getElementById('history').innerHTML += `Attempt ${attempts}: ${guess} → ${correctPos} Pos, ${correctDigits} Digits<br>`;

    if (correctPos === 4) {
        alert("🎉 You cracked the code!");
        location.reload();
    }
}