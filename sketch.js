let H = 480;
let W = 640;
let rows;
let cols;
let divs;
let currGen;
// let nextGen;
let iters = 1000;

function setup() {
    createCanvas(W, H);
    divs = 5;
    rows = H / divs;
    cols = W / divs;
    iters = 10;
    currGen = new Array(rows);
    // nextGen = new Array(rows);
    for(let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        // nextGen[i] = new Array(cols);
        for(let j = 0; j < cols; j++) {
            currGen[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);
    for(let row = 0; row < rows; row++) {
        let y = row * divs;
        for(let col = 0; col < cols; col++) {
            if(currGen[row][col] == 1) {
                let x = col * divs;
                fill(255);
                // stroke(255);
                rect(x, y, divs, divs);
            }
        }
    }

    // transfer generation
    let nextGen = new Array(rows);
    for(let i = 0; i < rows; i++) {
        nextGen[i] = new Array(cols);
        for(let j = 0; j < cols; j++) {
            nextGen[i][j] = currGen[i][j];
        }
    }
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            let neighbors = countNeighbors(row, col);
            if(currGen[row][col] == 0 && neighbors == 3) {
                nextGen[row][col] = 1;
            } else if(currGen[row][col] == 1 && (neighbors < 2 || neighbors > 3)) {
                nextGen[row][col] = 0;
            }
        }
    }
    iters--;
    // if(iters >= 1) {
        currGen = nextGen;
    // }

}

function countNeighbors(row, col) {
    let neighbors = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            neighbors+= currGen[(row+i+rows)%rows][(col+j+cols) %cols];
        }
    }
    neighbors -= currGen[row][col];
    return neighbors;
}
