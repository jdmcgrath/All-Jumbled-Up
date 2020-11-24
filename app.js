const unscrambledWords = ['HTML', 'CSS', 'JAVASCRIPT', 'JAVA', 'REACT', 'BOOTSTRAP', 'ANGULAR'];

class WordJumbler {
	constructor() {
		this.unscrambledWords = unscrambledWords;
		this.chosenWord = '';
		this.scrambledWord = '';
		this.answered = [];
		this.word_score = 0;
	}

	main = () => {
		if (this.unscrambledWords.length > 0) {
			this.chosenWord = this.getRandomWord();
			this.scrambledWord = this.scramble(this.chosenWord);
			document.getElementById('scrambledWord').innerHTML = this.scrambledWord;
		} else {
			document.querySelector('.box').style.display = 'none';
			document.querySelector('.winner_box').style.display = 'block';
		}
	}

	getRandomWord= () => {
		let n = Math.floor(Math.random() * this.unscrambledWords.length);
		return this.unscrambledWords[n];
	}

	scramble= (word) => {
		return word.split('').sort().reverse().join('');
	}

	answerChecker = () => {
		let guessElem = document.getElementById('guess');
		let inputText = guessElem.value.toUpperCase();

		if (inputText == this.chosenWord) {
			this.answered.push(this.chosenWord);
			let n = this.unscrambledWords.indexOf(this.chosenWord);
			this.unscrambledWords.splice(n, 1);
			guessElem.value = '';
			this.score();
			this.main();
            document.querySelector('.notification').innerHTML="Correct! Well done!";
            document.querySelector('.notification').style.display = 'flex'
			setTimeout(() => (document.querySelector('.notification').style.display = 'none'), 3000);
		}
		else if (inputText.length === 0) {
			document.querySelector('.notification').innerHTML="Please enter an answer";
            document.querySelector('.notification').style.display = 'flex'
			setTimeout(() => (document.querySelector('.notification').style.display = 'none'), 3000);
		}
		else {
			document.querySelector('.notification').innerHTML="I'm sorry, that's not right!";
            document.querySelector('.notification').style.display = 'flex'
			setTimeout(() => (document.querySelector('.notification').style.display = 'none'), 3000);
		}
	}

	score= () =>  {
		this.word_score++;
		document.getElementById('score').innerHTML = `${this.answered.length} / ${
			this.answered.length + unscrambledWords.length
		}`;
	}
}

let input = document.getElementById('guess');
input.addEventListener('keyup', function (event) {
	if (event.key == 'Enter') {
		event.preventDefault();
		game.answerChecker();
	}
});

const game = new WordJumbler(unscrambledWords);
game.main();
