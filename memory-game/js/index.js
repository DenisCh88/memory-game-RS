/*------------------------------cards------------------------------------------*/
const cards = document.querySelectorAll('.main__card');
const timer = document.querySelector('.time');
const moves = document.querySelector('.moves');
const win = document.querySelector('.win');
const body = document.querySelector('body');
let getWinCount = localStorage.getItem('win');
const scoreItems = document.querySelectorAll('.table__item');

const createScote = () =>{
	if (localStorage.getItem(`key01`) !== null){
		for (let i = 0; i < localStorage.getItem(`win`); i++){
			let scoreItem = JSON.parse(localStorage.getItem(`key0${i + 1}`));

			scoreItems[i].innerHTML = `Time: ${scoreItem.time} | Date: ${scoreItem.date} | Moves: ${scoreItem.moves}`;
		}
	}
}


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
	
	return res = arr1.concat(arr2);
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
	win.innerHTML = getWinCount === null ? '00' : `${localStorage.getItem('win')}`;
	createScote()
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
let winDisplay = getWinCount === null ? '00' : `${getWinCount}`;
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
		if(scoreStrings[0].classList.contains('table__item')){
			clearTable()
		}
		createScore()
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
	if (body.classList.contains('game-reset')){
		body.classList.remove('game-reset')
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
			if(body.classList.contains('game-reset')){ 
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
	const card = document.querySelector('.front-face');

	body.classList.add('game-reset')
	cards.forEach( card => card.classList.remove('flip'))
	setTimeout(()=>{
		card.remove()
	}, 250)
	
	sec = 0;
	min = 0;
	move = 0;
	winCount = 0;
	gameWin = false;
	gameStart = false;
	timer.innerHTML = '00:00';
	moves.innerHTML = '00';
	firstCard = null;
	secondCard = null;
	cards.forEach( card => card.addEventListener('click',startGame))
	cards.forEach( card => card.addEventListener('click', flipCard))

	if (body.classList.contains('game-win')){
		body.classList.remove('game-win')
	}

	if (localStorage.getItem("win") === 10){
		localStorage.clear()
	}
	
	winStringPending()
	setTimeout(() =>{
		createCards(randomEighteen())
	}, 250)
	

	if (localStorage.getItem('win') === null){
		win.innerHTML = '00'
	} else {
		win.innerHTML = `${localStorage.getItem("win")}`
	}
	console.log(`${localStorage.getItem('win')}`)
}


reset.addEventListener('click', resetGame)
/*-----------------------------sound-------------------------------------------*/
let audio = new Audio(); 
audio.autoplay =false;

const sound = () => {
	cards.forEach( card => card.removeEventListener('click',sound))

	volume.src = 'source/icon/mic/volume.png'
	audio.src = 'source/sound/theme_song.mp3';
	audio.volume = 0.2;
	audio.autoplay = true;
	audio.loop = true;
	audio.muted = false;
	
	audioHover.muted = false
}

cards.forEach( card => card.addEventListener('click',sound))
/*-----------------------------mute-------------------------------------------*/
const volume= document.querySelector('.button__image');

const mute = () =>{
	if(!audio.muted){
		audio.muted = true
		audioHover.muted = true
		volume.src = 'source/icon/mic/volume-mute.png'
	} else if(audio.muted){
		audio.muted = false
		audioHover.muted = false
		volume.src = 'source/icon/mic/volume.png'
	}
	if(!audio.autoplay){
		sound()
	}
}

volume.addEventListener('click', mute)
/*-----------------------------sound hover-------------------------------------------*/
let audioHover = new Audio(); 
audioHover.muted = true

const hover = (event) => {
	audioHover.src = 'source/sound/hover.mp3';
	if(!event.currentTarget.classList.contains('flip')){
		setTimeout(() =>{
			audioHover.play()
		}, 100)
		audioHover.volume = 0.8
	}
}

cards.forEach( card => card.addEventListener('mouseenter',hover))
/*-----------------------------score-------------------------------------------*/
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() > 9 ? `${now.getMonth() +1}` : `0${now.getMonth() + 1}`
const date = now.getDate()
const hours = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`
const minutes = now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`

const winStringPending = () =>{
	cards.forEach( card => card.removeEventListener('click',winStringPending))
	let localObj = {}
	let winString = setInterval(() => {
		let localDate = `${date}.${month}.${year} ${hours}:${minutes}`
		let localTime = `${timer.innerHTML}`
		let localMoves = `${moves.innerHTML}`
		if(body.classList.contains('game-win')){ 
			localObj = {
				date : localDate,
				time : localTime,
				moves : localMoves,
			}
			localStorage.setItem(`key${win.innerHTML}`, JSON.stringify(localObj))
			localStorage.setItem('win', win.innerHTML)
			clearInterval(winString)
		}
	},)
}
// const returnObj = JSON.parse(localStorage.getItem("key02"))
cards.forEach( card => card.addEventListener('click',winStringPending))
/*-----------------------------score-btn------------------------------------------*/
const score = document.querySelector('.score__btn')
const cross = document.querySelector('.table__button')
const cardTable = document.querySelector('.main__cards')
const scoreTable = document.querySelector('.main__table')
const scoreList = document.querySelector('.table__items')

const scoreTableShow = () =>{
	// localStorage.clear()
	cardTable.classList.add('display-none');
	scoreTable.classList.remove('display-none');
}

const cardsTableShow = () =>{
	scoreTable.classList.add('display-none');
	cardTable.classList.remove('display-none');
}

score.addEventListener('click', scoreTableShow) 
cross.addEventListener('click', cardsTableShow) 
/*-----------------------------create score------------------------------------------*/


/*-----------------------------nullify score------------------------------------------*/




// body.addEventListener('click', ()=>{
// 	localStorage.clear()
// })