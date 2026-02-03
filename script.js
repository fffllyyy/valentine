const urlParams = new URLSearchParams(window.location.search);
const namaTarget = urlParams.get('name') || 'Citra';

// Update teks HTML
document.getElementById('question-text').innerText = `${namaTarget}, will you be my valentine?`;

const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const imageDisplay = document.getElementById('image-display');
const questionText = document.getElementById('question-text');

// Variabel state
let scaleFactor = 1; // Ukuran awal tombol Yes (1 = 100%)

// Fungsi Tombol "No" Kabur (Versi Mobile Friendly & Tidak Jauh)
function geserTombol() {
    // 1. Ambil ukuran layar & tombol saat ini
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // 2. Tentukan jarak lompatan maksimal (misal: 100px ke segala arah)
    // Angka 80 bisa diubah. Semakin kecil, semakin pendek lompatnya.
    const maxMove = 80; 
    
    // 3. Cari posisi sekarang. Jika belum ada (awal), pakai posisi dari layar.
    const currentX = parseFloat(noBtn.style.left) || noBtn.getBoundingClientRect().left;
    const currentY = parseFloat(noBtn.style.top) || noBtn.getBoundingClientRect().top;

    // 4. Hitung posisi baru secara acak (plus atau minus dari posisi sekarang)
    let newX = currentX + ((Math.random() * maxMove * 2) - maxMove);
    let newY = currentY + ((Math.random() * maxMove * 2) - maxMove);

    // 5. BATASAN (Boundary Check) agar tidak keluar layar HP
    // Batas Kiri & Atas (min 10px biar gak nempel pinggir)
    if (newX < 10) newX = 10;
    if (newY < 10) newY = 10;

    // Batas Kanan & Bawah
    const maxX = window.innerWidth - btnWidth - 10;
    const maxY = window.innerHeight - btnHeight - 10;
    
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    // 6. Terapkan posisi baru
    noBtn.style.position = 'absolute'; // Wajib set absolute biar bisa gerak bebas
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // 7. Logika Tombol Yes Membesar (Pakai Scale biar mulus)
    scaleFactor += 0.2; // Nambah 20% setiap kali tombol No diklik/disentuh
    yesBtn.style.transform = `scale(${scaleFactor})`;
    yesBtn.style.transition = `transform 0.2s ease`; // Animasi halus

    // Opsional: Ubah teks jika sudah terlalu besar
    if (scaleFactor > 2) yesBtn.innerText = "MAU DONG! 😭";
    if (scaleFactor > 3) yesBtn.innerText = "HARUS IYA!! 😡";
}

// EVENT LISTENER (PENTING UNTUK HP)

// 1. Untuk Desktop (Mouse Hover)
noBtn.addEventListener('mouseover', geserTombol);

// 2. Untuk HP (Touch) - Gunakan 'touchstart' agar responsif tanpa delay
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Mencegah zoom atau scroll tidak sengaja
    geserTombol();
});

// Fungsi Tombol "Yes" (Happy Ending)
function terimaCinta() {
    // Ganti gambar (Pastikan file ada)
    imageDisplay.src = "ourfoto.gif"; 
    
    // Ganti teks
    questionText.innerText = "Yeay! I love you! 💖";
    
    // Sembunyikan tombol
    document.querySelector('.button-group').style.display = 'none';

    // Efek Confetti (Jalankan jika library sudah dipasang di HTML)
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Efek Hati
    setInterval(createHeart, 300);
}

// Fungsi Hati Beterbangan
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}



