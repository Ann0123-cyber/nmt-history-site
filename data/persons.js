import { BiDirectionalPriorityQueue } from '../js/t4-priorityQueue.js';

const personQuestions = [
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/mazepa.jpg",
        options: ["Б. Хмельницький", "І. Мазепа", "Д. Апостол", "П. Дорошенко"],
        correct: 1,
        priority: 1
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/shevchenko.jfif",
        options: ["І. Франко", "П. Куліш", "Т. Шевченко", "М. Костомаров"],
        correct: 2,
        priority: 2
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/antonovich.jfif",
        options: ["Т. Шевченко", "В. Антонович", "М. Грушевський", "М. Драгоманов"],
        correct: 1,
        priority: 3
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/bohdan.jfif",
        options: ["І. Мазепа", "П. Куліш", "Т. Шевченко", "Б. Хмельницький"],
        correct: 3,
        priority: 4
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/doroshenko.jfif",
        options: ["П. Дорошенко", "П. Куліш", "Т. Шевченко", "Б. Хмельницький"],
        correct: 0,
        priority: 5
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/kumish.jfif",
        options: ["П. Дорошенко", "П. Куліш", "Т. Шевченко", "Б. Хмельницький"],
        correct: 1,
        priority: 6
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/drahomanov.jfif",
        options: ["П. Дорошенко", "М. Драгоманов", "Т. Шевченко", "Б. Хмельницький"],
        correct: 1,
        priority: 7
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/konashevich.jpg",
        options: ["П. Конашевич-Сагадачний", "П. Куліш", "Т. Шевченко", "Б. Хмельницький"],
        correct: 0,
        priority: 8
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/kotlarevskiy.jfif",
        options: ["І. Котляревський", "П. Куліш", "Т. Шевченко", "Б. Хмельницький"],
        correct: 0,
        priority: 9
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/mogila.jpg",
        options: ["П. Дорошенко", "П. Куліш", "Т. Шевченко", "П. Могила"],
        correct: 3,
        priority: 10
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/rozumovsli.jfif",
        options: ["П. Дорошенко", "К. Розумовський", "Т. Шевченко", "Б. Хмельницький"],
        correct: 1,
        priority: 11
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/shashkevich.jfif",
        options: ["П. Дорошенко", "П. Куліш", "Т. Шевченко", "М. Шашкевич"],
        correct: 3,
        priority: 9
    },
    {
        question: "Хто зображений на портреті?",
        image: "../img/persons/skovoroda.jfif",
        options: ["П. Дорошенко", "П. Куліш", "Г. Сковорода", "Б. Хмельницький"],
        correct: 2,
        priority: 10
    },
];

const questionQueue = new BiDirectionalPriorityQueue();
personQuestions.forEach(q => questionQueue.enqueue(q, q.priority));

let currentQuestion = questionQueue.dequeue('highest');
let correctAnswers = 0;

const questionText = document.getElementById("question-text");
const imageElement = document.getElementById("question-image");
const answerOptions = document.getElementById("answer-options");
const nextButton = document.getElementById("next-button");
const testEnd = document.getElementById("test-end");
const resultText = document.getElementById("result-text");

function showQuestion(q) {
    if (!q) return finishTest();

    questionText.textContent = q.question;
    imageElement.src = q.image;
    answerOptions.innerHTML = "";

    q.options.forEach((option, i) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(i, q.correct, li));
        answerOptions.appendChild(li);
    });

    nextButton.classList.add("hidden");
}

function selectAnswer(selectedIndex, correctIndex, element) {
    const options = answerOptions.querySelectorAll("li");
    options.forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }

    options.forEach(opt => opt.style.pointerEvents = "none");
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestion = questionQueue.dequeue('highest');
    showQuestion(currentQuestion);
});

function finishTest() {
    questionText.style.display = "none";
    imageElement.style.display = "none";
    answerOptions.style.display = "none";
    nextButton.style.display = "none";
    testEnd.classList.remove("hidden");

    resultText.textContent = `Правильних відповідей: ${correctAnswers}`;
}

showQuestion(currentQuestion);
