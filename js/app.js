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
//利用上面的随机方程重新打乱卡片池排列。
cardPool= shuffle(cardPool);
//将重新排序的卡片池写入页面中
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
//计时器，提供游戏计时；
function startTime() {
	// with(!start) {
	// 	t = window.setInterval($('.second').text(second++),1000);
	// }
	$('.second').text(second++);
}

//对点击正确的卡片进行反面显示卡片内容。
function openCard(card) {
	card.attr("class","card open show");
	$('.moves').text(parseInt(++moves/2));
	if (!start) {t = window.setInterval(startTime,1000);}
	start = true;
	// console.log(opendCard);
	// console.log($("ul").eq(1).children().attr('class'))
}

//对匹配到的卡片进行match操作
function matchCard(card) {
	card.attr("class","card match");
}

//对没有成功匹配的卡片进行翻转，隐藏卡片内容。
function closeCard(card) {
	//card.slideToggle(800,function() {
	//	card.attr("class","card");
	//});
	card.fadeOut(500,function() {card.attr({class:"card",style:""});})
	
	// opendCard='';
}

//检查之前是否有被翻开等待配对的卡片、检查现在翻开的卡片和之前翻开的是否一样。
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

//判断游戏是否结束，停止计时，展示胜利提示框。
function winning() {
	if($('.card.match').length !== 16) {
		return;
	}
	window.clearInterval(t);
	// clearTimeout(t);
	$('.popcontent').children('h1').text('恭喜过关');
	$('.popcontent').children('h3').text(`总共用时${second}秒，获得${$('.stars').children().length}个星星。`);
	// $($('.stars').children()).appendTo('.popcontent');
	$('.pop').css('display','inherit');
	// console.log('胜利')
}

//点击卡片，筛选是否为未翻开与未match的卡片，翻开卡片，检查步数更新星级，检查卡片是否匹配。
$('.card').on('click',function() {
	// $(this).attr("class","card open show");
	if($(this).attr('class') !== 'card') {
		// console.log('不正确的卡')
		return;
	}
	openCard($(this));
	switch(moves) {
		case 30:
			$('.stars').children().eq(0).remove();
			break;
		case 50:
			$('.stars').children().eq(0).remove();
			break;
	}
	// if(moves==20) {
	// 	$('.stars').children().eq(0).remove();
	// }
	// if(moves==25) {
	// 	$('.stars').children().eq(0).remove();
	// }
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

//点击重启按键刷新页面，游戏界面和胜利提示框相同。
$('.restart').on('click',function() {
	location.reload(false);
})

