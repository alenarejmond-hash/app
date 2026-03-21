import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Send, Fingerprint, Sparkles, Lock, Key, 
  ArrowRight, Compass, Flame, Brain, Camera, Star, X, Sun, Moon, Play, Heart, Check
} from 'lucide-react';

// =========================================================================
// 🛠 ЗОНА НАСТРОЕК: МЕНЯЙТЕ СВОИ ДАННЫЕ, ФОТО И ТЕКСТЫ ЗДЕСЬ
// =========================================================================
const CONFIG = {
  // 1. Главное фото (которое проявляется по удержанию пальца)
  heroPhoto: "https://i.postimg.cc/R0GhWRGz/unnamed.jpg",
  
  // 2. Имя в самом верху (статус-бар)
  headerName: "DESIGN & CODE BY ELENA SOTNIKOVA",

  // 3. Текст на главном экране (Манифест)
  heroTitle1: "Elena",
  heroTitle2: "Sotnikova",
  heroSubtitle: "Не просто визитка, а ваш главный цифровой актив...",
  heroHintLine1: "Задержи палец,",
  heroHintLine2: "чтобы увидеть автора",

  // 4. Блок "The Mastermind" (Текст о вас в самом низу)
  mastermindName: "Elena Sotnikova",
  mastermindBio: "Я не просто пишу код. Я создаю цифровое искусство. Моя задача — находить нестандартные решения там, где другие используют шаблоны. Глубокое понимание бизнес-задач и эстетика в каждом пикселе.",

  // 5. Кнопка связи и подвал (Футер)
  ctaText: "Заказать свой Digital-мир",
  footerText: "Design & Code by Elena Sotnikova",
  linkTelegram: "https://t.me/your_telegram", // Вставьте свою ссылку на Telegram
  linkGithub: "https://github.com/alenarejmond-hash", // Вставьте свою ссылку на GitHub

  // 6. Галерея (Мои работы) - ТЕПЕРЬ С ПОДДЕРЖКОЙ ВИДЕО!
  // 👇 ПОДСКАЗКА ОТ ИИ:
  // title - Название проекта на карточке (например: "Шоурил 2024")
  // desc - Короткое описание под названием (например: "Главное видео")
  // icon - Иконка проекта (Можно писать: Compass, Heart, Flame, Star, Camera, Sparkles)
  // videoId - ID видео на RuTube. Это набор букв и цифр из ссылки!
  //           Например, в ссылке rutube.ru/video/611bc8031620c28329867b1943f4d0d9/ --> ID это 611bc8031620c28329867b1943f4d0d9
  // Если видео пока нет, оставьте "demo1", "demo2" и т.д., чтобы была красивая заглушка.
  portfolio: [
    { title: "Шоурил 2024", desc: "Главное видео", icon: Compass, videoId: "611bc8031620c28329867b1943f4d0d9" },
    { title: "Психолог", desc: "Скоро...", icon: Heart, videoId: "demo1" },
    { title: "Fire Show", desc: "Скоро...", icon: Flame, videoId: "demo2" },
    { title: "Проект 4", desc: "В разработке", icon: Star, videoId: "demo3" },
    { title: "Проект 5", desc: "В разработке", icon: Camera, videoId: "demo4" },
    { title: "Проект 6", desc: "В разработке", icon: Sparkles, videoId: "demo5" },
  ],

  // 7. Инвестиции (Тарифы) в стиле Apple Wallet
  // 👇 ПОДСКАЗКА ОТ ИИ:
  // id - НЕ ТРОГАТЬ! (отвечает за магию анимаций)
  // title - Крупное название тарифа
  // subtitle - Мелкий текст над названием
  // price - Строка с ценой
  // features - Список того, что входит в тариф. Каждая фраза пишется в одинарных кавычках '...' через запятую!
  tariffs: [
    {
      id: 'base', 
      title: 'Signature Base',
      subtitle: 'Авторская архитектура',
      price: 'от 50 000 ₽',
      features: ['Premium-шаблон из моей базы', 'Адаптация под ваш бренд', 'Запуск за 3-5 дней', 'Базовые Haptic-эффекты'],
    },
    {
      id: 'custom',
      title: 'Full Custom',
      subtitle: 'Haute Couture в коде',
      price: 'от 150 000 ₽',
      features: ['Дизайн с чистого листа', 'Сложные 3D и WebGL эффекты', 'Нестандартные анимации', 'Эксклюзивные механики'],
    }
  ],

  // 8. Отзывы (Reviews)
  reviews: [
    { name: "Алексей", date: "15.03.2024", text: "Дизайн просто космос. Клиенты теперь не хотят уходить из моего мини-аппа. Конверсия выросла вдвое!", stars: 5 },
    { name: "Виктория", date: "02.03.2024", text: "Забыла про конструкторы как про страшный сон. Очень плавно, стильно, вайб передается на 100%.", stars: 5 },
    { name: "Мария", date: "28.02.2024", text: "Елена — мастер своего дела. Все продумано до мелочей: от визуала до анимаций. Рекомендую!", stars: 5 }
  ]
};
// =========================================================================

