let gridTopX;
let gridTopY;
const sideLength = 20;
let cubes;
let largeCubes;
let columns;
let rows; 

function setup() {
  createCanvas(600, 600);
  gridTopX = 0
  gridTopY = 0;

  // Cube sizes:
  const defaultCubeWidth = sideLength * sqrt(3);
  const defaultCubeHeigth = sideLength / 2 * 3;
  
  noStroke();

  if (sideLength < 10){
    console.error(`A sideLength of ${sideLength} will lag.`)
    return;
  }

  columns = floor(width / defaultCubeWidth) + 1;
  rows = floor(height / defaultCubeHeigth) + 1;
  cubes = new Array(rows);
  largeCubes = new Array(rows);
  for (let i = 0; i < rows; i++) {
    cubes[i] = new Array(columns);
    largeCubes[i] = new Array(columns);
  }

  let oddRow = true;
  for (let y = 0; y < rows; y++) {
    oddRow = !oddRow;
    for (let x = 0; x < columns; x++) {
      if (cubes[y][0]) {
        const lastCubePos = cubes[y][x - 1];
        cubes[y][x] = addCubeInGrid(lastCubePos);
      } else {
        // First in row:
        if (y == 0) {
          cubes[y][x] = addCubeInGrid();
        } else {
          const prevRowFirst = cubes[y - 1][0];
          if (oddRow) {
            cubes[y][x] = addCubeInGrid(prevRowFirst, 2);
          } else {
            cubes[y][x] = addCubeInGrid(prevRowFirst, 3);
          }
        }
      }
    }
  }

  // Sort so the cubes are drawn in the right order
  // cubes.sort((a, b) => {
  //   return a.getSortString().localeCompare(b.getSortString());
  // });
}

function draw() {
  background(120);
  // translate(200, 200)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (cubes[y][x]) {
        cubes[y][x].draw();
      } else {
        // console.error(`No cube found on position (${x},${y})`)
      }
    }
  }
}

function addCubeInGrid(cube = undefined, pos = 1) {
  if (cube === undefined) {
    return new Cube(0, 0, 0);
  }

  let newCubeC = cube.c;
  let newCubeR = cube.r;
  let newCubeZ = cube.z;
  let newSideLength = sideLength;

  const r = random(1);

  switch (pos) {
    case 1:
      newCubeC += 2;
      newCubeZ++;
      break;
    case 2: 
      newCubeC += 2;
      newCubeR++;
      break;
    case 3: 
      newCubeC++;
      newCubeR += 2;
      break;
  }

  // if (r < .3) {
  //   newSideLength = sideLength * 2;
  // } else if (r < .6) {
  //   newSideLength = sideLength / 2;
  // } else {
    
  // }

  return new Cube(newCubeC, newCubeR, newCubeZ);
}

function addRandomCube() {

  let cubeAdded = false;

  while (!cubeAdded) {
    const randomCube = random(cubes);
    let newCubeC = randomCube.c;
    let newCubeR = randomCube.r;
    let newCubeZ = randomCube.z;
    // let newCubeB = randomCube.B;

    const r = random(1);

    // Draw to left:
    // newCubeC+=2;
    // newCubeZ++;

    // Draw to bottom left:
    newCubeC+=2;
    newCubeR++;

    // newCubeR+=2;
    // newCubeZ+=2;
    // newCubeZ+=1;
    // if (r < .3) {
    //   newCubeC++;
    // } else if (r < .6) {
    //   newCubeR++;
    // } else {
    //   newCubeZ++;
    // }

    const spotTaken = cubes.some((cube) => {
      return cube.c == newCubeC &&
        cube.r == newCubeR &&
        cube.z == newCubeZ;
    });

    if (!spotTaken) {
      cubes.push(new Cube(newCubeC, newCubeR, newCubeZ));
      cubeAdded = true;
    }
  }
}

class Cube {

  constructor(c, r, z, _sideLength = sideLength) {
    this.c = c;
    this.r = r;
    this.z = z;
    this.startX = gridTopX;
    this.startY = gridTopY;
    this.sideLength = _sideLength;
    this.scale = 1;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }

  draw() {
    const x = this.startX + (this.c - this.r) * this.sideLength * sqrt(3) / 2;
    const y = this.startY + (this.c + this.r) * this.sideLength / 2 - (this.sideLength * this.z);

    const points = [];
    for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
      points.push(
        createVector(x + cos(angle) * this.sideLength, y + sin(angle) * this.sideLength)
        );
    }

    fill(this.red * .75, this.green * .75, this.blue * .75);
    scale(this.scale);
    quad(
      x, y,
      points[5].x, points[5].y,
      points[0].x, points[0].y ,
      points[1].x, points[1].y
    );

    fill(this.red * .9, this.green * .9, this.blue * .9);
    quad(
      x, y,
      points[1].x, points[1].y,
      points[2].x, points[2].y,
      points[3].x, points[3].y
    );

    fill(this.red, this.green, this.blue);
    quad(
      x, y,
      points[3].x, points[3].y,
      points[4].x, points[4].y,
      points[5].x, points[5].y
      );
  }

  getSortString() {
    return this.z + '.' + this.r + '.' + this.c;
  }

}