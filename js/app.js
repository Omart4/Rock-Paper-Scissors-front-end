//Global Variables
const startButton = document.getElementById('start-game');
const playerName = document.getElementById('player');
const mainMenu = document.querySelector('.main');
const alertMessage = document.getElementById('alert-message')
const Name = document.getElementById('player-name')
const Score = document.getElementById('game-score')
const test = document.querySelector('h1')
const gameMenu = document.querySelector('.game-choice')
const moves = document.querySelectorAll('.items')
const playButton = document.getElementById('play')
const gameResults = document.querySelector('.game-result')
const results = document.querySelector('.results')
const resultsMessage = document.getElementById('result-message')
const againButton = document.getElementById('again')
const computerOptions = [
    {type:'rock',pic:"./assets/rock--left.png",label:"Rock"},
    {type:'paper',pic:"./assets/paper--left.png",label:"Paper"},
    {type:'scissors',pic:"./assets/scissors--left.png",label:"Scissors"}
]

//Check if the player name field is empty
if(playerName.value == ''){
    startButton.style.cursor = 'not-allowed'
    startButton.disabled = true;
} 
playerName.addEventListener('keyup',function(){
    if(this.value == ''){
        startButton.style.cursor = 'not-allowed';
        playerName.style.outline = '3px solid red';
        startButton.disabled = true; 
        alertMessage.style.display = 'inline-block'
    }
    else{
        startButton.style.cursor = 'pointer';
        playerName.style.outline = 'none';
        startButton.disabled = false; 
        alertMessage.style.display = 'none'
    }
})

//Function to search for player name in local storage
const queryStorage = (criteria)=>{
    return localStorage.getItem(criteria)
}
//Function to check if previous function returns a player
//if a player exists nothing happens 
//if a player doesn't exist it will create a new player in the database with a score of zero 
const ifExists = ()=>{
    if(queryStorage(playerName.value) == null){
        let details = {name:playerName.value,score:0};
        localStorage.setItem(playerName.value,JSON.stringify(details));
        mainMenu.style.display = 'none'
    }
    else if(playerName.value != null){
        console.log("Player already exists")
        mainMenu.style.display = 'none'
    }
}
//Calls the previous function to get the player details and displays them
//in name and score spaces
const start = ()=>{
    ifExists();
    let details = JSON.parse(localStorage.getItem(playerName.value))
    Name.textContent = details.name;
    Score.textContent = details.score;
    gameMenu.style.display = 'block'
}

//code for choosing a move
moves.forEach(move=>{
    move.addEventListener('click',function(){
        move.classList.toggle('selected')
    })
})

const play = ()=>{
    const selectAlert = document.getElementById('select-alert')
    let selectedMoves = []
    moves.forEach(move=>{
        if(move.classList.contains('selected')){
            selectedMoves.push(move)
        }
    })
    if(selectedMoves.length > 1){
        selectAlert.style.display = 'inline-block'
        selectAlert.innerText = 'Please select only ONE move!'
    }
    else if(selectedMoves.length == 0){
        selectAlert.style.display = 'inline-block'
        selectAlert.innerText = 'Please select a move!'
    }
    else{
        selectAlert.style.display = 'none'
        gameMenu.style.display = 'none'
        gameResults.style.display = 'flex'
        Combinations(selectedMoves)
    }
}
const increaseScore = ()=>{
    let dataJSON = JSON.parse(localStorage.getItem(playerName.value))
    dataJSON.score += 1;
    Name.textContent = dataJSON.name;
    Score.textContent = dataJSON.score;
    localStorage.setItem(playerName.value,JSON.stringify(dataJSON));
}
function Combinations(arr){
    const computerOptions = [
        {type:'rock',pic:"./assets/rock--left.png",label:"Rock"},
        {type:'paper',pic:"./assets/paper--left.png",label:"Paper"},
        {type:'scissors',pic:"./assets/scissors--left.png",label:"Scissors"}
    ]
    let choiceIndex = Math.floor(Math.random()*computerOptions.length)
    let userChoice = arr[0].id;
    let computerChoice = computerOptions[choiceIndex].type;
    let computerChoiceData = computerOptions[choiceIndex];
    let userChoiceData = computerOptions.filter(i=>i.type == userChoice)[0]
    let Template = 
    `
    <span class="final" id="user">
            <span>Your Choice</span>
            <img src="${userChoiceData.pic}">
            <label>${userChoiceData.label}</label>
        </span>
        <span class="final" id="computer">
            <span>Computer Choice</span>
            <img src="${computerChoiceData.pic}">
            <label>${computerChoiceData.label}</label>
        </span>
    `;
    if(userChoice == 'rock' && computerChoice == 'scissors'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Won"
        resultsMessage.style.color = 'rgb(0,255,0)'
        increaseScore()
    }
    else if(userChoice == 'paper' && computerChoice == 'rock'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Won"
        resultsMessage.style.color = 'rgb(0,255,0)'
        increaseScore()
    }
    else if(userChoice == 'scissors' && computerChoice == 'paper'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Won"
        resultsMessage.style.color = 'rgb(0,255,0)'
        increaseScore()
    }
    else if(userChoice == 'rock' && computerChoice == 'paper'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Lost"
        resultsMessage.style.color = 'rgb(255,0,0)'
    }
    else if(userChoice == 'paper' && computerChoice == 'scissors'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Lost"
        resultsMessage.style.color = 'rgb(255,0,0)'
    }
    else if(userChoice == 'scissors' && computerChoice == 'rock'){
        results.innerHTML = Template;
        resultsMessage.innerText = "You Lost"
        resultsMessage.style.color = 'rgb(255,0,0)'
    }
    else{
        results.innerHTML = Template;
        resultsMessage.innerText = "It's a Draw"
        resultsMessage.style.color = 'var(--inputBlue)'
    }
}
playButton.addEventListener('click',play)

const again = ()=>{
    gameResults.style.display = 'none';
    moves.forEach(move=>{
        move.classList.remove('selected')
    })
    gameMenu.style.display = 'block';
}
againButton.addEventListener('click',again)

startButton.addEventListener('click',function(){
    console.log('hi')
    start()
})
test.onclick = function(){
    console.log(queryStorage(playerName.value))
    console.log(moves)
}

