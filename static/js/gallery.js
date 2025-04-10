class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        // 将实例方法绑定到全局作用域
        window.openModal = this.openModal.bind(this);
        window.closeModal = this.closeModal.bind(this);
        window.showPreviousImage = this.showPreviousImage.bind(this);
        window.showNextImage = this.showNextImage.bind(this);

        this.init();
    }

    async init() {
        await this.loadData();
        this.generateThumbnails();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch(window.GALLERY_CONFIG.dataUrl);
            const data = await response.json();
            
            this.thumbnailBasePath = data.basePaths.thumbnails;
            this.imageBasePath = data.basePaths.images;
            
            this.images = data.images.map((item, index) => ({
                thumbSrc: this.thumbnailBasePath + item.fileName.replace(/\.(jpg|jpeg|png|webp)$/, '_t.$1'),
                src: this.imageBasePath + item.fileName,
                alt: item.fileName.replace(/_/g, ' ').replace(/\..+$/, ''),
                year: item.year,
                index: index
            }));
        } catch (error) {
            console.error('Failed to load gallery data:', error);
        }
    }

    generateThumbnails() {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        const years = [...new Set(this.images.map(img => img.year))].sort((a, b) => b - a);
        container.innerHTML = '';

        years.forEach(year => {
            const yearImages = this.images.filter(img => img.year === year);
            if (yearImages.length > 0) {
                const title = document.createElement('h2');
                title.className = 'text-xl text-center my-4';
                title.textContent = year;
                container.appendChild(title);

                const thumbnailsDiv = document.createElement('div');
                thumbnailsDiv.className = 'gallery-thumbnails';
                thumbnailsDiv.id = `thumbnails${year}`;
                container.appendChild(thumbnailsDiv);

                this.generateThumbnailsForYear(yearImages, `thumbnails${year}`);
            }
        });
    }

    generateThumbnailsForYear(images, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        images.forEach(image => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-container';

            const loading = document.createElement('div');
            loading.className = 'loading-text';
            loading.textContent = 'loading';
            thumbnail.appendChild(loading);

            const img = document.createElement('img');
            img.loading = 'lazy';
            img.src = image.thumbSrc;
            img.alt = `Thumbnail ${image.alt}`;
            img.onload = () => {
                img.classList.add('loaded');
                loading.style.display = 'none';
            };
            thumbnail.onclick = () => this.openModal(image.index);
            thumbnail.appendChild(img);
            container.appendChild(thumbnail);
        });
    }

    openModal(index) {
        this.currentIndex = index;
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const modalLoading = document.getElementById('modalLoading');

        modal.style.display = 'flex';
        modalLoading.style.display = 'block';
        modalImage.style.opacity = 0;

        const img = new Image();
        img.src = this.images[index].src;
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.alt = this.images[index].alt;
            modalImage.style.opacity = 1;
            modalLoading.style.display = 'none';
            this.resetImageTransform();
        };
    }

    closeModal() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modalImage').src = '';
        this.resetImageTransform();
    }

    showPreviousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.loadImageIntoModal(this.currentIndex);
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.loadImageIntoModal(this.currentIndex);
    }

    loadImageIntoModal(index) {
        const modalImage = document.getElementById('modalImage');
        const modalLoading = document.getElementById('modalLoading');

        modalLoading.style.display = 'block';
        modalImage.style.opacity = 0;

        const img = new Image();
        img.src = this.images[index].src;
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.alt = this.images[index].alt;
            modalImage.style.opacity = 1;
            modalLoading.style.display = 'none';
            this.resetImageTransform();
        };
    }

    resetImageTransform() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.applyTransform();
        this.updateCursorStyle();
    }

    applyTransform() {
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.style.transform = `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
        }
    }

    updateCursorStyle() {
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.style.cursor = this.scale > 1 ? 'grab' : 'default';
        }
    }

    restrictTranslate() {
        const modalContent = document.querySelector('.modal-content');
        const modalImage = document.getElementById('modalImage');
        if (!modalContent || !modalImage) return;

        const containerRect = modalContent.getBoundingClientRect();
        const imageRect = modalImage.getBoundingClientRect();

        const scaledWidth = imageRect.width * this.scale;
        const scaledHeight = imageRect.height * this.scale;

        if (scaledWidth <= containerRect.width) this.translateX = 0;
        if (scaledHeight <= containerRect.height) this.translateY = 0;

        const maxX = Math.max(0, (scaledWidth - containerRect.width) / (2 * this.scale));
        const minX = -maxX;
        const maxY = Math.max(0, (scaledHeight - containerRect.height) / (2 * this.scale));
        const minY = -maxY;

        this.translateX = Math.max(minX, Math.min(maxX, this.translateX));
        this.translateY = Math.max(minY, Math.min(maxY, this.translateY));
    }

    setupEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('modal');
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.showPreviousImage();
                else if (e.key === 'ArrowRight') this.showNextImage();
                else if (e.key === 'Escape') this.closeModal();
            }
        });

        // 点击模态框外部关闭
        document.getElementById('modal').addEventListener('click', (e) => {
            const modalContent = document.querySelector('.modal-content');
            if (!modalContent.contains(e.target)) this.closeModal();
        });

        // 鼠标滚轮缩放
        const modalImage = document.getElementById('modalImage');
        modalImage.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1; // 滚轮方向调整缩放
            this.scale = Math.min(Math.max(1, this.scale + delta), 3); // 限制缩放范围 1 到 3
            
            if (this.scale <= 1) {
                this.resetImageTransform(); // 缩到最小恢复初始状态
            } else {
                this.restrictTranslate(); // 限制拖动范围
                this.applyTransform(); // 应用缩放和位移
                this.updateCursorStyle(); // 更新光标
            }
        });

        // 鼠标拖拽
        modalImage.addEventListener('mousedown', (e) => {
            if (this.scale <= 1) return; // 未缩放时不拖拽
            e.preventDefault();
            this.isDragging = true;
            const rect = modalImage.getBoundingClientRect();
            this.startX = e.clientX - this.translateX * this.scale; // 计算鼠标起始位置
            this.startY = e.clientY - this.translateY * this.scale;
            modalImage.style.cursor = 'grabbing';
            modalImage.style.transition = 'none'; // 移除过渡效果以便实时拖动
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const rect = modalImage.getBoundingClientRect();
            this.translateX = (e.clientX - this.startX) / this.scale; // 按缩放比例调整位移
            this.translateY = (e.clientY - this.startY) / this.scale;
            this.restrictTranslate(); // 限制拖动范围
            this.applyTransform(); // 应用位移
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                modalImage.style.cursor = 'grab';
                modalImage.style.transition = 'transform 0.1s ease-out'; // 恢复过渡效果
            }
        });

        // 手机端触摸支持（可选）
        let touchStartX = 0;
        let touchEndX = 0;

        modalImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].screenX;
            }
        });

        modalImage.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                touchEndX = e.changedTouches[0].screenX;
                const swipeDistance = touchEndX - touchStartX;
                if (swipeDistance > 50) this.showPreviousImage();
                else if (swipeDistance < -50) this.showNextImage();
            }
        });

        let initialDistance = 0;
        modalImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                initialDistance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
            }
        });

        modalImage.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
                const scaleChange = currentDistance / initialDistance;
                this.scale = Math.min(Math.max(1, this.scale * scaleChange), 3);
                initialDistance = currentDistance;

                if (this.scale <= 1) this.resetImageTransform();
                else {
                    this.restrictTranslate();
                    this.applyTransform();
                    this.updateCursorStyle();
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());