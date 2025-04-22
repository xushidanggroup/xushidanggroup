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
        this.isLandscapeMode = false;

        window.openModal = this.openModal.bind(this);
        window.closeModal = this.closeModal.bind(this);
        window.showPreviousImage = this.showPreviousImage.bind(this);
        window.showNextImage = this.showNextImage.bind(this);
        window.toggleRotate = this.toggleRotate.bind(this);

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

    openModal(index, isLandscape = false) {
        this.currentIndex = index;
        this.isLandscapeMode = isLandscape;
        const modal = document.getElementById('modal');
        const landscapeModal = document.getElementById('landscapeModal');
        const modalImage = document.getElementById('modalImage');
        const landscapeModalImage = document.getElementById('landscapeModalImage');
        const modalLoading = document.getElementById('modalLoading');
        const landscapeModalLoading = document.getElementById('landscapeModalLoading');

        modal.style.display = isLandscape ? 'none' : 'flex';
        landscapeModal.style.display = isLandscape ? 'flex' : 'none';
        const targetImage = isLandscape ? landscapeModalImage : modalImage;
        const targetLoading = isLandscape ? landscapeModalLoading : modalLoading;

        targetLoading.style.display = 'block';
        targetImage.style.opacity = 0;

        const img = new Image();
        img.src = this.images[index].src;
        img.onload = () => {
            targetImage.src = img.src;
            targetImage.alt = this.images[index].alt;
            targetImage.style.opacity = 1;
            targetLoading.style.display = 'none';
            this.resetImageTransform();
            targetImage.style.transform = isLandscape ? 'rotate(90deg)' : 'rotate(0deg)';
        };
    }

    closeModal() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('landscapeModal').style.display = 'none';
        document.getElementById('modalImage').src = '';
        document.getElementById('landscapeModalImage').src = '';
        this.resetImageTransform();
        this.isLandscapeMode = false;
    }

    showPreviousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.openModal(this.currentIndex, this.isLandscapeMode);
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.openModal(this.currentIndex, this.isLandscapeMode);
    }

    toggleRotate() {
        this.isLandscapeMode = !this.isLandscapeMode;
        this.openModal(this.currentIndex, this.isLandscapeMode);
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
        const landscapeModalImage = document.getElementById('landscapeModalImage');
        const targetImage = this.isLandscapeMode ? landscapeModalImage : modalImage;
        if (targetImage) {
            const rotation = this.isLandscapeMode ? 90 : 0;
            targetImage.style.transform = `rotate(${rotation}deg) scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
        }
    }

    updateCursorStyle() {
        const modalImage = document.getElementById('modalImage');
        const landscapeModalImage = document.getElementById('landscapeModalImage');
        const targetImage = this.isLandscapeMode ? landscapeModalImage : modalImage;
        if (targetImage) {
            targetImage.style.cursor = this.scale > 1 ? 'grab' : 'default';
        }
    }

    restrictTranslate() {
        const modalContent = document.querySelector(this.isLandscapeMode ? '.landscape-modal-content' : '.modal-content');
        const modalImage = document.getElementById(this.isLandscapeMode ? 'landscapeModalImage' : 'modalImage');
        if (!modalContent || !modalImage) return;

        const containerRect = modalContent.getBoundingClientRect();
        const imageRect = modalImage.getBoundingClientRect();

        const isRotated = this.isLandscapeMode;
        const scaledWidth = isRotated ? imageRect.height * this.scale : imageRect.width * this.scale;
        const scaledHeight = isRotated ? imageRect.width * this.scale : imageRect.height * this.scale;

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
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('modal');
            const landscapeModal = document.getElementById('landscapeModal');
            if (modal.style.display === 'flex' || landscapeModal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.showPreviousImage();
                else if (e.key === 'ArrowRight') this.showNextImage();
                else if (e.key === 'Escape') this.closeModal();
            }
        });

        ['modal', 'landscapeModal'].forEach(modalId => {
            const modal = document.getElementById(modalId);
            modal.addEventListener('click', (e) => {
                const modalContent = modal.querySelector(modalId === 'modal' ? '.modal-content' : '.landscape-modal-content');
                if (!modalContent.contains(e.target)) this.closeModal();
            });

            const modalImage = document.getElementById(modalId === 'modal' ? 'modalImage' : 'landscapeModalImage');

            modalImage.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                this.scale = Math.min(Math.max(1, this.scale + delta), 3);
                if (this.scale <= 1) {
                    this.resetImageTransform();
                } else {
                    this.restrictTranslate();
                    this.applyTransform();
                    this.updateCursorStyle();
                }
            });

            modalImage.addEventListener('mousedown', (e) => {
                if (this.scale <= 1) return;
                e.preventDefault();
                this.isDragging = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                modalImage.style.cursor = 'grabbing';
                modalImage.style.transition = 'none';
            });

            modalImage.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1 && this.scale > 1) {
                    e.preventDefault();
                    this.isDragging = true;
                    const touch = e.touches[0];
                    this.startX = touch.clientX;
                    this.startY = touch.clientY;
                    modalImage.style.transition = 'none';
                }
            });

            modalImage.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1 && this.isDragging) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const deltaX = (touch.clientX - this.startX) / this.scale;
                    const deltaY = (touch.clientY - this.startY) / this.scale;

                    if (this.isLandscapeMode) {
                        // 横屏模式，顺时针旋转90度，调整拖拽方向
                        this.translateX += deltaY; // 触摸Y方向增量映射到图像X轴
                        this.translateY -= deltaX; // 触摸X方向增量映射到图像负Y轴
                    } else {
                        this.translateX += deltaX;
                        this.translateY += deltaY;
                    }

                    this.restrictTranslate();
                    this.applyTransform();
                    // 更新startX和startY以确保下次移动连续
                    this.startX = touch.clientX;
                    this.startY = touch.clientY;
                }
            });

            modalImage.addEventListener('touchend', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    modalImage.style.transition = 'transform 0.1s ease-out';
                }
            });

            let initialDistance = 0;
            modalImage.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    initialDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
                }
            });

            modalImage.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
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
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const modalImage = document.getElementById(this.isLandscapeMode ? 'landscapeModalImage' : 'modalImage');
            const deltaX = (e.clientX - this.startX) / this.scale;
            const deltaY = (e.clientY - this.startY) / this.scale;

            if (this.isLandscapeMode) {
                // 横屏模式，顺时针旋转90度，调整拖拽方向
                this.translateX += deltaY; // 鼠标Y方向增量映射到图像X轴
                this.translateY -= deltaX; // 鼠标X方向增量映射到图像负Y轴
            } else {
                this.translateX += deltaX;
                this.translateY += deltaY;
            }

            this.restrictTranslate();
            this.applyTransform();
            // 更新startX和startY以确保下次移动连续
            this.startX = e.clientX;
            this.startY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                const modalImage = document.getElementById(this.isLandscapeMode ? 'landscapeModalImage' : 'modalImage');
                modalImage.style.cursor = 'grab';
                modalImage.style.transition = 'transform 0.1s ease-out';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());