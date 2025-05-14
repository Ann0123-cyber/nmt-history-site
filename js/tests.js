import { setupHeader } from './header.js';

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();

    const backToHomeBtn = document.getElementById('backToHomeBtn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            history.pushState(null, '', 'index.html');
            window.dispatchEvent(new Event('popstate'));
        });
    }

    window.addEventListener('popstate', () => {
        const currentPath = window.location.pathname.split('/').pop();
        if (currentPath === 'index.html') {
            window.location.href = 'index.html'; 
        }
    });
});