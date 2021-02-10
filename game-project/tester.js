//var englishDictionary = require('an-array-of-english-words');
//HTML IMPLEMENTATION

//GAME JS VARIABLES
var currentWord = ""; //Current word player is building
var playedWords = []; //List of words played
var currentScore = 0; //Current Total Score
var selectedList = [];
var recent = [];

//Creates Game Board Table
function setBoard(){
    
    var gameAlphabet = [
        'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Qu', 'R',
        'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'
    ];
    
   //PROPERTIES/VARIABLES FOR GAME
    var gameMatrix = []; //matrix of characters
    var gameBoard = document.getElementById("gameboard");

    //GENERATES NEW GAME MATRIX
    function generateBoggleGame() { 
        let matrix = [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', '']
        ];

        for(let i = 0; i < 4; i++){ //creates rows
            var row = gameBoard.insertRow(i);
            for(let j = 0; j < 4; j++){ //creates columns/elements
                let randomLetter = gameAlphabet[Math.floor(Math.random() * Math.floor(26))]; //Generates random index to pull from alphabet
                var cell = row.insertCell(j);
                cell.innerHTML = randomLetter; //applies to cell
                cell.onclick = selectLetter;
                cell.id = `cell-${i}-${j}`; //gives html cell id
                cell.className = "unselected"; //gives html cell class
                matrix[i][j] = randomLetter; //Pushes random letter onto matrix
            };
        };

        return matrix;
    };

    gameMatrix = generateBoggleGame(); //-TEST
};



//Tracks pressed letters
function selectLetter(){

    switch(this.className){
        //If selected letter is already used
        case "selected":
            console.log(`Test: case "selected"`);
            console.log(`Before: Check recent 
            ${recent}`);
            console.log(recent);
            console.log(`Before: Check selectedList
            ${selectedList}`);
            printUsedList();

            alreadySelected();
            break;
        //if selected letter is not used
        case "unselected":
            console.log(`Test: case "unselected"`);
             console.log(`Before: Check recent 
            ${recent}`);
            console.log(recent);
            console.log(`Before: Check selectedList 
            ${selectedList}`);
            printUsedList();

            this.className = "recent"; //update to class recent
            if(recent.length > 0){
                selectedList.push(recent); //add previously used to used list
                recent.push(this); //add this letter to last used
                recent.shift(); //remove previously used letter
            }else{
                recent.push(this); //add this letter to recent
            };
            
            currentWord += this.textContent; //add this letter to current word
            
            break;
        //if selected letter is recent letter
        case "recent":
            console.log(`Test: case "recent"`);
            console.log(`Before: Check recent 
            ${recent}`);
            console.log(recent);
            console.log(`Before: Check selectedList 
            ${selectedList}`);
            printUsedList();

            currentWord = currentWord.substring(0, (currentWord.length - 1)); //subtract this letter from current word
            this.className = "unselected"; //revert this letter's class to unselected
            recent.push(selectedList.pop()); //pop off previously used letter from used list and add to last used
            recent.shift(); //remove this letter from last used
    
            break;
            
        default:
    };
    console.log(`After: Check recent 
    ${recent}`);
    console.log(recent);
    console.log(`After: Check selectedList 
    ${selectedList}`);
     printUsedList();

    updateUsedList(); //change class for all in used list to "selected"
    
    updateWIP();
};

function printUsedList() {
    for(let i = 0; i < selectedList.length; i++){
        console.log(selectedList[i]);
    };
};

function updateUsedList() {
    for(let i = 0; i < selectedList.length; i++){
        selectedList[i].className = "selected";
    };
};

function alreadySelected(){
    this.style = "background-color: red";
};

function updateWIP(){
    document.getElementById("word-build").textContent = currentWord;
};

//Submit current word
function submitWord(){
    updatePlayedWords();
    updateScore();
    currentWord = ""; //reset current word
    document.getElementById("word-build").innerHTML = "";
    
};

function updatePlayedWords() {
    playedWords.push(currentWord); //Add current word to played words
    //Adding to HTML list
    var listWord = document.createElement("LI");
    var listWordContent = document.createTextNode(currentWord);
    listWord.appendChild(listWordContent);
    document.getElementById("played-words").appendChild(listWord);
};

function updateScore() {
    currentScore += currentWord.length; //Add score
    document.getElementById("total-score").innerHTML = currentScore;
}

function refreshLetters(){
    var clickedLetters = (document.getElementsByClassName("selected"));
    let i = 0;
    while(i < clickedLetters.length){
        clickedLetters[i].className = "unselected";
    };
};