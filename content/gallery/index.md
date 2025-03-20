<h1>Gallery</h1>
<!-- 年份容器将动态生成 -->

<div class="modal" id="modal">
    <div class="modal-content">
        <button class="close-modal" onclick="closeModal()">×</button>
        <img src="" alt="Main Image" id="modalImage">
        <button class="modal-nav left" onclick="showPreviousImage()">❮</button>
        <button class="modal-nav right" onclick="showNextImage()">❯</button>
        <div class="modal-loading" id="modalLoading">
            <div class="spinner"></div>
        </div>
    </div>
</div>

<script>
    let currentIndex = 0;
    const thumbnailBasePath = '/thumbnails/';
    const imageBasePath = '/images/';
    const imageFiles = [
        { fileName: '1_清远漂流.jpg', year: 2024 },
        { fileName: '2_冬至.jpg', year: 2024 },
        { fileName: '3_石门1.jpg', year: 2024 },
        { fileName: '4_石门2.jpg', year: 2024 },
        { fileName: '5_石门3.jpg', year: 2024 },
        { fileName: '6_石门4.jpg', year: 2024 },
        { fileName: '7_红林花海.jpg', year: 2024 },
        { fileName: '8_羽毛球赛.jpg', year: 2024 },
        { fileName: '9_课题组合照_2024.jpg', year: 2024 },
        { fileName: '10_毕业典礼合照.jpg', year: 2024 },
        { fileName: '11_龙林毕业聚餐_2024.jpg', year: 2024 },
        { fileName: '12_大南山1.jpg', year: 2025 },
        { fileName: '13_大南山2.jpg', year: 2025 },
        { fileName: '14_大南山3.jpg', year: 2025 },
        { fileName: '15_大南山4.jpg', year: 2025 },
        { fileName: '16_大南山5.jpg', year: 2025 },
        { fileName: '17_大南山6.jpg', year: 2025 }
    ];

    const images = imageFiles.map((item, index) => ({
        thumbSrc: thumbnailBasePath + item.fileName.replace(/\.(jpg|jpeg|png|webp)$/, '_t.$1'),
        src: imageBasePath + item.fileName,
        alt: item.fileName.replace(/_/g, ' ').replace(/\..+$/, ''),
        year: item.year,
        index: index
    }));

    // 生成缩略图
    function generateThumbnails() {
        const years = [...new Set(images.map(img => img.year))].sort();
        const body = document.body;

        years.forEach(year => {
            const yearTitle = document.createElement('h2');
            yearTitle.textContent = year;
            body.insertBefore(yearTitle, document.getElementById('modal'));

            const container = document.createElement('div');
            container.className = 'gallery-thumbnails';
            container.id = `thumbnails${year}`;
            body.insertBefore(container, document.getElementById('modal'));

            const yearImages = images.filter(img => img.year === year);
            yearImages.forEach(img => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail-container';
                const loadingText = document.createElement('div');
                loadingText.className = 'loading-text';
                loadingText.textContent = 'loading';
                thumbnail.appendChild(loadingText);
                const imageElement = document.createElement('img');
                imageElement.loading = 'lazy';
                imageElement.src = img.thumbSrc;
                imageElement.alt = `Thumbnail ${img.alt}`;
                imageElement.onload = () => {
                    imageElement.classList.add('loaded');
                    loadingText.style.display = 'none';
                };
                thumbnail.onclick = () => openModal(img.index);
                thumbnail.appendChild(imageElement);
                container.appendChild(thumbnail);
            });
        });
    }

    // 打开模态框
    function openModal(index) {
        currentIndex = index;
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const modalLoading = document.getElementById('modalLoading');
        modal.style.display = 'flex';
        modalLoading.style.display = 'block';
        modalImage.style.opacity = 0;
        const img = new Image();
        img.src = images[index].src;
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.alt = images[index].alt;
            modalImage.style.opacity = 1;
            modalLoading.style.display = 'none';
            resetImageTransform();
        };
    }

    // 关闭模态框
    function closeModal() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modalImage').src = '';
        resetImageTransform();
    }

    // 切换图片
    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        loadImageIntoModal(currentIndex);
    }
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        loadImageIntoModal(currentIndex);
    }
    function loadImageIntoModal(index) {
        const modalImage = document.getElementById('modalImage');
        const modalLoading = document.getElementById('modalLoading');
        modalLoading.style.display = 'block';
        modalImage.style.opacity = 0;
        const img = new Image();
        img.src = images[index].src;
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.alt = images[index].alt;
            modalImage.style.opacity = 1;
            modalLoading.style.display = 'none';
            resetImageTransform();
        };
    }

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeModal();
        }
    });

    // 初始化
    document.addEventListener('DOMContentLoaded', generateThumbnails);

    // 缩放和拖拽逻辑
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;

    function resetImageTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
        updateCursorStyle();
    }

    function applyTransform() {
        const modalImage = document.getElementById('modalImage');
        modalImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }

    function updateCursorStyle() {
        const modalImage = document.getElementById('modalImage');
        modalImage.style.cursor = scale > 1 ? 'grab' : 'default';
    }

    document.getElementById('modal').addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = scale + delta;
        scale = Math.min(Math.max(1, newScale), 3);
        if (scale <= 1) {
            resetImageTransform();
        } else {
            restrictTranslate();
            applyTransform();
            updateCursorStyle();
        }
    });

    document.getElementById('modalImage').addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        e.preventDefault();
        isDragging = true;
        const rect = document.getElementById('modalImage').getBoundingClientRect();
        startX = e.clientX / scale - translateX;
        startY = e.clientY / scale - translateY;
        document.getElementById('modalImage').style.cursor = 'grabbing';
        document.getElementById('modalImage').style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = document.getElementById('modalImage').getBoundingClientRect();
        translateX = e.clientX / scale - startX;
        translateY = e.clientY / scale - startY;
        restrictTranslate();
        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.getElementById('modalImage').style.cursor = 'grab';
            document.getElementById('modalImage').style.transition = 'transform 0.1s ease-out';
        }
    });

    function restrictTranslate() {
        const modalContent = document.querySelector('.modal-content');
        const modalImage = document.getElementById('modalImage');
        const modalRect = modalContent.getBoundingClientRect();
        const imgRect = modalImage.getBoundingClientRect();
        const scaledWidth = imgRect.width * scale;
        const scaledHeight = imgRect.height * scale;

        if (scaledWidth <= modalRect.width) translateX = 0;
        if (scaledHeight <= modalRect.height) translateY = 0;

        const minTranslateX = (modalRect.width - scaledWidth) / (2 * scale);
        const maxTranslateX = -minTranslateX;
        const minTranslateY = (modalRect.height - scaledHeight) / (2 * scale);
        const maxTranslateY = -minTranslateY;

        if (scaledWidth > modalRect.width) {
            translateX = Math.max(Math.min(translateX, maxTranslateX), minTranslateX);
        } else {
            translateX = 0;
        }
        if (scaledHeight > modalRect.height) {
            translateY = Math.max(Math.min(translateY, maxTranslateY), minTranslateY);
        } else {
            translateY = 0;
        }
    }
</script>