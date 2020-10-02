// TO DO LIST:

// 1. Make Game End when unscrambledWords.length = 0
// 2. Reset input field when answer is correct
// 3. Work on animations
// 4. Turn unscrambledWords into an object and include a 'Hint' piece of text to show when user needs a hint
// 5. Add a scoreboard and timer




// Create an array of words to be jumbled up
const unscrambledWords = ["HTML", "CSS", "JAVASCRIPT", "JAVA", "REACT", "BOOTSTRAP", "ANGULAR"];
const unscrambledNames = ["JOHN", "JOE", "EMILY", "LIAM", "RACHEL"]
const exampleWords = ["HTML", "CSS"];

class WordJumbler {

    constructor (unscrambledWords) {
        this.unscrambledWords = unscrambledWords;
        this.chosenWord = "";
        this.scrambledWord = "";
        this.answered = [];
    }

    main() {
        // 0. If array of words not used is > 0, find another word
        if(this.unscrambledWords.length > 0) {

            // 1. Get the random word - this is the word we are quizzing the student on & copy it to array "answered"
            this.chosenWord = this.getRandomWord();

            // 2. Scramble our chosen word
            this.scrambledWord = this.scramble(this.chosenWord);
            
            // 3. Update the DOM with our scrambled word.
            document.getElementById("scrambledWord").innerHTML = (this.scrambledWord);

        } else {
            // 5. Stop the game since all words have been completed
            document.querySelector(".box").style.display="none";
            document.querySelector(".winner_box").style.display="block";

        }
    };
    
    // 1. Set a random word in the document
    getRandomWord() {
        
        // 1. Get a random number for selecting a random word from the array
        let n = Math.floor(Math.random()*this.unscrambledWords.length);
        
        // 2. Randomly selected a word and return 
        return this.unscrambledWords[n];
    }

    scramble(word) {
        let trick = word.split("").sort().reverse(); // Sort the array of letters and reverse them
            return trick.join(""); // Returning the joined word again into a string 
    }

    answerChecker() {
        let guessElem = document.getElementById("guess");
        let inputText = guessElem.value.toUpperCase();
        
        if (inputText == this.chosenWord) {
            this.answered.push(this.chosenWord);
            let n = this.unscrambledWords.indexOf(this.chosenWord);
            this.unscrambledWords.splice(n, 1);
            guessElem.value = "";
            this.main();
            document.querySelector(".noti-three").style.display="block";
            setTimeout(() => document.querySelector(".noti-three").style.display="none", 3000);
        }
        
        else if ( inputText.length === 0) 
        {
            document.querySelector(".noti-one").style.display="block",
            setTimeout(() => document.querySelector(".noti-one").style.display="none", 3000);
        }
        
        else {
            document.querySelector(".noti-two").style.display="block";
            setTimeout(() => document.querySelector(".noti-two").style.display="none", 3000);
        }
    }
    
    // reset() {        
    //     document.querySelector(".box").style.display="block";
    //     document.querySelector(".winner_box").style.display="none";
    //     this.unscrambledWords = unscrambledWords;
    //     this.chosenWord = "";
    //     this.scrambledWord = "";
    //     this.answered = [];
    //     this.main();
    // }
}

const game = new WordJumbler(unscrambledWords);
    game.main();

// const game = new WordJumbler(unscrambledNames);
//     game.main();
