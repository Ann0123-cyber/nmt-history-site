import { questionStreamNDJSON  } from '../js/t6-dataStreaming.js';

const container = document.getElementById('test');
const button = document.getElementById('loadMore');
const stream = questionStreamNDJSON ('../questions.ndjson', 5);

button.addEventListener('click', async () => {
  const { value: questions, done } = await stream.next();

  if (done) {
    button.disabled = true;
    button.textContent = 'Усі питання показано';
    return;
  }

  questions.forEach((q) => {
    const div = document.createElement('div');
    div.classList.add('question-block');

    const answersHtml = q.answers.map((ans, i) =>
      `<label><input type="radio" name="q-${q.question}" value="${i}"> ${ans}</label><br>`
    ).join('');

    div.innerHTML = `
      <p><strong>${q.question}</strong></p>
      ${answersHtml}
    `;

    container.appendChild(div);
  });
});
