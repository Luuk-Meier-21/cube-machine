class Cube {
    constructor(c, r, z, newSideLength = sideLength) {
      this.c = c;
      this.r = r;
      this.z = z;
      this.startX = gridTopX;
      this.startY = gridTopY;
      this.sideLength = newSideLength;
      this.scale = 1;
      this.h = 1;
      this.red = 255;
      this.green = 255;
      this.blue = 255;
      this.shadowLight = .5;
      this.shadowDark = .75;
      this.selected = false;
    }

    superToggleSelection() {
      this.selected = !this.selected;
      this.toggleSelection(this.selected);
    }

    toggleSelection(value) {
      console.log("default")
    }
  
    getPos() {
      const x = this.startX + (this.c - this.r) * this.sideLength * sqrt(3) / 2;
      const y = this.startY + (this.c + this.r) * this.sideLength / 2 - (this.sideLength * this.z);
      return [x, y];
    }

    onClick() {
      let [x, y] = this.getPos();
      let distance = dist(x, y, mouseX, mouseY);
      if (distance < this.sideLength * 0.875) {
        this.superToggleSelection();
      }
    }

    drawCube() {
      if (this.selected) {
        this.green = 10;
      } else {
        this.green = 255;
      }

      this.draw();
    }
  
    draw() {
      push();
      let [x, y] = this.getPos();
  
      const points = [];
      for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
        points.push(
          createVector(cos(angle) * this.sideLength, sin(angle) * this.sideLength)
          );
      }
      
      fill(this.red * this.shadowLight, this.green * this.shadowLight, this.blue * this.shadowLight);
      translate(x, y);
      scale(this.scale);
      quad(
        0, 0,
        points[5].x, points[5].y,
        points[0].x, points[0].y ,
        points[1].x, points[1].y
      );
  
      fill(this.red * this.shadowDark, this.green * this.shadowDark, this.blue * this.shadowDark);
      quad(
        0, 0,
        points[1].x, points[1].y,
        points[2].x, points[2].y,
        points[3].x, points[3].y
      );
  
      fill(this.red, this.green, this.blue);
      quad(
        0, 0,
        points[3].x, points[3].y,
        points[4].x, points[4].y,
        points[5].x, points[5].y
        );
      pop();
    }
  
    getSortString() {
      return `${this.h}.${this.z}.${this.r}.${this.c}`
    }

    toCube(cubeType) {
      let newCubeC = this.c;
      let newCubeR = this.r;
      let newCubeZ = this.z;

      return new cubeType(newCubeC, newCubeR, newCubeZ);
    }

    newCubeByBrightness(brightness = 4) {
      let newCubeC = this.c;
      let newCubeR = this.r;
      let newCubeZ = this.z;

      switch (brightness) {
        case 1:
          return new SmallCube(newCubeC, newCubeR, newCubeZ);
          break;
        case 2 : 
          return new TinyCube(newCubeC, newCubeR, newCubeZ);
          break;
        case 3: 
          return new MediumCube(newCubeC, newCubeR, newCubeZ);
          break;
        case 4: 
          return new Cube(newCubeC, newCubeR, newCubeZ);
          break;
        case 5: 
          return new EmptyCube(newCubeC, newCubeR, newCubeZ);
          break;
      }
    }
}

class EmptyCube extends Cube {
  background;

  constructor(c, r, z) {
      super(c, r, z)
      this.h = 3;
      this.background = new Cube(0, 0, 0);
  }

  toggleSelection(value) {
    this.background.selected = this.selected;
  }

  draw() {
      let [x, y] = this.getPos();
      this.drawHole(x, y);
  }

  drawHole(x, y) {
      push();
      translate(x, y)
      {
        push();
        scale(-1, -1)
        this.background.drawCube();
        pop();
      }
      pop();
  }
}

class TinyCube extends Cube {
    cube;
    background;
  
    constructor(c, r, z) {
      super(c, r, z)
      this.h = 3;
      this.cube = new Cube(0, 0, 0);
      this.background = new Cube(0, 0, 0);
    }
  
    toggleSelection(value) {
      this.cube.selected = this.selected;
      this.background.selected = this.selected;
    }

    draw() {
      let [x, y] = this.getPos();
      this.drawHole(x, y);
    }
  
    drawHole(x, y) {
      push();
      translate(x, y)
      {
        push();
        scale(-1, -1)
        this.background.drawCube();
        pop();
      }
      {
        push();
        scale(.5)
        this.cube.drawCube();
        pop();
      }
      pop();
    }
}
  
class SmallCube extends Cube {
    cubes;
    background;

    constructor(c, r, z) {
        super(c, r, z)
        this.h = 3;
        const cube = new Cube(0, 0, 0);
        this.cubes = [
          addCubeFrom(cube, 0, 0, 0),
          addCubeFrom(cube, 2, 1, 0),
          addCubeFrom(cube, 1, 2, 0)
        ]
        this.background = new Cube(0, 0, 0);
    }

    toggleSelection() {
      for (let cube of this.cubes) {
        cube.selected = this.selected;
      }
      this.background.selected = this.selected;
    }

    draw() {
        let [x, y] = this.getPos();
        this.drawHole(x, y);
    }

    drawHole(x, y) {
        push();
        translate(x, y)
        {
        push();
        scale(-1, -1)
        this.background.drawCube();
        pop();
        }
        {
        push();
        scale(.5)
        translate(0, -sideLength)
        for (let cube of this.cubes) {
          cube.drawCube();
        }
        pop();
        }
        pop();
    }
}
  
class MediumCube extends Cube {
    cube;
    background;

    constructor(c, r, z) {
        super(c, r, z)
        this.h = 3;
        this.cube = new Cube(0, 0, 0);
        this.background = new Cube(0, 0, 0);
    }

    toggleSelection(value) {
      this.cube.selected = this.selected;
      this.background.selected = this.selected;
    }

    draw() {
        let [x, y] = this.getPos();
        this.drawHole(x, y);
    }

    drawHole(x, y) {
        push();
        translate(x, y)
        {
        push();
        
        this.background.drawCube();
        pop();
        }
        {
        push();
        scale(-1, -1)
        scale(.5)
        this.cube.drawCube()
        pop();
        }
        pop();
    }
}