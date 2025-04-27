const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement | null;
if (!canvas) {
  console.error('Canvas not found!');
} else {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Canvas context could not be found");
    return;
  }

  const paddleWidth = 10;
  const paddleHeight = 100;
  let paddle1Y = (canvas.height - paddleHeight) / 2;
  let paddle2Y = (canvas.height - paddleHeight) / 2;
  let paddle1Speed = 0;
  let paddle2Speed = 0;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 4;
  let ballSpeedY = 4;
  const ballRadius = 10;

  function drawPaddles() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth - 10, paddle2Y, paddleWidth, paddleHeight);
  }

  function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < ballRadius + paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width - ballRadius - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
    }

    if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
      ballSpeedY = -ballSpeedY;
    }
  }

  function moveEverything() {
    paddle1Y += paddle1Speed;
    paddle2Y += paddle2Speed;

    if (paddle1Y < 0) paddle1Y = 0;
    if (paddle1Y + paddleHeight > canvas.height) paddle1Y = canvas.height - paddleHeight;
    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y + paddleHeight > canvas.height) paddle2Y = canvas.height - paddleHeight;
  }

  function gameLoop() {
    moveEverything();
    drawBall();
    setTimeout(gameLoop, 1000 / 60);
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (e.key == 'w') {
      paddle1Speed = -6;
    } else if (e.key == 's') {
      paddle1Speed = 6;
    }
    if (e.key == 'ArrowUp') {
      paddle2Speed = -6;
    } else if (e.key == 'ArrowDown') {
      paddle2Speed = 6;
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (e.key == 'w' || e.key == 's') {
      paddle1Speed = 0;
    }
    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      paddle2Speed = 0;
    }
  }

  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  gameLoop();
}
