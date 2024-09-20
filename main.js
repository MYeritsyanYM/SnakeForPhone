let body = document.body
const board = document.getElementById("game-bord");
const text = document.getElementById("text");
const logo = document.getElementById("logo");

const text1 = document.getElementById("text1");
const logo1 = document.getElementById("logo1");

text1.style.display = "none";
logo1.style.display = "none";

const snakeMove = document.getElementsByClassName("snake");
const score = document.getElementById("score");


const highscoreText = document.getElementById('Highscore');
const snakeHead = document.createElement('img');
snakeHead.setAttribute('src', 'img/px_die.png');
snakeHead.setAttribute('width', '18px');
snakeHead.setAttribute('alt', 'snake');
const foodap = document.getElementsByClassName('food')
const foodimg = document.createElement('img');
foodimg.setAttribute('src', 'img/apple_00.png');
foodimg.setAttribute('width', '22px');
foodimg.setAttribute('height', '22px');
foodimg.setAttribute('alt', 'apple');

let gridSize = 25;
let snake = [{ x: 10, y: 10 }];

let food = generateFood();
// let wall = generatewall()
// let wallCount = 3;

// console.log("llllll---->>>>>",wall);

let gameiterval;
let speed = 250;
let shead = 15;
let direction = 'right';
let isGamestarted = false;
let highscore = 0;
let gameLevel = 0;



function draw() {
    board.innerHTML = '';
    if (isGamestarted) {
        drawSnake()
        drawFood()
        // drawWall()
        scoreAdd()
    }
}



function drawSnake() {
    snake.forEach(element => {
        const snakeElement = createElement("div", 'snake');
        setPosition(snakeElement, element);
        board.appendChild(snakeElement);
    });
    snakeMove[0].appendChild(snakeHead)
}

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

//  draw()




function drawFood() {
    let foodElement = createElement("div", "food");
    setPosition(foodElement, food)
    foodElement.textContent = ""
    board.appendChild(foodElement)
    foodap[0].appendChild(foodimg)
}

function generateFood() {
    let food;
    let isOnSnake;

    do {
        isOnSnake = false;

        food = {
            x: Math.floor(Math.random() * gridSize) + 1,
            y: Math.floor(Math.random() * gridSize) + 1
        };

        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);

    return food;
}




// function drawWall() {
//     let wallElement = createElement("div", "wall");
//     setPosition(wallElement, wall)
//     wallElement.textContent = ""
//     board.appendChild(wallElement)
//     // foodap[0].appendChild(foodimg)
// }

// function generatewall() {
//     wall = [];
//     for (let i = 0; i < wallCount; i++) {
//         wall = {
//             x: Math.floor(Math.random() * gridSize) + 1,
//             y: Math.floor(Math.random() * gridSize) + 1
//         };
//     }
//     // let wall;
//     let isOnSnake;

//     do {
//         isOnSnake = false;

//         for (let i = 0; i < snake.length; i++) {
//             if (snake[i].x === wall.x && snake[i].y === wall.y) {
//                 isOnSnake = true;
//                 break;
//             }
//         }
//     } while (isOnSnake);

//     return wall;
// }

function move() {
    let head = { ...snake[0] };
    switch (direction) {
        case "up":
            head.y--
            break;
        case "down":
            head.y++
            break;
        case "left":
            head.x--
            break;
        case "right":
            head.x++
            break;
    }
    if (head.x === food.x && head.y === food.y) {

        let audio = new Audio("./sounds/eat.mp3");
        audio.play();

        food = generateFood();
        speed -= shead
        clearInterval(gameiterval)
        gameiterval = setInterval(() => {
            move();
            tie()
            draw();
        }, speed)
    }

    else {
        snake.pop();
    }

    snake.unshift(head);
}


// function startGame() {
//     let speed = 250;
//     isGamestarted = true;
//     text.style.display = "none";
//     logo.style.display = "none";

//     gameiterval = setInterval(() => {
//         move();
//         tie()
//         draw();
//     }, speed)
// }

function startGame() {
    if (isGamestarted) return;  // Если игра уже начата, ничего не делаем
    isGamestarted = true;  // Устанавливаем флаг, что игра начата

    text.style.display = "none";
    logo.style.display = "none";

    gameiterval = setInterval(() => {
        move();
        tie();
        draw();
    }, speed);
}




function hendleKeyPress(event) {
    const key = event.key;
    if ((!isGamestarted && event.code === "Space") || (!isGamestarted && event.key === '')) {
        startGame();
    } else if (event.code === "Escape" || event.key === " ") {
        resetGame()

    }
    else if (event.code === "Enter" || event.key === " ") {
        stopGame()

    }

    else if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (key === 'ArrowRight' && direction !== 'left') direction = 'right';

    else if (key === 'w' && direction !== 'down') direction = 'up';
    else if (key === 's' && direction !== 'up') direction = 'down';
    else if (key === 'a' && direction !== 'right') direction = 'left';
    else if (key === 'd' && direction !== 'left') direction = 'right';

}

document.addEventListener("keydown", hendleKeyPress)



