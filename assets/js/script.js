/**
 * OCTA.dev - Portofolio JavaScript Utama
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader & Scroll Progress
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    });

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const prog = document.getElementById('scroll-progress');
        if(prog) prog.style.width = scrolled + '%';

        // Back to top logic
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }

        // Header scroll effect
        const header = document.getElementById('main-header');
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 2. Navigation & Section Switching
    function handleNavigation() {
        let hash = window.location.hash || '#beranda';
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
        
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.add('active');
            document.querySelector(`.nav-item[href="${hash}"]`)?.classList.add('active');
        }
    }
    window.addEventListener('hashchange', handleNavigation);
    handleNavigation();

   // =========================================================
// 3. Dark/Light Mode (Versi Aman & Lengkap)
// =========================================================
const themeToggle = document.getElementById('theme-toggle');

// A. Terapkan tema yang tersimpan saat halaman pertama kali dimuat
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-sun';
    }
}

// B. Jalankan saat tombol diklik
themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = themeToggle.querySelector('i');

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (icon) icon.className = 'fa-solid fa-moon';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (icon) icon.className = 'fa-solid fa-sun';
    }
});

    // 4. Typing Effect
    const typedTextSpan = document.getElementById("typed-text");
    const words = ["Web Developer", "Network Engineer", "IoT Enthusiast", "Siswa RPL"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const currentWord = words[wordIndex];
        typedTextSpan.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        
        let speed = isDeleting ? 50 : 100;
        if(!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
        else if(isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
        setTimeout(type, speed);
    }
    if(typedTextSpan) setTimeout(type, 1000);

    // 5. Modal & Project Logic
    const projectModal = document.getElementById('projectModal');
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = btn.dataset.title;
            document.getElementById('modalCategory').textContent = btn.dataset.category;
            document.getElementById('modalImage').src = btn.dataset.image;
            document.getElementById('modalDesc').textContent = btn.dataset.desc;
            
            const techContainer = document.getElementById('modalTech');
            techContainer.innerHTML = '';
            btn.dataset.tech.split(', ').forEach(t => {
                const span = document.createElement('span');
                span.className = 'project-tech-tag';
                span.textContent = t;
                techContainer.appendChild(span);
            });
            projectModal.classList.add('active');
        });
    });
    
    document.getElementById('closeModal')?.addEventListener('click', () => projectModal.classList.remove('active'));

    // 6. Contact Form
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Pesan terkirim! Terima kasih telah menghubungi.");
    });
});
// =========================================================
// TAMBAHAN LOGIKA HAMBURGER MENU UNTUK TAMPILAN SMARTPHONE
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('main-nav');
    
    if (hamburgerBtn && navMenu) {
        // 1. Fungsi Toggle Menu (Buka / Tutup)
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show-mobile');
            
            // Ubah icon dari garis tiga (bars) menjadi silang (xmark)
            const icon = hamburgerBtn.querySelector('i');
            if (navMenu.classList.contains('show-mobile')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // 2. Menutup Menu Otomatis ketika salah satu menu (nav-item) diklik
        const navItems = navMenu.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('show-mobile');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
        
        // 3. Menutup Menu saat layar di-scroll
        window.addEventListener('scroll', () => {
            if (navMenu.classList.contains('show-mobile')) {
                navMenu.classList.remove('show-mobile');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }
});