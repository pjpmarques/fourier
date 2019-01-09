
let time = 0;
let radius = 0;
let wave = [];
let harmonics; 

let CENTER_X = 300;
let CENTER_Y = 200;
let R = 150;

function setup() {
	createCanvas(windowWidth, windowHeight-100);
	harmonics = createSlider(1, 20, 5);
}

function draw() {
	background(0);
	translate(CENTER_X, CENTER_Y);	

	let x = 0;
	let y = 0;

	for (let i=0; i<harmonics.value(); i++) {
		let prevx = x;
		let prevy = y;

		let n = i*2 + 1;
		let radius = R * (4. / (n * PI));
		x+= radius * cos(n*time);
		y+= radius * sin(n*time);

		stroke(100);
		noFill();
		ellipse(prevx, prevy, radius*2);

		fill(255, 255, 0);
		stroke(255, 255, 0);
		line(prevx, prevy, x, y);
		ellipse(x, y, 4);
	}

	wave.unshift(y); 

	stroke(0);
	fill(255);
	let txt = '(' + round(x + CENTER_X) + ', ' + round(y + CENTER_X) + ')';
	text(txt, -CENTER_X + 15, -CENTER_Y + 15);

	stroke(255);
	translate(CENTER_X, 0);	
	line(x - CENTER_X, y, 0, wave[0]);

	beginShape();
	noFill();
	for (let i=0; i<wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();

	if (wave.length > 800) {
		wave.pop();
	}

	time+= 0.02;
}
