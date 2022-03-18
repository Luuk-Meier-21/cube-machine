function rotateCenter(w, h, rotation) {
  translate(w / 2, h / 2);
  rotate(radians(rotation));
  translate(-w / 2, -h / 2);
}

function fromCenter(w, h, onCenter) {
  translate(w / 2, h / 2);
  onCenter();
  translate(-w / 2, -h / 2);
}


// for json.js
class Counter {
  i;
  max;

  constructor(initialIndex, max) {
    this.i = initialIndex;
    this.max = max;
  }

  update() {
    if (this.i < this.max - 1) {
      this.i++;
    } else {
      this.i = 0;
    }
  }
}


function Pos(x, y) {
	this.x = x;
	this.y = y;
}

function Size(w, h) {
	this.w = w;
	this.h = h;
}

function Drawing(w, h) {
	let size = new Size(w, h);
	let pos = new Pos(40, 50);
	this.px = mouseX;
	this.py = mouseY;

	this.addPoint = function(x, y, img) {
		let d = dist(this.px, this.py, mouseX, mouseY);
		for (var i = 0; i <= d; i++) {
			var nx = lerp(this.px, mouseX, i/d);
			var ny = lerp(this.py, mouseY, i/d);

			image(img, nx - (size.w / 2), ny - (size.h / 2), size.w, size.h);
		}

		this.px = mouseX;
		this.py = mouseY;
	}
}

function PointRect(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.prototype.render = function() {
    
  }
}

// function Drawing() {
// 	this.positions = [];
// 	this.index = 0;
// 	this.px = mouseX;
// 	this.py = mouseY;

// 	this.addPoint = function(x, y) {
// 		let d = dist(this.px, this.py, mouseX, mouseY);

// 		for (var i = 0; i <= d; i += 10) {

// 			var nx = lerp(this.px, mouseX, i/d);
// 			var ny = lerp(this.py, mouseY, i/d);
// 			this.positions[this.index] = new Pos(nx, ny);
// 			this.index++;
// 			ellipse(nx, ny, 10, 10);
// 		}

// 		this.px = mouseX;
// 		this.py = mouseY;
// 	}

// 	this.render = function() {
// 		beginShape();
// 		for(let i = 0; i < this.positions.length; i++) {
// 			vertex(this.positions[i].x, this.positions[i].y);
// 		}
// 		endShape();
// 	}
// }