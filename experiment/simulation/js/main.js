// Global variables to track the state
let words = [];
let selectedWords = [];
let possibleSentences = [];
let turn = 0;
let positions = [];

// Example corpus for English and Hindi
const corpus = {
  english: [
    "The quick brown fox jumps over the lazy dog",
    "Hello, how are you",
    "This is a sample sentence in English",
    "I love programming and solving problems",
    "The sun rises in the east and sets in the west",
    "She sells sea shells on the sea shore",
    "A journey of a thousand miles begins with a single step",
    "Practice makes a man perfect",
    "An apple a day keeps the doctor away",
    "Better late than never",
  ],
  hindi: [
    "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है",
    "नमस्ते आप कैसे हैं",
    "यह हिंदी में एक नमूना वाक्य है",
    "मैं प्रोग्रामिंग और समस्याओं को हल करना पसंद करता हूँ",
    "सूरज पूर्व में उगता है और पश्चिम में अस्त होता है",
    "वह समुद्र तट पर सीपियाँ बेचती है",
    "हजार मील की यात्रा एक कदम से शुरू होती है",
    "अभ्यास मनुष्य को परिपूर्ण बनाता है",
    "एक सेब रोज खाओ और डॉक्टर को दूर भगाओ",
    "देर आए दुरुस्त आए",
  ],
};

// Initialize the exercise
function initializeExercise(language) {
  if (language === "null") {
    alert("Select a language");
    return;
  }

  // Select a random sentence from the corpus
  const sentences = corpus[language];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const selectedSentence = sentences[randomIndex];

  // Split the sentence into words and shuffle them
  possibleSentences = [selectedSentence];
  words = selectedSentence.split(" ");
  shuffleArray(words);

  // Reset state
  selectedWords = [];
  positions = [];
  turn = 0;

  // Render the exercise
  renderExercise();
}

// Shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Render the exercise UI
function renderExercise() {
  const wordsContainer = document.getElementById("words_sentence");
  wordsContainer.innerHTML = "";

  // Render the shuffled words as buttons
  words.forEach((word, index) => {
    if (!positions.includes(index)) {
      const button = document.createElement("button");
      button.textContent = word;
      button.onclick = () => selectWord(word, index);
      wordsContainer.appendChild(button);
      wordsContainer.appendChild(document.createTextNode(" "));
    }
  });

  // Render the selected words
  if (selectedWords.length > 0) {
    const formedSentenceDiv = document.createElement("div");
    formedSentenceDiv.style.color = "#0000AA";
    formedSentenceDiv.innerHTML = `<b>Formed Sentence</b> (<i style="color:#0000FF">after selecting words</i>): `;
    const sentence = document.createElement("b");
    sentence.style.fontSize = "30px";
    sentence.textContent = selectedWords.join(" ");
    formedSentenceDiv.appendChild(sentence);
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(formedSentenceDiv);
  }

  // Render the "Re-form" button
  if (selectedWords.length > 0) {
    const reformButton = document.createElement("button");
    reformButton.textContent = "Re-form the sentence";
    reformButton.onclick = clearSelection;
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(reformButton);
  }

  // Render the "Check" button
  if (selectedWords.length === words.length) {
    const checkButton = document.createElement("button");
    checkButton.textContent = "Check the correctness of this sentence";
    checkButton.onclick = checkSentence;
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(document.createElement("br"));
    wordsContainer.appendChild(checkButton);
  }
}

// Handle word selection
function selectWord(word, index) {
  selectedWords.push(word);
  positions.push(index);
  renderExercise();
}

// Clear the selection
function clearSelection() {
  selectedWords = [];
  positions = [];
  renderExercise();
}

// Check the correctness of the sentence
function checkSentence() {
  turn++;
  const formedSentence = selectedWords.join(" ");
  const isCorrect = possibleSentences.some(
    (sentence) => sentence.trim() === formedSentence.trim()
  );

  const resultDiv = document.createElement("div");
  resultDiv.style.textAlign = "center";
  resultDiv.style.fontSize = "30px";
  if (isCorrect) {
    resultDiv.style.color = "#008000";
    resultDiv.textContent = "Right answer!!!";
  } else {
    resultDiv.style.color = "#FF0000";
    resultDiv.textContent = "Wrong answer!!!";

    // Add "Get Correct Sentence" button
    const getAnswerButton = document.createElement("button");
    getAnswerButton.textContent = "Get Correct Sentence";
    getAnswerButton.onclick = showCorrectAnswer;
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(getAnswerButton);
  }

  document.getElementById("words_sentence").appendChild(resultDiv);
}

// Show the correct sentence(s)
function showCorrectAnswer() {
  // Check if the correct answer is already displayed
  if (document.getElementById("correct-answer")) {
    return; // Exit if the correct answer is already shown
  }

  // Find the parent div of the "Get Correct Sentence" button
  const resultDiv = document.getElementById("words_sentence").lastChild;

  // Create a new div for the correct answer
  const answerDiv = document.createElement("div");
  answerDiv.id = "correct-answer"; // Add an ID to prevent duplicates
  answerDiv.style.fontSize = "20px";
  answerDiv.style.color = "#0000FF";
  answerDiv.style.marginTop = "10px"; // Add some spacing above the correct answer

  // Display all possible correct sentences
  possibleSentences.forEach((sentence) => {
    const sentenceDiv = document.createElement("p");
    sentenceDiv.textContent = sentence.trim();
    sentenceDiv.style.margin = "0";
    answerDiv.appendChild(sentenceDiv);
  });

  // Append the correct answer to the same div as the button
  resultDiv.appendChild(answerDiv);
}
