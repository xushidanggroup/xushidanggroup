<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery</title>
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
            transition: opacity 500ms ease-in-out;
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
</head>
<body>
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
                const mainImage = document.getElementById('mainImage');
                mainImage.src = images[0].src; // 立即加载首张图片
                mainImage.style.opacity = 1;
                currentIndex = 0;
                updateActiveThumbnail(0);
            }
        });

        function preloadImages() {
            images.slice(0, 3).forEach(imgData => { // 仅预加载前三张
                const img = new Image();
                img.src = imgData.src;
            });
        }
    </script>
</body>
</html>