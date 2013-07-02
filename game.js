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

function drawNote(ctx, level, note, red) {
	var low = gLow;
	if (level == "g") {
		low = gLow;
	} else if (level == "f") {
		low = fLow;
	}
	var y = low - gap*note;
	var drawLine = note % 2 == 0;
	var noteLetter = getNoteLetter(level, note);
	drawCircle(ctx, {x: 200, y: y}, drawLine, red);
}

function drawCircle(ctx, center, drawLine, red) {

	var radius = 7;
	ctx.save();

	// circle

	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = "4";
	ctx.strokeStyle = "black";
	if (red) {
		ctx.strokeStyle = "red"
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


var countMax = 30;
var count = 0;
var noteLetter = "s";
var note;
var level;
function onKeyPress(event) {

	// check current noteletter
	clean();
	var keyTyped = String.fromCharCode(event.keyCode);
	if (keyTyped == noteLetter) {
		drawCorrect(keyTyped);
	} else {
		drawWrong(keyTyped, noteLetter);
		drawNote(ctx, level, note, true);
	}

	// draw new note;
	drawNewNote();
}

function drawNewNote() {
	level = count > countMax ? 'f' : 'g';
	note = Math.floor(13*Math.random());
	noteLetter = getNoteLetter(level, note);
	drawNote(ctx, level, note, false);
	count++;
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
	correct = document.getElementById("correct");
	wrong = document.getElementById("wrong");
}


function drawCorrect(letter) {
	clearText();
	correct.innerHTML = letter;
}

function drawWrong(keyTyped, letter) {
	clearText();
	wrong.innerHTML = "Feil: " + keyTyped + " er ikke " + letter;
}

function clearText() {
	correct.innerHTML = "";
	wrong.innerHTML = "";
}