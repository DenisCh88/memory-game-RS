/*------------------------------cards------------------------------------------*/
const cards = document.querySelectorAll('.main__card');
const timer = document.querySelector('.time');
const moves = document.querySelector('.moves');
const win = document.querySelector('.win');
const body = document.querySelector('body');

const randomEighteen = () => {
	let arr1 = [],
		 arr2 = [],
		 res = [];
		 
	while (arr1.length < 9){
	  let num = (Math.floor(Math.random() * (10 - 1)) + 1);
	  if (arr1.indexOf(num) === -1){
		 arr1.push(num)
	  }
	}  
	 while (arr2.length < 9){
		let num = (Math.floor(Math.random() * (10 - 1)) + 1)
		if (arr2.indexOf(num) === -1){
		arr2.push(num)
	  }
	 }
 
	return res = arr1.concat(arr2)
 }

const createCards = (el) =>{
for(let i = 0; i < el.length; i++){
	const card = document.createElement('img');
	card.classList.add('front-face');
	card.src = `source/img/cards/${el[i]}.jpg`;
	card.alt = `${el[i]} card`;
	cards[i].append(card);
	cards[i].setAttribute('data-image', `${el[i]}`);
	}
}

window.addEventListener('load', createCards(randomEighteen()))
/*------------------------------flip-card------------------------------------------*/
let hasFlippedCard = false;
let firstCard,
	 secondCard;
let move = 0;
let moveCount;

const flipCard = (event) =>{
	event.currentTarget.classList.add('flip')
	
	if(!hasFlippedCard){
		hasFlippedCard = true;
		firstCard = event.currentTarget;
		return
	}
	if (event.currentTarget != firstCard){
		hasFlippedCard = false;
		secondCard = event.currentTarget;

		checkForMatch()
	}
}
/*-------------------------------match cards-----------------------------------------*/
let winCount = 0;
let gameWin = false;
let winDisplay = 0;
let winCounting;
moves.innerHTML = '00';

const checkForMatch = () =>{
	let isMatch = firstCard.dataset.image === secondCard.dataset.image

	isMatch ? disableCards() : unFlipCards()

	moveCounter()

	if (isMatch){
		winCount++
	}
	gameWins()
}

const moveCounter = () =>{
	move++
	moveCount = move > 9 ? `${move}` : `0${move}`
	moves.innerHTML = `${moveCount}`;
}

const gameWins = () =>{
	if(winCount === 9){
		gameWin = true;
	}
	if (gameWin){
		winDisplay++
		winCounting = winDisplay > 9 ? `${winDisplay}` : `0${winDisplay}`
		win.innerHTML = `${winCounting}`;
		body.classList.add('game-win')
	}
}

const disableCards = () =>{
	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)
	resetBoard()
	
}

const unFlipCards = () =>{
	cards.forEach( card => card.removeEventListener('click', flipCard))
	setTimeout(() => {
		cards.forEach( card => card.addEventListener('click', flipCard))
	}, 1000)
	setTimeout(() => {
		firstCard.classList.remove('flip')
		secondCard.classList.remove('flip')
	}, 1000)
}

const resetBoard = () =>{
	[firstCard, secondCard] = [null, null]
}

cards.forEach( card => card.addEventListener('click', flipCard))
/*----------------------------------timer--------------------------------------*/
let gameStart = false;
let sec = 0;
let min = 0;
let seconds_str = '';
let minutes_str = '';

const startGame = () =>{
	timer.innerHTML = '00:00';

	if (body.classList.contains('game-win')){
		body.classList.remove('game-win')
	}
	if(!gameStart){
		gameStart = true
		cards.forEach( card => card.removeEventListener('click',startGame))
	}
	if(gameStart){
		timerOn()
		let timer = setInterval(() => {
			timerOn()
		}, 1000)
		setInterval(() => {
			if(body.classList.contains('game-win')){ 
				clearTimeout(timer);
			}
		},)
	}
}

const tick = () => {
	sec++;
	if (sec >= 60) {
		 sec = 0;
		 min++;
		 if (min >= 60) {
			  min = 0;
		 }
	}
}

const timerOn = () =>{
	tick()

	seconds_str = sec > 9 ? `${sec}` : `0${sec}`;
	minutes_str = min > 9 ? `${min}` : `0${min}`;
	timer.innerHTML = `${minutes_str}:${seconds_str}`;
}

cards.forEach( card => card.addEventListener('click',startGame))
/*-----------------------------reset-------------------------------------------*/
const reset = document.querySelector('.reset__btn')

const resetGame = () =>{
	body.classList.add('game-win')
	cards.forEach( card => card.classList.remove('flip'))

	sec = 0;
	min = 0;
	move = 0;
	winCount = 0;
	timer.innerHTML = '00:00';
	moves.innerHTML = '00';
 	gameWin = false;
	gameStart = false;
	firstCard = null;
	secondCard = null;
	cards.forEach( card => card.addEventListener('click',startGame))
	cards.forEach( card => card.addEventListener('click', flipCard))

	setTimeout(()=>{
		createCards(randomEighteen())
	}, 250)
}

reset.addEventListener('click', resetGame)
/*-----------------------------score-------------------------------------------*/
const score = document.querySelector('.score__btn')

score.addEventListener('click', ()=> {
	alert('Sorry... Score is in progress. Please, try again later..')
})

