// script.js
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
            url: "src/img/DeepSeek从入门到精通 -- 清华大学出版.pdf"
        }
    ];

    // 渲染新闻
    function renderNews() {
        renderColumn('ai-news', aiNewsData);
        renderColumn('human-news', humanNewsData);
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

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    // 监听 input 事件
    searchInput.addEventListener('input', debounce(searchHandler, 300));
    // 监听 keydown 事件
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchHandler.call(this);
        }
    });

    function searchHandler() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('.news-card').forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    }

    // 移动端菜单切换
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // 工具函数
    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 初始化
    renderNews();

    // 弹窗函数
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    // 为关闭按钮添加点击事件
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // 暴露函数到全局作用域
    window.openModal = openModal;
    window.closeModal = closeModal;
});
