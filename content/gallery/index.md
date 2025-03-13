<style>
    /* 基础样式 */
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

    /* 缩略图矩阵排列 */
    .gallery-thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .thumbnail-container {
        cursor: pointer;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .thumbnail-container:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .thumbnail-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    /* 模态框样式 */
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
    }

    /* 模态框中的导航按钮 */
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

    .modal-nav.left {
        left: 20px;
    }

    .modal-nav.right {
        right: 20px;
    }

    /* 关闭按钮 */
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
</style>

<h1>Gallery</h1>
<div class="gallery-thumbnails" id="thumbnailContainer"></div>

<!-- 模态框 -->
<div class="modal" id="modal">
    <div class="modal-content">
        <button class="close-modal" onclick="closeModal()">&times;</button>
        <img src="" alt="Main Image" id="modalImage">
        <button class="modal-nav left" onclick="showPreviousImage()">&#10094;</button>
        <button class="modal-nav right" onclick="showNextImage()">&#10095;</button>
    </div>
</div>

<script>
    let currentIndex = 0;
    const imageBasePath = '/images/';
    const imageFiles = [
        '清远漂流.jpg',
        '冬至.jpg',
        '石门.jpg',
        '石门1.jpg',
        '石门2.jpg',
        '石门音乐.jpg',
        '红林花海.jpg',
        '羽毛球赛.jpg',
        '课题组合照.jpg',
        '毕业典礼合照.jpg',
        '龙林毕业聚餐.jpg',
        '大南山_1.jpg',
        '大南山_2.jpg',
        '大南山_3.jpg',
        '大南山_4.jpg',
        '大南山_5.jpg',
        '大南山_6.jpg'
    ];

    const images = imageFiles.map(fileName => ({
        src: `${imageBasePath}${fileName}?fm=webp`,
        alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
    }));

    // 生成缩略图
    function generateThumbnails() {
        const container = document.getElementById('thumbnailContainer');
        container.innerHTML = '';
        images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-container';
            thumbnail.innerHTML = `
                <img 
                    loading="lazy" 
                    src="${img.src}" 
                    alt="Thumbnail ${img.alt}"
                >`;
            thumbnail.onclick = () => openModal(index);
            container.appendChild(thumbnail);
        });
    }

    // 打开模态框
    function openModal(index) {
        currentIndex = index;
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        modal.style.display = 'flex';
        modalImage.src = images[index].src;
        modalImage.alt = images[index].alt;
    }

    // 关闭模态框
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    // 切换到上一张图片
    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const modalImage = document.getElementById('modalImage');
        modalImage.src = images[currentIndex].src;
        modalImage.alt = images[currentIndex].alt;
    }

    // 切换到下一张图片
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        const modalImage = document.getElementById('modalImage');
        modalImage.src = images[currentIndex].src;
        modalImage.alt = images[currentIndex].alt;
    }

    // 键盘切换功能
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeModal();
        }
    });

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        generateThumbnails();
    });
</script>
