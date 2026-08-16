/**
 * app.js - Основная логика сайта Дмитрия @tazik29
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Инициализация трекера стрима
  const streamTracker = new StreamTracker(SITE_CONFIG);
  streamTracker.init();

  // 2. Инициализация Liquid Glass эффектов и интерактивного курсора
  initLiquidGlassInteractions();
  initLiquidCursor();

  // 3. Рендеринг данных
  initBioData();
  initServers();
  initDonations();
  initBankCards();
  initCrypto();
  initSocials();
  initSetupGrid();
  initVideos();
  initModalPlayer();
  initSmoothScroll();
  initScrollReveal();
});

/**
 * Инициализация био и расписания
 */
function initBioData() {
  const scheduleEl = document.getElementById("streamScheduleBadge");
  if (scheduleEl) {
    scheduleEl.textContent = SITE_CONFIG.channel.schedule;
  }
}

/**
 * Игровые сервера Дмитрия (TAZIK29 Community Servers)
 */
function initServers() {
  const grid = document.getElementById("serversGrid");
  if (!grid || !SITE_CONFIG.servers) return;

  grid.innerHTML = SITE_CONFIG.servers.map(server => {
    let connectBtnHtml = "";
    if (server.connectUrl && server.type === "source") {
      connectBtnHtml = `
        <a href="${server.connectUrl}" class="btn-server-connect">
          <i class="fab fa-steam"></i> Подключиться
        </a>
      `;
    } else if (server.connectUrl && server.type === "roblox") {
      connectBtnHtml = `
        <a href="${server.connectUrl}" target="_blank" rel="noopener noreferrer" class="btn-server-connect">
          <i class="fas fa-play"></i> Зайти в Roblox
        </a>
      `;
    } else if (server.type === "minecraft") {
      connectBtnHtml = `
        <button class="btn-server-connect" onclick="copyText('${server.ip}', 'IP сервера Майнкрафт скопирован!')">
          <i class="fas fa-cube"></i> Скопировать IP
        </button>
      `;
    }

    const copyBtnHtml = `
      <button class="btn-server-copy" onclick="copyText('${server.ip}', 'IP ${server.name} скопирован!')" title="Скопировать IP">
        <i class="far fa-copy"></i>
      </button>
    `;

    const workshopBtnHtml = server.workshopUrl ? `
      <a href="${server.workshopUrl}" target="_blank" rel="noopener noreferrer" class="btn-workshop-link" title="Коллекция модов в Steam Workshop">
        <i class="fab fa-steam-symbol"></i> ${server.workshopLabel || "Аддоны"}
      </a>
    ` : "";

    return `
      <div class="server-card liquid-glass">
        <div>
          <div class="server-head">
            <div class="server-icon">
              <i class="${server.icon}"></i>
            </div>
            <div class="server-title-group">
              <div class="server-title">${server.name}</div>
              <div class="server-desc">${server.desc}</div>
            </div>
          </div>
        </div>

        <div>
          <div class="server-ip-box">
            <span class="server-ip-code">${server.ip}</span>
            <div style="display: flex; gap: 6px;">
              ${copyBtnHtml}
            </div>
          </div>

          <div class="server-actions-row" style="margin-top: 12px;">
            ${connectBtnHtml}
            ${workshopBtnHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Способы поддержки (DonationAlerts, DonatePay, Streamlabs)
 */
function initDonations() {
  const donationsGrid = document.getElementById("donationsGrid");
  if (!donationsGrid || !SITE_CONFIG.donations) return;

  donationsGrid.innerHTML = SITE_CONFIG.donations.map(don => `
    <a href="${don.url}" target="_blank" rel="noopener noreferrer" class="donation-card liquid-glass" style="--don-color: ${don.color};">
      <div class="donation-icon">
        <i class="${don.icon}"></i>
      </div>
      <div class="donation-info">
        <div class="donation-name">${don.name}</div>
        <div class="donation-desc">${don.desc}</div>
      </div>
      <div class="donation-arrow">
        <i class="fas fa-chevron-right"></i>
      </div>
    </a>
  `).join("");
}

/**
 * Две банковские карты (RUB и USD)
 */
function initBankCards() {
  const container = document.getElementById("bankCardsGrid");
  if (!container || !SITE_CONFIG.bankCards) return;

  container.innerHTML = SITE_CONFIG.bankCards.map(card => `
    <div class="bank-card-widget liquid-glass">
      <div class="bank-card-header">
        <div class="chip-icon"></div>
        <div class="card-brand-logo"><i class="${card.icon}"></i> ${card.currency} DIRECT</div>
      </div>
      <div class="card-number-box">
        <div class="card-number-label">
          <i class="${card.icon}"></i> ${card.name}
        </div>
        <div class="card-number-value">${card.formatted}</div>
      </div>
      <div class="card-footer-row">
        <div class="card-note">Прямой перевод по номеру</div>
        <button class="btn-copy-card" onclick="copyText('${card.number}', 'Номер карты (${card.currency}) скопирован!')">
          <i class="far fa-copy"></i> Скопировать
        </button>
      </div>
    </div>
  `).join("");
}

/**
 * Криптовалютные кошельки (TON, USDT TRC-20, BTC)
 */
function initCrypto() {
  const cryptoGrid = document.getElementById("cryptoGrid");
  if (!cryptoGrid || !SITE_CONFIG.crypto) return;

  cryptoGrid.innerHTML = SITE_CONFIG.crypto.map(c => `
    <div class="crypto-card liquid-glass">
      <div class="crypto-icon-box" style="--crypto-color: ${c.color};">
        <i class="${c.icon}"></i>
      </div>
      <div class="crypto-info">
        <div class="crypto-header-row">
          <span class="crypto-name">${c.name}</span>
          <span class="crypto-badge">${c.symbol}</span>
        </div>
        <div class="crypto-address" title="${c.address}">${c.address}</div>
      </div>
      <button class="btn-copy-crypto" onclick="copyText('${c.address}', 'Адрес ${c.name} (${c.symbol}) скопирован!')" title="Скопировать адрес кошелька">
        <i class="far fa-copy"></i>
      </button>
    </div>
  `).join("");
}

/**
 * Универсальная функция копирования текста в буфер обмена
 */
window.copyText = function(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || "Скопировано в буфер обмена!");
  }).catch(() => {
    showToast("Не удалось скопировать");
  });
};

/**
 * Интерактивные отражения и 3D-эффект жидкого стекла
 */
function initLiquidGlassInteractions() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".liquid-glass, .video-card, .social-card, .setup-card, .donation-card, .bank-card-widget, .server-card, .crypto-card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/**
 * Жидкий курсорный ореол
 */
function initLiquidCursor() {
  const cursorGlow = document.getElementById("liquidCursorGlow");
  if (!cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * Социальные сети и сообщества
 */
function initSocials() {
  const container = document.getElementById("socialsContainer");
  const heroSocials = document.getElementById("heroSocials");
  if (!SITE_CONFIG.socials) return;

  if (container) {
    container.innerHTML = SITE_CONFIG.socials.map(soc => `
      <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="social-card liquid-glass" style="--soc-color: ${soc.color};">
        <div class="social-icon">
          <i class="${soc.icon}"></i>
        </div>
        <div class="social-info">
          <span class="social-name">${soc.name}</span>
          <span class="social-badge">${soc.badge}</span>
        </div>
        <div class="social-arrow">
          <i class="fas fa-external-link-alt"></i>
        </div>
      </a>
    `).join("");
  }

  if (heroSocials) {
    const quickLinks = SITE_CONFIG.socials.slice(0, 5);
    heroSocials.innerHTML = quickLinks.map(soc => `
      <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="hero-soc-btn" title="${soc.name}">
        <i class="${soc.icon}"></i>
      </a>
    `).join("");
  }
}

/**
 * Конфигурация ПК Дмитрия
 */
function initSetupGrid() {
  const grid = document.getElementById("setupGrid");
  if (!grid || !SITE_CONFIG.setup) return;

  grid.innerHTML = SITE_CONFIG.setup.map(item => `
    <div class="setup-card liquid-glass">
      <div class="setup-icon-box">
        <i class="${item.icon}"></i>
      </div>
      <div>
        <div class="setup-category">${item.category}</div>
        <div class="setup-spec">${item.spec}</div>
      </div>
    </div>
  `).join("");
}

/**
 * Модуль видео: отображение реальных видео и фильтрация
 */
let allVideos = [];
let currentCategory = "all";

async function initVideos() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  allVideos = SITE_CONFIG.featuredVideos;

  try {
    const channelId = SITE_CONFIG.channel.channelId;
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(rssUrl, { cache: "no-cache" });
    if (response.ok) {
      const data = await response.json();
      if (data.status === "ok" && data.items && data.items.length > 0) {
        const fetchedVideos = data.items.map(item => {
          const match = item.link.match(/v=([^&]+)/);
          const videoId = match ? match[1] : item.guid;
          return {
            id: videoId,
            title: item.title,
            category: item.title.toLowerCase().includes("стрим") ? "streams" : "reviews",
            duration: "YouTube",
            views: "Свежее",
            date: new Date(item.pubDate).toLocaleDateString("ru-RU", { day: 'numeric', month: 'short' }),
            thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            description: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 120) + "..." : "Смотрите свежее видео Дмитрия на канале @tazik29"
          };
        });
        allVideos = [...fetchedVideos, ...SITE_CONFIG.featuredVideos];
      }
    }
  } catch (err) {
    allVideos = SITE_CONFIG.featuredVideos;
  }

  const seen = new Set();
  allVideos = allVideos.filter(el => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });

  renderVideos();
  setupFilterTabs();
}

function renderVideos() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  const filtered = currentCategory === "all" 
    ? allVideos 
    : allVideos.filter(v => v.category === currentCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-videos"><i class="fas fa-film"></i><p>В этой категории пока нет видео.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(v => `
    <div class="video-card liquid-glass" data-video-id="${v.id}">
      <div class="video-thumb-wrap" onclick="openVideoModal('${v.id}', '${v.title.replace(/'/g, "\\'")}')">
        <img src="${v.thumbnail}" alt="${v.title}" class="video-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=80'">
        <span class="video-duration">${v.duration}</span>
        <div class="play-overlay">
          <div class="play-btn-circle">
            <i class="fas fa-play"></i>
          </div>
        </div>
      </div>
      <div class="video-body">
        <h3 class="video-title" title="${v.title}">${v.title}</h3>
        <div class="video-meta">
          <span><i class="far fa-eye"></i> ${v.views}</span>
          <span><i class="far fa-clock"></i> ${v.date}</span>
        </div>
        <p class="video-desc">${v.description}</p>
        <div class="video-actions">
          <button class="btn-play-modal" onclick="openVideoModal('${v.id}', '${v.title.replace(/'/g, "\\'")}')">
            <i class="fas fa-play"></i> Смотреть
          </button>
          <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" class="btn-yt-link" title="Открыть на YouTube">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  `).join("");
  
  if (typeof initScrollReveal === "function") {
    initScrollReveal();
  }
}

