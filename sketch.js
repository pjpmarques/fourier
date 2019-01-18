
let time = 0;
let delta = 0.02;
let radius = 0;
let wave = [];
let contour = [];
let terms = 5;

let CENTER_X = 350;
let CENTER_Y = 300;
let R = 150;

let displayShape = true;
let displayCircle = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	translate(CENTER_X, CENTER_Y);	

	let x = 0;
	let y = 0;

	for (let i=0; i<terms; i++) {
		let prevx = x;
		let prevy = y;

		let n = i*2 + 1;
		let radius = R * (4. / (n * PI));
		x+= radius * cos(n*time);
		y+= radius * sin(n*time);

		if (displayCircle) {
			stroke(100);
			noFill();
			ellipse(prevx, prevy, radius*2);

			fill(255, 255, 0);
			stroke(255, 255, 0);
			line(prevx, prevy, x, y);
			ellipse(x, y, 4);
		}
	}

	wave.unshift(y); 
	contour.unshift([x, y]);

	stroke(0);
	fill(255);	
	let wherePoint = 'p = (' + round(x) + ', ' + round(-y) + ')';
	let angle = 'θ = ' + (Math.atan2(y, -x) * 180 / Math.PI + 180).toFixed(0) + ' degrees';
	let nTerms = 'terms = ' + terms;
	text(wherePoint, -CENTER_X + 15, -CENTER_Y + 15);
	text(angle, -CENTER_X + 15, -CENTER_Y + 35);
	text(nTerms, -CENTER_X + 15, -CENTER_Y + 55);
	
	translate(CENTER_X, 0);	
	ellipse(x - CENTER_X, y, 4);
	ellipse(0, wave[0], 4);

	stroke(255);
	if (displayCircle)		
		line(x - CENTER_X, y, 0, wave[0]);

	beginShape();
	noFill();
	for (let i=0; i<wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();

	if (displayShape) {
		stroke(0, 128, 0);
		translate(-CENTER_X, 0);
		beginShape();
		noFill();
		for (let i=0; i<contour.length; i++) {
			vertex(contour[i][0], contour[i][1]);
		}
		endShape();
	}

	if (wave.length > 800) {
		wave.pop();
	}
	if (contour.length > 800) {
		contour.pop();
	}

	time-= delta;
}

function keyTyped(event) {
	function resetShapes() {
		contour = [];
		wave = [];
	}
	
	if (event.key == 's') {
		displayShape = !displayShape;
		if (displayShape) {
			contour = []
		}
	} else if (event.key == 'c') {
		displayCircle = !displayCircle;
	} else if (event.key == '-') {
		if (terms > 1) {
			--terms;
			resetShapes();
		}
	} else if ((event.key == '+') || (event.key == '=')) {
		++terms;
		resetShapes();
	} 
}
