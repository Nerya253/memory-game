
let score = 0;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const body = document.querySelector("body");
const main = document.createElement("main");
body.appendChild(main);
const header = document.createElement("header");

const p = document.createElement("p");
p.id = "score";
p.innerText = "score: 0";
header.appendChild(p);

const button = document.createElement("button");
button.id = "start";
button.innerText = "start";
button.onclick = function () {
    this.innerText = "restart";
    document.getElementById("start").style.backgroundColor = "red";
    restart()
}
header.appendChild(button);
main.appendChild(header);

const div = document.createElement("div");
div.id = "span-conteiner";
for (let i = 0; i < letters.length; i++) {
    const card = document.createElement("span");
    card.className = "card";
    div.appendChild(card);
}
main.appendChild(div);

const cards = document.querySelectorAll(".card");

let otZmani;
let randomLocation;
const twoCards = [];

function rnd() {
    for (let i = letters.length - 1; i >= 0; i--) {
        randomLocation = Math.floor(Math.random() * i + 1);
        otZmani = letters[i];
        letters[i] = letters[randomLocation];
        letters[randomLocation] = otZmani;
    }
}

function restart() {
    rnd();
    cards.forEach((card) => {
        card.addEventListener("click", clicker)
        card.innerText = "";
    });

    for (let i = 0; i < twoCards.length; i++) {
        twoCards[i].innerText = "";
        twoCards.shift();
        i--;
    }

    p.innerText = "score: 0";
    score = 0;

}

function clicker() {
    if (!twoCards.includes(this)) {
        if (twoCards.length !== 2) {

            cards.forEach((card, i) => {
                if (this === card) {
                    this.innerText = letters[i];   //לתקן id, לא יורד ציון 
                    twoCards.unshift(this);
                }
            });
        }
        console.log("אורך:", twoCards.length);
        if (twoCards.length === 2) {
            if (twoCards.includes(this)) {
                if (twoCards[0].innerText === twoCards[1].innerText) {
                    clearArrey();

                    score++;
                    p.innerText = "score: " + score;

                    if (score >= letters.length / 2) {
                        winFunc()
                    }
                }
                else {
                    setTimeout(function () {
                        for (let i = 0; i < twoCards.length; i++) {
                            twoCards[i].innerText = "";
                            twoCards.shift();
                            i--;
                        }
                    }, 1000)
                }
            }
        }
    }
}

function clearArrey() {
    for (let i = 0; i < twoCards.length; i++) {
        twoCards[i].removeEventListener("click", clicker);
    }

    while (twoCards.length > 0) {
        twoCards.shift();
    }
}

const win = document.createElement("div");
win.id = "win";
const divMessage = document.createElement("div");
divMessage.id = "divMessage";
const winMessage = document.createElement("h1");
const ExitMessage = document.createElement("p");

function winFunc() {
    win.style.display = "flex";
    winMessage.innerText = "YOU WIN!";
    ExitMessage.innerText = "Click to restart game";
    divMessage.appendChild(winMessage);
    divMessage.appendChild(ExitMessage);
    win.appendChild(divMessage);
    main.appendChild(win);

    win.addEventListener('click', () => {
        win.style.display = 'none';
        restart();
    });
}






