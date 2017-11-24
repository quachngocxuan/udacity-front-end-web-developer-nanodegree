/*
 * Create a list that holds all of your cards
 */
var INIT_MOVE_TIMES = 0;
var INIT_CARDS_FOUND = 0;
var INIT_TIMER = 0;	// seconds
var INIT_STAR = 5;
var MAX_CARDS = 16;
var DISPLAY_CARD_TIME = 750;	// milli seconds
var STAR_INTERVAL = 10;		// each interval down 1 star
var STAR_HTML = '<li><i class="fa fa-star"></i></li>';
 
var deck = $("ul.deck");
var cards = $("ul.deck li");
var found = INIT_CARDS_FOUND;
var moveTimes = INIT_MOVE_TIMES;
var lock = false;	// A flag to indicate a lock on card interaction
var tick = INIT_TIMER;		// stop watch with 60 seconds
var timer;

/*
 * Display the cards on the page
 *   - show back of cards
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - add each card's HTML to the page
 */
$(document).ready(function(){
  restart();
  
  deck.on("click", "li", function(evt) {
	// Start game if it is the first time click on a card
	if (timer === undefined)
	  start();
  
    if (!lock && !$(this).hasClass("open-card")) {
      show_card($(this));
  
      count_moves();
    }
  });

  $(".restart").on("click", function() {
    stop_clock();
    restart();
  });
});
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function show_card(card) {
  card.addClass("open-card show-card animated fadeIn");
  
  let openCards = $("ul.deck li.open-card.show-card");
  
  if (openCards.length == 2) {
    lock = true;	// lock cards to prevent player's interaction
	
    // Display new card 1 second before checking cards rule
    setTimeout(function() {
      if ($(openCards[0]).children().first().attr("class") === $(openCards[1]).children().first().attr("class")) {
	    // Disappear both open cards
	    $(openCards[0]).removeClass("open-card");
	    $(openCards[0]).addClass("disappear-card");
	    $(openCards[1]).removeClass("open-card");
	    $(openCards[1]).addClass("disappear-card");
	  
	    found += 2;
		
		if (found == MAX_CARDS) {
		  $("#star-got").text(star);
		  $("#move-gone").text(moveTimes);
		  $("#time-gone").text(tick);
		  
          $("#congrat-modal").modal('show');
        }
	  } else {
	    // Close both open cards
	    $(openCards[0]).removeClass("open-card show-card");
	    $(openCards[1]).removeClass("open-card show-card");
	  }
	
	  lock = false;	// when finishing to manipulate with new open card, release the lock
    }, DISPLAY_CARD_TIME);
  }
}

function count_moves() {
  moveTimes++;
  
  display_moves();
}

function initialize() {
  found = INIT_CARDS_FOUND;
  moveTimes = INIT_MOVE_TIMES;
  star = INIT_STAR;
  tick = INIT_TIMER;
}

function restart() {
  initialize();
  
  shuffle(cards);
  $("ul.deck").html(cards);
  
  show_back();
  
  display_star();
  
  display_clock();
  
  display_moves();
}

function start() {
  start_clock();
}

function show_back() {
  $(cards).attr("class", "card");
}

function display_moves() {
  $(".moves").text(moveTimes);
}

function start_clock() {
  timer = setInterval(function () {
    tick++;
	
	display_clock();
	
	// Check star
	update_star();
  }, 1000);
}

function stop_clock() {
  clearInterval(timer);
  timer = undefined;
}

function display_clock() {
  $(".game_timer").text(tick);
}

function display_star() {
  let stars = $("ul.stars");
  let currentStarNum = $(stars).children().length;
  
  for (i = 0; i < INIT_STAR - currentStarNum; i++) {
    $(stars).append(STAR_HTML);
  }
}

function update_star() {
  let new_star;
  if (tick < tick*STAR_INTERVAL)
    new_star = INIT_STAR - parseInt(tick / STAR_INTERVAL);
  else
    new_star = 0;
  
  if (star != new_star) {
    $(".stars li").first().remove();
	
	star = new_star;
  }
}