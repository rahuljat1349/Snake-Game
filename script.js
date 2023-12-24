// Initializing Variables
let Board = document.getElementById("GameBoard");

let InputDirection = { x: 0, y: 0 };

let GameOverSound = new Audio("music/over.mp3");
let EatSound = new Audio("music/eat.mp3");
let BgMusic = new Audio("music/bg.mp3");
let MoveMusic = new Audio("music/move.mp3");

let Speed = 6;
let LastTime = 0;
let Score = 0;

let SnakeArray = [
    { x: 8, y: 5 }
];
Food = { x: 10, y: 16 };




// Functions


let main = (CurrentTime) => {
    window.requestAnimationFrame(main);
    if ((CurrentTime - LastTime) / 1000 < 1 / Speed) {
        return;
    }
    LastTime = CurrentTime;

    GameEngine();

};

let IsCollide = (Snake) => {
    for (let i = 1; i < SnakeArray.length; i++) {
        if (Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y) {
            return true;
        };
    };
    if (Snake[0].x >= 24 || Snake[0].x <= 0 || Snake[0].y >= 24 || Snake[0].y <= 0) {
        return true;
    };
};

let GameEngine = () => {
    // Updating The Snake Location & Food
    // Collision
    if (IsCollide(SnakeArray)) {
        GameOverSound.play();

        BgMusic.pause();
        SnakeArray = [{ x: 7, y: 15 }];
        Score = 0;
        InputDirection = { x: 0, y: 0 };
        alert("Game Over!")
    };

    // Moving The Snake

    for (let i = SnakeArray.length - 2; i >= 0; i--) {
        SnakeArray[i + 1] = { ...SnakeArray[i] };
    };
    SnakeArray[0].x += InputDirection.x;
    SnakeArray[0].y += InputDirection.y;

    //  Regenerating The Food and Increasing Score
    if (SnakeArray[0].x === Food.x && SnakeArray[0].y === Food.y) {
        SnakeArray.unshift({ x: SnakeArray[0].x + InputDirection.x, y: SnakeArray[0].y + InputDirection.y });
        let a = 2;
        let b = 22;
        Food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        EatSound.play();
    };

    // Display The Snake & Food
    // Display The Snake
    Board.innerHTML = "";
    SnakeArray.forEach((e, index) => {
        SnakeElement = document.createElement("div");
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            SnakeElement.classList.add("SnakeHead");
        } else {
            SnakeElement.classList.add("SnakeBody");
        }
        Board.appendChild(SnakeElement);
    });

    // Display The Food
    FoodElement = document.createElement("div");
    FoodElement.style.gridRowStart = Food.y;
    FoodElement.style.gridColumnStart = Food.x;
    FoodElement.classList.add("SnakeFood")
    Board.appendChild(FoodElement);


};

let BtnFunc = (value)=>{
    switch (value) {
        case "ArrowUp":
            MoveMusic.play();
            InputDirection.x = 0;
            InputDirection.y = -1;
            break;
        case "ArrowLeft":
            MoveMusic.play();
            InputDirection.x = -1;
            InputDirection.y = 0;
            break;
        case "ArrowRight":
            MoveMusic.play();
            InputDirection.x = 1;
            InputDirection.y = 0;
            break;
        case "ArrowDown":
            MoveMusic.play();
            InputDirection.x = 0;
            InputDirection.y = 1;
            break;
        default:
    };
};


// Main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    InputDirection = { x: 0, y: 1 };
    BgMusic.play();
    BtnFunc(e.key);          
});

let Btn = Array.from(document.getElementsByClassName("btn"));
Btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        BtnFunc(btn.id); 
    });    
});