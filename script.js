document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  let grid = Array(9)
    .fill()
    .map(() => Array(9).fill(null));

  function createBoard() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.tabIndex = 0;
        cell.addEventListener("click", () => cell.focus());
        cell.addEventListener("keydown", (event) =>
          enterNumber(event, cell, row, col)
        );
        board.appendChild(cell);
      }
    }
  }

  function enterNumber(event, cell, row, col) {
    const number = event.key;
    if (number >= 1 && number <= 9 && Number.isInteger(parseFloat(number))) {
      if (isValid(grid, row, col, parseInt(number))) {
        cell.textContent = number;
        grid[row][col] = parseInt(number);
      } else {
        alert(
          "Liczba już występuje w tym samym rzędzie, kolumnie lub kwadracie!"
        );
        event.preventDefault();
      }
    } else if (number === "Backspace" || number === "Delete") {
      cell.textContent = "";
      grid[row][col] = null;
    }
  }

  function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  }

  function solve(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) {
                return true;
              }
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function countNumbers(board) {
    let count = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== null) {
          count++;
        }
      }
    }
    return count;
  }

  function solveSudoku() {
    if (countNumbers(grid) <= 22) {
      alert("Nie można rozwiązać Sudoku!");
      return;
    }
    if (solve(grid)) {
      alert("Sudoku rozwiązane!");
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = document.querySelector(
            `.cell[data-row='${row}'][data-col='${col}']`
          );
          cell.textContent = grid[row][col];
        }
      }
    } else {
      alert("Error :<");
    }
  }

  function resetBoard() {
    grid = Array(9)
      .fill()
      .map(() => Array(9).fill(null));
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }

  window.solveSudoku = solveSudoku;
  window.resetBoard = resetBoard;

  createBoard();
});
