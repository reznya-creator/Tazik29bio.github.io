/**
 * Реальная конфигурация сайта Дмитрия (@tazik29)
 */
const SITE_CONFIG = {
  channel: {
    name: "Дмитрий (TAZIK29)",
    nickname: "TAZIK29",
    handle: "@tazik29",
    age: "35 лет",
    tagline: "Стример, исследователь Half-Life, Portal, Source Engine и лампового гейминга",
    youtubeUrl: "https://www.youtube.com/@tazik29",
    channelId: "UCdptt5hFGOuoZi9q1IR0Igv",
    avatarUrl: "https://yt3.googleusercontent.com/ytc/AIdro_lND8_70DrBfbt4-cPiBy5EOBk8jAaywkDxd8GeT1NgGIY=s900-c-k-c0x00ffffff-no-rj",
    bio: "Всем привет! Меня зовут Дмитрий (TAZIK29). Мне 35 лет, и я очень люблю игры и ламповое общение со зрителями. Мы регулярно исследуем легендарный Half-Life 2, Black Mesa, Portal, выискиваем секреты, пасхалки и баги движка Source, а также играем в кооперативы и ведем душевные стримы.",
    
    // Официальное расписание Дмитрия
    schedule: "С понедельника по четверг (Четверг — сетевой день)",
    scheduleNote: "Если я не стримлю, то в большинстве случаев я заболел или делаю видос, так что ждите =)",
    stats: {
      subscribers: "77.4K+",
      videos: "400+",
      views: "12.5M+"
    }
  },

  // Игровые сервера Дмитрия (TAZIK29 Community Servers)
  servers: [
    {
      name: "Left 4 Dead 2",
      icon: "fas fa-biohazard",
      ip: "46.174.52.5:27246",
      type: "source",
      game: "l4d2",
      desc: "Кооперативное выживание с чатом",
      connectUrl: "steam://connect/46.174.52.5:27246"
    },
    {
      name: "Synergy",
      icon: "fas fa-puzzle-piece",
      ip: "46.174.52.201:27016",
      type: "source",
      game: "synergy",
      desc: "Кооперативный Half-Life 2",
      connectUrl: "steam://connect/46.174.52.201:27016"
    },
    {
      name: "Black Mesa",
      icon: "fas fa-atom",
      ip: "46.174.52.201:27015",
      type: "source",
      game: "bms",
      desc: "Ремейк оригинального Half-Life",
      connectUrl: "steam://connect/46.174.52.201:27015"
    },
    {
      name: "Sven Co-op",
      icon: "fas fa-users-cog",
      ip: "62.122.215.96:27015",
      type: "source",
      game: "svencoop",
      desc: "Классический кооперативный Half-Life 1",
      connectUrl: "steam://connect/62.122.215.96:27015"
    },
    {
      name: "Team Fortress 2",
      icon: "fas fa-crosshairs",
      ip: "46.174.48.48:27228",
      type: "source",
      game: "tf2",
      desc: "Кастомные режимы и веселье",
      connectUrl: "steam://connect/46.174.48.48:27228"
    },
    {
      name: "Garry's Mod",
      icon: "fas fa-cubes",
      ip: "62.122.213.29:27015",
      type: "source",
      game: "gmod",
      desc: "Песочница и моды (Коллекция puk)",
      connectUrl: "steam://connect/62.122.213.29:27015",
      workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3190430156",
      workshopLabel: "Аддоны puk"
    },
    {
      name: "Day of Defeat: Source",
      icon: "fas fa-shield-alt",
      ip: "46.174.48.48:27207",
      type: "source",
      game: "dods",
      desc: "Ламповые сетевые бои Source",
      connectUrl: "steam://connect/46.174.48.48:27207"
    },
    {
      name: "Майнкрафт 1.16.5",
      icon: "fas fa-cube",
      ip: "projectT29.exaroton.me",
      type: "minecraft",
      game: "mc",
      desc: "Сервер подписчиков (Версия 1.16.5)",
      connectUrl: null
    },
    {
      name: "Roblox",
      icon: "fas fa-shapes",
      ip: "VIP Server TAZIK29",
      type: "roblox",
      game: "roblox",
      desc: "Общий игровой сервер Roblox",
      connectUrl: "https://www.roblox.com/share?code=dfbcaede84b2464e87905cac9ed91d7d&type=Server"
    }
  ],

  // Способы поддержки и донатов
  donations: [
    {
      name: "DonationAlerts",
      icon: "fas fa-donate",
      url: "https://www.donationalerts.com/r/tazik29",
      desc: "От 10 руб (Голосовое сообщение от 30 руб)",
      color: "#F7931A"
    },
    {
      name: "DonatePay",
      icon: "fas fa-wallet",
      url: "https://new.donatepay.ru/@TAZIK29",
      desc: "Альтернативный способ доната",
      color: "#00E676"
    },
    {
      name: "Streamlabs",
      icon: "fas fa-coins",
      url: "https://streamlabs.com/TAZIK29",
      desc: "Support the stream",
      color: "#31C3A2"
    }
  ],

  // Банковские карты Дмитрия
  bankCards: [
    {
      currency: "RUB",
      name: "Карта для РУБЛЕЙ",
      number: "4173980032489979",
      formatted: "4173 9800 3248 9979",
      icon: "fas fa-ruble-sign"
    },
    {
      currency: "USD",
      name: "Карта для ДОЛЛАРОВ",
      number: "4173980001070941",
      formatted: "4173 9800 0107 0941",
      icon: "fas fa-dollar-sign"
    }
  ],

  // Криптовалютные кошельки Дмитрия
  crypto: [
    {
      name: "TON",
      symbol: "TON",
      icon: "fas fa-gem",
      address: "UQComPW37SInh4inPwfKJGSW2I6BysoAOu5kygIaR_oLv_YN",
      color: "#0088CC"
    },
    {
      name: "USDT",
      symbol: "TRC-20",
      icon: "fas fa-dollar-sign",
      address: "TTxYSDNxjPaYYaUQR6EiXpYUvWNXDgzHd7",
      color: "#26A17B"
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "fab fa-bitcoin",
      address: "1Db6DrPd5E9JFb7ZxxsjnAZrrRBn2Mz9MZ",
      color: "#F7931A"
    }
  ],

  // Все реальные соцсети и сообщества Дмитрия
  socials: [
    { name: "Telegram", icon: "fab fa-telegram-plane", url: "https://t.me/tazik29", color: "#0088cc", badge: "Секретная инфа & Анонсы" },
    { name: "Группа VK", icon: "fab fa-vk", url: "https://vk.com/tazogaming", color: "#4C75A3", badge: "TazoGaming сообщество" },
    { name: "Страничка VK", icon: "fab fa-vk", url: "https://vk.com/tazik29", color: "#2787F5", badge: "Личная страница" },
    { name: "Беседа в VK", icon: "fas fa-comments", url: "https://vk.me/join/ygEXWZ8GBXlEBUVGz6OVht0vBVNfFE71GKQ=", color: "#5181B8", badge: "Чат подписчиков" },
    { name: "Discord", icon: "fab fa-discord", url: "https://discord.gg/GbH3FxQnmJ", color: "#5865F2", badge: "Сервер комьюнити" },
    { name: "Курилка Steam", icon: "fab fa-steam", url: "https://s.team/chat/X0QDtFN0", color: "#171a21", badge: "Чат в Steam" },
    { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@tazik29?lang=ru", color: "#FE2C55", badge: "Короткие клипы" },
    { name: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/tazik29/", color: "#E1306C", badge: "Фото и лайфстайл" },
    { name: "COUB", icon: "fas fa-play", url: "https://coub.com/tazik29tazik29", color: "#2980B9", badge: "Коубы & Мемы" }
  ],

  // Реальная конфигурация ПК Дмитрия
  setup: [
    { category: "Процессор", icon: "fas fa-microchip", spec: "Intel® Core™ i7-7700 (3.6 GHz)" },
    { category: "Видеокарта", icon: "fas fa-vr-cardboard", spec: "NVIDIA® GeForce® RTX 2080 Ti (11 GB)" },
    { category: "Материнская плата", icon: "fas fa-layer-group", spec: "MSI® B250 Gaming Pro Carbon" },
    { category: "Оперативная память", icon: "fas fa-memory", spec: "32 GB @Kingston® HyperX® FURY Black (DDR4, 2400 MHz)" },
    { category: "Корпус", icon: "fas fa-box", spec: "Zalman® Z9 Plus (Black) #легенда" },
    { category: "Операционная система", icon: "fab fa-windows", spec: "Microsoft® Windows® 10 Professional (x64)" }
  ],

  // Реальная информация о стриме
  streamSettings: {
    liveUrl: "https://www.youtube.com/watch?v=EKQWWik0lhY",
    checkIntervalMs: 45000,
    demoStreamInfo: {
      isLive: true,
      title: "🚨🔧ПОПУКИВАЯ ДЕЛАЕМ МОД СДЕЛКА С СУДЬБОЙ 2 / БАРЕБУХО-РЫБАЛКИНА-T1NINE - ПРЕДСТАВЛЯЕТ СТРИМ🔧🚨",
      tags: ["#легенда", "#HALFLIFE", "#ПРОХОЖДЕНИЕ"],
      viewers: 31,
      startTimeString: "20:45 МСК (4 часа назад)",
      streamEmbedUrl: "https://www.youtube.com/embed/EKQWWik0lhY?autoplay=1"
    }
  },

  // Реальные ролики Дмитрия с оригинальными превью
  featuredVideos: [
    {
      id: "tM400C9LK64",
      title: "ВСЕ О КРАСКЕ В HALF-LIFE 2 - РЕДКИЕ ДЕТАЛИ И СЕКРЕТЫ ИГРЫ #1",
      category: "reviews",
      duration: "12:25",
      views: "25K просмотров",
      date: "7 месяцев назад",
      thumbnail: "https://i.ytimg.com/vi/tM400C9LK64/hqdefault.jpg",
      description: "Глубокий разбор механик и скрытых деталей интерактивной краски в Half-Life 2."
    },
    {
      id: "_1FIcKiHCJo",
      title: "HALF-LIFE | ПРОБУЕМ ВСЕ 19 СПОСОБОВ УБИТЬ G-MAN",
      category: "reviews",
      duration: "16:11",
      views: "708K просмотров",
      date: "2 года назад",
      thumbnail: "https://i.ytimg.com/vi/_1FIcKiHCJo/hqdefault.jpg",
      description: "Экспериментируем со всеми возможными и невозможными способами устранения таинственного Джи-мэна!"
    },
    {
      id: "oyv_8Rx44qY",
      title: "128 ФАКТОВ И БАГОВ О ВЕРТОЛЕТЕ ИЗ HALF-LIFE 2",
      category: "reviews",
      duration: "55:29",
      views: "161K просмотров",
      date: "2 года назад",
      thumbnail: "https://i.ytimg.com/vi/oyv_8Rx44qY/hqdefault.jpg",
      description: "Огромное расследование: физика, скрытые триггеры, баги и тайны вертолета Альянса."
    },
    {
      id: "Mct2HQTnQn0",
      title: "HALF-LIFE 2 EP 2 | МОЖНО ЛИ СПАСТИ АЛИКС ОТ ОХОТНИКА?",
      category: "games",
      duration: "18:40",
      views: "538K просмотров",
      date: "4 года назад",
      thumbnail: "https://i.ytimg.com/vi/Mct2HQTnQn0/hqdefault.jpg",
      description: "Тестируем механики и скрипты в культовой сцене с нападением Охотника в Episode Two."
    },
    {
      id: "_uFeLSYr3nQ",
      title: "ЧТО ЕСЛИ!? | МОГУТ ЛИ NPC ИСПОЛЬЗОВАТЬ МОНТИРОВКУ В HL2?",
      category: "games",
      duration: "23:26",
      views: "435K просмотров",
      date: "3 года назад",
      thumbnail: "https://i.ytimg.com/vi/_uFeLSYr3nQ/hqdefault.jpg",
      description: "Проверяем искусственный интеллект персонажей на взаимодействие с главным оружием Гордона."
    },
    {
      id: "alfFQnZrUqM",
      title: "КАК ЛЕГАЛЬНО ПОЛУЧИТЬ ПИСТОЛЕТ АЛИКС В HALF-LIFE 2!?",
      category: "reviews",
      duration: "14:15",
      views: "361K просмотров",
      date: "4 года назад",
      thumbnail: "https://i.ytimg.com/vi/alfFQnZrUqM/hqdefault.jpg",
      description: "Секретный способ заполучить автоматический пистолет Аликс Вэнс без использования консольных читов."
    },
    {
      id: "5ej9eormWwk",
      title: "HALF-LIFE 2 EPISODE 2 | УБИВАЕМ G-MAN В СЦЕНЕ В ШАХТЕ",
      category: "reviews",
      duration: "15:31",
      views: "307K просмотров",
      date: "2 года назад",
      thumbnail: "https://i.ytimg.com/vi/5ej9eormWwk/hqdefault.jpg",
      description: "Невероятные глитчи и трюки, ломающие скриптовую сцену появления Джи-мэна."
    },
    {
      id: "CilZ1aztRwc",
      title: "🔴 100 СМЕРТЕЙ! 20 ЛЕТ HALF-LIFE 2 | SYNERGY КООПЕРАТИВНЫЙ СТРИМ",
      category: "streams",
      duration: "3:15:20",
      views: "8.4K просмотров",
      date: "Запись стрима",
      thumbnail: "https://i.ytimg.com/vi/CilZ1aztRwc/hqdefault.jpg",
      description: "Запись юбилейной прямой трансляции прохождения Half-Life 2 в кооперативе Synergy с чатом."
    },
    {
      id: "8R1cFZYSS94",
      title: "ВЫ НЕ ЗНАЛИ ЭТОГО 20 ЛЕТ! | СЕКРЕТЫ И ПАСХАЛКИ HALF-LIFE 2",
      category: "reviews",
      duration: "10:34",
      views: "41K просмотров",
      date: "1 год назад",
      thumbnail: "https://i.ytimg.com/vi/8R1cFZYSS94/hqdefault.jpg",
      description: "Редкие пасхалки, которые большинство игроков пропускали при первом и повторных прохождениях."
    },
    {
      id: "11Aq3a-6h7Q",
      title: "НУЖНА ЛИ В PORTAL КНОПКА НА ПЬЕДЕСТАЛЕ? | ЭКСПЕРИМЕНТЫ В APERTURE",
      category: "games",
      duration: "12:08",
      views: "122K просмотров",
      date: "4 года назад",
      thumbnail: "https://i.ytimg.com/vi/11Aq3a-6h7Q/hqdefault.jpg",
      description: "Проверяем возможность пройти тестовые камеры Portal без активации пьедестальных кнопок."
    }
  ]
};
