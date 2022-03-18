let gridTopX;
let gridTopY;
const sideLength = 20;
const cubes = [];
let columns;
let rows; 

function setup() {
  createCanvas(600, 600);
  gridTopX = 200
  gridTopY = 200;

  // Cube sizes:
  const defaultCubeWidth = sideLength * sqrt(3);
  const defaultCubeHeigth = sideLength / 2 * 3;
  
  // columns = floor(width / defaultCubeWidth);
  // rows = floor(height / defaultCubeHeigth);
  noStroke();

  if (sideLength < 10){
    console.error(`A sideLength of ${sideLength} will lag.`)
    return;
  }


  // cubes.push(new Cube(0, 0, 0));
  // addCubeInGrid(cubes[0], 1); // 1
  // addCubeInGrid(cubes[1], 1); // 2
  // addCubeInGrid(cubes[2], 1); // 3

  // addCubeInGrid(cubes[0], 2); // 4
  // addCubeInGrid(cubes[4], 1); // 5
  // addCubeInGrid(cubes[5], 1); // 6
  // addCubeInGrid(cubes[6], 1); // 7

  // addCubeInGrid(cubes[4], 3); // 8
  // addCubeInGrid(cubes[8], 1); // 9
  // addCubeInGrid(cubes[9], 1); // 10
  // addCubeInGrid(cubes[10], 1); // 11

  columns = 2
  rows = 2
  let oddRow = true;
  
  for (let y = 0; y < rows; y++) {
    oddRow = !oddRow;
    
    for (let x = 0; x < columns; x++) {
      console.log(cubes)
      if (cubes[0]) {
        const newCubePos = cubes[cubes.length - 1];
        addCubeInGrid(newCubePos);
      } else {
        addCubeInGrid()
      }
    }
    
  }
  


  // let isOdd = false;
  // for (let y = 0; y < 2; y++) {
  //   isOdd = !isOdd;
  //   console.log(rows, cubes.length)
  //   if (y == 0) {
  //     cubes.push(new Cube(0, 0, 0));
  //   } else {
  //     if (isOdd){
  //       // addCubeInGrid(cubes[0], 2);
  //     } else {
  //       // addCubeInGrid(cubes[0], 3);
  //     }
  //   }
  // }
  // const cubeRef = cubes[0];
  // for (let x = 0; x <= columns; x++) {
    
  //   const ci = cubes.length - 1;
  //   addCubeInGrid(cubes[ci], cubePos);
  //   if (x == columns) {
  //     // first iteration;
  //     // console.log(x)
  //     console.log(cubes.length)
  //     console.log(columns)
  //     // cubeRef = cubes[0];
  //     // on last iteration;
  //   } else {

  //   }
  // }

  // Sort so the cubes are drawn in the right order
  cubes.sort((a, b) => {
    return a.getSortString().localeCompare(b.getSortString());
  });
}

// function keyPressed() {
//   if (cubes.length > 1) {
//     rCube = cubes.pop();
//   }
// }

function draw() {
  background(120);
  // translate(200, 200)
  for (const cube of cubes) {
    cube.draw();
  }
}

function addCubeInGrid(cube = undefined, pos = 1) {
  if (cube === undefined) {
    cubes.push(new Cube(0, 0, 0));
    return;
  }

  let newCubeC = cube.c;
  let newCubeR = cube.r;
  let newCubeZ = cube.z;

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

  cubes.push(new Cube(newCubeC, newCubeR, newCubeZ));
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

  constructor(c, r, z) {
    this.c = c;
    this.r = r;
    this.z = z;
    this.startX = gridTopX;
    this.startY = gridTopY;
    this.sideLength = sideLength;
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