export function setupHeader() {
    const headerPlaceholder = document.getElementById('header');
    if (!headerPlaceholder) {
        console.error('Елемент з id="header" не знайдено');
        return;
    }

    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            headerPlaceholder.innerHTML = html;
            setActivePage();
        })
        .catch(error => {
            console.error('Помилка завантаження хедера:', error);
            headerPlaceholder.innerHTML = '<p>Помилка завантаження меню</p>';
        });
}

function setActivePage() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
}
