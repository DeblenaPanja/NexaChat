export function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const htmlEl = document.documentElement;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', nextTheme);
    });
}