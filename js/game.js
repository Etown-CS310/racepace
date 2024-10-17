//board
let board;
let boardWidth = (window.innerWidth*0.75); // was 750
let boardHeight = (window.innerHeight*0.5); // was 250 corrected the typo here
let context;

//character
let characterWidth = 44;
let characterHeight = 47;
let characterX = 50;
let characterY = boardHeight - characterHeight; // now uses the correct boardHeight
let charcterImg;

let character = {
    x : characterX,
    y : characterY,
    width : characterWidth,
    height : characterHeight
}

//obstacle
let objectArray = [];

let cactus1Width = 17;
let cactus2Width = 35;
let cactus3Width = 51;

let cactusHeight = 35;
let cactusX = 1000; //was 700
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

    // draw initial charactersaur
    charcterImg = new Image();
    charcterImg.src = "Images/bigestMan.png";
    charcterImg.onload = function() {
        context.drawImage(charcterImg, character.x, character.y, character.width, character.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "/Images/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "/Images/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "/Images/cactus3.png";

    requestAnimationFrame(update); // this function will call the update function 60 times per second
    setInterval(placeCactus, 1000); // this function will call the placeCactus function every second
    document.addEventListener("keydown", movecharacter);
}

function update() {
    if (gameOver) {
        return;
    }
    requestAnimationFrame(update);

    context.clearRect(0, 0, boardWidth, boardHeight);

    //character
    velocityY += gravity;
    character.y = Math.min(character.y + velocityY, characterY); //apply gravity to current character.y, making sure it doesn't exceed the ground level
    context.drawImage(charcterImg, character.x, character.y, character.width, character.height);

    //cactus
    for (let i = 0; i < objectArray.length; i++) {
        let cactus = objectArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(character, cactus)) {
            gameOver = true;
            charcterImg.src = "Images/DeadMan.png";
            charcterImg.onload = function() {
                context.drawImage(charcterImg, character.x, character.y, character.width, character.height);
            }
        }
    }

    //score
    context.fillStyle="black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function movecharacter(e){
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && character.y == characterY) {
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
        objectArray.push(cactus);
    }
    else if (placeCactusChance > .70) { //30% chance you get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        objectArray.push(cactus);
    }

    else if (placeCactusChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        objectArray.push(cactus);
    }

    if (objectArray.length > 10) {
        objectArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return  a.x < b.x + b.width &&      //a's top left corner doesn't reach b's top right corner
            a.x > + a.width > b.x &&    //a's top right corner passes b's top left corner
            a.y < b.y + b.height &&     //a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y;       //a's bottom left corner passes b's top left corner
}

(function(){
    window.addEventListener("load", init);
    
 
 
    function init() {
       let back = document.getElementById("back");
       back.addEventListener("click", backfunc);
       let reload = document.getElementById("reload");
       reload.addEventListener("click", reloadfunc);
 
    }
 
    function backfunc() {
  // redirect to play
    window.location.href = 'menu.html';
    }

    function reloadfunc() {
        location.reload(true); //eventually be a reset for the canvas page
    }
     
 })();