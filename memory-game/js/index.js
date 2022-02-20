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
 
	res = arr1.concat(arr2)
	return res
 }

const createCards = (el) =>{
for(let i = 0; i < el.length; i++){
	const card = document.createElement('img');
	card.classList.add('back-face');
	card.src = `source/img/cards/${el[i]}.jpg`;
	card.alt = `${el[i]} card`;
	cards[i].append(card)
	}
}

window.addEventListener('load', createCards(randomEighteen()))
/*------------------------------flip-card------------------------------------------*/


const flipCard = () =>{
	console.log('click')
}

cards.forEach( card => card.addEventListener('click', flipCard))




