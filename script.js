/* ==========================================================================
   TAZIK29 Website Dynamic JavaScript
   Includes: Embedded YouTube Live Chat Iframe, Automatic Live Title Polling
   ========================================================================== */

const CHANNEL_LIVE_URL = 'https://www.youtube.com/@tazik29/live';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initVideoFilters();
    initSmoothScroll();
    initMobileMenu();
    initYouTubeCardLiveChatDomain();
    
    // Initial fetch of real live stream status & title
    fetchRealYouTubeLiveStreamData();

    // Auto-update stream status every 30 seconds
    setInterval(() => {
        fetchRealYouTubeLiveStreamData(true);
    }, 30000);
});

/* ================= YOUTUBE LIVE CHAT DOMAIN INJECTOR FOR CARD IFRAME ================= */
function initYouTubeCardLiveChatDomain() {
    const cardIframe = document.getElementById('card-yt-live-chat');
    if (cardIframe) {
        const domain = window.location.hostname || 'localhost';
        cardIframe.src = `https://www.youtube.com/live_chat?v=jvNtjL9qEAc&embed_domain=${domain}`;
    }
}

function popoutWindowChat() {
    const domain = window.location.hostname || 'localhost';
    const chatUrl = `https://www.youtube.com/live_chat?v=jvNtjL9qEAc&embed_domain=${domain}`;
    
    // Open dedicated standalone popup window
    window.open(chatUrl, 'TAZIK29LiveChat', 'width=420,height=680,resizable=yes,scrollbars=yes,status=no,toolbar=no');
    showToast('<i class="fa-solid fa-arrow-up-right-from-square"></i> Чат открыт в отдельном окне браузера!');
}

/* ================= AUTOMATIC REAL YOUTUBE LIVE TITLE & STATUS FETCHER ================= */
async function fetchRealYouTubeLiveStreamData(isSilent = false) {
    const bioStatusText = document.getElementById('bio-status-text');
    const bioPulseDot = document.getElementById('bio-pulse-dot');
    const bioStatusPill = document.getElementById('bio-stream-status-pill');

    const headerStatusBadge = document.getElementById('header-status-badge');
    const headerStatusDot = document.getElementById('header-status-dot');

    const streamTitleText = document.getElementById('stream-title-text');
    const streamDesc = document.getElementById('current-stream-desc');
    const titleStatusIcon = document.getElementById('title-status-icon');

    try {
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(CHANNEL_LIVE_URL)}`);
        
        if (response.ok) {
            const data = await response.json();

            // Check if active live stream was found
            if (data && data.title && data.type === 'video') {
                const realTitle = data.title;

                // SWITCH UI TO LIVE STATE
                if (streamTitleText) streamTitleText.textContent = realTitle;
                if (titleStatusIcon) titleStatusIcon.style.color = 'var(--md-sys-color-error)';

                if (bioStatusText) bioStatusText.textContent = "🔴 В ЭФИРЕ: ИДЁТ СТРИМ!";
                if (bioStatusPill) {
                    bioStatusPill.className = "hero-badge-live live-pill";
                    bioStatusPill.style.background = "rgba(255, 82, 82, 0.15)";
                    bioStatusPill.style.borderColor = "rgba(255, 82, 82, 0.4)";
                    bioStatusPill.style.color = "var(--md-sys-color-error)";
                }
                if (bioPulseDot) bioPulseDot.className = "pulse-dot-red";

                if (headerStatusBadge) headerStatusBadge.textContent = "🔴 В ЭФИРЕ СЕЙЧАС И ЧАТ YOUTUBE";
                if (headerStatusDot) headerStatusDot.className = "pulse-dot-red";

                if (streamDesc) {
                    streamDesc.textContent = `Прямой эфир "${realTitle}" идет прямо сейчас! Настоящий чат YouTube встроен справа.`;
                }

                if (!isSilent) {
                    showToast(`<i class="fa-solid fa-satellite-dish"></i> Найдена трансляция: <strong>${escapeHtml(realTitle)}</strong>`);
                }
                return;
            }
        }
    } catch (err) {
        console.log("YouTube live fetch info:", err);
    }

    // DEFAULT / OFFLINE STATE
    if (bioStatusText) bioStatusText.textContent = "⚫ СТАТУС: ОФФЛАЙН";
    if (bioStatusPill) {
        bioStatusPill.className = "hero-badge-live offline-pill";
        bioStatusPill.style.background = "var(--md-sys-color-surface-container-highest)";
        bioStatusPill.style.borderColor = "var(--md-sys-color-outline-variant)";
        bioStatusPill.style.color = "var(--md-sys-color-on-surface-variant)";
    }
    if (bioPulseDot) bioPulseDot.className = "pulse-dot-offline";

    if (headerStatusBadge) headerStatusBadge.textContent = "⚫ СТАТУС: ОФФЛАЙН (Стрим сейчас не идет)";
    if (headerStatusDot) headerStatusDot.className = "pulse-dot-offline";

    if (streamTitleText) streamTitleText.textContent = "Трансляция TAZIK29 (Автор оффлайн)";
    if (titleStatusIcon) titleStatusIcon.style.color = 'var(--md-sys-color-outline)';

    if (streamDesc) {
        streamDesc.textContent = "Стрим сейчас не идет. Когда TAZIK29 запустит эфир на YouTube, он автоматически появится в этом плеере!";
    }
}

/* ================= COPY IP TOAST FUNCTION ================= */
function copyIP(ipAddress, serverName) {
    navigator.clipboard.writeText(ipAddress).then(() => {
        showToast(`<i class="fa-solid fa-circle-check"></i> IP сервера <strong>${serverName}</strong> скопирован: <code>${ipAddress}</code>`);
    }).catch(err => {
        const textarea = document.createElement('textarea');
        textarea.value = ipAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`<i class="fa-solid fa-circle-check"></i> IP <strong>${serverName}</strong> скопирован в буфер!`);
    });
}

function showToast(messageHtml) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = messageHtml;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3500);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ================= VIDEO CATEGORY FILTERING ================= */
function initVideoFilters() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const videoCards = document.querySelectorAll('.video-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            videoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ================= SMOOTH SCROLL & ACTIVE NAVBAR ================= */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ================= MOBILE MENU TOGGLE ================= */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#141218';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderBottom = '1px solid rgba(255,183,77,0.3)';
            }
        });
    }
}

/* ================= CANVAS PARTICLES BACKGROUND ================= */
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.floor(width / 30);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.4 ? 'rgba(255, 183, 77, ' : 'rgba(77, 208, 225, ',
            alpha: Math.random() * 0.4 + 0.1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color + '0.8)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
