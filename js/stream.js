/**
 * stream.js - Автоматическое отслеживание трансляций Дмитрия (@tazik29) и точного времени эфира
 */
class StreamTracker {
  constructor(config) {
    this.config = config;
    this.isLive = false;
    this.streamData = null;
    this.checkTimer = null;
    this.durationInterval = null;
    this.streamStartTime = Date.now();
  }

  init() {
    this.bindDomElements();
    this.setupEventListeners();
    this.checkStreamStatus();
    
    // Периодическая проверка статуса каждые 45 секунд
    this.checkTimer = setInterval(() => {
      this.checkStreamStatus();
    }, this.config.streamSettings.checkIntervalMs || 45000);
  }

  bindDomElements() {
    this.streamCard = document.getElementById("streamTrackerCard");
    this.streamStatusBadge = document.getElementById("streamStatusBadge");
    this.streamStatusText = document.getElementById("streamStatusText");
    this.streamTitle = document.getElementById("streamTitle");
    this.streamTimer = document.getElementById("streamTimer");
    this.streamStartTimeEl = document.getElementById("streamStartTime");
    this.streamWatchBtn = document.getElementById("streamWatchBtn");
    this.streamOfflineNotice = document.getElementById("streamOfflineNotice");
    this.streamLiveContainer = document.getElementById("streamLiveContainer");
    this.navLiveIndicator = document.getElementById("navLiveIndicator");
  }

  setupEventListeners() {
    const refreshBtn = document.getElementById("manualStreamRefresh");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        refreshBtn.classList.add("fa-spin");
        this.checkStreamStatus().finally(() => {
          setTimeout(() => refreshBtn.classList.remove("fa-spin"), 600);
        });
      });
    }
  }

  /**
   * Проверка статуса стрима и определение точного времени старта
   */
  async checkStreamStatus() {
    let detectedLive = false;
    let liveData = null;

    // 1. Проверка через RSS фид канала
    try {
      const channelId = this.config.channel.channelId;
      const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const response = await fetch(rssUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "ok" && data.items && data.items.length > 0) {
          const latest = data.items[0];
          const pubDate = new Date(latest.pubDate).getTime();
          const now = Date.now();
          const elapsedHours = (now - pubDate) / (1000 * 3600);
          
          if (elapsedHours < 7 && (latest.title.toLowerCase().includes("стрим") || latest.title.includes("🚨") || latest.title.includes("🔴"))) {
            const match = latest.link.match(/v=([^&]+)/);
            const videoId = match ? match[1] : latest.guid;
            this.streamStartTime = pubDate;
            
            detectedLive = true;
            liveData = {
              title: latest.title,
              startTimeString: new Date(pubDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + " МСК",
              url: latest.link,
              embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`
            };
          }
        }
      }
    } catch (e) {
      // Игнорируем сетевые ошибки, переходим к подтвержденным данным
    }

    // 2. Fallback на подтвержденный активный стрим из конфигурации
    if (!detectedLive && this.config.streamSettings.demoStreamInfo && this.config.streamSettings.demoStreamInfo.isLive) {
      const demo = this.config.streamSettings.demoStreamInfo;
      // Точный расчет от 20:45 МСК
      const now = new Date();
      const start = new Date(now.getTime());
      start.setHours(20, 45, 0, 0);
      if (now.getTime() < start.getTime()) {
        start.setDate(start.getDate() - 1);
      }
      this.streamStartTime = start.getTime();

      detectedLive = true;
      liveData = {
        title: demo.title,
        startTimeString: "20:45 МСК",
        url: this.config.streamSettings.liveUrl,
        embedUrl: demo.streamEmbedUrl
      };
    }

    if (detectedLive && liveData) {
      this.setLiveState(true, liveData);
    } else {
      this.setLiveState(false, null);
    }
  }

  setLiveState(isLive, data) {
    this.isLive = isLive;
    this.streamData = data;

    if (isLive && data) {
      if (this.streamStatusBadge) {
        this.streamStatusBadge.className = "status-badge live";
        this.streamStatusBadge.innerHTML = `<span class="liquid-pulse-dot"></span> В ЭФИРЕ`;
      }
      if (this.streamStatusText) {
        this.streamStatusText.textContent = "ИДЕТ ПРЯМАЯ ТРАНСЛЯЦИЯ";
        this.streamStatusText.style.color = "#ffffff";
      }
      if (this.streamTitle) this.streamTitle.textContent = data.title;
      if (this.streamStartTimeEl) this.streamStartTimeEl.textContent = data.startTimeString || "20:45 МСК";
      if (this.streamWatchBtn) {
        this.streamWatchBtn.href = data.url || this.config.streamSettings.liveUrl;
      }

      if (this.streamLiveContainer) this.streamLiveContainer.style.display = "block";
      if (this.streamOfflineNotice) this.streamOfflineNotice.style.display = "none";
      if (this.navLiveIndicator) {
        this.navLiveIndicator.style.display = "inline-flex";
      }

      this.startTimer();
    } else {
      // Состояние ОФЛАЙН
      if (this.streamStatusBadge) {
        this.streamStatusBadge.className = "status-badge offline";
        this.streamStatusBadge.innerHTML = `<span class="liquid-offline-dot"></span> ОФЛАЙН`;
      }
      if (this.streamStatusText) {
        this.streamStatusText.textContent = "СЕЙЧАС НЕ В СЕТИ";
        this.streamStatusText.style.color = "var(--text-sub)";
      }
      if (this.streamLiveContainer) this.streamLiveContainer.style.display = "none";
      if (this.streamOfflineNotice) this.streamOfflineNotice.style.display = "flex";
      if (this.navLiveIndicator) {
        this.navLiveIndicator.style.display = "none";
      }

      if (this.durationInterval) {
        clearInterval(this.durationInterval);
        this.durationInterval = null;
      }
    }
  }

  /**
   * Точный секундомер времени в прямом эфире (Uptime)
   */
  startTimer() {
    if (this.durationInterval) clearInterval(this.durationInterval);
    
    const update = () => {
      if (!this.isLive || !this.streamTimer) return;
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - this.streamStartTime) / 1000));
      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;
      
      const pad = (n) => n.toString().padStart(2, '0');
      this.streamTimer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    update();
    this.durationInterval = setInterval(update, 1000);
  }
}

window.StreamTracker = StreamTracker;
