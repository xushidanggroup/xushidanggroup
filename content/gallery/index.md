<style>
    /* 其他样式保持不变 */
    .loading-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .spinner {
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

<div class="gallery">
    <h1>Gallery</h1>
    <div class="gallery-thumbnails" id="thumbnailContainer"></div>
    <div class="gallery-main">
        <button class="gallery-nav left" onclick="showPreviousImage()">&#10094;</button>
        <img src="" alt="Main Image" id="mainImage" style="opacity:0;">
        <button class="gallery-nav right" onclick="showNextImage()">&#10095;</button>
        <!-- 加载指示器 -->
        <div id="loadingIndicator" class="loading-indicator" style="display: none;">
            <div class="spinner"></div>
        </div>
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

const images = imageFiles.map(fileName => ({
    src: `${imageBasePath}${fileName}?fm=webp`,
    alt: fileName.replace(/_/g, ' ').replace(/\..+$/, '')
}));

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
                srcset="${img.src}&w=150 150w, ${img.src}&w=300 300w"
                sizes="(max-width: 600px) 150px, 300px"
                alt="Thumbnail ${img.alt}"
            >`;
        thumbnail.onclick = () => {
            const loadingIndicator = document.getElementById('loadingIndicator');
            loadingIndicator.style.display = 'block'; // 立即显示加载指示器
            showImage(index, true);
        };
        container.appendChild(thumbnail);
    });
}

async function showImage(index, quick = false) {
    if (index < 0 || index >= images.length) return;

    const mainImage = document.getElementById('mainImage');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // 显示加载指示器
    loadingIndicator.style.display = 'block';
    mainImage.style.opacity = 0;

    // 加载图片
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

        // 隐藏加载指示器
        loadingIndicator.style.display = 'none';

        currentIndex = index;
        updateActiveThumbnail(index);
    }, quick ? 300 : 500);

    resetAutoSwitch();
}

// 其他函数保持不变
</script>