
// 1. Генератор історичних дат (безкінечний)
export function* historyDateGenerator() {
    const dates = [
        { date: "882 рік", event: "Заснування Київської Русі князем Олегом" },
        { date: "988 рік", event: "Хрещення Русі князем Володимиром" },
        { date: "1648 рік", event: "Початок Національно-визвольної війни під проводом Богдана Хмельницького" },
        { date: "1709 рік", event: "Битва під Полтавою" },
        { date: "1917 рік", event: "Проголошення Української Народної Республіки" },
        { date: "1991 рік", event: "Акт проголошення незалежності України" },
        { date: "2014 рік", event: "Революція Гідності" },
        { date: "2022 рік", event: "Повномасштабне вторгнення росії в Україну" }
    ];
    
    let index = 0;
    while (true) {
        yield dates[index];
        index = (index + 1) % dates.length;
    }
}

let generatorInstance = null;
let intervalId = null;

export function startCyclicDateDisplay() {
    if (!generatorInstance) {
        generatorInstance = historyDateGenerator();
    }

    const updateDate = () => {
        const next = generatorInstance.next().value;
        const element = document.getElementById('randomDate');
        if (element) {
            element.innerHTML = `
                <strong>${next.date}</strong>: ${next.event}
            `;
        }
    };

    updateDate(); 
    intervalId = setInterval(updateDate, 5 * 60 * 1000); 
}

export function stopCyclicDateDisplay() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}





