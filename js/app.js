/*
 * Create a list that holds all of your cards
 */
let cardPool=	['fa fa-diamond'
				,'fa fa-paper-plane-o'
				,'fa fa-anchor'
				,'fa fa-bolt'
				,'fa fa-cube'
				,'fa fa-anchor'
				,'fa fa-leaf'
				,'fa fa-bicycle'
				,'fa fa-diamond'
				,'fa fa-bomb'
				,'fa fa-leaf'
				,'fa fa-bomb'
				,'fa fa-bolt'
				,'fa fa-bicycle'
				,'fa fa-paper-plane-o'
				,'fa fa-cube'];
let opendCard,opendCardClass='',moves=0,second=0,start=false,t;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
cardPool= shuffle(cardPool);
for(let i=0;i<16;i++) {
	$('.card').eq(i).prepend(`<i class='${cardPool[i]}'></i>`);
};

	/*
	 * set up the event listener for a card. If a card is clicked:
	 *  - display the card's symbol (put this functionality in another function that you call from this one)
	 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	 *  - if the list already has another card, check to see if the two cards match
	 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	 */
function startTime()
{
	$('.second').text(second++);
	t=setTimeout("startTime()",1000);
}
function openCard(card) {
	card.attr("class","card open show");
	$('.moves').text(++moves);
	if (!start) {startTime();}
	start = true;
	// console.log(opendCard);
	// console.log($("ul").eq(1).children().attr('class'))
}
function matchCard(card) {
	card.attr("class","card match");
}
function closeCard(card) {
	//card.slideToggle(800,function() {
	//	card.attr("class","card");
	//});
	card.fadeOut(500,function() {card.attr({class:"card",style:""});})
	
	// opendCard='';
}

function checkCard(card) {
	if (opendCardClass === '') {
		// openCard(card);
		opendCard=card;
		// console.log(opendCard)
		opendCardClass=opendCard.children().attr('class');
		return false;
	}
	if (opendCardClass == card.children().attr('class')) {return true;}
		// closeCard(card);
	return false;
}

function winning() {
	if($('.card.match').length !== 16) {
		return;
	}
	clearTimeout(t);
	$('.popcontent').children('h1').text('恭喜过关');
	$('.popcontent').children('h3').text(`总共用时${second}秒，获得${$('.stars').children().length}个星星。`);
	// $($('.stars').children()).appendTo('.popcontent');
	$('.pop').css('display','inherit');
	// console.log('胜利')
}


$('.card').on('click',function() {
	// $(this).attr("class","card open show");
	if($(this).attr('class') !== 'card') {
		// console.log('不正确的卡')
		return;
	}
	openCard($(this));
	if(moves==20) {
		$('.stars').children().eq(0).remove();
	}
	if(moves==25) {
		$('.stars').children().eq(0).remove();
	}
	if(moves==30) {
		$('.stars').children().eq(0).remove();
	}
	if(checkCard($(this))) {
		matchCard($(this));
		// console.log(opendCard)
		matchCard(opendCard);
		winning();
		//console.log('相同')
		opendCard = undefined;
		opendCardClass = '';
		//console.log(opendCard);	
	}else if(opendCardClass === $(this).children().attr('class')) {
		//console.log('11')
		return;
	}else {
		closeCard($(this));
		closeCard(opendCard);
		opendCard = undefined;
		opendCardClass = '';
	}
	//console.log('11')
})

$('.restart').on('click',function() {
	location.reload(false);
})

