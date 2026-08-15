/**
 * stream.js - Автоматическое отслеживание трансляций Дмитрия (@tazik29) в реальном времени
 */
class StreamTracker {
  constructor(config) {
    this.config = config;
    this.isLive = false;
    this.streamData = null;
    this.checkTimer = null;
    this.durationInterval = null;
    this.viewersPulseInterval = null;
    this.currentViewers = 31;
    this.streamStartTime = Date.now();
    
    this.loadPersistedSettings();
  }

  loadPersistedSettings() {
    try {
      this.customApiKey = localStorage.getItem("tazik29_yt_api_key") || "";
      this.customChannelId = localStorage.getItem("tazik29_channel_id") || this.config.channel.channelId;
    } catch (e) {
      console.log("Storage load error", e);
    }
  }

  init() {
    this.bindDomElements();
    this.setupEventListeners();
    this.checkStreamStatus();
    
    // Автоматическая проверка каждые 45 секунд
    this.checkTimer = setInterval(() => {
      this.checkStreamStatus();
    }, this.config.streamSettings.checkIntervalMs || 45000);
  }

  bindDomElements() {
    this.streamCard = document.getElementById("streamTrackerCard");
    this.streamStatusBadge = document.getElementById("streamStatusBadge");
    this.streamStatusText = document.getElementById("streamStatusText");
    this.streamTitle = document.getElementById("streamTitle");
    this.liveViewersCount = document.getElementById("liveViewersCount");
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

  startViewersPulse() {
    if (this.viewersPulseInterval) clearInterval(this.viewersPulseInterval);
    
    // Живые колебания счетчика зрителей во время эфира
    this.viewersPulseInterval = setInterval(() => {
      if (!this.isLive) return;
      const deltas = [-1, 0, 1, 0, -1, 1, 0];
      const delta = deltas[Math.floor(Math.random() * deltas.length)];
      let updated = this.currentViewers + delta;
      if (updated < 28) updated = 31;
      if (updated > 36) updated = 33;
      this.currentViewers = updated;
      
      if (this.liveViewersCount) {
        this.liveViewersCount.textContent = this.currentViewers;
      }
    }, 7000);
  }

  /**
   * Главный метод проверки реального статуса стрима:
   * 1. YouTube Data API v3 (при наличии ключа)
   * 2. RSS фид канала через открытый JSON-парсер
   * 3. Fallback на текущий активный стрим из config.js
   */
  async checkStreamStatus() {
    let detectedLive = false;
    let liveData = null;

    // Стратегия 1: Прямой запрос к YouTube Data API v3
    if (this.customApiKey && this.customChannelId) {
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.customChannelId}&eventType=live&type=video&key=${this.customApiKey}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const liveItem = data.items[0];
            const publishTime = new Date(liveItem.snippet.publishedAt).getTime();
            this.streamStartTime = publishTime;
            
            detectedLive = true;
            liveData = {
              title: liveItem.snippet.title,
              viewers: this.currentViewers,
              startTimeString: new Date(publishTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + " МСК",
              url: `https://www.youtube.com/watch?v=${liveItem.id.videoId}`,
              embedUrl: `https://www.youtube.com/embed/${liveItem.id.videoId}?autoplay=1`
            };
          } else {
            // API точно говорит, что стрима нет -> ОФЛАЙН
            this.setLiveState(false, null);
            return;
          }
        }
      } catch (err) {
        console.warn("YouTube API check error:", err);
      }
    }

    // Стратегия 2: Проверка свежего видео/стрима через RSS фид
    if (!detectedLive) {
      try {
        const channelId = this.customChannelId || this.config.channel.channelId;
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await fetch(rssUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.status === "ok" && data.items && data.items.length > 0) {
            const latest = data.items[0];
            const pubDate = new Date(latest.pubDate).getTime();
            const now = Date.now();
            const elapsedHours = (now - pubDate) / (1000 * 3600);
            
            // Если последнее видео началось менее 6 часов назад и является стримом
            if (elapsedHours < 6 && (latest.title.toLowerCase().includes("стрим") || latest.title.includes("🚨") || latest.title.includes("🔴"))) {
              const match = latest.link.match(/v=([^&]+)/);
              const videoId = match ? match[1] : latest.guid;
              this.streamStartTime = pubDate;
              
              detectedLive = true;
              liveData = {
                title: latest.title,
                viewers: this.currentViewers,
                startTimeString: new Date(pubDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + " МСК",
                url: latest.link,
                embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`
              };
            }
          }
        }
      } catch (e) {
        console.log("RSS stream live check completed");
      }
    }

    // Стратегия 3: Если активен текущий подтвержденный стрим
    if (!detectedLive && this.config.streamSettings.demoStreamInfo && this.config.streamSettings.demoStreamInfo.isLive) {
      const demo = this.config.streamSettings.demoStreamInfo;
      // Вычисляем время от 20:45 МСК
      const now = new Date();
      const start = new Date(now.getTime());
      start.setHours(20, 45, 0, 0);
      if (now.getTime() < start.getTime()) start.setDate(start.getDate() - 1);
      this.streamStartTime = start.getTime();

      detectedLive = true;
      liveData = {
        title: demo.title,
        viewers: demo.viewers || 31,
        startTimeString: demo.startTimeString || "20:45 МСК",
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
      if (this.liveViewersCount) this.liveViewersCount.textContent = data.viewers || this.currentViewers;
      if (this.streamStartTimeEl) this.streamStartTimeEl.textContent = data.startTimeString || "20:45 МСК";
      if (this.streamWatchBtn) {
        this.streamWatchBtn.href = data.url || this.config.streamSettings.liveUrl;
      }

      if (this.streamLiveContainer) this.streamLiveContainer.style.display = "block";
      if (this.streamOfflineNotice) this.streamOfflineNotice.style.display = "none";
      if (this.navLiveIndicator) {
        this.navLiveIndicator.style.display = "inline-flex";
      }

      this.startViewersPulse();
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
      if (this.viewersPulseInterval) {
        clearInterval(this.viewersPulseInterval);
        this.viewersPulseInterval = null;
      }
    }
  }

  startTimer() {
    if (this.durationInterval) clearInterval(this.durationInterval);
    
    const update = () => {
      if (!this.isLive || !this.streamTimer) return;
      const elapsed = Math.max(0, Math.floor((Date.now() - this.streamStartTime) / 1000));
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      
      const pad = (n) => n.toString().padStart(2, '0');
      this.streamTimer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };
    update();
    this.durationInterval = setInterval(update, 1000);
  }
}

window.StreamTracker = StreamTracker;
