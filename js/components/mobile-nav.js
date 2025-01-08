// 移动端导航菜单处理
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (mobileNavToggle && navLinks && navOverlay) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // 点击遮罩层关闭导航菜单
        navOverlay.addEventListener('click', () => {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // 点击导航链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 导航栏滚动处理
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // 添加滚动样式
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 自动隐藏/显示导航栏
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
            // 向下滚动
            navbar.classList.add('hidden');
        } else {
            // 向上滚动
            navbar.classList.remove('hidden');
        }

        lastScrollTop = currentScroll;
    }

    // 使用 requestAnimationFrame 优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 回到顶部按钮处理
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {  // 添加判断，确保按钮存在
        const showBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        // 监听滚动事件
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    showBackToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // 点击回到顶部
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 