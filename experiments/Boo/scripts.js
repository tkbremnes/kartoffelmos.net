function init(){
	
	document.getElementById('video1').currentTime = 10;
	
	$('#figure2').mouseenter(function(){
		$('#video1').removeClass('invisible');
		$('#video1').addClass('visible');
		document.getElementById('video1').currentTime = 10;
		document.getElementById('video1').play();
		
		
		$('.portrait_caption').removeClass('invisible');
	}).mouseleave(function(){		
		$('#video1').addClass('invisible');
		$('#video1').removeClass('visible');
		document.getElementById('video1').pause();
		
		
			$('.portrait_caption').addClass('invisible');
	});
	
	$('#video1').bind("ended", function() {
		document.getElementById('video1').currentTime = 10;
		document.getElementById('video1').play();
	});
	
	// $('.imagecontainer').mouseover(function(){
	// 	$('#portrait2').addClass('invisible');
	// 	$('#portrait2').removeClass('visible');
	// }).mouseout(function(){
	// 	$('#portrait2').removeClass('invisible');
	// 	$('#portrait2').addClass('visible');
	// });
	
	initProfile1();
	
	$('#huge').ready(function(){
		$('#huge').removeClass('invisible');
	});
}

function initProfile1(){
	var canvas = document.getElementById("portrait1");
	var context = canvas.getContext("2d");
	var image = document.getElementById("portrait1img");
	context.drawImage(image, 0, 0);
	var imgd = context.getImageData(0, 0, 500, 300);
	var pix = imgd.data;
	for (var i = 0, n = pix.length; i < n; i += 4) {
	var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
	pix[i  ] = grayscale; 	// red
	pix[i+1] = grayscale; 	// green
	pix[i+2] = grayscale; 	// blue
	// alpha
	}
	context.putImageData(imgd, 0, 0);
	
	$('#figure1').mouseenter(function(){
		context.drawImage(image, 0, 0);
	}).mouseleave(function(){
		context.putImageData(imgd, 0, 0);
	});
}