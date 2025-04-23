import { submitMatch } from "../gameResult";

export function startPongGame() {
  const canvas = document.getElementById("pongCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const paddleWidth = 12;
  const paddleHeight = 100;
  let playerY = canvas.height / 2 - paddleHeight / 2;
  let guestY = canvas.height / 2 - paddleHeight / 2;

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 12,
    dx: 4,
    dy: 4,
  };

  let playerScore = 0;
  let guestScore = 0;
  const winningScore = 5;
  let gameOver = false;

  const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
  };

  function drawRect(x: number, y: number, w: number, h: number, color = "#60a5fa") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function drawCircle(x: number, y: number, r: number, color = "#facc15") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  function update() {
    if (gameOver) return;

    // Smooth paddle movement
    if (keys.w && playerY > 0) playerY -= 6;
    if (keys.s && playerY < canvas.height - paddleHeight) playerY += 6;
    if (keys.ArrowUp && guestY > 0) guestY -= 6;
    if (keys.ArrowDown && guestY < canvas.height - paddleHeight) guestY += 6;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height) ball.dy = -ball.dy;

    if (
      ball.x <= paddleWidth &&
      ball.y > playerY &&
      ball.y < playerY + paddleHeight
    ) {
      ball.dx = -ball.dx;
    }

    if (
      ball.x >= canvas.width - paddleWidth &&
      ball.y > guestY &&
      ball.y < guestY + paddleHeight
    ) {
      ball.dx = -ball.dx;
    }

    if (ball.x < 0) {
      guestScore++;
      updateScoreUI();
      resetBall();
    }

    if (ball.x > canvas.width) {
      playerScore++;
      updateScoreUI();
      resetBall();
    }

    if (playerScore === winningScore || guestScore === winningScore) {
      gameOver = true;
      submitMatch(playerScore, guestScore);
      endGame();
    }
  }

  function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(0, playerY, paddleWidth, paddleHeight, "#60a5fa");
    drawRect(canvas.width - paddleWidth, guestY, paddleWidth, paddleHeight, "#f87171");
    drawCircle(ball.x, ball.y, ball.size, "#facc15");
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
  }

  function updateScoreUI() {
    const p1 = document.getElementById("scorePlayer");
    const p2 = document.getElementById("scoreGuest");
    if (p1) p1.textContent = playerScore.toString();
    if (p2) p2.textContent = guestScore.toString();
  }

  function endGame() {
    const overlay = document.getElementById("gameOverlay")!;
    const msg = document.getElementById("gameOverMessage")!;
    overlay.classList.remove("hidden");
    msg.textContent = playerScore > guestScore ? "🏆 You Win!" : "👾 Guest Wins!";

    document.getElementById("replayBtn")?.addEventListener("click", () => {
      playerScore = 0;
      guestScore = 0;
      updateScoreUI();
      gameOver = false;
      overlay.classList.add("hidden");
      resetBall();
    });

    document.getElementById("dashboardBtn")?.addEventListener("click", () => {
      window.route("/dashboard");
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key as keyof typeof keys] = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key as keyof typeof keys] = false;
  });

  loop();
}
