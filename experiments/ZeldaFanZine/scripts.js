function init(){
	initFullscreen();
	$(window).resize(function() {
	  initFullscreen();
	});
	initSlideshow();

	// document.getElementById('nag').play();
}

function initFullscreen(){
	$('.fullscreen').css('height', $(window).height());
}

var pictures = [];
function initSlideshow(){
	for(var i=1; $('#p'+i).length>0; i++){
		pictures.push($('#p'+i));
	}
	pictures[0].addClass('visible');

	window.setInterval(rotatePictures, 5000);
}

var counter = 0;
function rotatePictures(){
	pictures[counter].removeClass('visible');
	counter++;
	if(counter>=pictures.length){
		counter = 0;
	}
	pictures[counter].addClass('visible');
}