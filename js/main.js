import { setupHeader } from './header.js'; 
import { startCyclicDateDisplay } from './lib/index.js';

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    startCyclicDateDisplay();
    console.log('Всі компоненти ініціалізовані');
});
