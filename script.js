/* ============================================
   汪丽 · 中华文化研究学者 — 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==================== 1. 导航栏滚动效果 ====================
    // 页面往下滚动时，导航栏加上阴影，看起来更立体
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== 2. 区块滚动渐显动画 ====================
    // 需要做动画的元素加上 reveal 类，滚动到它们时就会淡入显示
    var revealTargets = document.querySelectorAll(
        '.research-card, .work-item, .about-stats, .contact-card'
    );

    // 给每个目标加上 reveal 类
    revealTargets.forEach(function (el) {
        el.classList.add('reveal');
    });

    // 判断元素是否滚到了屏幕可见范围
    function isInViewport(el) {
        var rect = el.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // 元素顶部进入屏幕底部 85% 的位置就算可见
        return rect.top <= windowHeight * 0.85;
    }

    // 检查所有需要动画的元素
    function checkReveal() {
        document.querySelectorAll('.reveal').forEach(function (el) {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    // 页面加载时先检查一次（可能有些元素一开始就在可见区域）
    checkReveal();

    // 滚动时持续检查
    window.addEventListener('scroll', checkReveal);

    // ==================== 3. 导航栏高亮当前区块 ====================
    // 根据当前滚动位置，高亮对应的导航链接
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        var scrollPos = window.scrollY + 100; // 加一点偏移量，更准确

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                // 找到对应这个区块的导航链接
                navLinks.forEach(function (link) {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.style.color = 'var(--red)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ==================== 4. 点击导航链接后的平滑滚动 ====================
    // 因为 CSS 里已经用了 scroll-behavior: smooth，
    // 这里不需要额外处理，但给用户一个点击反馈
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // 点击后立即更新高亮
            setTimeout(highlightNav, 100);
        });
    });

});
