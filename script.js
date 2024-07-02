const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 7,
    dx: 0
};

const ball = {
    x: Math.random() * canvas.width,
    y: 0,
    radius: 10,
    speed: 3
};

let score = 0;

function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function moveBasket() {
    basket.x += basket.dx;

    if (basket.x < 0) {
        basket.x = 0;
    } else if (basket.x + basket.width > canvas.width) {
        basket.x = canvas.width - basket.width;
    }
}

function moveBall() {
    ball.y += ball.speed;

    if (ball.y + ball.radius > canvas.height) {
        ball.x = Math.random() * canvas.width;
        ball.y = 0;
    }

    if (
        ball.y + ball.radius > basket.y &&
        ball.x > basket.x &&
        ball.x < basket.x + basket.width
    ) {
        ball.x = Math.random() * canvas.width;
        ball.y = 0;
        score++;
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clear();

    drawBasket();
    drawBall();
    drawScore();

    moveBasket();
    moveBall();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight') {
        basket.dx = basket.speed;
    } else if (e.key === 'ArrowLeft') {
        basket.dx = -basket.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        basket.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();


