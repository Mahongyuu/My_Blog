document.addEventListener('DOMContentLoaded', () => {
    // 轮播图功能
    function initCarousel() {
        const list = document.querySelector('.animated-list');
        if (!list) return;

        const cards = list.querySelectorAll('.image-card');
        if (!cards.length) return;

        // 复制卡片实现无缝滚动
        cards.forEach(card => {
            list.appendChild(card.cloneNode(true));
        });

        let currentPosition = 0;
        let isPaused = false;
        let animationFrameId = null;
        let lastTime = 0;

        // 设置动画帧率为60fps
        const fps = 60;
        const frameInterval = 1000 / fps;

        function animate(currentTime) {
            if (!isPaused) {
                animationFrameId = requestAnimationFrame(animate);
                
                if (currentTime - lastTime >= frameInterval) {
                    lastTime = currentTime;
                    currentPosition -= 1;

                    // 重置位置实现循环
                    const totalWidth = cards[0].offsetWidth * cards.length;
                    if (Math.abs(currentPosition) >= totalWidth) {
                        currentPosition = 0;
                    }

                    list.style.transform = `translateX(${currentPosition}px)`;
                }
            }
        }

        // 事件处理
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                isPaused = true;
            });

            card.addEventListener('mouseleave', () => {
                isPaused = false;
                animate();
            });
        });

        // 启动动画
        animate();

        // 清理函数
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }

    // 在页面加载完成后初始化轮播
    initCarousel();

    // 留言板功能
    function initGuestbook() {
        const commentsWall = document.querySelector('.comments-wall');
        if (!commentsWall) return;

        // 初始化留言墙
        function initCommentsWall() {
            const rows = document.querySelectorAll('.scroll-row');
            
            rows.forEach(row => {
                const content = row.querySelector('.scroll-content');
                const speed = parseFloat(row.dataset.speed);
                
                // 复制内容实现无缝滚动
                const cards = content.querySelectorAll('.comment-card');
                const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
                clonedCards.forEach(card => content.appendChild(card));
            });
        }

        // 留言表单处理
        const form = document.getElementById('comment-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('comment-name').value;
                const content = form.querySelector('textarea').value;
                
                if (name && content) {
                    // 创建新留言
                    const newComment = createCommentCard(name, content);
                    const firstRow = document.querySelector('.scroll-row');
                    if (firstRow) {
                        const scrollContent = firstRow.querySelector('.scroll-content');
                        scrollContent.insertBefore(newComment, scrollContent.firstChild);
                    }
                    
                    // 重置表单
                    form.reset();
                    showNotification('留言发送成功！');
                }
            });
        }

        initCommentsWall();
    }

    // 创建留言卡片
    function createCommentCard(name, content) {
        const card = document.createElement('div');
        card.className = 'comment-card';
        
        card.innerHTML = `
            <div class="comment-content">
                <span class="comment-author">${name}</span>
                <p class="comment-text">${content}</p>
            </div>
        `;
        
        return card;
    }

    // 显示通知
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // 初始化回到顶部按钮
    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        const scrollTrigger = 300; // 滚动多少距离后显示按钮
        
        // 监听滚动事件
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollTrigger) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
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

    // 初始化主题切换
    function initThemeToggle() {
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
    }

    // 足迹动画功能
    function initFootprints() {
        const footprintCards = document.querySelectorAll('.footprint-card');
        if (!footprintCards.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        footprintCards.forEach((card, index) => {
            // 添加延迟动画
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    }

    // 足迹地图功能（如果需要）
    function initFootprintsMap() {
        const mapContainer = document.getElementById('footprints-map');
        if (!mapContainer) return;

        // 这里可以添加地图相关的初始化代码
        // 例如使用 Google Maps 或其他地图服务
    }

    // 导航栏滚动效果
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

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
    }

    // 添加滚动动画
    function handleScrollAnimations() {
        const cards = document.querySelectorAll('.content-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => observer.observe(card));

        // 添加个人信息动画
        const profileDetails = document.querySelector('.profile-info');
        if (profileDetails) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const texts = entry.target.querySelectorAll('.profile-details p');
                        texts.forEach(text => text.classList.add('animate'));
                    }
                });
            }, {
                threshold: 0.5
            });

            observer.observe(profileDetails);
        }
    }

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
                        // 添加动画效果
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

    // 初始化所有功能
    try {
        initCarousel();
        initGuestbook();
        initBackToTop();
        initThemeToggle();
        initFootprints();
        initFootprintsMap();
        initNavbarScroll(); // 添加导航栏滚动初始化
        handleScrollAnimations();
        initProjectFilters();
    } catch (error) {
        console.error('初始化过程中发生错误:', error);
    }
}); 