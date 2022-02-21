/*------------------------------cards------------------------------------------*/
const cards = document.querySelectorAll('.main__card')

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
const checkForMatch = () =>{
	let isMatch = firstCard.dataset.image === secondCard.dataset.image
	console.log(hasFlippedCard)
	isMatch ? disableCards() : unFlipCards()
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
/*------------------------------------------------------------------------*/



