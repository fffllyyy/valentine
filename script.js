const urlParams = new URLSearchParams(window.location.search);
const namaTarget = urlParams.get('name') || 'Citra';

document.getElementById('question-text').innerText = `${namaTarget}, will you be my valentine?`;

const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const imageDisplay = document.getElementById('image-display');
const questionText = document.getElementById('question-text');

// Variabel untuk ukuran font tombol Yes
let currentSize = 18; // Ukuran awal (sesuai CSS)

// Fungsi Tombol "No" Kabur + "Yes" Membesar
function geserTombol() {
    // 1. Logika Kabur (Sama seperti sebelumnya)
    const i = Math.floor(Math.random() * (window.innerWidth - 150)); // Jarak aman ditambah
    const j = Math.floor(Math.random() * (window.innerHeight - 150));
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = i + 'px';
    noBtn.style.top = j + 'px';

    // 2. Logika Membesar
    currentSize += 10; // Tambah 10px setiap kali mouse mendekat
    yesBtn.style.fontSize = currentSize + 'px';
    
    // Opsional: Ubah teks tombol Yes biar makin nge-gas
    if (currentSize > 40) yesBtn.innerText = "PLEASE YES! 😭";
    if (currentSize > 60) yesBtn.innerText = "HARUS YES!! 😡";
}

noBtn.addEventListener('mouseover', geserTombol); // Desktop
noBtn.addEventListener('click', geserTombol);    // Mobile

// Fungsi Tombol "Yes"
function terimaCinta() {
    imageDisplay.src = "ourfoto.gif"; // Pastikan file ini ada
    questionText.innerText = "Yeay! I love you! 💖";
    
    // Sembunyikan tombol
    document.querySelector('.button-group').style.display = 'none';

    // Panggil efek Confetti (Ini dari library yang kita tambah di HTML)
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Panggil efek Hati Beterbangan
    setInterval(createHeart, 300);
}

// Fungsi tambahan: Membuat Hati Beterbangan (Background effect)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Posisi horizontal acak
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Ukuran animasi acak
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    document.body.appendChild(heart);
    
    // Hapus elemen setelah animasi selesai agar memori tidak penuh
    setTimeout(() => {
        heart.remove();
    }, 5000);
}