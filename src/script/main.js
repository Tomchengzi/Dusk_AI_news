// main.js
document.addEventListener('DOMContentLoaded', () => {
    // 新闻数据
    const aiNewsData = [
        {
            title: "DeepSeek开源模型突破：推理成本降低80%",
            excerpt: "最新发布的DeepSeek-R1采用MoE架构，在同等效果下训练成本仅为GPT-4的1/5...",
            image: "src/img/deepseek1.jpg",
            tag: "技术突破",
            url: "src/news/deepseek.html"
        },
        {
            title: "ChatGPT-5多模态能力升级",
            excerpt: "支持视频生成与实时语音交互，API成本下降40%...",
            image: "src/img/chatgpt.jpg",
            tag: "新品发布",
            url:"src/news/chatgpt.html"
        }
    ];

    const humanNewsData = [
        {
            title: "5个免费AI工具提升工作效率",
            excerpt: "从文档处理到会议纪要，每天节省2小时...",
            image: "src/img/Cursor.jpg",
            tag: "效率工具",
            url:"src/news/tool_usage.html"
        },
        {
            title: "AI时代必备核心技能",
            excerpt: "DeepSeek从入门到精通 -- 清华大学出版",
            image: "src/img/deepseek3.jpg",
            tag: "职业发展",
            url: "./src/img/DeepSeek从入门到精通 -- 清华大学出版.pdf"
        }
    ];

    // 渲染新闻
    function renderNews() {
        renderColumn('ai-news', aiNewsData);
        renderColumn('human-news', humanNewsData);
        initSearchFeedback();
    }

    function renderColumn(containerId, data) {
        const container = document.getElementById(containerId);
        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.innerHTML = `
                <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${item.image}" class="card-image" alt="${item.title}">
                </a>
                <div class="card-content">
                    <span class="card-tag">${item.tag}</span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // 搜索功能实现
    function searchHandler() {
        const query = this.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.news-card');
        let hasResults = false;

        cards.forEach(card => {
            const searchContent = [
                card.querySelector('h3').innerText,
                card.querySelector('p').innerText,
                card.querySelector('.card-tag').innerText,
                card.querySelector('img').getAttribute('alt')
            ].join(' ').toLowerCase();

            const isVisible = searchContent.includes(query);
            card.style.display = isVisible ? 'block' : 'none';
            card.classList.toggle('no-match', !isVisible);
            
            if (isVisible) hasResults = true;
        });

        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
    }

    // 初始化搜索反馈
    function initSearchFeedback() {
        const feedback = document.createElement('div');
        feedback.id = 'no-results';
        feedback.style.display = 'none';
        feedback.innerHTML = `
            <div class="no-results-card">
                <i class="fas fa-search-minus"></i>
                <p>没有找到匹配的结果，请尝试其他关键词</p>
            </div>
        `;
        document.querySelector('.content-area').appendChild(feedback);
    }

    // 事件监听器
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', debounce(searchHandler.bind(searchInput), 300));
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') searchHandler.call(this);
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 弹窗功能
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    // 关闭按钮事件
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // 全局暴露
    window.openModal = openModal;
    window.closeModal = closeModal;

    // 初始化
    renderNews();
});