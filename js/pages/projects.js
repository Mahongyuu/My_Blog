// 项目页面的专用脚本
document.addEventListener('DOMContentLoaded', () => {
    // 项目筛选功能
    function initProjectFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        const projectCards = document.querySelectorAll('.project-card');

        if (!filterTags.length || !projectCards.length) return;

        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // 移除所有标签的active类
                filterTags.forEach(t => t.classList.remove('active'));
                // 给当前点击的标签添加active类
                tag.classList.add('active');

                const filterValue = tag.dataset.filter;

                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else if (card.dataset.category === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 项目卡片悬停效果
    function initProjectHover() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const links = card.querySelector('.project-links');
            if (!links) return;

            card.addEventListener('mouseenter', () => {
                links.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                links.style.opacity = '0';
            });
        });
    }

    // 项目链接点击处理
    function initProjectLinks() {
        const projectLinks = document.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // 如果链接是 # 或者空的，阻止默认行为
                if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
                    e.preventDefault();
                    alert('项目链接即将上线...');
                }
            });
        });
    }

    // 初始化所有功能
    try {
        initProjectFilters();
        initProjectHover();
        initProjectLinks();
        
        // 导航栏和主题切换等通用功能
        if (typeof initNavbarScroll === 'function') initNavbarScroll();
        if (typeof initThemeToggle === 'function') initThemeToggle();
        if (typeof initBackToTop === 'function') initBackToTop();
    } catch (error) {
        console.error('项目页面初始化错误:', error);
    }
}); 