document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        // 保存主题设置
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // 更新图标
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}); 