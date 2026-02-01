const paragraphs = {
  easy: [
  "Typing practice is important for improving speed. Start with simple sentences and focus on accuracy. Make it a daily habit. Soon you will notice your improvement.",
  "Practicing typing every day helps you type faster. Accuracy is more important than speed at first. Take your time. Your fingers will get faster gradually.",
  "Easy typing exercises help beginners gain confidence. Focus on common words. Try to avoid mistakes. Gradually, your speed will increase.",
  "Typing simple sentences improves muscle memory. Do not rush while learning. Accuracy is key. Keep practicing regularly to build speed.",
  "Daily typing practice strengthens your skills. Start slow and steady. Check your mistakes carefully. With time, you will type effortlessly."
],
  medium: [
  "Typing fast requires concentration and regular practice. Accuracy should never be ignored. Focus on rhythm and consistency. Challenge yourself with longer sentences.",
  "Medium level typing involves tricky words and punctuation. It improves your typing endurance. Try to maintain speed without making errors. Regular practice is essential.",
  "Consistent practice boosts typing speed at medium difficulty. Pay attention to letter placement. Avoid looking at the keyboard. Typing will gradually become automatic.",
  "Typing sentences with moderate difficulty enhances focus. Watch out for commonly confused letters. Maintain a steady pace. The goal is speed with accuracy.",
  "Intermediate typing tests include longer words and punctuation. Accuracy remains important at this stage. Time yourself and track improvement. Practice builds proficiency."
],
  hard: [
  "Advanced typing tests include complex sentences and punctuation. Accuracy and speed must be balanced. Focus on maintaining rhythm while typing. Avoid unnecessary mistakes. Long and tricky words appear frequently. Concentration is the key to success.",
  "Professional typing exercises challenge your reflexes and attention. Keep a consistent pace. Punctuation marks should be precise. Errors reduce overall WPM. Use all fingers correctly. Daily practice is necessary to master hard texts.",
  "Hard level paragraphs require high focus and fast typing. Include uncommon words to improve skill. Punctuation and capitalization matter. Typing with proper finger placement is essential. Avoid looking at the keyboard. Speed and accuracy together define mastery.",
  "Complex typing tasks improve both speed and accuracy. Long sentences test your endurance. Words with difficult spellings appear often. Mistakes should be minimized. Timing each test helps track progress. Regular practice strengthens skill.",
  "Typing at an advanced level involves multiple challenges. Punctuation, capitalization, and spacing are crucial. Speed should be steady without errors. Tricky words appear frequently. Focused practice builds muscle memory. Achieving mastery requires dedication and patience."
]

};

const textDiv = document.getElementById("text");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("start");
const levelSelect = document.getElementById("level");
const refreshBtn = document.getElementById("refresh");

const resultDiv = document.getElementById("result");
const finalWPM = document.getElementById("finalWPM");
const finalAccuracy = document.getElementById("finalAccuracy");
const errorsEl = document.getElementById("errors");

let timer;
let time = 60;
let started = false;
let currentText = "";
let startTime;
let endTime;

// Random paragraph load function
function loadText() {
  const level = levelSelect.value;
  const options = paragraphs[level];
  const randomIndex = Math.floor(Math.random() * options.length);
  currentText = options[randomIndex];
  textDiv.innerHTML = currentText;
}

// Initial load
loadText();

// Refresh paragraph button
refreshBtn.addEventListener("click", () => {
  loadText();
  input.value = "";
  wpmEl.innerText = 0;
  accuracyEl.innerText = 0;
  resultDiv.style.display = "none";
});

// Change level
levelSelect.addEventListener("change", () => {
  loadText();
  input.value = "";
  wpmEl.innerText = 0;
  accuracyEl.innerText = 0;
  resultDiv.style.display = "none";
});

// Start / Stop button
startBtn.addEventListener("click", () => {
  if (!started) {
    startBtn.innerText = "Stop";
    input.disabled = false;
    input.value = "";
    input.focus();
    time = 60;
    timeEl.innerText = time;
    wpmEl.innerText = 0;
    accuracyEl.innerText = 0;
    resultDiv.style.display = "none";
    started = true;
    startTime = new Date();

    timer = setInterval(() => {
      time--;
      timeEl.innerText = time;
      if (time <= 0) stopTest();
    }, 1000);
  } else {
    stopTest();
  }
});

// Stop Test
function stopTest() {
  clearInterval(timer);
  input.disabled = true;
  started = false;
  startBtn.innerText = "Start";
  endTime = new Date();
  calculateResult();
}

// Live typing
input.addEventListener("input", () => {
  if (!started) return;

  const typed = input.value;
  const wordsTyped = typed.trim().split(/\s+/).filter(w => w!=="").length;
  wpmEl.innerText = wordsTyped;

  let correctChars = 0;
  let displayText = "";

  for (let i = 0; i < currentText.length; i++) {
    if (typed[i] == null) displayText += currentText[i];
    else if (typed[i] === currentText[i]) {
      displayText += currentText[i];
      correctChars++;
    } else displayText += `<span class="highlight">${currentText[i]}</span>`;
  }
  textDiv.innerHTML = displayText;

  const accuracy = typed.length === 0 ? 0 : (correctChars / typed.length) * 100;
  accuracyEl.innerText = accuracy.toFixed(0);
});

// Calculate final result
function calculateResult() {
  const typed = input.value.trim();
  const wordsTyped = typed.split(/\s+/).filter(w => w!=="").length;

  let correctChars = 0;
  let errors = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentText[i]) correctChars++;
    else errors++;
  }

  const accuracy = typed.length === 0 ? 0 : (correctChars / typed.length) * 100;
  const timeTaken = ((endTime || new Date()) - startTime) / 1000;
  const wpm = (wordsTyped / timeTaken) * 60;

  finalWPM.innerText = `${wordsTyped} words in ${timeTaken.toFixed(1)} seconds → WPM: ${wpm.toFixed(1)}`;
  finalAccuracy.innerText = accuracy.toFixed(0);
  errorsEl.innerText = errors;

  resultDiv.style.display = "block";
}
