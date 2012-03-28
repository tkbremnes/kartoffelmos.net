var canvas;
var ctx;
var gradient;
var dy;
var noOfBubbles = 20;
var bubbles = new Array(noOfBubbles);
var timer;
var timerTimer;

var emptyFlag;


function hw(){
	alert("hello world");
}

function clear(){
	ctx.clearRect(0,0,400,150);
}

function init(){
//	alert($('h1').css('column-span'));
	
	// initPageCounter();
	initBeer();
	initProgressBar();
	initPopIn();
	initVideoPlayer();
	initHeadMedia();
	
//	$.each($('.footnote'), function(){
//		$(this).click(function(e){
//			alert($(this).attr('title'));
//			highlightFootnoteText(e);
//		});
//	});

	$('.footnote').click(function(e){
		alert($(this).attr('title'));
		highlightFootnoteText(e);
	});
}

function initBeer(){
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');
	gradient = ctx.createLinearGradient(0, 0, 0, 150);
	gradient.addColorStop(0, '#111106');
	gradient.addColorStop(1, '#000');
	dy=0;
	
	timer = $('#timerSeconds');
	timerTimer = 0;
	
	initRetroBubbles();
	
	setInterval(draw, 40);
	
	emptyFlag = false;
}

function draw(){
	clear();
	//ØL
	
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 30+dy, 400, 120);
	
	//SKUM
	ctx.fillStyle = '#DDDDBA';
	ctx.fillRect(0, dy, 400, 30);
	
	//BUBBLES!
	
	if(emptyFlag){
		dy++;
	}
	else{
	for(var i=0; i<noOfBubbles; i++){
		if(i==0 || bubbles[i][2]){
			animateRetroBubble(i);
		}
		else if(Math.round(Math.random()*100) == 3){
			bubbles[i][2] = true;
		}
	}
	}
	if(timerTimer == 25){
		updateTimer();
		timerTimer=0;
//		dy++;
	}
	else{
		timerTimer+=1;
	}
	
	if(dy==150){
		$('#resetbutton').removeAttr('disabled');
	}
	
	ctx.fillStyle = 'rgba(245,245,245,0)';
	ctx.fillRect(0,0,400,150);
}


function initRetroBubbles(){
	var seed;
	for(var i=0; i<noOfBubbles; i++){
		bubbles[i] = new Array();
		var newSeed = Math.random()*400;
		if(seed != newSeed){
			seed = newSeed;
		}
		bubbles[i][0] = seed;
		bubbles[i][1] = 0;
		bubbles[i][2] = false;
	}
}

function animateRetroBubble(i){
	ctx.fillStyle = '#F0F0D8';
	ctx.fillRect(bubbles[i][0], 150-bubbles[i][1], 4, 1);
	
	if(bubbles[i][1]>118){
		bubbles[i][0]=Math.random()*400;
		bubbles[i][1]=0;
		bubbles[i][2]=false;
	}
	else{
		bubbles[i][1]+=1;	
	}
	ctx.save();
}

function updateTimer(){
	var sec = parseInt(timer.text());
	timer.text(sec+1);
}

function emptyGlass(){
	$('#emptybutton').attr('disabled', 'disabled');
	emptyFlag = true;
}

function reset()
{
	$('#resetbutton').attr('disabled', 'disabled');
	$('#emptybutton').removeAttr('disabled');
	init();
}















function initPageCounter(){
	var paged = document.getElementById('article');
	var counter = $('#counter');
	counter.text(paged.currentPage+1);
	updateFootnotes();
	
	paged.onpagechange = updatePageCounter;
}

function updatePageCounter(e){
	
	var counter = $('#counter');
	counter.text(e.currentPage+1);
	
	updateFootnotes();
	initProgressBar();
	
}

function updateFootnotes(){
	var pageAnimationDelay = 200;  //Needs to delay execution of code until the page has turned properly.
	
	
	//DIRTY: removes all footnote counters
	$('.FootnoteCounter').remove();
	
	setTimeout("letsgo();",pageAnimationDelay)
}

function letsgo(){
	var c = $('#footnoteContainer');
	// Finds all footnote-elements
	//TODO
	var footnotes = $('.footnote');
	
	// Clears the footnote container
	c.text(' ');
	
	var i = 1;
	$.each(footnotes, function(){
		$(this).after('<span class="FootnoteCounter">' + i + '</span>');
		
		if(isVisible($(this))){
			c.append('<span class="footnotePointer">' + i + '</span> ');
			c.append('<span class="footnoteData">' + $(this).attr('title'));
		}
		i++;
	});
}

function isVisible(e){
//	alert(e.position().left);
//	alert($(window).width());
	return((e.position().left>=0) && ($(window).width()) >= e.position().left);
}

function highlightFootnoteText(e){
	// For now just makes the footnote stand out a bit more with some yellow highlighting. Could also be a lightbox or something similar.
	
	
}










//----------------------------------
// Progressbar-specific code
//----------------------------------

function initProgressBar(){
	var x = document.getElementById('article');
	var ctx = document.querySelector('#progressbar').getContext('2d');
	
	ctx.clearRect(0,0,400,150);
	ctx.fillStyle = '#A1A1A1';
	
	for(i=1; i<=x.pageCount; i++){
		ctx.fillRect(10*i,30,4,150);
	}
	
	ctx.fillStyle = '#000000';
	ctx.fillRect(10*(x.currentPage+1),30,4,150);
}


//----------------------------------
// Popin-specific code
//----------------------------------
function initPopIn(){
	$('body').click(function(){
		$('body').unbind('click');
		$('#popin').addClass('fadeIn');
		initPopOut();
	});
}

function initPopOut(){
	$('body').click(function(){
		$('body').unbind('click');
		$('#popin').removeClass('fadeIn');
		initPopIn();
	});
}



//----------------------------------
// Experimental head media code
//----------------------------------
function initHeadMedia(){
	$('#headmedia').click(function(){
		$('#headmediaProperties').toggleClass('visible');
	});
}

//----------------------------------
// Experimental video code
//----------------------------------
function initVideoPlayer(){
	$('#trailer').click(function(){
		$(this).attr('controls', 'controls');
	});
}