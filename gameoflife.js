canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context = canvas.getContext("2d");

sss = canvas.width<canvas.height?canvas.width:canvas.height
count = 100
size = Math.floor(sss/count)

countX = Math.floor(canvas.width / size)
countY = Math.floor(canvas.height / size)

thisField = new Array(countX);
for (i = 0; i < countX; i++) {
	thisField[i] = new Array(countY).fill(0);
}

for (i = 1; i < thisField.length - 1; i++) {
	for (j = 1; j < thisField[i].length - 1; j++) {
		if (Math.random() >= 0.25) {
			thisField[i][j] = 0;
		} else {
			thisField[i][j] = 1;
		}
	}
}

drawField(thisField)

nextField = new Array(countX);
for (i = 0; i < countX; i++) {
	nextField[i] = new Array(countY).fill(0);
}

function updateField(thisField, nextField, newLife, leftLim, rightLim) {
	for (i = 1; i < thisField.length - 1; i++) {
		for (j = 1; j < thisField[i].length - 1; j++) {
			neighbors = 0
			for (k1 = -1; k1 <= 1; k1++) {
				for (k2 = -1; k2 <= 1; k2++) {
					neighbors += thisField[i+k1][j+k2];
				}
			}
			neighbors -= thisField[i][j];
			if (neighbors == newLife) {
				nextField[i][j] = 1;
			} else if ((leftLim <= neighbors) && (neighbors <= rightLim)) {
				nextField[i][j] = thisField[i][j];
			} else {
				nextField[i][j] = 0;
			}
		}
	}
	for (i = 0; i < thisField.length ; i++) {
		for (j = 0; j < thisField[i].length; j++) {
			thisField[i][j] = nextField[i][j];
			nextField[i][j] = 0;
		}
	}
}

function drawField(thisField, colorFill="#000000") {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = colorFill;
	for (i = 0; i < thisField.length; i++) {
		for (j = 0; j < thisField[i].length; j++) {
			if (thisField[i][j]) {
				context.fillRect(i*size, j*size, size, size);
			}
		}
	}
}

function startGameOfLife() {
	document.getElementById('canvas').style["z-index"] = 0;
	drawField(thisField, "#002FA7");
	setInterval(function(){
		updateField(thisField, nextField, 3, 2, 3);
		drawField(thisField, "#002FA7");
	}, 100)
}