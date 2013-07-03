var ctx;

var gap = 11;

var octave = gap * 7;

var gLow = 183;
var fLow = 376;
var canvasWidth = 600;
var canvasHeight = 400;

var scala = ['c', 'd', 'e', 'f', 'g', 'a', 'h'];

var guess = null;

function run() {
	var canvas = document.getElementById("game");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
	clean();
}

function clean() {
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	var image = new Image();
	image.src = "sheet.png";
	image.alt = "Music sheet";
	image.onload = function() {
		ctx.drawImage(image, 10, 10, canvasWidth, canvasHeight);
	}
}

function drawNote(ctx, level, note, circleColor) {
	var low = gLow;
	if (level == "g") {
		low = gLow;
	} else if (level == "f") {
		low = fLow;
	}
	var y = low - gap*note;
	var drawLine = note % 2 == 0;
	var noteLetter = getNoteLetter(level, note);
	drawCircle(ctx, {x: 200, y: y}, drawLine, circleColor);
}

function drawCircle(ctx, center, drawLine, circleColor) {

	var radius = 7;
	ctx.save();

	// circle

	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = "4";
	ctx.strokeStyle = "black";
	if (circleColor) {
		ctx.strokeStyle = circleColor;
	}
	ctx.stroke();

	// line
	if (drawLine) {
		ctx.beginPath();
		lineRadius = radius * 3;
		ctx.moveTo(center.x-lineRadius, center.y);
		ctx.lineTo(center.x+lineRadius, center.y);
		ctx.stroke();
	}

	ctx.restore();
}


var countMax = 10;
var count = 0;
var noteLetter = "s";
var note;
var level;
var correctCount = 0;
function onKeyPress(event) {

	// check current noteletter
	clean();
	var keyTyped = String.fromCharCode(event.keyCode);
	if (keyTyped == noteLetter) {
		correctCount++;
		drawCorrect(keyTyped);
	} else {
		drawWrong(keyTyped, noteLetter);
		drawNote(ctx, level, note, "red");
	}

	// draw new note;
	drawNewNote();
	count++;
	drawScore();
}

function drawNewNote() {
	level = count % 60 > countMax ? 'g' : 'f';
	note = Math.floor(13*Math.random());
	noteLetter = getNoteLetter(level, note);
	drawNote(ctx, level, note, false);
}

function drawScore() {
	ctx.save();
	ctx.font = "30px sans";
	ctx.fillText(correctCount + "/" + count, 450, 30);


	ctx.restore();
}


function getNoteLetter(level, note) {
	var start = 0;
	if (level == 'f') {
		start = 2;
	}

	var noteLetterNumber = start + note;

	while (noteLetterNumber >= 7) {
		noteLetterNumber -= 7;
	}
	return scala[noteLetterNumber];
}


document.ready = function() {
	run();
	document.onkeypress = onKeyPress;
	drawNewNote();
	drawScore();
	correct = document.getElementById("correct");
	wrong = document.getElementById("wrong");
}


function drawCorrect(letter) {
	clearText();
	correct.innerHTML = letter;
}

function drawWrong(keyTyped, letter) {
	clearText();
	wrong.innerHTML =  letter + ". Ikke " + keyTyped;
}

function clearText() {
	correct.innerHTML = "";
	wrong.innerHTML = "";
}