function setupFilterTabs() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderVideos();
    });
  });
}

/**
 * Модальный видеоплеер
 */
function initModalPlayer() {
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const iframe = document.getElementById("modalIframe");

  if (!modal) return;

  function closeModal() {
    modal.classList.remove("active");
    if (iframe) iframe.src = "";
    document.body.style.overflow = "auto";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

window.openVideoModal = function(videoId, title) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("modalIframe");
  const titleEl = document.getElementById("modalVideoTitle");
  const ytLink = document.getElementById("modalYtLink");

  if (!modal || !frame) return;

  frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  if (titleEl) titleEl.textContent = title;
  if (ytLink) ytLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

function showToast(msg) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "site-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Glass Scroll Reveal: двунаправленная анимация появления блоков при скролле вниз и вверх
 */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".hero-bio-card, .hero-stream-card, .section-head, .server-card, .donation-card, .bank-card-widget, .crypto-card, .video-card, .setup-card, .social-card, .creator-credit-badge"
  );

  targets.forEach((el) => {
    if (!el.classList.contains("reveal-on-scroll")) {
      el.classList.add("reveal-on-scroll");

      // Добавление каскадных задержек для соседних элементов в сетке
      if (el.parentElement) {
        const siblings = Array.from(el.parentElement.children);
        const index = siblings.indexOf(el);
        const delayClass = `reveal-delay-${(index % 8) + 1}`;
        el.classList.add(delayClass);
      }
    }
  });

  // Отслеживание направления скролла страницы (вниз / вверх)
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) {
      document.body.classList.add("scroll-direction-up");
      document.body.classList.remove("scroll-direction-down");
    } else {
      document.body.classList.add("scroll-direction-down");
      document.body.classList.remove("scroll-direction-up");
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
      } else {
        // Когда блок полностью уходит из видимой области (сверху или снизу),
        // сбрасываем класс, чтобы при обратном скролле он снова мягко проявился
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          entry.target.classList.remove("is-revealed");
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "20px 0px 20px 0px"
  });

  targets.forEach(el => {
    observer.observe(el);
  });
}


