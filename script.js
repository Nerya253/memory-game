let score = 0;

// רשימה של 15 אמוג'ים שונים (כדי ליצור 30 זוגות)
const emojiBase = ['😀', '😎', '🥳', '😡', '🥶', '🤡', '👻', '👽', '🤖', '💩', '🦄', '🐶', '🐱', '🐸', '🐵'];
// שכפול המערך פעמיים ליצירת זוגות
let gameCards = [...emojiBase, ...emojiBase];

// יצירת האלמנטים בדף
const body = document.querySelector('body');
const main = document.createElement('main');
body.appendChild(main);

const header = document.createElement('header');
const p = document.createElement('p');
p.id = 'score';
p.innerText = 'נקודות: 0';
header.appendChild(p);

const button = document.createElement('button');
button.id = 'start';
button.innerText = 'התחל משחק';
button.onclick = function () {
  this.innerText = 'ערבב מחדש';
  restart();
};
header.appendChild(button);
main.appendChild(header);

const divBoard = document.createElement('div');
divBoard.id = 'span-conteiner';
main.appendChild(divBoard);

// יצירת לוח המשחק (30 קלפים)
for (let i = 0; i < 30; i++) {
  const card = document.createElement('span');
  card.className = 'card';
  divBoard.appendChild(card);
}

const cardsElements = document.querySelectorAll('.card');
const twoCards = []; // מערך לשמירת שני הקלפים שנבחרו כרגע
let isProcessing = false; // משתנה למניעת לחיצות בזמן בדיקה

// פונקציית ערבוב (Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function restart() {
  shuffleArray(gameCards); // ערבוב האמוג'ים
  score = 0;
  p.innerText = 'נקודות: 0';

  // איפוס המערכים והלוגיקה
  twoCards.length = 0;
  isProcessing = false;

  // איפוס הויזואליות של כל הקלפים
  cardsElements.forEach((card, index) => {
    card.className = 'card'; // החזרת הקלאס לברירת מחדל (גב הקלף)
    card.innerText = gameCards[index]; // הצבת האמוג'י (מוסתר ע"י CSS)

    // הסרת האזנות ישנות והוספת חדשה כדי למנוע כפילויות
    card.onclick = null;
    card.onclick = function () {
      clicker(card);
    };
  });
}

function clicker(card) {
  // 1. אם המערכת בבדיקה, או שהקלף כבר פתוח, או שלחצנו על אותו קלף פעמיים - צא
  if (isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  // חשיפת הקלף
  card.classList.add('flipped');
  twoCards.push(card);

  // אם נבחרו 2 קלפים
  if (twoCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  isProcessing = true; // חסימת לחיצות נוספות
  const [card1, card2] = twoCards;

  // בדיקה אם האמוג'ים זהים
  if (card1.innerText === card2.innerText) {
    // התאמה נמצאה!
    score++;
    p.innerText = 'נקודות: ' + score;

    // סימון הקלפים כפתורים
    card1.classList.add('matched');
    card2.classList.add('matched');

    // איפוס המערך לשבב הבא
    twoCards.length = 0;
    isProcessing = false;

    // בדיקת ניצחון (15 זוגות)
    if (score === 15) {
      setTimeout(winFunc, 300);
    }
  } else {
    // אין התאמה - הופכים חזרה אחרי שניה
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      twoCards.length = 0;
      isProcessing = false;
    }, 1000);
  }
}

// יצירת אלמנט הניצחון (מוסתר בהתחלה)
const winDiv = document.createElement('div');
winDiv.id = 'win';
winDiv.style.display = 'none'; // הסתרה דיפולטיבית

const divMessage = document.createElement('div');
divMessage.id = 'divMessage';

const winMessage = document.createElement('h1');
winMessage.innerText = 'ניצחת! 🏆';

const exitMessage = document.createElement('p');
exitMessage.innerText = 'לחץ כאן למשחק חדש';

divMessage.appendChild(winMessage);
divMessage.appendChild(exitMessage);
winDiv.appendChild(divMessage);
body.appendChild(winDiv);

function winFunc() {
  winDiv.style.display = 'flex';

  // לחיצה על מסך הניצחון תאפס את המשחק
  winDiv.onclick = function () {
    winDiv.style.display = 'none';
    restart();
  };
}

// התחלה אוטומטית בטעינת הדף
restart();
