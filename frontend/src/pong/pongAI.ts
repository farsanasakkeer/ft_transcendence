import { submitMatch } from "../gameResult";

export function startPongAI() {
  const canvas = document.getElementById("pongCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = 480;
  canvas.height = 270;

  const BALL_SPEED = 3;
  const BALL_RADIUS = 6;
  const PADDLE_SPEED = 4;
  const PADDLE_WIDTH = 6;
  const PADDLE_HEIGHT = 48;

  let playerScore = 0;
  let guestScore = 0;
  const winningScore = 5;
  let gameOver = false;
  let animationId: number;
  let isPaused = false;

  const keys = { w: false, s: false };

  class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number = 0;
    color: string;

    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.width = PADDLE_WIDTH;
      this.height = PADDLE_HEIGHT;
      this.color = color;
    }

    moveUp() { this.speed = -PADDLE_SPEED; }
    moveDown() { this.speed = PADDLE_SPEED; }
    stop() { this.speed = 0; }

    update() {
      this.y += this.speed;
      this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    center() { return this.y + this.height / 2; }
  }

  class Ball {
    x = canvas.width / 2;
    y = canvas.height / 2;
    radius = BALL_RADIUS;
    speedX = BALL_SPEED;
    speedY = BALL_SPEED;
    color = "#facc15";

    reset(direction = 1) {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
      this.speedX = direction * BALL_SPEED * Math.cos(angle);
      this.speedY = BALL_SPEED * Math.sin(angle);
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.speedY *= -1;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  const player = new Paddle(0, canvas.height / 2 - PADDLE_HEIGHT / 2, "#60a5fa");
  const ai = new Paddle(canvas.width - PADDLE_WIDTH, canvas.height / 2 - PADDLE_HEIGHT / 2, "#f87171");
  const ball = new Ball();
  ball.reset();

  function updateScoreUI() {
    const p1 = document.getElementById("scorePlayer");
    const p2 = document.getElementById("scoreGuest");
    if (p1) p1.textContent = playerScore.toString();
    if (p2) p2.textContent = guestScore.toString();
  }

  function predictBallY() {
    let x = ball.x;
    let y = ball.y;
    let dx = ball.speedX;
    let dy = ball.speedY;
    while (x < canvas.width - PADDLE_WIDTH && x > PADDLE_WIDTH) {
      x += dx;
      y += dy;
      if (y <= 0 || y >= canvas.height) dy = -dy;
    }
    return y;
  }

  function handleCollisions() {
    if (ball.x - ball.radius <= player.x + player.width && ball.y >= player.y && ball.y <= player.y + player.height) {
      ball.speedX *= -1;
      const offset = (ball.y - player.center()) / (player.height / 2);
      ball.speedY = BALL_SPEED * offset;
    }
    if (ball.x + ball.radius >= ai.x && ball.y >= ai.y && ball.y <= ai.y + ai.height) {
      ball.speedX *= -1;
      const offset = (ball.y - ai.center()) / (ai.height / 2);
      ball.speedY = BALL_SPEED * offset;
    }
    if (ball.x < 0) {
      guestScore++;
      updateScoreUI();
      ball.reset(-1);
    }
    if (ball.x > canvas.width) {
      playerScore++;
      updateScoreUI();
      ball.reset(1);
    }
    if ((playerScore === winningScore || guestScore === winningScore) && !gameOver) {
      gameOver = true;
      submitMatch(playerScore, guestScore, "pong-ai");
      const overlay = document.getElementById("gameOverlay")!;
      const msg = document.getElementById("gameOverMessage")!;
      overlay.classList.remove("hidden");
      msg.textContent = playerScore > guestScore ? "🏆 Victory! You Beat the AI!" : "🤖 Game Over! AI Wins!";

      document.getElementById("replayBtn")?.addEventListener("click", () => {
        playerScore = 0;
        guestScore = 0;
        updateScoreUI();
        gameOver = false;
        overlay.classList.add("hidden");
        ball.reset();
      });
      document.getElementById("dashboardBtn")?.addEventListener("click", () => {
        window.route("/dashboard");
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    ai.draw();
    ball.draw();
  }

  function update() {
    if (gameOver) return;
    player.update();
    ai.update();
    ball.update();
    const targetY = predictBallY();
    if (ai.center() < targetY - 10) ai.moveDown();
    else if (ai.center() > targetY + 10) ai.moveUp();
    else ai.stop();
    handleCollisions();
  }

  function loop() {
    if (!isPaused && !gameOver) {
      update();
      draw();
    }
    animationId = requestAnimationFrame(loop);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "w") keys.w = true;
    if (e.key === "s") keys.s = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "w") keys.w = false;
    if (e.key === "s") keys.s = false;
  });

  function controlPlayer() {
    if (keys.w) player.moveUp();
    else if (keys.s) player.moveDown();
    else player.stop();
    requestAnimationFrame(controlPlayer);
  }

  const originalRoute = window.route;
  window.route = (path: string) => {
    cancelAnimationFrame(animationId);
    gameOver = true;
    originalRoute(path);
  };

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationId);
    gameOver = true;
  });

  document.getElementById("pauseBtn")?.addEventListener("click", () => {
    isPaused = !isPaused;
    const btn = document.getElementById("pauseBtn")!;
    btn.textContent = isPaused ? "▶️ Resume" : "⏸️ Pause";
  });
  

  updateScoreUI();
  controlPlayer();
  loop();
}