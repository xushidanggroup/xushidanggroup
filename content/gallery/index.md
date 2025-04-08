---
title: "Gallery"
type: landing
layout: gallery
---

<h2>2025</h2>
<div class="gallery-thumbnails" id="thumbnails2025"></div>
<h2>2024</h2>
<div class="gallery-thumbnails" id="thumbnails2024"></div>

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

<script src="/js/gallery.min.js"></script>