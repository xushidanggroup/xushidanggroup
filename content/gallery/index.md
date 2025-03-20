<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
    h2 {
        text-align: center;
        margin: 20px 0 10px;
        color: #333;
    }
    .gallery-thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
    .thumbnail-container {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background: #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .thumbnail-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .thumbnail-container img.loaded {
        opacity: 1;
    }
    .thumbnail-container .loading-text {
        position: absolute;
        font-size: 14px;
        color: #666;
    }
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        margin: 0 auto;
        transform-origin: center;
        transition: transform 0.1s ease-out;
        cursor: grab;
        user-select: none;
    }
    .modal-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 2em;
        padding: 10px 20px;
        cursor: pointer;
        z-index: 1;
        border-radius: 50%;
    }
    .modal-nav.left { left: 20px; }
    .modal-nav.right { right: 20px; }
    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 1.5em;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 50%;
    }
    .modal-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    .modal-loading .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top: 4px solid #2196F3;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<h1>Gallery</h1>
<h2>2024</h2>
<div class="gallery-thumbnails" id="thumbnails2024"></div>
<h2>2025</h2>
<div class="gallery-thumbnails" id="thumbnails2025"></div>

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
        '1_清远漂流.jpg', '2_冬至.jpg', '3_石门1.jpg', '4_石门2.jpg',
        '5_石门3.jpg', '6_石门4.jpg', '7_红林花海.jpg', '8_羽毛球赛.jpg',
        '9_课题组合照_2024.jpg', '10_毕业典礼合照.jpg', '11_龙林毕业聚餐_2024.jpg',
        '12_大南山1.jpg', '13_大南山2.jpg', '14_大南山3.jpg', '15_大南山4.jpg',
        '16_大南山5.jpg', '17_大南山6.jpg'
    ];

    const images = imageFiles.map(fileName => ({
        thumbSrc: thumbnailBasePath + fileName.replace(/\.(jpg|jpeg|png|webp)$/, '_t.$1'),
        src: imageBasePath + fileName,
        alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
    }));

    // 按年份分组
    const images2024 = images.slice(0, Math.ceil(images.length / 2)); // 前一半为 2024 年
    const images2025 = images.slice(Math.ceil(images.length / 2));    // 后一半为 2025 年

    // 生成缩略图
    function generateThumbnails() {
        generateThumbnailsForYear(images2024, 'thumbnails2024');
        generateThumbnailsForYear(images2025, 'thumbnails2025');
    }

    function generateThumbnailsForYear(yearImages, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        yearImages.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-container';
            const loadingText = document.createElement('div');
            loadingText.className = 'loading-text';
            loadingText.innerText = 'loading';
            thumbnail.appendChild(loadingText);
            const imageElement = document.createElement('img');
            imageElement.loading = 'lazy';
            imageElement.src = img.thumbSrc;
            imageElement.alt = `Thumbnail ${img.alt}`;
            imageElement.onload = () => {
                imageElement.classList.add('loaded');
                loadingText.style.display = 'none';
            };
            // 计算全局索引
            const globalIndex = containerId === 'thumbnails2024' ? index : index + images2024.length;
            thumbnail.onclick = () => openModal(globalIndex);
            thumbnail.appendChild(imageElement);
            container.appendChild(thumbnail);
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