function tie() {
    let head = { ...snake[0] };
    gameLevel = 0;
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        let audio = new Audio("./sounds/die.mp3");
        audio.play();
        resetGame()
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }
}



function getOldStyles() {
    const gameb1 = document.getElementById('game-border-1')
    const gameb2 = document.getElementById("game-border-2")
    const gameb3 = document.getElementById("game-border-3")
    body.style.backgroundColor = "#003401"
    board.style.backgroundColor = '#c3cea2'
    gameb1.style.borderColor = '#595f43';
    gameb2.style.borderColor = '#abb78a';
    gameb3.style.borderColor = '#8b966c';

    text1.style.display = "none";
    logo1.style.display = "none";
}

function resetGame() {
    stopGame()
    addHighscore()
    changeGrid(25, 25, 25)
    snake = [{ x: 10, y: 10 }];
    food = generateFood()
    direction = 'right'
    speed = 250;
    scoreAdd()
    getOldStyles()
}


function stopGame() {
    clearInterval(gameiterval);
    isGamestarted = false;
    logo.style.display = 'block'
    text.style.display = 'block'

}


function scoreAdd() {

    let currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');



    if (currentScore >= 7 && gameLevel === 0) {
        gameLevel = 1
        changeGrid(35, 35, 35)
        level1()
    }

    if (currentScore >= 15 && gameLevel === 1) {
        gameLevel = 2
        changeGrid(45, 45, 45)
        level2()
    }


    if (currentScore >= 30 && gameLevel === 2) {
        gameLevel = 3
        changeGrid(20, 20, 20)
        level3()
    }

    if (currentScore >= 60) {
        Youwin()
    }

}


function Youwin() {
    gamePause()
    logo.style.display = 'none'
    text.style.display = 'none'
    text1.style.display = "block";
    logo1.style.display = "block";

    let audio = new Audio("./sounds/win.mp3");
    audio.play();



}

function gamePause() {
    clearInterval(gameiterval);
    isGamestarted = false;
    // logo1.style.display = 'block'
    // text1.style.display = 'block'

    // logo.style.display = 'none'
    // text.style.display = 'none'
}

function addHighscore() {
    let Score = snake.length - 1;

    if (Score > highscore) {
        highscore = Score

    }
    highscoreText.textContent = highscore.toString().padStart(3, '0');
    highscoreText.style.display = 'block';

}

// gridsize large function
function changeGrid(gridSize2, rows, cols) {
    gridSize = gridSize2
    const gridElement = document.getElementById("game-bord");
    if (gridElement) {
        // gridElement.style.gridSize = gridSize2;
        gridElement.style.gridTemplateRows = `repeat(${rows}, 20px)`;
        gridElement.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    }
}

function level1() {
    speed = 200
    const gameb1 = document.getElementById('game-border-1')
    const gameb2 = document.getElementById("game-border-2")
    const gameb3 = document.getElementById("game-border-3")
    body.style.backgroundColor = "#100696";
    board.style.backgroundColor = '#2026e3';
    gameb1.style.borderColor = '#00047d';
    gameb2.style.borderColor = '#0b11ba';
    gameb3.style.borderColor = '#2e34c9';

}


function level2() {
    speed = 100
    const gameb4 = document.getElementById('game-border-1')
    const gameb5 = document.getElementById("game-border-2")
    const gameb6 = document.getElementById("game-border-3")
    body.style.backgroundColor = "#b00213";
    board.style.backgroundColor = '#d91c22';
    gameb4.style.borderColor = '#ba1a1f';
    gameb5.style.borderColor = '#a1060c';
    gameb6.style.borderColor = '#730105';
}


//when i fixed this bag :)

function level3() {
    speed = 80;
    const gameb7 = document.getElementById('game-border-1')
    const gameb8 = document.getElementById("game-border-2")
    const gameb9 = document.getElementById("game-border-3")
    body.style.backgroundColor = "red";
    board.style.backgroundColor = 'red';
    gameb7.style.borderColor = '#4a0202';
    gameb8.style.borderColor = '#ed0505';
    gameb9.style.borderColor = '#571010';
}


let audio = new Audio("./sounds/8-bit.mp3");
audio.play();

const muteButton = document.getElementById("but1");

muteButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        muteButton.textContent = "Off Music";
    } else {
        audio.pause();
        muteButton.textContent = "Play Music";
    }
});


function setDirection(newDirection) {
    if (newDirection === 'up' && direction !== 'down') direction = 'up';
    if (newDirection === 'down' && direction !== 'up') direction = 'down';
    if (newDirection === 'left' && direction !== 'right') direction = 'left';
    if (newDirection === 'right' && direction !== 'left') direction = 'right';
}


let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function(event) {
    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Свайп влево или вправо
        if (deltaX > 0 && direction !== 'left') {
            direction = 'right';
        } else if (deltaX < 0 && direction !== 'right') {
            direction = 'left';
        }
    } else {
        // Свайп вверх или вниз
        if (deltaY > 0 && direction !== 'up') {
            direction = 'down';
        } else if (deltaY < 0 && direction !== 'down') {
            direction = 'up';
        }
    }
});
