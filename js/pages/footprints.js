// 足迹页面的专用脚本
document.addEventListener('DOMContentLoaded', () => {
    // 初始化年份标签切换
    function initYearTabs() {
        const yearTabs = document.querySelectorAll('.year-tab');
        const monthGroups = document.querySelectorAll('.month-group');

        yearTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                yearTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const year = tab.dataset.year;
                monthGroups.forEach(group => {
                    group.style.display = group.dataset.year === year ? 'block' : 'none';
                });
            });
        });
    }

    // 初始化足迹卡片
    function initFootprintCards() {
        const cards = document.querySelectorAll('.footprint-card');
        
        cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);

            // 图片画廊功能
            const gallery = card.querySelector('.card-gallery');
            if (!gallery) return;

            const images = gallery.querySelectorAll('img');
            if (images.length === 0) return;

            let currentIndex = 0;
            const galleryNav = gallery.querySelector('.gallery-nav');

            // 更新计数器显示
            function updateGalleryCounter() {
                if (galleryNav) {
                    galleryNav.innerHTML = `
                        <span class="current">${currentIndex + 1}</span>
                        <span class="total">/ ${images.length}</span>
                    `;
                }
            }

            // 切换到指定图片
            function showImage(index) {
                images.forEach(img => img.classList.remove('active'));
                images[index].classList.add('active');
                updateGalleryCounter();
            }

            // 初始化第一张图片
            showImage(0);

            // 如果有多张图片，设置自动轮播
            if (images.length > 1) {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    showImage(currentIndex);
                }, 5000);
            }
        });
    }

    // 初始化所有功能
    try {
        initYearTabs();
        initFootprintCards();
        
        // 导航栏和主题切换等通用功能
        if (typeof initNavbarScroll === 'function') initNavbarScroll();
        if (typeof initThemeToggle === 'function') initThemeToggle();
        if (typeof initBackToTop === 'function') initBackToTop();
    } catch (error) {
        console.error('足迹页面初始化错误:', error);
    }

    // 统一处理展开按钮点击事件
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.footprint-card');
            const content = card.querySelector('.card-content');
            
            // 切换展开状态
            content.classList.toggle('expanded');
            this.classList.toggle('expanded');
            
            // 更新按钮图标方向
            const icon = this.querySelector('i');
            if (content.classList.contains('expanded')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}); 