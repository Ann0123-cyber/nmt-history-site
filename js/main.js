import { setupHeader } from './header.js'; 
import { startCyclicDateDisplay } from './t1-generators.js';

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    startCyclicDateDisplay();
    console.log('Всі компоненти ініціалізовані');
});
