//myslideshow.js

const delay = t => new Promise(resolve => setTimeout(resolve, t));
const extFileName = '.jpg';
const delayTime = 10000;

function padZero(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

let titleFileName = 'ala011SRS_218260';

let isShow = true;

let imgs = [];
let startNum = 1;
let endNum = 239;
let currentShow = 1;

let imgWidth = 0;
let imgHeight = 0;

function view(i) {
	let imgFileName = imgs[i];
	if (imgFileName !== undefined){
		$('#ControlPanel').hide();
		$('#NumberPreview').empty();
		$('#NumberPreview').html('<b>' + i + '/' + endNum + '</b>');
		$('.backgroundTransition').empty();
		$('.backgroundTransition').css("width", '100%');
		$('.backgroundTransition').css("height", '100%');

		let img = new Image();
		img.className = 'hide';
		img.src = imgFileName;
		img.onload = function(){
			imgWidth = img.width;
			imgHeight = img.height;
			//console.log(imgWidth + ":" + imgHeight);

			$('.backgroundTransition').animate({"zoom": "+=50%"}, 2500);

			if(imgWidth > imgHeight){
				img.classList.add("landscape");
			}else{
				img.classList.add("portrait");
			}
			delay(500).then(()=>{	
				img.classList.remove("hide");
				$('#ControlPanel').show();
			});
		};
		img.onclick = function() { 
			img.className  = "fullview";
			$('.backgroundTransition').css("width", '100%');
			$('.backgroundTransition').css("height", '100%');
		};
		img.ondblclick = function() { 
			img.className  = "fullview";
			toggleFullView();
		};

		$('.backgroundTransition').append(img);
	}
}
function toggleFullView(){
	let imgW = $('img').css("width");
	if (parseInt(imgW) <= screen.width) {
		$('.backgroundTransition').css("width", imgWidth + 'px');
		$('.backgroundTransition').css("height", imgHeight + 'px');
		$('img').css("width", '100%');
	} else {
		$('.backgroundTransition').css("width", '100%');
		$('.backgroundTransition').css("height", '100%');
		$('img').css("width", '100%');
	}
}
function show() {
	isShow = true;
	currentShow = 1;
	let i=currentShow;

	(function doSlideShow (i) { 
		view(i);	         
		let timer = setTimeout(function () { 
			//console.log(imgHeight);
			//console.log(screen.height);
			//$('img').css("width", 'auto');
			//$('img').css("height", screen.height + 'px');

			$('.backgroundTransition').animate({"zoom": "-=50%"}, 2500);
			if (i < endNum) {
				if (isShow)	{ i++; currentShow = i; doSlideShow(i); } else {clearTimeout(timer); }
			} else {
				if (isShow)	{ i = 1; currentShow = i; doSlideShow(i); } else {clearTimeout(timer); }
			}
		}, delayTime)
	})(i);     
}
function check() {
	let i = 1;
	currentShow = i;
	view(i);
}
function stop() {
	isShow = false;
}
function showcontinue() {
	isShow = true;
	let i=currentShow;

	(function doSlideShow (i) {
		view(i);		
		let timer = setTimeout(function () { 
			$('.backgroundTransition').animate({"zoom": "-=50%"}, 2500);
			if (i < endNum) {
				if (isShow)	{ i++; currentShow = i; doSlideShow(i); } else {clearTimeout(timer); }
			} else {
				if (isShow)	{ i = 1; currentShow = i; doSlideShow(i); } else {clearTimeout(timer); }
			}
		}, delayTime)
	})(i);     
}

document.onkeydown = function (e) {
	e = e || window.event;
	//console.log(e.keyCode);
	if (e.keyCode == '38') {
		// up arrow
		//$('img').click();
		toggleFullView();
	}
	else if (e.keyCode == '40') {
		// down arrow

	}
	else if (e.keyCode == '37') {
		// left arrow
		stop();
		currentShow--;
		view(currentShow);
		$('.backgroundTransition').animate({"zoom": "-=50%"}, 5500);
	}
	else if (e.keyCode == '39') {
	   // right arrow
		stop();
		currentShow++;
		view(currentShow);
		$('.backgroundTransition').animate({"zoom": "-=50%"}, 5500);
	}
	else if ((e.keyCode == '48') || (e.keyCode == '96')){
		//key number 0
		//$('#NumberPreview').toggle();
		$("#NumberPreview").toggleClass("display-inline");
	}
	else if ((e.keyCode == '49') || (e.keyCode == '97')) {
		//key number 1
		stop();
	}
	else if ((e.keyCode == '50') || (e.keyCode == '98')) {
		//key number 2
		showcontinue();
	}
	else if ((e.keyCode == '51') || (e.keyCode == '99')) {
		//key number 3
		show();
	}
	else if ((e.keyCode == '110') || (e.keyCode == '190')){
		//key . full stop key
		$('#ControlPanel').toggle();
	}
};
