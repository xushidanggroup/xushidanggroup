<style>
    h1 {
        text-align: center;
        margin-bottom: 1px;
    }

    .gallery {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .gallery-thumbnails {
        display: flex;
        justify-content: start;
        gap: 10px;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        padding: 1px;
        box-sizing: border-box;
        min-height: 120px;
        scroll-behavior: smooth;
    }

    .thumbnail-container {
        display: inline-block;
        cursor: pointer;
        position: relative;
        transition: transform 0.3s;
    }

    .thumbnail-container img {
        max-width: 150px;
        max-height: 100px;
        width: auto;
        height: auto;
        border: 2px solid transparent;
        transition: transform 0.3s;
    }

    .thumbnail-container.active img {
        transform: scale(1.15);
        border-color: #2196F3;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .gallery-main {
        width: 100%;
        max-width: 100%;
        text-align: center;
        position: relative;
        margin-top: 20px;
        min-height: 500px;
    }

    .gallery-main img {
        max-width: 100%;
        max-height: 80vh;
        height: auto;
        border: none;
        transition: opacity 500ms ease-in-out; /* 缩短过渡时间 */
    }

    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 2em;
        padding: 5px 15px;
        cursor: pointer;
        z-index: 1;
    }

    .gallery-nav.left { left: 5px; }
    .gallery-nav.right { right: 5px; }
</style>

<div class="gallery">
    <h1>Gallery</h1>
    <div class="gallery-thumbnails" id="thumbnailContainer"></div>
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">&#10094;</button>
        <img src="" alt="Main Image" id="mainImage" style="opacity:0;">
        <button class="gallery-nav right" onclick="showNextImage()">&#10095;</button>
    </div>
</div>

<script>
let currentIndex = 0;
let autoSwitchInterval;
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

// **每张图片单独添加 `?fm=webp`**
const images = imageFiles.map(fileName => ({
    src: `${imageBasePath}${fileName}?fm=webp`,
    alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
}));

// // 不添加?fm=webp
// const images = imageFiles.map(fileName => ({
//     src: `${imageBasePath}${fileName}`,
//     alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
// }));

// 图片预加载函数
function preloadImages() {
    images.forEach(imgData => {
        const img = new Image();
        img.src = imgData.src;
    });
}

function generateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    images.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-container';
        // 添加loading="lazy"属性进行懒加载
        thumbnail.innerHTML = `<img loading="lazy" src="${img.src}" alt="Thumbnail ${img.alt}">`;
        thumbnail.onclick = () => showImage(index, true);
        container.appendChild(thumbnail);
    });
}

function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    thumbnails.forEach((container, i) => {
        container.classList.toggle('active', i === index);
    });
    scrollThumbnailIntoView(index);
}

function scrollThumbnailIntoView(index) {
    const container = document.getElementById('thumbnailContainer');
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    if (thumbnails[index]) {
        const thumbnail = thumbnails[index];
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        container.scrollLeft += (thumbnailRect.left - containerRect.left) - (container.clientWidth / 2) + (thumbnail.clientWidth / 2);
    }
}

async function showImage(index, quick = false) {
    if (index < 0 || index >= images.length) return;
    const mainImage = document.getElementById('mainImage');
    mainImage.style.transition = `opacity ${quick ? 300 : 500}ms`; // 根据需要调整动画时长
    mainImage.style.opacity = 0;
    // 加载图片时利用缓存
    const actualSrc = await new Promise(resolve => {
        const img = new Image();
        img.src = images[index].src;
        img.onload = () => resolve(img.src);
        img.onerror = () => resolve('/images/fallback.jpg');
    });
    setTimeout(() => {
        mainImage.src = actualSrc;
        mainImage.alt = images[index].alt;
        mainImage.style.opacity = 1;
        currentIndex = index;
        updateActiveThumbnail(index);
    }, quick ? 300 : 500);
    resetAutoSwitch();
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex, true);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex, true);
}

function resetAutoSwitch() {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = setInterval(showNextImage, 5000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showPreviousImage();
    if (e.key === 'ArrowRight') showNextImage();
});

document.addEventListener('DOMContentLoaded', () => {
    generateThumbnails();
    preloadImages(); // 页面加载时预先加载所有图片
    if (images.length > 0) {
        showImage(0, false);
    }
});
</script>
