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
        modalImage.style.transform = `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
    }

    updateCursorStyle() {
        const modalImage = document.getElementById('modalImage');
        modalImage.style.cursor = this.scale > 1 ? 'grab' : 'default';
    }

    restrictTranslate() {
        const modalContent = document.querySelector('.modal-content');
        const modalImage = document.getElementById('modalImage');
        const containerRect = modalContent.getBoundingClientRect();
        const imageRect = modalImage.getBoundingClientRect();

        const scaledWidth = imageRect.width * this.scale;
        const scaledHeight = imageRect.height * this.scale;

        if (scaledWidth <= containerRect.width) this.translateX = 0;
        if (scaledHeight <= containerRect.height) this.translateY = 0;

        const maxX = (containerRect.width - scaledWidth) / (2 * this.scale);
        const minX = -maxX;
        const maxY = (containerRect.height - scaledHeight) / (2 * this.scale);
        const minY = -maxY;

        if (scaledWidth > containerRect.width) {
            this.translateX = Math.max(Math.min(this.translateX, maxX), minX);
        } else {
            this.translateX = 0;
        }
        if (scaledHeight > containerRect.height) {
            this.translateY = Math.max(Math.min(this.translateY, maxY), minY);
        } else {
            this.translateY = 0;
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('modal');
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.showPreviousImage();
                else if (e.key === 'ArrowRight') this.showNextImage();
                else if (e.key === 'Escape') this.closeModal();
            }
        });

        document.getElementById('modal').addEventListener('click', (e) => {
            const modalContent = document.querySelector('.modal-content');
            if (!modalContent.contains(e.target)) this.closeModal();
        });

        document.getElementById('modal').addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            const newScale = this.scale + delta;
            this.scale = Math.min(Math.max(1, newScale), 3);
            
            if (this.scale <= 1) {
                this.resetImageTransform();
            } else {
                this.restrictTranslate();
                this.applyTransform();
                this.updateCursorStyle();
            }
        });

        document.getElementById('modalImage').addEventListener('mousedown', (e) => {
            if (this.scale <= 1) return;
            e.preventDefault();
            this.isDragging = true;
            const rect = document.getElementById('modalImage').getBoundingClientRect();
            this.startX = e.clientX / this.scale - this.translateX;
            this.startY = e.clientY / this.scale - this.translateY;
            document.getElementById('modalImage').style.cursor = 'grabbing';
            document.getElementById('modalImage').style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const rect = document.getElementById('modalImage').getBoundingClientRect();
            this.translateX = e.clientX / this.scale - this.startX;
            this.translateY = e.clientY / this.scale - this.startY;
            this.restrictTranslate();
            this.applyTransform();
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                document.getElementById('modalImage').style.cursor = 'grab';
                document.getElementById('modalImage').style.transition = 'transform 0.1s ease-out';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Gallery());