export default function App() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  
  // State for Theme (Dark vs Pearl & Champagne)
  const [isLightTheme, setIsLightTheme] = useState(false);
  const themeRef = useRef(isLightTheme);

  useEffect(() => {
    themeRef.current = isLightTheme;
  }, [isLightTheme]);
  
  // State for Magnetic Tilt & Hero Photo Reveal
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const isMaxTiltRef = useRef(false);
  const pointerPos = useRef({ x: -1000, y: -1000 });
  
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  // State for Tariffs (Apple Wallet Vibe)
  const [activeTariff, setActiveTariff] = useState('base');
  const activeTariffRef = useRef('base');
  useEffect(() => {
    activeTariffRef.current = activeTariff;
  }, [activeTariff]);

  // State for Review Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 5 });

  // State for Video Modal (Стеклянный Кинотеатр)
  const [activeVideo, setActiveVideo] = useState(null);

  // Отступ для Hero-блока в зависимости от платформы
  const [heroPadding, setHeroPadding] = useState('pt-28');

  // 0.0 Блокировка Pinch-to-Zoom
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventZoom, { passive: false });
    
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    return () => document.removeEventListener('touchmove', preventZoom);
  }, []);

  // 0. Безопасная функция для вибрации
  const triggerHaptic = useCallback((type = 'impact', style = 'light') => {
    try {
      const tg = window.Telegram?.WebApp;
      if (!tg || !tg.HapticFeedback) return;
      
      if (type === 'impact' && typeof tg.HapticFeedback.impactOccurred === 'function') {
        tg.HapticFeedback.impactOccurred(style);
      } else if (type === 'selection' && typeof tg.HapticFeedback.selectionChanged === 'function') {
        tg.HapticFeedback.selectionChanged();
      } else if (type === 'notification' && typeof tg.HapticFeedback.notificationOccurred === 'function') {
        tg.HapticFeedback.notificationOccurred(style);
      }
    } catch (e) {
      console.error('Haptic error:', e);
    }
  }, []);

  // 1. Инициализация Telegram
  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        // Динамический отступ: pt-16 для браузера, pt-28 для Telegram
        if (tg.platform === 'unknown' || !tg.platform) {
          setHeroPadding('pt-10');
        } else {
          setHeroPadding('pt-28');
        }

        if (typeof tg.ready === 'function') tg.ready();
        if (typeof tg.expand === 'function') tg.expand();
        if (typeof tg.requestFullscreen === 'function') tg.requestFullscreen();
        if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
        
        const enforceFullscreen = () => {
          if (typeof tg.expand === 'function') tg.expand();
          if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
        };
        
        setTimeout(enforceFullscreen, 100);
        setTimeout(enforceFullscreen, 500);
        
        if (typeof tg.onEvent === 'function') {
          tg.onEvent('viewportChanged', enforceFullscreen);
        }
        if (typeof tg.setHeaderColor === 'function') {
          tg.setHeaderColor('#050505'); // Оставим темным для нативности
        }
        return () => {
          if (tg && typeof tg.offEvent === 'function') tg.offEvent('viewportChanged', enforceFullscreen);
        };
      }
    } catch (error) {
      console.error('Telegram API Error:', error);
    }
  }, []);

  // 2. Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pointerPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };
    window.addEventListener('resize', resize);
    resize();

    const darkColors = ['rgba(255, 255, 255, 0.03)', 'rgba(140, 100, 255, 0.04)', 'rgba(100, 200, 255, 0.02)'];

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 120 + 60,
          colorIndex: Math.floor(Math.random() * darkColors.length)
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        const dx = pointerPos.current.x - p.x;
        const dy = pointerPos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0.1 && dist < 400) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        // Коралловые частицы для светлой темы + Золотые для VIP тарифа
        const isCustom = activeTariffRef.current === 'custom';
        const customColor = themeRef.current ? 'rgba(196, 135, 102, 0.08)' : 'rgba(212, 175, 55, 0.05)';
        const pColor = isCustom ? customColor : (themeRef.current ? 'rgba(216, 155, 147, 0.05)' : darkColors[p.colorIndex]);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, pColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= r.fade;

        if (r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Медные/Коралловые круги для светлой темы
        const rColorBase = themeRef.current ? `rgba(196, 135, 102, ` : `rgba(255, 255, 255, `;
        const rGrad = ctx.createRadialGradient(r.x, r.y, Math.max(0, r.radius - 30), r.x, r.y, r.radius);
        rGrad.addColorStop(0, rColorBase + `0)`);
        rGrad.addColorStop(0.8, rColorBase + `${r.alpha * 0.15})`);
        rGrad.addColorStop(1, rColorBase + `0)`);

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fillStyle = rGrad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Обработчики касаний для Canvas
  const handlePointerDown = (e) => {
    triggerHaptic('impact', 'light');
    ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, speed: 6, alpha: 0.8, fade: 0.015 });
  };
  const handlePointerMove = (e) => {
    pointerPos.current = { x: e.clientX, y: e.clientY };
  };

  // 3. Magnetic Tilt Logic
  const handleTiltMove = useCallback((e) => {
    if (!cardRef.current || isHeroRevealed) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -25; 
    const rotateY = ((x - centerX) / centerX) * 25;

    setTilt({ rotateX, rotateY });

    if (Math.abs(rotateX) > 13 || Math.abs(rotateY) > 13) {
      if (!isMaxTiltRef.current) {
        triggerHaptic('impact', 'light');
        isMaxTiltRef.current = true;
      }
    } else {
      isMaxTiltRef.current = false;
    }
  }, [isHeroRevealed]);

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    isMaxTiltRef.current = false;
  };

  const handleHeroHoldStart = () => {
    setIsHeroRevealed(true);
    triggerHaptic('impact', 'medium');
  };
  const handleHeroHoldEnd = () => setIsHeroRevealed(false);

  return (
    <div 
      className={`relative min-h-[100dvh] font-sans overflow-x-hidden select-none overscroll-none transition-colors duration-700 ${isLightTheme ? 'bg-[#EFECE8] text-[#4A302B] selection:bg-[#D89B93]/30' : 'bg-[#050505] text-white/90 selection:bg-white/20'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={() => triggerHaptic('impact', 'light')}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* --- 0. HERO BACKGROUND PHOTO --- */}
      <div className={`absolute top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-[#EFECE8]' : 'bg-[#050505]'}`}>
        <img 
          src={CONFIG.heroPhoto} 
          alt={CONFIG.headerName} 
          className={`w-full h-full object-cover transition-all duration-700 ease-out origin-top ${
            isHeroRevealed 
              ? 'blur-0 scale-100 opacity-90 grayscale-0' 
              : 'blur-[50px] scale-125 opacity-30 grayscale-[30%]'
          }`}
        />
        <div className={`absolute inset-0 transition-all duration-700 ${isHeroRevealed ? 'opacity-0' : 'opacity-100'} ${isLightTheme ? 'bg-gradient-to-tr from-[#EFECE8] via-[#EFECE8]/80 to-[#D89B93]/30 mix-blend-normal' : 'bg-gradient-to-tr from-[#050505] via-[#0A1020]/40 to-[#2A2010]/30 mix-blend-color'}`}></div>
        <div className={`absolute inset-0 transition-colors duration-700 ${isLightTheme ? 'bg-gradient-to-b from-transparent via-[#EFECE8]/80 to-[#EFECE8]' : 'bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]'}`}></div>
      </div>

      {/* Фиксированный Canvas на фоне */}
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none opacity-80" />

      {/*
        ========================================================================================
        👇 НАСТРОЙКА РАССТОЯНИЙ МЕЖДУ БЛОКАМИ 👇
        В строке ниже класс "gap-24" (в самом конце) задает расстояние между всеми основными секциями!
        - Если хочешь увеличить расстояние: поменяй gap-24 на gap-32 (или больше)
        - Если хочешь уменьшить расстояние: поменяй gap-24 на gap-16 или gap-12
        ========================================================================================
      */}
      {/* Скроллируемый контент */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto flex flex-col px-6 pt-4 pb-8 gap-24">
        
        {/* --- 1. HERO --- */}
        <section className={`relative flex flex-col ${heroPadding}`}>
          <header className={`flex items-center justify-between mb-5 ml-2 transition-opacity duration-500 ${isHeroRevealed ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`flex items-center gap-2 ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/50'}`}>
              <Fingerprint className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">{CONFIG.headerName}</span>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic('impact', 'medium');
                setIsLightTheme(!isLightTheme);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-50 ${isLightTheme ? 'bg-[#C48766]/10 text-[#C48766] border border-[#C48766]/30 shadow-[0_0_15px_rgba(196,135,102,0.2)]' : 'bg-white/5 text-white/50 border border-white/10 hover:text-white hover:bg-white/10'}`}
            >
              {isLightTheme ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </header>

          <div 
            ref={cardRef}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              resetTilt();
            }}
            onPointerMove={handleTiltMove}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className={`w-full relative touch-none transition-all ease-out ${(tilt.rotateX !== 0 || tilt.rotateY !== 0) ? 'duration-100' : 'duration-700'} ${isHeroRevealed ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
            style={{ 
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className={`backdrop-blur-[20px] rounded-3xl p-8 pointer-events-none transition-all duration-700 ${isLightTheme ? 'bg-[#4A302B]/[0.02] border-[0.5px] border-[#C48766]/40 shadow-[0_20px_50px_rgba(74,48,43,0.05)]' : 'bg-white/[0.03] border-[0.5px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'}`}>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-8 shadow-inner transition-colors duration-700 ${isLightTheme ? 'border-[#C48766]/30 bg-[#C48766]/10' : 'border-white/10 bg-white/[0.02]'}`}>
                <Sparkles className={`w-4 h-4 ${isLightTheme ? 'text-[#C48766]' : 'text-white/70'}`} strokeWidth={1.5} />
              </div>
              <h1 className={`text-4xl sm:text-5xl font-light tracking-wide mb-4 leading-tight transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`} style={{ transform: 'translateZ(30px)' }}>
                {CONFIG.heroTitle1}<br/>{CONFIG.heroTitle2}
              </h1>
              <p className={`text-base font-light leading-relaxed tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/50'}`} style={{ transform: 'translateZ(20px)' }}>
                {CONFIG.heroSubtitle}
              </p>
            </div>
          </div>

          <div className={`mt-6 w-full flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${isHeroRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <div 
               className="flex flex-col items-center gap-3 cursor-pointer p-4 pointer-events-auto touch-none"
               style={{ WebkitTouchCallout: 'none' }}
               onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
               onPointerDown={handleHeroHoldStart}
               onPointerUp={handleHeroHoldEnd}
               onPointerLeave={handleHeroHoldEnd}
               onPointerCancel={handleHeroHoldEnd}
             >
               <div className={`w-10 h-10 rounded-full border flex items-center justify-center animate-pulse transition-colors duration-700 ${isLightTheme ? 'border-[#4A302B]/10 bg-[#4A302B]/[0.02] shadow-[0_0_15px_rgba(74,48,43,0.05)]' : 'border-white/10 bg-white/[0.02] shadow-[0_0_15px_rgba(255,255,255,0.05)]'}`}>
                  <Fingerprint className={`w-5 h-5 ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/50'}`} strokeWidth={1.5} />
               </div>
               <span className={`text-[10px] uppercase tracking-[0.2em] font-medium text-center transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/40'}`}>
                 {CONFIG.heroHintLine1}<br/>{CONFIG.heroHintLine2}
               </span>
             </div>
          </div>
        </section>

        {/* --- 2. ЦЕННОСТЬ --- */}
        <section className="flex flex-col gap-6">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/40'}`}>Ценность</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className={`border rounded-2xl p-5 flex flex-col gap-4 opacity-60 grayscale transition-colors duration-700 ${isLightTheme ? 'bg-[#4A302B]/[0.02] border-[#4A302B]/10' : 'bg-white/[0.02] border-white/5'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ${isLightTheme ? 'bg-[#4A302B]/5' : 'bg-white/5'}`}>
                <Lock size={14} className={isLightTheme ? 'text-[#4A302B]/50' : 'text-white/50'} />
              </div>
              <div>
                <h3 className={`text-sm font-medium mb-1 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/80' : 'text-white/80'}`}>Конструкторы</h3>
                <ul className={`text-[11px] space-y-1.5 font-light transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/40'}`}>
                  <li>— Бесконечные подписки</li>
                  <li>— Шаблонный дизайн</li>
                  <li>— Ограничения кода</li>
                </ul>
              </div>
            </div>

            <div className={`border rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-[#C48766]/5 border-[#C48766]/30 shadow-[0_0_30px_rgba(196,135,102,0.1)]' : 'bg-white/[0.05] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-700 ${isLightTheme ? 'bg-[#D89B93]/20' : 'bg-white/10'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border relative z-10 transition-colors duration-700 ${isLightTheme ? 'bg-[#C48766]/10 border-[#C48766]/30' : 'bg-white/10 border-white/20'}`}>
                <Key size={14} className={isLightTheme ? 'text-[#C48766]' : 'text-white'} />
              </div>
              <div className="relative z-10">
                <h3 className={`text-sm font-medium mb-1 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Твоя визитка</h3>
                <ul className={`text-[11px] space-y-1.5 font-light tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/70' : 'text-white/70'}`}>
                  <li className={`font-bold transition-colors duration-700 ${isLightTheme ? 'text-[#C48766]' : 'text-white'}`}>— 0₽ в месяц</li>
                  <li>— Уникальный код</li>
                  <li>— Твоя навсегда</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. ПОРТФОЛИО --- */}
        <section className="flex flex-col gap-6 w-full">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/40'}`}>Портфолио</h2>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {CONFIG.portfolio.map((item, idx) => {
              const isFeatured = idx === 0;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    triggerHaptic('impact', 'light');
                    if (item.videoId) setActiveVideo(item.videoId);
                  }}
                  className={`relative border rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-700 active:scale-95 group overflow-hidden ${
                    isFeatured ? 'col-span-2 h-[220px] sm:h-[260px]' : 'col-span-1 h-[150px] sm:h-[180px]'
                  } ${isLightTheme ? 'bg-[#4A302B]/[0.02] border-[#4A302B]/10 hover:bg-[#4A302B]/[0.05]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'}`}
                >
                  {/* Эффект Play поверх карточки при наведении */}
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${isLightTheme ? 'bg-[#EFECE8]/60 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-[2px]'}`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-transform group-hover:scale-110 ${isLightTheme ? 'bg-[#C48766]/20 border-[#C48766]/40 text-[#4A302B]' : 'bg-white/20 border-white/30 text-white'}`}>
                      <Play size={isFeatured ? 24 : 20} className="ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className={`relative z-0 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/50'}`}>
                    <item.icon size={isFeatured ? 32 : 24} strokeWidth={1.5} />
                  </div>
                  <div className="relative z-0">
                    <h3 className={`font-medium tracking-wide transition-colors duration-700 ${isFeatured ? 'text-xl sm:text-2xl mb-1' : 'text-sm'} ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>{item.title}</h3>
                    <p className={`font-light transition-colors duration-700 ${isFeatured ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px] mt-1'} ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/40'}`}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 4. ИНВЕСТИЦИИ (APPLE WALLET VIBE) --- */}
        <section className="flex flex-col gap-6">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/40'}`}>Инвестиции</h2>
          
          <div className="relative h-[440px] w-full flex justify-center items-start perspective-1000 touch-none">
            {CONFIG.tariffs.map((tariff) => {
              const isActive = activeTariff === tariff.id;
              const isBase = tariff.id === 'base';
              
              return (
                <div
                  key={tariff.id}
                  onClick={() => {
                    if (!isActive) {
                      triggerHaptic('impact', 'medium');
                      setActiveTariff(tariff.id);
                    }
                  }}
                  className={`absolute w-full max-w-[320px] rounded-[2.5rem] p-7 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer backdrop-blur-2xl border flex flex-col justify-between ${
                    isActive 
                      ? 'z-20 translate-y-0 scale-100 opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.2)]' 
                      : 'z-10 translate-y-16 scale-90 opacity-60 hover:opacity-80 shadow-lg'
                  } ${
                    isBase
                      ? (isLightTheme ? 'bg-[#FAF7F2]/90 border-[#C48766]/30' : 'bg-white/10 border-white/20')
                      : (isLightTheme ? 'bg-[#2A2010]/95 border-[#C48766]/50' : 'bg-[#050505]/95 border-[#D4AF37]/30')
                  }`}
                  style={{ height: '380px' }}
                >
                  {/* Верх карты */}
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest mb-1 ${!isBase || !isLightTheme ? 'text-white/50' : 'text-[#4A302B]/50'}`}>{tariff.subtitle}</p>
                        <h3 className={`text-2xl font-light tracking-wide ${!isBase || !isLightTheme ? 'text-white' : 'text-[#4A302B]'}`}>{tariff.title}</h3>
                      </div>
                      {isActive && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center animate-in zoom-in duration-500 ${!isBase || !isLightTheme ? 'bg-white/10 text-white' : 'bg-[#C48766]/10 text-[#C48766]'}`}>
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      {tariff.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${!isBase || !isLightTheme ? 'bg-white/30' : 'bg-[#4A302B]/30'}`}></div>
                          <p className={`text-xs font-light tracking-wide ${!isBase || !isLightTheme ? 'text-white/80' : 'text-[#4A302B]/80'}`}>{feat}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Низ карты (Цена) */}
                  <div className={`pt-6 border-t ${!isBase || !isLightTheme ? 'border-white/10' : 'border-[#4A302B]/10'}`}>
                    <p className={`text-[10px] uppercase tracking-widest mb-1 ${!isBase || !isLightTheme ? 'text-white/40' : 'text-[#4A302B]/40'}`}>Инвестиция</p>
                    <p className={`text-xl font-medium tracking-wide ${!isBase || !isLightTheme ? 'text-white' : 'text-[#4A302B]'}`}>{tariff.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 4.5. THE MASTERMIND --- */}
        <section className="flex flex-col gap-6">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/40'}`}>The Mastermind</h2>
          
          <div className={`border rounded-3xl p-6 relative overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-[#4A302B]/[0.02] border-[#4A302B]/10' : 'bg-white/[0.03] border-white/10'}`}>
            <div className={`absolute bottom-0 right-0 w-full h-1/2 pointer-events-none transition-colors duration-700 ${isLightTheme ? 'bg-gradient-to-t from-[#EFECE8] to-transparent' : 'bg-gradient-to-t from-white/5 to-transparent'}`}></div>
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-700 ${isLightTheme ? 'bg-[#D89B93]/20' : 'bg-purple-500/10'}`}></div>
            
            <h3 className={`text-lg font-medium mb-3 tracking-widest transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>{CONFIG.mastermindName}</h3>
            <p className={`text-[12px] leading-relaxed font-light tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/50'}`}>
              {CONFIG.mastermindBio}
            </p>
          </div>
        </section>

        {/* --- 4.6. ОТЗЫВЫ --- */}
        <section className="flex flex-col gap-6 w-full -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex justify-between items-end mb-2">
            <h2 className={`text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/40'}`}>Отзывы</h2>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic('impact', 'light');
                setIsReviewModalOpen(true);
              }}
              className={`text-[10px] uppercase tracking-widest border-b pb-0.5 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/50 hover:text-[#4A302B] border-[#4A302B]/20' : 'text-white/50 hover:text-white border-white/20'}`}
            >
              Оставить отзыв
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide w-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            {CONFIG.reviews.map((review, idx) => (
              <div 
                key={idx}
                className={`min-w-[280px] border rounded-3xl p-6 snap-center flex flex-col gap-4 transition-colors duration-700 ${isLightTheme ? 'bg-[#4A302B]/[0.02] border-[#4A302B]/10 hover:bg-[#4A302B]/[0.05]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-sm font-medium tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>{review.name}</h3>
                    <p className={`text-[10px] mt-1 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/30'}`}>{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < review.stars ? "text-[#C48766] fill-[#C48766]" : (isLightTheme ? "text-[#4A302B]/10" : "text-white/20")} 
                      />
                    ))}
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed font-light italic transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/60'}`}>
                  "{review.text}"
                </p>
              </div>
            ))}
            <div className="min-w-[20px] h-1"></div>
          </div>
        </section>

        {/* --- 5. CTA --- */}
        <section className="flex flex-col items-center mt-10 pb-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              triggerHaptic('notification', 'success');
            }}
            className={`group relative w-full h-16 rounded-2xl backdrop-blur-[20px] border-[0.5px] flex items-center justify-center gap-3 transition-all duration-500 active:scale-[0.98] overflow-hidden mb-8 ${isLightTheme ? 'bg-[#C48766]/10 hover:bg-[#C48766]/20 border-[#C48766]/30 shadow-[0_10px_40px_rgba(196,135,102,0.15)]' : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/20 shadow-[0_10px_40px_rgba(255,255,255,0.03)]'}`}
          >
            <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-[#C48766]/20 to-transparent' : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'}`}></div>
            <span className={`text-[13px] uppercase tracking-[0.2em] font-medium relative z-10 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white/90'}`}>
              {CONFIG.ctaText}
            </span>
            <ArrowRight className={`w-4 h-4 relative z-10 group-hover:translate-x-1 transition-all ${isLightTheme ? 'text-[#4A302B]/70' : 'text-white/70'}`} strokeWidth={1.5} />
          </button>

          <div className="text-center">
            <p className={`text-[10px] uppercase tracking-[0.3em] font-medium mb-3 transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/40' : 'text-white/30'}`}>
              {CONFIG.footerText}
            </p>
            <div className="flex justify-center gap-6">
              <a href={CONFIG.linkTelegram} target="_blank" rel="noreferrer" className={`text-[10px] tracking-widest uppercase cursor-pointer transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60 hover:text-[#4A302B]' : 'text-white/50 hover:text-white'}`}>Telegram</a>
              <a href={CONFIG.linkGithub} target="_blank" rel="noreferrer" className={`text-[10px] tracking-widest uppercase cursor-pointer transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60 hover:text-[#4A302B]' : 'text-white/50 hover:text-white'}`}>GitHub</a>
            </div>
          </div>
        </section>

      </div>

      {/* --- 6. REVIEW MODAL --- */}
      {isReviewModalOpen && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md transition-all duration-700 ${isLightTheme ? 'bg-[#EFECE8]/80' : 'bg-black/60'}`}>
          <div className={`relative w-full max-w-sm border rounded-3xl p-6 shadow-2xl transition-colors duration-700 ${isLightTheme ? 'bg-[#FAF7F2] border-[#4A302B]/10' : 'bg-[#0a0a0a] border-white/10'}`}>
            <button
              onClick={() => {
                triggerHaptic('impact', 'light');
                setIsReviewModalOpen(false);
                setTimeout(() => setIsReviewSubmitted(false), 300);
              }}
              className={`absolute top-4 right-4 transition-colors ${isLightTheme ? 'text-[#4A302B]/40 hover:text-[#4A302B]' : 'text-white/40 hover:text-white'}`}
            >
              <X size={20} />
            </button>

            {isReviewSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-2 transition-colors duration-700 ${isLightTheme ? 'bg-[#C48766]/10 border-[#C48766]/30 shadow-[0_0_30px_rgba(196,135,102,0.1)]' : 'bg-white/5 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
                  <Sparkles className={isLightTheme ? 'text-[#C48766]' : 'text-white/80'} size={28} />
                </div>
                <h3 className={`text-xl font-medium tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Спасибо!</h3>
                <p className={`text-sm font-light leading-relaxed transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/50'}`}>
                  Ваш отзыв успешно отправлен.<br/>Скоро он появится здесь.
                </p>
                <button
                  onClick={() => {
                    triggerHaptic('impact', 'light');
                    setIsReviewModalOpen(false);
                    setTimeout(() => setIsReviewSubmitted(false), 300);
                  }}
                  className={`mt-4 w-full py-3 border rounded-xl text-sm transition-colors ${isLightTheme ? 'bg-[#4A302B]/5 hover:bg-[#4A302B]/10 border-[#4A302B]/10 text-[#4A302B]' : 'bg-white/10 hover:bg-white/20 border-white/5 text-white'}`}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className={`text-lg font-medium tracking-wide mb-2 text-center transition-colors duration-700 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Новый отзыв</h3>

                <div className="flex gap-2 justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        triggerHaptic('selection');
                        setReviewForm({ ...reviewForm, rating: star });
                      }}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={32}
                        className={star <= reviewForm.rating ? "text-[#C48766] fill-[#C48766] drop-shadow-[0_0_10px_rgba(196,135,102,0.3)]" : (isLightTheme ? "text-[#4A302B]/10" : "text-white/10")}
                      />
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${isLightTheme ? 'bg-[#4A302B]/5 border-[#4A302B]/10 text-[#4A302B] placeholder-[#4A302B]/40 focus:border-[#4A302B]/30' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30'}`}
                />

                <textarea
                  placeholder="Ваш отзыв..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  rows={4}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${isLightTheme ? 'bg-[#4A302B]/5 border-[#4A302B]/10 text-[#4A302B] placeholder-[#4A302B]/40 focus:border-[#4A302B]/30' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30'}`}
                />

                <button
                  onClick={() => {
                    if (!reviewForm.name || !reviewForm.text) {
                      triggerHaptic('notification', 'error');
                      return;
                    }
                    triggerHaptic('notification', 'success');
                    setIsReviewSubmitted(true);
                    setReviewForm({ name: '', text: '', rating: 5 });
                  }}
                  className={`w-full py-3 font-medium rounded-xl mt-2 transition-colors active:scale-[0.98] ${isLightTheme ? 'bg-[#4A302B] text-white hover:bg-[#4A302B]/90' : 'bg-white text-black hover:bg-white/90'}`}
                >
                  Отправить
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- 7. VIDEO MODAL (RUTUBE) --- */}
      {activeVideo && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-[30px] transition-all duration-700 ${isLightTheme ? 'bg-[#EFECE8]/80' : 'bg-black/80'}`}>
          
          {/* Кнопка закрытия (вынесена за пределы телефона) */}
          <button
            onClick={() => {
              triggerHaptic('impact', 'light');
              setActiveVideo(null);
            }}
            className={`absolute top-6 right-6 sm:top-8 sm:right-8 z-[110] w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl ${isLightTheme ? 'bg-white/90 border-[#C48766]/30 text-[#4A302B] shadow-[0_10px_30px_rgba(196,135,102,0.2)]' : 'bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'}`}
          >
            <X size={24} />
          </button>

          {/* Виртуальный iPhone (Apple Vibe) */}
          <div className={`relative w-[300px] sm:w-[340px] aspect-[9/19.5] max-h-[85vh] rounded-[3rem] sm:rounded-[3.5rem] border-[10px] sm:border-[14px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 transition-colors ${isLightTheme ? 'bg-black border-[#dcd9d4] shadow-[0_0_50px_rgba(196,135,102,0.3)]' : 'bg-black border-[#1f1f1f] shadow-[0_0_50px_rgba(255,255,255,0.05)]'}`}>
            
            {/* Dynamic Island (Челка iPhone) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-30 shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] flex justify-end items-center px-2">
              {/* Глазок камеры */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border border-[#222]"></div>
            </div>

            {/* Блики на стекле смартфона */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"></div>

            {activeVideo?.startsWith('demo') ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#0a0a0a]">
                <Play size={48} className="mb-4 opacity-20 text-white" />
                <p className="text-lg font-medium tracking-wide text-white">Скоро здесь будет новое видео</p>
                <p className="text-sm mt-2 text-white/50">Добавьте ID видео с RuTube в настройки (CONFIG)</p>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://rutube.ru/play/embed/${activeVideo}`}
                frameBorder="0"
                allow="clipboard-write; autoplay"
                allowFullScreen
                className="absolute inset-0 w-full h-full z-10 pt-[15px] scale-[1.02] bg-black"
              ></iframe>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { overscroll-behavior-y: none; touch-action: pan-y; }
      `}} />
    </div>
  );
}