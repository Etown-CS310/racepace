//board
let board;
let boardWidth = 750;
let boardHeight = 250; // corrected the typo here
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight; // now uses the correct boardHeight
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//obstacle
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); // used for drawing on the board

    // draw initial dinosaur
    dinoImg = new Image();
    dinoImg.src = "Images/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "/Images/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "/Images/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "/Images/cactus3.png";

    requestAnimationFrame(update); // this function will call the update function 60 times per second
    setInterval(placeCactus, 1000); // this function will call the placeCactus function every second
    document.addEventListener("keydown", moveDino);
}

function update() {
    if (gameOver) {
        return;
    }
    requestAnimationFrame(update);

    context.clearRect(0, 0, boardWidth, boardHeight);

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground level
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "Images/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //score
    context.fillStyle="black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e){
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        //jump
        velocityY = -10;
    }
}

function placeCactus() {
    if (gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random(); //0 - 0.9999...

    if (placeCactusChance > .90) { //10% you get cactus 3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) { //30% chance you get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }

    else if (placeCactusChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return  a.x < b.x + b.width &&      //a's top left corner doesn't reach b's top right corner
            a.x > + a.width > b.x &&    //a's top right corner passes b's top left corner
            a.y < b.y + b.height &&     //a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y;       //a's bottom left corner passes b's top left corner
}
