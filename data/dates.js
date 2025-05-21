import { DatesCache } from '../js/t3-memoization.js';

    //dates.html
    
    const testCache = new DatesCache();

    const dateQuestions = [
    {
        question: "У якому році відбувся Похід П. Конашевича-Сагайдачного на Москву?",
        options: ["1615", "1617", "1618", "1619"],
        correct: 2
    },
    {
        question: "У якому році відбулася Хотинська битва?",
        options: ["1619", "1620", "1621", "1622"],
        correct: 2
    },
    {
        question: "У якому році відбулося Повстання під проводом Марка Жмайла та Куруківська угода?",
        options: ["1623", "1625", "1626", "1627"],
        correct: 1
    },
    {
        question: "У якому році були прийняті 'Пункти для заспокоєння руського народу'?",
        options: ["1630", "1631", "1632", "1633"],
        correct: 2
    },
    {
        question: "У якому році відбулася Битва під Жовтими водами?",
        options: ["1646", "1647", "1648", "1649"],
        correct: 2
    },
    {
        question: "У якому році відбулася Зборівська битва?",
        options: ["1648", "1649", "1650", "1651"],
        correct: 1
    },
    {
        question: "У якому році відбулася Берестецька битва?",
        options: ["1650", "1651", "1652", "1653"],
        correct: 1
    },
    {
        question: "У якому році відбулася Битва під Жванцем?",
        options: ["1651", "1652", "1653", "1654"],
        correct: 2
    },
    {
        question: "У якому році відбулася Переяславська рада?",
        options: ["1652", "1653", "1654", "1655"],
        correct: 2
    },
    {
        question: "У якому році було укладено Віленське перемир'я?",
        options: ["1654", "1655", "1656", "1657"],
        correct: 2
    },
    {
        question: "У якому році було підписано Гадяцький договір?",
        options: ["1656", "1657", "1659", "1658"],
        correct: 3
    },
    {
        question: "У якому році відбулася Конотопська битва?",
        options: ["1657", "1658", "1659", "1660"],
        correct: 2
    },
    {
        question: "У якому році було укладено Андрусівське перемир'я?",
        options: ["1665", "1666", "1668", "1667"],
        correct: 3
    },
    {
        question: "У якому році була підписана Корсунська угода?",
        options: ["1667", "1668", "1669", "1670"],
        correct: 2
    },
    {
        question: "У якому році було підписано Бахчисарайський мирний договір?",
        options: ["1679", "1680", "1681", "1682"],
        correct: 2
    }
    ];

    let currentIndex = 0;
    let correctAnswers = 0;

    const questionText = document.getElementById("question-text");
    const answerOptions = document.getElementById("answer-options");
    const nextButton = document.getElementById("next-button");
    const testEnd = document.getElementById("test-end");
    const resultText = document.getElementById("result-text");

    if (questionText && answerOptions && nextButton && testEnd && resultText) {
    function showQuestion(index) {
    const q = dateQuestions[index];
    questionText.textContent = q.question;
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
    currentIndex++;
    if (currentIndex < dateQuestions.length) {
        showQuestion(currentIndex);
    } else {
        finishTest();
    }
    });

    function finishTest() {
        const total = dateQuestions.length;
        const score = correctAnswers;

        testCache.addResult({
            date: new Date().toISOString(),
            score: score,
            total: total
        });

        questionText.style.display = "none";
        answerOptions.style.display = "none";
        nextButton.style.display = "none";
        testEnd.classList.remove("hidden");

        resultText.textContent = `Результат: ${score} правильних з ${total}`;
    }

    showQuestion(currentIndex);
 }

// tests.html

const averageResultText = document.getElementById("dates-average-result");
const clearButton = document.getElementById("clear-dates-result");

if (averageResultText && clearButton) {
  const cache = new DatesCache();
  const results = cache.getAll();

  if (results.length > 0) {
    const totalAttempts = results.length;
    const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);
    const avg = (totalCorrect / totalAttempts).toFixed(2);
    averageResultText.textContent = `Пройдено разів: ${totalAttempts}, середній результат: ${avg} правильних відповідей.`;
  } else {
    averageResultText.textContent = "Немає збережених результатів.";
  }

  clearButton.addEventListener("click", () => {
    cache.clear();
    averageResultText.textContent = "Результати очищено.";
  });
}
