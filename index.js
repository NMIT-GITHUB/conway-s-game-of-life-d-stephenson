// Game of Life

// const arr = [
//     [0, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 0],
// ];

// console.log(Array.isArray(gameGrid))
// console.log(gameGrid.length)

// for (let i = 0; i < gameGrid.length; i++) {
//     for (let j = 0; j < gameGrid[i].length; j++) {    
//         console.log(gameGrid[i][j]); 
//     }
// }
// let input = [
//     [0, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 0],
// ];
// function gameLife(input) {
//     let arr=input;
//     let count=0;
//     for(let i=0; i<arr[i].length; i++) 
//     {
//         for(let j=0; j<[i][j].length; j++) {
//             if(arr[i][j]===arr[i+1][j])
//             count++;
//             if(arr[i][j]===arr[i-1][j])
//             count++;
//             if(arr[i][j]===arr[i][j+1])
//             count++;
//             if(arr[i][j]===arr[i+1][j-1])
//             count++;
//         }
//     }
//     if(count==2 || count==3)
//     return 'survive';
//     else
//     return 'die';
// }
// console.log(gameLife(input));


function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 10;
  
  function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2));
      }
    }
  }
  
  function draw() {
    background(0);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  
    let next = make2DArray(cols, rows);
  
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
  
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
  
    grid = next;
  }
  
  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }