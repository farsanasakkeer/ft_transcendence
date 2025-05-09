import { submitMatch } from "../gameResult";

export function startXOGame() {
  const board = Array(9).fill("");
  let currentPlayer = "X";
  let gameOver = false;
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const cells = document.querySelectorAll(".xo-cell");
  const status = document.getElementById("xo-status")!;
  const restartBtn = document.getElementById("xo-restart")!;

  function checkWinner() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes("")) return "draw";
    return null;
  }

  function updateBoard() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  }

  function handleClick(i: number) {
    if (board[i] || gameOver) return;
    board[i] = currentPlayer;
    updateBoard();
    const result = checkWinner();
    if (result) {
      gameOver = true;
      status.textContent = result === "draw"
        ? "🤝 It's a draw!"
        : (result === "X" ? "❌ Player wins!" : "⭕ Guest wins!");

      submitMatch(
        result === "X" ? 1 : 0,
        result === "O" ? 1 : 0,
        "xo"
      );
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => handleClick(i));
  });

  restartBtn.addEventListener("click", () => {
    for (let i = 0; i < 9; i++) board[i] = "";
    currentPlayer = "X";
    gameOver = false;
    updateBoard();
    status.textContent = "";
  });
}
