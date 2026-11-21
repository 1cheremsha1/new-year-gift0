document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PHOTOS = 46; // Общее количество фото в папке asset
    let currentRandomIndex = 1;
    let currentLightboxIndex = 1;

    // Элементы главной страницы
    const randomPhotoBox = document.getElementById('random-photo-box');
    const randomPhotoImg = document.getElementById('random-photo');
    const heartBtn = document.getElementById('heart-btn');
    const greetingBox = document.getElementById('greeting-box');

    // Элементы навигации между экранами
    const homeView = document.getElementById('home-view');
    const albumView = document.getElementById('album-view');
    const openAlbumBtn = document.getElementById('open-album-btn');
    const backHomeBtn = document.getElementById('back-home-btn');
    const galleryGrid = document.getElementById('gallery-grid');

    // Элементы лайтбокса
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const prevPhotoBtn = document.getElementById('prev-photo');
    const nextPhotoBtn = document.getElementById('next-photo');

    // 1. Случайное фото на главной странице
    function showRandomPhoto() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * TOTAL_PHOTOS) + 1;
        } while (nextIndex === currentRandomIndex && TOTAL_PHOTOS > 1);

        currentRandomIndex = nextIndex;
        randomPhotoImg.classList.add('fade');

        setTimeout(() => {
            randomPhotoImg.src = `asset/${currentRandomIndex}.jpg`;
            randomPhotoImg.onload = () => {
                randomPhotoImg.classList.remove('fade');
            };
        }, 180);
    }

    // Ставим случайное фото при первом открытии сайта
    showRandomPhoto();

    // Смена фото по клику
    randomPhotoBox.addEventListener('click', showRandomPhoto);

    // Смена фото по свайпу на телефоне
    let touchStartX = 0;
    randomPhotoBox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    randomPhotoBox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchStartX - touchEndX) > 40) {
            showRandomPhoto();
        }
    }, { passive: true });

    // 2. Открытие/закрытие поздравления по нажатию на сердечко
    heartBtn.addEventListener('click', () => {
        greetingBox.classList.toggle('open');
        if (greetingBox.classList.contains('open')) {
            setTimeout(() => {
                greetingBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 250);
        }
    });

    // 3. Переключение между Главной и Альбомом
    openAlbumBtn.addEventListener('click', () => {
        homeView.classList.remove('active');
        albumView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backHomeBtn.addEventListener('click', () => {
        albumView.classList.remove('active');
        homeView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Генерация 46 фотографий в альбоме
    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = `asset/${i}.jpg`;
        img.alt = `Фото ${i}`;
        img.loading = 'lazy'; // Плавная загрузка при прокрутке

        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(i));
        galleryGrid.appendChild(item);
    }

    // 5. Полноэкранный просмотр (Лайтбокс)
    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
    }

    function updateLightbox() {
        lightboxImg.src = `asset/${currentLightboxIndex}.jpg`;
        lightboxCounter.textContent = `${currentLightboxIndex} / ${TOTAL_PHOTOS}`;
    }

    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    prevPhotoBtn.addEventListener('click', () => {
        currentLightboxIndex = currentLightboxIndex > 1 ? currentLightboxIndex - 1 : TOTAL_PHOTOS;
        updateLightbox();
    });

    nextPhotoBtn.addEventListener('click', () => {
        currentLightboxIndex = currentLightboxIndex < TOTAL_PHOTOS ? currentLightboxIndex + 1 : 1;
        updateLightbox();
    });

    // Закрытие лайтбокса по клику на тёмный фон
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 6. Лёгкий снегопад на фоне
    const snowContainer = document.getElementById('snow');
    for (let i = 0; i < 20; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = '❄';
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.fontSize = `${Math.random() * 10 + 10}px`;
        flake.style.opacity = Math.random() * 0.5 + 0.2;
        flake.style.animationDuration = `${Math.random() * 6 + 6}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(flake);
    }
});
