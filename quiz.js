const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HyperText Transfer Protocol",
        "Hyperlink Text Markup Language",
        "Hyper Transfer Markup Language"
      ],
      answer: "HyperText Markup Language"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Simple Sheets",
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What does JavaScript do?",
      options: [
        "Styles web pages",
        "Makes web pages interactive",
        "Structures web pages",
        "None of the above"
      ],
      answer: "Makes web pages interactive"
    },
    {
      question: "Which property is used to change the font size in CSS?",
      options: [
        "text-size",
        "font-size",
        "font-style",
        "text-font"
      ],
      answer: "font-size"
    },
    {
      question: "What is the capital of India?",
      options: [
        "Chennai",
        "Mumbai",
        "Kolkata",
        "New Delhi"
      ],
      answer: "New Delhi"
    },
    {
      question: "Inline elements are normally displayed without starting a new line.",
      options: [
        "True",
        "False",
      ],
      answer: "True"
    },
    {
      question: "Who was the first Prime Minister of India?",
      options: [
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "Sardar Patel",
        "Indira Gandhi"
      ],
      answer: "Jawaharlal Nehru"
    },
    {
      question: "What is the national flower of India?",
      options: [
        "Rose",
        "Sunflower",
        "Lotus",
        "Jasmine"
      ],
      answer: "Lotus"
    },
    {
      question: "Which Indian city is known as the 'Silicon Valley of India'?",
      options: [
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Pune"
      ],
      answer: "Bangalore"
    },
    {
      question: "What is the time complexity of accessing an element in an array?",
      options: [
        "O(n)",
        "O(1)",
        "O(log n)",
        "O(n^2)"
      ],
      answer: "O(1)"
    }
  ];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10; 
  
  const startButton = document.getElementById('start-button');
  const displayContainer = document.getElementById('display-container');
  const container = document.getElementById('container');
  const nextButton = document.getElementById('next-button');
  const restartButton = document.getElementById('restart');
  const userScore = document.getElementById('user-score');
  const startScreen = document.querySelector('.start-screen');
  const scoreContainer = document.querySelector('.score-container');
  const timeLeftElement = document.querySelector('.time-left');
  
  startButton.addEventListener('click', () => {
    startScreen.classList.add('hide');
    displayContainer.classList.remove('hide');
    showQuestion();
    startTimer();
  });
  
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    container.innerHTML = `
      <div class="question">${question.question}</div>
      ${question.options.map((option, index) => `
        <button class="option-div" onclick="selectOption('${option}')">${option}</button>
      `).join('')}
    `;
    updateQuestionCounter();
  }
  
  function updateQuestionCounter() {
    const questionCounter = document.querySelector('.number-of-question');
    questionCounter.textContent = `${currentQuestionIndex + 1} of ${questions.length} questions`;
  }
  
  function selectOption(selectedOption) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-div');
    
    options.forEach(option => {
      option.disabled = true;
      if (option.textContent === question.answer) {
        option.classList.add('correct');
      } else if (option.textContent === selectedOption) {
        option.classList.add('incorrect');
      }
    });
    if (selectedOption === question.answer) {
      score++;
    }
    nextButton.classList.remove('hide');
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      nextButton.classList.add('hide');
      timeLeft = 10; 
      startTimer();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    displayContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    userScore.textContent = `Your score: ${score} / ${questions.length}`;
  }
  
  restartButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.classList.add('hide');
    startScreen.classList.remove('hide');
  });
  
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timeLeftElement.textContent = `${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextButton.click();
      }
    }, 1000);
  }
  