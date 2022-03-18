let gridTopX;
let gridTopY;
const sideLength = 20;
let cubes;
let largeCubes;
let columns;
let rows; 
let img;

function preload() {
  img = loadImage("data/globe.png");
}

function setup() {
  createCanvas(600, 600, SVG);
  img.resize(width + 10, height + 0)
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

  columns = floor(width / defaultCubeWidth) + 2;
  rows = floor(height / defaultCubeHeigth) + 2;
  cubes = new Array(rows * columns);

  let oddRow = true;
  let c;
  let r = 0;
  for (let i = 0; i < cubes.length; i++) {
    // Fake looping over columns and rows:
    if (c < columns) {
      c++;
    } else {
      c = 1;
      r++;
      oddRow = !oddRow;
    }
    if (cubes[0]) {
      // First cube available:
      if (c == 1 && r > 1) {
        // First in row:
        const prevFirstCube = cubes[i - columns];
        if (oddRow) {
          cubes[i] = addCubeInGrid(prevFirstCube, 3);
        } else {
          cubes[i] = addCubeInGrid(prevFirstCube, 2);
        }

      } else {
        // Other than first in row:
        const prevCube = cubes[i - 1];
        cubes[i] = addCubeInGrid(prevCube);
      }

    } else {
      // Init first cube;
      cubes[0] = addCubeInGrid();
    }
  }

  cubes.map((value, index) => {
    // value.green = 20;
    const r = random(1);
    
    const [x, y] = value.getPos();
    let cubeColor = img.get(x, y);
    let cubeBrightness = map(brightness(cubeColor), 0, 255, 0, 700, true);

    if (r > .6) {
      cubes[index] = cubes[index].toCube(EmptyCube)
    }

    if (cubeBrightness < 70) {
      cubes[index] = cubes[index].toCube(SmallCube)
    } else if (cubeBrightness < 100) {
      cubes[index] = cubes[index].toCube(TinyCube)
    } else {
      // cubes[index] = cubes[index].newCubeByBrightness(4);
    }
  })

  // cubes[100] = cubes[100].newCubeByBrightness(0);


  // cubes[20] = addBigCubeTo(cubes[20]);

  // Sort so the cubes are drawn in the right order
  cubes.sort((a, b) => {
    return a.getSortString().localeCompare(b.getSortString());
  });
}

function draw() {
  background(120);
  // translate(200, 200)
  for (let i = 0; i < cubes.length; i++) {
    if (cubes[i]) {
      cubes[i].drawCube();
    } else {
      // console.error(`No cube found on position (${x},${y})`)
    }
  }
  // FOR DEBUG:
  // image(img)
}

function mousePressed() {
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].onClick();
  }
}

function keyPressed() {
  if (key > 0 && key < 6 ) {
    for (let i = 0; i < cubes.length; i++) {
      if (cubes[i].selected) {
        const keyNumber = parseInt(key, 10);
        cubes[i] = cubes[i].newCubeByBrightness(keyNumber);
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

function addCubeFrom(cube, c = 0, r = 0, z = 0) {
  if (c < 0 || r < 0 || z < 0) {
    console.log("No value given")
    return;
  }

  let newCubeC = cube.c;
  let newCubeR = cube.r;
  let newCubeZ = cube.z;

  newCubeC += c;
  newCubeR += r;
  newCubeZ += z;

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



