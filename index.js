// En lista med ord
const wordList = ["store", "subject", "hotel", "error", "piano", "suggestion", "transportation", "sample"];
let secretWord;
let wordState;
let guessedLetters = [];
let faultCounter = 0;
let gameOver = false;

const invisibleItems = [
	document.getElementById("ground"),
	document.getElementById("head"),
	document.getElementById("scaffold"),
	document.getElementById("legs"),
	document.getElementById("arms"),
	document.getElementById("body")
];

invisibleItems.forEach(item => item.style.visibility = "hidden");

const succesMessages = [  // En lista med sucess meddelanden
	"Good choice!",
	"Better late then never!",
	"You must be the change you wish to see in the world.",
	"You're on a roll!"
];

const failureMessages = [  // En lista med failure meddelanden
	"Don't give up! Bunny kittens believe in you, Try again!",
	"You can do it, guess again!",
	"Close! Try again!"
];

const inputPromptMessages = [  // En lista med uppmaning om att skriva in en bokstav
	"Please write a letter!",
	"Type a letter to start guessing",
	"Enter a letter to make a guess"
];
const victoryMessages = [  // En lista med victory meddelanden
	"Congratulations! The word is: ",
	"Awesome! You guessed it! The word is: ",
	"Well done! You've mastered it! The word is: "
];
const losingMessages = "** GAME OVER **";


function startGame() {  // Startfunktion
	secretWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
	wordState = Array(secretWord.length).fill("_");
	guessedLetters = [];
	faultCounter = 0;
	gameOver = false;
	invisibleItems.forEach(item => item.style.visibility = "hidden");
	document.getElementById("wordDisplay").innerText = wordState.join(" ");
	document.getElementById("message").innerText = "New game! Guess the word.";
	document.getElementById("guessedLetterDisplay").innerText = "Guessed letters:";
	document.getElementById("letterInput").value = "";
}



// Funktion som körs när användaren gissar

function guessLetter() {
	if (gameOver) return;
	const letter = document.getElementById("letterInput").value.toUpperCase();
	document.getElementById("letterInput").value = ''; // Tömmer inputfältet
	const messageDiv = document.getElementById("message"); // Hämtar message-div




	// Kontroll om användaren endast har matat in en bokstav
	if (letter.length === 1 && /^[A-Z]$/.test(letter)) {
		if (!guessedLetters.includes(letter)) {
			guessedLetters.push(letter); // Add letter to guessed list if new
			document.getElementById("guessedLetterDisplay").innerText = "Guessed letters: " + guessedLetters.join(", ");
		}

		let found = false;


		// Loopa genom varje bokstav för att hitta matchande bokstav
		for (let i = 0; i < secretWord.length; i++) {
			if (secretWord[i] === letter) {
				wordState[i] = letter;  // Uppdaterar rätt position.
				found = true;
			}
		}

		if (found) {
			messageDiv.innerText = succesMessages[Math.floor(Math.random() * succesMessages.length)];
		} else {
			messageDiv.innerText = failureMessages[Math.floor(Math.random() * failureMessages.length)];
			faultCounter++;

			if (faultCounter <= invisibleItems.length) {
				invisibleItems[faultCounter - 1].style.visibility = "visible";
			}
			if (faultCounter === invisibleItems.length) {
				messageDiv.innerText = losingMessages;
				gameOver = true;
				return;
			}
		}
		// Update word display to show the current state of the word
		document.getElementById("wordDisplay").innerText = wordState.join(" ");
		if (!wordState.includes("_")) {
			messageDiv.innerText = victoryMessages[Math.floor(Math.random() * victoryMessages.length)] + secretWord;
			gameOver = true;
		}
	} else {
		messageDiv.innerText = inputPromptMessages[Math.floor(Math.random() * inputPromptMessages.length)];
	}



}

//Function to restart game
function restartGame() {
	startGame();
}
startGame();

