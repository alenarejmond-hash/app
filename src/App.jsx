import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Send, Fingerprint, Sparkles, Lock, Key, 
  ArrowRight, Compass, Flame, Brain, Camera, Star, X, Sun, Moon, Play, Heart, Check, Loader2, Diamond, Mail, Image as ImageIcon, Maximize, Settings
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined' && !document.getElementById('tg-web-app-script')) {
  const script = document.createElement('script');
  script.id = 'tg-web-app-script';
  script.src = 'https://telegram.org/js/telegram-web-app.js';
  script.async = true;
  document.head.appendChild(script);
}

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
  linkTelegram: "https://t.me/elenlime", // 👈 ВСТАВЬТЕ СЮДА СВОЮ ССЫЛКУ НА TELEGRAM (между кавычек)
  linkVK: "https://vk.com/elenlime", // 👈 ВСТАВЬТЕ СЮДА ССЫЛКУ НА ВКОНТАКТЕ (между кавычек)

  // 👈 ВСТАВЬТЕ СЮДА ССЫЛКУ ДЛЯ КНОПКИ "ПОДЕЛИТЬСЯ" (например, прямую ссылку на вашего бота или сайт)
  shareLink: "https://vk.com/app12345678", // 👈 Сюда лучше вставить ссылку на ваше VK Mini App

  // 💥 ИНТЕГРАЦИЯ С GOOGLE SHEETS (ОТЗЫВЫ) 💥
  // 👈 1. ВСТАВЬТЕ СЮДА ССЫЛКУ НА САМУ ГУГЛ ТАБЛИЦУ (для чтения отзывов без ошибок)
  googleSheetUrl: "https://docs.google.com/spreadsheets/d/1_Cez-q6TBrcAWRXJtIH9Rtt8ZkYZrbcX7fCd74E9zLY/edit?gid=0#gid=0",
  
  // 👈 2. ВСТАВЬТЕ СЮДА ССЫЛКУ НА РАЗВЕРНУТЫЙ WEB APP GOOGLE SCRIPT (для отправки новых)
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbxsMW1eKwlNEO-sqD1UdSrVTQp3cMMOKLDDMTjWkdI7RZt8hd8dOBfc8XDmec2tyLujrw/exec",

  // 💥 ИНТЕГРАЦИЯ С GOOGLE SHEETS (ЗАКАЗЫ) 💥
  // 👈 ВСТАВЬТЕ СЮДА ССЫЛКУ НА СКРИПТ ДЛЯ ЗАКАЗОВ (куда будут падать заявки)
  googleOrderScriptUrl: "https://script.google.com/macros/s/AKfycbyoSupm9t2iYd4cM_KEDFh_slZSwlnvPol8PvMWF8fS_HtlGzFeiQJ8_aihCuAi3zop/exec",

  // 6. Галерея (Мои работы) - ТЕПЕРЬ ЖИВЫЕ ШАБЛОНЫ (LIVE DEMO)
  // 👇 ПОДСКАЗКА ОТ ИИ:
  // title - Название проекта на карточке (минимализм, только суть)
  // icon - Иконка проекта (Можно писать: Compass, Heart, Flame, Star, Camera, Sparkles)
  // demoLink - 👈 ВСТАВЬТЕ СЮДА ССЫЛКУ НА ВАШ ШАБЛОН (загруженный на ваш хостинг)
  portfolio: [
    { title: "ШОУРИЛ 2026", icon: Compass, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "БЛОГЕР", icon: Heart, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "РЕЖИССЁР", icon: Heart, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "ТУРАГЕНТ", icon: Flame, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "АВТОРСКИЕ ТУРЫ", icon: Star, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "ПСИХОЛОГ", icon: Camera, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
    { title: "ЭЗОРЕТИК", icon: Sparkles, demoLink: "https://turagent.nice-app.ru/" }, // Замените ссылку на свою
  ],

  // 7. Инвестиции (Тарифы) в стиле Apple Wallet
  // 👇 ПОДСКАЗКА ОТ ИИ:
  // id - НЕ ТРОГАТЬ! (отвечает за магия анимаций)
  // title - Крупное название тарифа
  // subtitle - Мелкий текст над названием
  // price - Строка с ценой
  // oldPrice - Старая перечеркнутая цена
  // features - Список того, что входит в тариф. Каждая фраза пишется в одинарных кавычках '...' через запятую!
  tariffs: [
    {
      id: 'base', 
      title: 'Pro',
      subtitle: 'Авторская архитектура',
      price: '7 000 ₽',
      oldPrice: '10 000 ₽',
      features: ['Premium-шаблон из моей базы', 'Адаптация под ваш контент и цвета', 'Мини-апп в ТГ/ВК + веб-версия (PWA)', 'Поддомен имя.nice-app.ru навсегда', 'Бот + пост + запуск «под ключ»(в тг/вк)', 'Запуск за 3-5 дней', 'Один платеж. Никаких подписок'],
    },
    {
      id: 'custom',
      title: 'Ultra',
      subtitle: 'Haute Couture в коде',
      price: 'от 8 000 ₽',
      oldPrice: 'от 15 000 ₽',
      features: ['Уникальный дизайн и логика «с нуля»', 'Сложные 3D и WebGL эффекты', 'Мини-апп в ТГ/ВК + веб-версия (PWA)', 'Поддомен имя.nice-app.ru навсегда', 'Подключение вашего личного домена (помощь с покупкой и настройкой)', 'Бот + пост + запуск «под ключ»(в тг/вк)', 'Запуск за 5-7 дней', 'Без аренды: Ваш личный цифровой актив навсегда'],
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

const PrivacyModal = ({ onClose, isLightTheme, triggerHaptic }) => {
  useEffect(() => {
    if (triggerHaptic) triggerHaptic('impact', 'light');
  }, [triggerHaptic]);

  const handleClose = () => {
    if (triggerHaptic) triggerHaptic('impact', 'light');
    onClose();
  };

  const overlayVars = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVars = { 
    hidden: { y: 50, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={overlayVars} initial="hidden" animate="visible" exit="hidden"
      onClick={handleClose}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
    >
      <motion.div 
        variants={modalVars} initial="hidden" animate="visible" exit="exit"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] border shadow-2xl overflow-hidden ${isLightTheme ? 'bg-[#1A080C]/95 border-[#D8A0A6]/30 shadow-[0_30px_60px_rgba(216,160,166,0.15)] text-[#F5ECEE]' : 'bg-[#0a0a0a]/95 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-gray-300'}`}
      >
        <button onClick={handleClose} className={`absolute top-6 right-6 transition-colors hover:scale-110 active:scale-95 ${isLightTheme ? 'text-[#F5ECEE]/40 hover:text-[#F5ECEE]' : 'text-white/40 hover:text-white'}`}>
          <X size={20} />
        </button>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className={`text-2xl font-light tracking-wide mb-2 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Ваша цифровая приватность</h3>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 scrollbar-hide">
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Только суть</h4>
              <p className="text-xs font-light leading-relaxed">Мы ценим ваше личное пространство. Собираем только то, что необходимо для создания вашего проекта: имя и контакт (Telegram/VK или номер телефона).</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Никакого спама</h4>
              <p className="text-xs font-light leading-relaxed">Ваши данные используются исключительно для того, чтобы связаться с вами и обсудить детали заказа. Никаких рассылок и прогревов.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Полная защита</h4>
              <p className="text-xs font-light leading-relaxed">Информация передается по защищенным каналам и хранится в закрытой экосистеме. Мы никогда не передаем ваши данные третьим лицам.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Ваше право</h4>
              <p className="text-xs font-light leading-relaxed">Если вы хотите, чтобы мы удалили ваш бриф из системы после завершения работы — просто сообщите об этом в личной переписке.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-current/10">
            <p className={`text-[10px] italic font-light tracking-wide text-center ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>
              Ваше доверие — фундамент нашего digital-мира.<br/>Design & Code by Elena Sotnikova.
            </p>
          </div>

          <button 
            onClick={handleClose}
            className={`group relative w-full py-4 font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
          >
            <span className="relative z-10 tracking-widest uppercase text-xs">Понятно</span>
            <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TermsModal = ({ onClose, isLightTheme, triggerHaptic }) => {
  useEffect(() => {
    if (triggerHaptic) triggerHaptic('impact', 'light');
  }, [triggerHaptic]);

  const handleClose = () => {
    if (triggerHaptic) triggerHaptic('impact', 'light');
    onClose();
  };

  const overlayVars = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVars = { 
    hidden: { y: 50, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={overlayVars} initial="hidden" animate="visible" exit="hidden"
      onClick={handleClose}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
    >
      <motion.div 
        variants={modalVars} initial="hidden" animate="visible" exit="exit"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] border shadow-2xl overflow-hidden ${isLightTheme ? 'bg-[#1A080C]/95 border-[#D8A0A6]/30 shadow-[0_30px_60px_rgba(216,160,166,0.15)] text-[#F5ECEE]' : 'bg-[#0a0a0a]/95 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-gray-300'}`}
      >
        <button onClick={handleClose} className={`absolute top-6 right-6 transition-colors hover:scale-110 active:scale-95 ${isLightTheme ? 'text-[#F5ECEE]/40 hover:text-[#F5ECEE]' : 'text-white/40 hover:text-white'}`}>
          <X size={20} />
        </button>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className={`text-2xl font-light tracking-wide mb-2 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Условия создания вашего digital-актива</h3>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 scrollbar-hide">
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Бронирование и оплата</h4>
              <p className="text-xs font-light leading-relaxed">Работа начинается после 50% предоплаты (депозит невозвратный). Остаток 50% — перед передачей прав на проект.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Сроки</h4>
              <p className="text-xs font-light leading-relaxed">Реализация за 3–7 рабочих дней с момента получения 100% заполненного брифа и материалов.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Искусство правок</h4>
              <p className="text-xs font-light leading-relaxed">Стартовое наполнение контентом включено. В индивидуальных проектах включено 2 круга правок на этапе дизайна. Правки после сдачи проекта — платные.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Владение</h4>
              <p className="text-xs font-light leading-relaxed">После полной оплаты вы получаете полные права на проект. Никаких ежемесячных платежей.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-current/10">
            <p className={`text-[10px] italic font-light tracking-wide text-center ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>
              Прозрачность — залог безупречного стиля.<br/>Design & Code by Elena Sotnikova.
            </p>
          </div>

          <button 
            onClick={handleClose}
            className={`group relative w-full py-4 font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
          >
            <span className="relative z-10 tracking-widest uppercase text-xs">Принимаю</span>
            <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OrderForm = ({ onClose, onSuccess, isLightTheme, triggerHaptic }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { tariff: 'Pro', domain: false }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    triggerHaptic('impact', 'light');
  }, [triggerHaptic]);

  const watchTariff = watch('tariff');
  const watchDomain = watch('domain');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        action: 'newOrder',
        name: data.name,
        contact: data.contact, 
        tariff: data.tariff,
        domain: data.domain,
        date: new Date().toLocaleDateString('ru-RU')
      };

      const scriptUrl = "<YOUR_GOOGLE_SCRIPT_URL>";

      if (scriptUrl !== "<YOUR_GOOGLE_SCRIPT_URL>") {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } else if (CONFIG.googleOrderScriptUrl && !CONFIG.googleOrderScriptUrl.includes("ТВОЯ_ССЫЛКА")) {
        await fetch(CONFIG.googleOrderScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }
      
      setIsSuccess(true);
      if (onSuccess) onSuccess(); // Сообщаем главному компоненту, что всё прошло супер!
      triggerHaptic('notification', 'success');
      
      // Разблокируем экран, закрывая ТОЛЬКО модалку через 3 секунды
      setTimeout(() => {
        onClose(); // 👈 Убираем окошко успеха, пользователь остается в мини-аппе
      }, 3000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      triggerHaptic('notification', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const overlayVars = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVars = { 
    hidden: { y: 100, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { y: 100, opacity: 0, transition: { duration: 0.3 } }
  };
  const itemVars = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.div 
      variants={overlayVars} initial="hidden" animate="visible" exit="hidden"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
    >
      {isSuccess && (
        <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '50vw', y: '100vh', scale: Math.random() + 0.5 }}
              animate={{ 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`, 
                rotate: Math.random() * 720,
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 2.5 + Math.random(), ease: "easeOut" }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: isLightTheme ? ['#D8A0A6', '#F5ECEE', '#9E5B6A'][i % 3] : ['#D4AF37', '#ffffff', '#8C64FF'][i % 3] }}
            />
          ))}
        </div>
      )}
      
      <motion.div 
        variants={modalVars} initial="hidden" animate="visible" exit="exit"
        className={`relative w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] border shadow-2xl overflow-hidden ${isLightTheme ? 'bg-[#1A080C]/90 border-[#D8A0A6]/30 shadow-[0_30px_60px_rgba(216,160,166,0.15)]' : 'bg-[#0a0a0a]/90 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]'}`}
      >
        <button onClick={() => { triggerHaptic('impact', 'light'); onClose(); }} className={`absolute top-6 right-6 transition-colors hover:scale-110 active:scale-95 ${isLightTheme ? 'text-[#F5ECEE]/40 hover:text-[#F5ECEE]' : 'text-white/40 hover:text-white'}`}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <motion.div variants={itemVars} className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-2 ${isLightTheme ? 'bg-[#D8A0A6]/10 border-[#D8A0A6]/30 shadow-[0_0_30px_rgba(216,160,166,0.2)]' : 'bg-white/5 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
              <Sparkles className={isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'} size={28} />
            </div>
            <h3 className={`text-2xl font-light tracking-wide ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Бриф зафиксирован ✨</h3>
            <p className={`text-sm font-light leading-relaxed ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>Скоро я свяжусь с вами для обсуждения деталей.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <motion.div variants={itemVars}>
              <h3 className={`text-2xl font-light tracking-wide mb-1 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Ваш Digital-мир</h3>
              <p className={`text-xs font-light tracking-wide uppercase ${isLightTheme ? 'text-[#F5ECEE]/50' : 'text-white/40'}`}>Заполните детали проекта</p>
            </motion.div>

            <motion.div variants={itemVars}>
              <input 
                {...register('name', { required: true })}
                type="text" 
                placeholder="Ваше Имя" 
                className={`w-full border rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all duration-300 ${isLightTheme ? 'bg-[#F5ECEE]/5 border-[#F5ECEE]/10 text-[#F5ECEE] placeholder-[#F5ECEE]/40 focus:border-[#D8A0A6] focus:bg-[#2A0F14] focus:shadow-[0_0_20px_rgba(216,160,166,0.15)]' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">Имя обязательно</span>}
            </motion.div>

            <motion.div variants={itemVars}>
              <input 
                {...register('contact', { required: true })}
                type="text" 
                placeholder="ID ВКонтакте или телефон" 
                className={`w-full border rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all duration-300 ${isLightTheme ? 'bg-[#F5ECEE]/5 border-[#F5ECEE]/10 text-[#F5ECEE] placeholder-[#F5ECEE]/40 focus:border-[#D8A0A6] focus:bg-[#2A0F14] focus:shadow-[0_0_20px_rgba(216,160,166,0.15)]' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
              />
              {errors.contact && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">Контакт обязателен</span>}
            </motion.div>

            <motion.div variants={itemVars} className="flex flex-col gap-3">
              <p className={`text-[10px] uppercase tracking-widest pl-2 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/40'}`}>Выбор тарифа</p>
              <div className="grid grid-cols-2 gap-3">
                {['Pro', 'Ultra'].map((t) => (
                  <div 
                    key={t}
                    onClick={() => { triggerHaptic('medium'); setValue('tariff', t); }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95 ${watchTariff === t ? (isLightTheme ? 'bg-[#D8A0A6]/10 border-[#D8A0A6] shadow-[0_0_15px_rgba(216,160,166,0.2)] text-[#F5ECEE]' : 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white') : (isLightTheme ? 'bg-transparent border-[#F5ECEE]/10 opacity-60 text-[#F5ECEE]/60' : 'bg-transparent border-white/10 opacity-50 text-white/50')}`}
                  >
                    <span className="text-lg font-medium tracking-wide">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVars} 
              onClick={() => { triggerHaptic('medium'); setValue('domain', !watchDomain); }}
              className={`cursor-pointer flex justify-between items-center p-5 border rounded-2xl transition-all duration-300 active:scale-95 ${isLightTheme ? 'bg-[#F5ECEE]/5 border-[#F5ECEE]/10' : 'bg-white/5 border-white/10'}`}
            >
              <span className={`text-sm tracking-wide font-light ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Нужен домен?</span>
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${watchDomain ? (isLightTheme ? 'bg-[#D8A0A6]' : 'bg-white') : (isLightTheme ? 'bg-[#F5ECEE]/20' : 'bg-white/10')}`}>
                <motion.div 
                  layout
                  className={`w-4 h-4 rounded-full shadow-md ${isLightTheme ? (watchDomain ? 'bg-[#150508]' : 'bg-[#1A080C]') : (watchDomain ? 'bg-black' : 'bg-white/50')}`}
                  style={{ originX: watchDomain ? 1 : 0 }}
                  animate={{ x: watchDomain ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </motion.div>

            <motion.button 
              variants={itemVars}
              disabled={isSubmitting}
              type="submit"
              className={`group relative w-full py-4 font-medium rounded-2xl mt-2 transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span className="relative z-10 tracking-widest uppercase text-xs">Отправить бриф</span>
                  <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-[#F5ECEE]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const smallDotsRef = useRef([]);
  
  // State for Loading Spinner
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Короткий спиннер при загрузке страницы для эстетики
    const timer = setTimeout(() => setIsAppLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // State for Theme (Dark vs Rose Wine Luxury)
  const [isLightTheme, setIsLightTheme] = useState(false);
  const themeRef = useRef(isLightTheme);

  useEffect(() => {
    themeRef.current = isLightTheme;
    
    // Красим верхние и нижние полосы браузера под текущую тему
    const bgColor = isLightTheme ? '#150508' : '#050505';
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
    
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = bgColor;

    // Синхронизация цветов шапки Telegram с текущей темой
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.setHeaderColor(bgColor);
        window.Telegram.WebApp.setBackgroundColor(bgColor);
      }
    } catch(e) {}
  }, [isLightTheme]);
  
  // State for Magnetic Tilt & Hero Photo Reveal
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const isMaxTiltRef = useRef(false);
  const pointerPos = useRef({ x: -1000, y: -1000 });
  
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [isTG, setIsTG] = useState(false);

  // 0. Нативная вибрация Telegram
  const triggerHaptic = useCallback((type = 'impact', style = 'light') => {
    try {
      const tg = window.Telegram?.WebApp?.HapticFeedback;
      if (!tg) return;

      if (type === 'impact') {
        tg.impactOccurred(style === 'light' ? 'light' : 'medium');
      } else if (type === 'selection') {
        tg.selectionChanged();
      } else if (type === 'notification') {
        tg.notificationOccurred(style === 'error' ? 'error' : 'success');
      }
    } catch (e) {
      console.error('TG Haptic error:', e);
    }
  }, []);

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
  const [reviewsList, setReviewsList] = useState(CONFIG.reviews);

  // State for Order Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // НОВОЕ: состояние блокировки главной кнопки после отправки брифа
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  // State for Privacy Modal
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // State for Terms Modal
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // State & Handler for 3D Flip Share Card
  const [isShareFlipped, setIsShareFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // Копирование (в Telegram работает нативный буфер обмена)
  const handleCopy = async () => {
    const link = CONFIG.shareLink && CONFIG.shareLink !== "" ? CONFIG.shareLink : window.location.origin;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      triggerHaptic('notification', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  // Загрузка отзывов напрямую из Google Sheets
  useEffect(() => {
    if (CONFIG.googleSheetUrl && !CONFIG.googleSheetUrl.includes("ТВОЯ_ССЫЛКА")) {
      try {
        const sheetIdMatch = CONFIG.googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (sheetIdMatch && sheetIdMatch[1]) {
          const sheetId = sheetIdMatch[1];
          const sheetName = encodeURIComponent('Опубликованные отзывы');
          const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
          
          fetch(url)
            .then(res => {
              if (!res.ok) throw new Error("Нет доступа к таблице.");
              return res.text();
            })
            .then(text => {
              const jsonStr = text.substring(47).slice(0, -2);
              const data = JSON.parse(jsonStr);
              
              if (data.table && data.table.rows) {
                const fetchedReviews = data.table.rows.map(row => {
                  let dateStr = row.c[1]?.f || row.c[1]?.v || '';
                  if (typeof dateStr === 'string' && dateStr.includes('Date(')) {
                    const match = dateStr.match(/Date\((\d+),\s*(\d+),\s*(\d+)/);
                    if (match) {
                      const y = match[1];
                      const m = String(parseInt(match[2]) + 1).padStart(2, '0');
                      const d = String(match[3]).padStart(2, '0');
                      dateStr = `${d}.${m}.${y}`;
                    }
                  }
                  
                  return {
                    name: row.c[0]?.v || '',
                    date: dateStr,
                    text: row.c[2]?.v || '',
                    stars: row.c[3]?.v || 5
                  };
                });
                if (fetchedReviews.length > 0) setReviewsList(fetchedReviews.reverse());
              }
            })
            .catch(err => console.error("Ошибка загрузки отзывов:", err));
        }
      } catch (e) {
        console.error("Ошибка обработки ссылки:", e);
      }
    }
  }, []);

  const [expandedDemo, setExpandedDemo] = useState(null);
  const [isDemoLoading, setIsDemoLoading] = useState(true);

  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const portfolioRef = useRef(null);
  const isDraggingPortfolio = useRef(false);
  const wheelTimeoutRef = useRef(null);

  const handlePortfolioSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 40) { 
      triggerHaptic('selection');
      setPortfolioIndex(prev => Math.min(prev + 1, CONFIG.portfolio.length - 1));
    } else if (swipeDistance < -40) { 
      triggerHaptic('selection');
      setPortfolioIndex(prev => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const el = portfolioRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isVerticalScroll) {
        if (isScrollingUp && portfolioIndex === 0) return;
        if (isScrollingDown && portfolioIndex === CONFIG.portfolio.length - 1) return;
      }

      e.preventDefault();

      if (wheelTimeoutRef.current) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (delta > 15) {
        triggerHaptic('selection');
        setPortfolioIndex(prev => Math.min(prev + 1, CONFIG.portfolio.length - 1));
        wheelTimeoutRef.current = setTimeout(() => wheelTimeoutRef.current = null, 350); 
      } else if (delta < -15) {
        triggerHaptic('selection');
        setPortfolioIndex(prev => Math.max(prev - 1, 0));
        wheelTimeoutRef.current = setTimeout(() => wheelTimeoutRef.current = null, 350);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [portfolioIndex, triggerHaptic]);

  const reviewsRef = useRef(null);
  const isDraggingReviews = useRef(false);
  const startXReviews = useRef(0);
  const scrollLeftReviews = useRef(0);

  // Отступ для Hero-блока в зависимости от платформы (для ВК делаем с запасом на их шапку)
  const [heroPadding, setHeroPadding] = useState('pt-20');

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

  // 1. Инициализация Telegram Mini App
  useEffect(() => {
    const initTG = async () => {
      try {
        let attempts = 0;
        while (!window.Telegram?.WebApp && attempts < 20) {
          await new Promise(r => setTimeout(r, 100));
          attempts++;
        }
        if (!window.Telegram?.WebApp) throw new Error("TG Bridge timeout");

        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        // Блокируем закрытие свайпом вниз и запрашиваем подтверждение
        try {
          if (tg.isVersionAtLeast && tg.isVersionAtLeast('7.7') && tg.disableVerticalSwipes) tg.disableVerticalSwipes();
          if (tg.isVersionAtLeast && tg.isVersionAtLeast('6.2') && tg.enableClosingConfirmation) tg.enableClosingConfirmation();
          if (tg.isVersionAtLeast && tg.isVersionAtLeast('8.0') && tg.requestFullscreen) tg.requestFullscreen(); 
        } catch (e) {
          console.warn('Advanced TG features missing', e);
        }
        
        // Синхронизируем цвета шапки при старте
        const bgColor = isLightTheme ? '#150508' : '#050505';
        tg.setHeaderColor(bgColor);
        tg.setBackgroundColor(bgColor);
        
        setIsTG(true);
        setHeroPadding('pt-24'); // Увеличенный отступ для TG (добавили ~1 см воздуха сверху)
      } catch (error) {
        console.error('TG Bridge Init Error:', error);
        setIsTG(false);
        setHeroPadding('pt-12'); // Фолбэк для браузера
      }
    };
    initTG();
  }, [isLightTheme]);

  useEffect(() => {
    const el = portfolioRef.current;
    if (!el) return;
    const handleTouchMove = (e) => {
      if (!touchStartX.current || !touchStartY.current) return;
      const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (deltaX > deltaY && deltaX > 3) {
        if (e.cancelable) e.preventDefault();
      }
    };
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleTouchMove);
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

    if (smallDotsRef.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        smallDotsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smallDotsRef.current.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < -dot.radius) dot.x = canvas.width + dot.radius;
        if (dot.x > canvas.width + dot.radius) dot.x = -dot.radius;
        if (dot.y < -dot.radius) dot.y = canvas.height + dot.radius;
        if (dot.y > canvas.height + dot.radius) dot.y = -dot.radius;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = themeRef.current ? `rgba(216, 160, 166, ${dot.alpha})` : `rgba(255, 255, 255, ${dot.alpha})`;
        ctx.fill();
      });

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

        const isCustom = activeTariffRef.current === 'custom';
        const customColor = themeRef.current ? 'rgba(216, 160, 166, 0.08)' : 'rgba(212, 175, 55, 0.05)';
        const pColor = isCustom ? customColor : (themeRef.current ? 'rgba(216, 160, 166, 0.05)' : darkColors[p.colorIndex]);
        
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

        const rColorBase = themeRef.current ? `rgba(216, 160, 166, ` : `rgba(255, 255, 255, `;
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

  const handlePointerDown = (e) => {
    triggerHaptic('impact', 'light');
    ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, speed: 6, alpha: 0.8, fade: 0.015 });
  };
  const handlePointerMove = (e) => {
    pointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleTiltMove = useCallback((e) => {
    if (!cardRef.current || isHeroRevealed || e.pointerType === 'touch' || isShareFlipped) return;
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
  }, [isHeroRevealed, isShareFlipped]);

  const resetTilt = () => {
    if(isShareFlipped) return;
    setTilt({ rotateX: 0, rotateY: 0 });
    isMaxTiltRef.current = false;
  };

  const handleHeroHoldStart = (e) => {
    if (isShareFlipped) return;
    e.stopPropagation();
    setIsHeroRevealed(true);
    triggerHaptic('impact', 'medium');
  };
  const handleHeroHoldEnd = (e) => {
    e.stopPropagation();
    setIsHeroRevealed(false);
  };

  return (
    <div 
      className={`relative min-h-[100dvh] font-sans overflow-x-clip select-none transition-colors duration-700 ${isLightTheme ? 'bg-[#150508] text-[#F5ECEE] selection:bg-[#D8A0A6]/30' : 'bg-[#050505] text-white/90 selection:bg-white/20'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={() => triggerHaptic('impact', 'light')}
      onContextMenu={(e) => e.preventDefault()}
    >
      <AnimatePresence>
        {isAppLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[999] flex flex-col items-center justify-center pointer-events-none ${isLightTheme ? 'bg-[#150508]' : 'bg-[#050505]'}`}
          >
            <Loader2 className={`w-8 h-8 animate-spin ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/40'}`} />
            <div className={`mt-4 text-[10px] uppercase tracking-widest ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/40'}`}>
              Загрузка...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isShareFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5] pointer-events-none overflow-hidden"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                initial={{ x: '50vw', y: '50vh', scale: 0 }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: Math.random() * 1.5 + 0.5,
                  opacity: [0, Math.random() * 0.8 + 0.2, 0]
                }}
                transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: isLightTheme ? '#D8A0A6' : '#D4AF37', boxShadow: isLightTheme ? '0 0 10px #D8A0A6' : '0 0 10px #D4AF37' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`absolute top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-[#150508]' : 'bg-[#050505]'}`}>
        <img 
          src={CONFIG.heroPhoto} 
          alt={CONFIG.headerName} 
          className={`w-full h-full object-cover object-[center_25%] transition-all duration-700 ease-out origin-[center_25%] ${
            isHeroRevealed 
              ? 'blur-none scale-100 opacity-100 grayscale-0' 
              : 'blur-[50px] scale-125 opacity-30 grayscale-[30%]'
          }`}
        />
        <div className={`absolute inset-0 transition-all duration-700 ${isHeroRevealed ? 'opacity-0' : 'opacity-100'} ${isLightTheme ? 'bg-gradient-to-tr from-[#150508] via-[#150508]/80 to-[#5C1B26]/30 mix-blend-color' : 'bg-gradient-to-tr from-[#050505] via-[#0A1020]/40 to-[#2A2010]/30 mix-blend-color'}`}></div>
        <div className={`absolute inset-0 transition-colors duration-700 ${isLightTheme ? 'bg-gradient-to-b from-transparent via-[#150508]/80 to-[#150508]' : 'bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]'}`}></div>
      </div>

      <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none opacity-80" />

      <div className="relative z-10 w-full max-w-[500px] mx-auto flex flex-col px-6 pt-4 pb-8 gap-24">
        
        <section className={`relative flex flex-col ${heroPadding}`}>
          <header className={`flex items-center justify-between mb-5 ml-2 transition-opacity duration-500 ${isHeroRevealed ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`flex items-center gap-2 ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>
              <Fingerprint className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">{CONFIG.headerName}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic('impact', 'medium');
                  setIsShareFlipped(true);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-50 ${isLightTheme ? 'bg-[#D8A0A6]/10 text-[#D8A0A6] border border-[#D8A0A6]/30 shadow-[0_0_15px_rgba(216,160,166,0.2)] hover:bg-[#D8A0A6]/20' : 'bg-white/5 text-white/50 border border-white/10 hover:text-white hover:bg-white/10'}`}
              >
                <Mail size={14} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic('impact', 'medium');
                  setIsLightTheme(!isLightTheme);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-50 ${isLightTheme ? 'bg-[#D8A0A6]/10 text-[#D8A0A6] border border-[#D8A0A6]/30 shadow-[0_0_15px_rgba(216,160,166,0.2)] hover:bg-[#D8A0A6]/20' : 'bg-white/5 text-white/50 border border-white/10 hover:text-white hover:bg-white/10'}`}
              >
                {isLightTheme ? <Moon size={14} /> : <Diamond size={14} />}
              </button>
            </div>
          </header>

          <div 
            ref={cardRef}
            onPointerDown={(e) => {
              if (isShareFlipped) return;
              if (e.pointerType === 'mouse') {
                e.currentTarget.setPointerCapture(e.pointerId);
              }
            }}
            onPointerUp={(e) => {
              if (isShareFlipped) return;
              if (e.pointerType === 'mouse' && e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
              resetTilt();
            }}
            onPointerMove={handleTiltMove}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className={`w-full relative touch-pan-y transition-all ${isShareFlipped ? 'duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]' : (tilt.rotateX !== 0 || tilt.rotateY !== 0) ? 'duration-100 ease-out' : 'duration-700 ease-out'} ${isHeroRevealed ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
            style={{ 
              transform: `perspective(1000px) rotateX(${isShareFlipped ? 0 : tilt.rotateX}deg) rotateY(${isShareFlipped ? 180 : tilt.rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* FRONT FACE */}
            <div 
              className={`backdrop-blur-[20px] rounded-3xl p-8 transition-all duration-700 w-full h-full ${isLightTheme ? 'bg-[#F5ECEE]/[0.02] border-[0.5px] border-[#D8A0A6]/40 shadow-[0_20px_50px_rgba(216,160,166,0.05)]' : 'bg-white/[0.03] border-[0.5px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'} ${isShareFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-8 shadow-inner transition-colors duration-700 ${isLightTheme ? 'border-[#D8A0A6]/30 bg-[#D8A0A6]/10' : 'border-white/10 bg-white/[0.02]'}`}>
                <Sparkles className={`w-4 h-4 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/70'}`} strokeWidth={1.5} />
              </div>
              <h1 className={`text-4xl sm:text-5xl font-light tracking-wide mb-4 leading-tight transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`} style={{ transform: 'translateZ(30px)' }}>
                {CONFIG.heroTitle1}<br/>{CONFIG.heroTitle2}
              </h1>
              <p className={`text-base font-light leading-relaxed tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`} style={{ transform: 'translateZ(20px)' }}>
                {CONFIG.heroSubtitle}
              </p>
            </div>

            {/* BACK FACE (SHARE CARD) */}
            <div
              className={`absolute inset-0 backdrop-blur-[30px] rounded-3xl p-6 flex flex-col items-center justify-between transition-all duration-700 w-full h-full ${isLightTheme ? 'bg-[#1A080C]/90 border-[0.5px] border-[#D8A0A6]/40 shadow-[0_30px_60px_rgba(216,160,166,0.2)]' : 'bg-[#0a0a0a]/90 border-[0.5px] border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]'} ${isShareFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none rounded-3xl overflow-hidden" style={{ transform: 'translateZ(-1px)' }}>
                <img src={CONFIG.heroPhoto} alt="bg" className="w-full h-full object-cover grayscale blur-sm" />
                <div className={`absolute inset-0 ${isLightTheme ? 'bg-gradient-to-t from-[#1A080C] via-[#1A080C]/80 to-transparent' : 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent'}`}></div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); triggerHaptic('impact', 'light'); setIsShareFlipped(false); }}
                className={`absolute top-6 right-6 z-20 transition-colors hover:scale-110 active:scale-95 ${isLightTheme ? 'text-[#F5ECEE]/60 hover:text-[#F5ECEE]' : 'text-white/60 hover:text-white'}`}
                style={{ transform: 'translateZ(30px)' }}
              >
                <X size={20} />
              </button>

              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none mt-2" style={{ transform: 'translateZ(40px)' }}>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[2px] p-1 mb-4 shadow-2xl ${isLightTheme ? 'border-[#D8A0A6]/50 shadow-[0_0_30px_rgba(216,160,166,0.2)]' : 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
                  <img src={CONFIG.heroPhoto} alt={CONFIG.mastermindName} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-light tracking-widest text-center uppercase mb-1 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>
                  {CONFIG.heroTitle1} {CONFIG.heroTitle2}
                </h3>
                <p className={`text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-center ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/40'}`}>
                  Digital Asset
                </p>
              </div>

              <div className="relative z-10 w-full mt-auto" style={{ transform: 'translateZ(30px)' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                  className={`group relative w-full py-3.5 sm:py-4 font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center gap-3 ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]'}`}
                >
                  {copied ? <Check size={16} /> : <Mail size={16} />}
                  <span className="relative z-10 tracking-widest uppercase text-[10px] sm:text-[11px]">
                    {copied ? 'Ссылка скопирована' : 'Поделиться визиткой'}
                  </span>
                  <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className={`mt-6 w-full flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${isHeroRevealed ? 'opacity-0' : 'opacity-100'}`}>
             <div 
               className="flex flex-col items-center gap-3 cursor-pointer p-4 pointer-events-auto touch-none select-none"
               style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none', WebkitTapHighlightColor: 'transparent' }}
               onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
               onPointerDown={handleHeroHoldStart}
               onPointerUp={handleHeroHoldEnd}
               onPointerLeave={handleHeroHoldEnd}
               onPointerCancel={handleHeroHoldEnd}
             >
               <div className={`w-10 h-10 rounded-full border flex items-center justify-center animate-pulse transition-colors duration-700 ${isLightTheme ? 'border-[#D8A0A6]/20 bg-[#D8A0A6]/[0.05] shadow-[0_0_15px_rgba(216,160,166,0.1)]' : 'border-white/10 bg-white/[0.02] shadow-[0_0_15px_rgba(255,255,255,0.05)]'}`}>
                  <Fingerprint className={`w-5 h-5 ${isLightTheme ? 'text-[#D8A0A6]/60' : 'text-white/50'}`} strokeWidth={1.5} />
               </div>
               <span className={`text-[10px] uppercase tracking-[0.2em] font-medium text-center transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/60' : 'text-white/40'}`}>
                 {CONFIG.heroHintLine1}<br/>{CONFIG.heroHintLine2}
               </span>
             </div>
          </div>
        </section>

        {/* --- 3. ПОРТФОЛИО (COVER FLOW) --- */}
        <section className="flex flex-col gap-6 w-full overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className={`text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/50' : 'text-white/40'}`}>Портфолио</h2>
            <div className={`text-[10px] tracking-widest uppercase transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/50' : 'text-white/40'}`}>
              {portfolioIndex + 1} / {CONFIG.portfolio.length}
            </div>
          </div>
          
          <div 
            ref={portfolioRef}
            className="relative h-[280px] sm:h-[320px] w-full flex justify-center items-center touch-pan-y cursor-grab active:cursor-grabbing"
            style={{ perspective: '1200px' }}
            onPointerDown={(e) => {
              isDraggingPortfolio.current = true;
              touchStartX.current = e.clientX;
              touchStartY.current = e.clientY;
              touchEndX.current = e.clientX;
            }}
            onPointerMove={(e) => {
              if (isDraggingPortfolio.current) {
                if (e.pointerType === 'mouse') {
                  e.preventDefault();
                  if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }
                }
                touchEndX.current = e.clientX;
              }
            }}
            onPointerUp={(e) => {
              if (isDraggingPortfolio.current) {
                isDraggingPortfolio.current = false;
                handlePortfolioSwipe();
              }
              if (e.pointerType === 'mouse' && e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
            }}
            onPointerLeave={(e) => {
              if (isDraggingPortfolio.current) {
                isDraggingPortfolio.current = false;
                handlePortfolioSwipe();
              }
              if (e.pointerType === 'mouse' && e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
            }}
            onPointerCancel={(e) => {
              isDraggingPortfolio.current = false;
              if (e.pointerType === 'mouse' && e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
            }}
          >
            {CONFIG.portfolio.map((item, idx) => {
              const distance = idx - portfolioIndex;
              const isCenter = distance === 0;
              const absDistance = Math.abs(distance);
              
              let transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
              let zIndex = 10;
              let opacity = 0;
              let pointerEvents = 'none';

              if (isCenter) {
                transform = 'translateX(0px) translateZ(50px) rotateY(0deg) scale(1)';
                zIndex = 30;
                opacity = 1;
                pointerEvents = 'auto';
              } else if (absDistance === 1) {
                const sign = Math.sign(distance);
                transform = `translateX(${sign * 60}%) translateZ(-100px) rotateY(${sign * -35}deg) scale(0.9)`;
                zIndex = 20;
                opacity = 0.5;
                pointerEvents = 'auto';
              } else if (absDistance === 2) {
                const sign = Math.sign(distance);
                transform = `translateX(${sign * 85}%) translateZ(-250px) rotateY(${sign * -45}deg) scale(0.8)`;
                zIndex = 10;
                opacity = 0.1;
              }

              return (
                <div 
                  key={idx}
                  onClick={() => {
                    if (Math.abs(touchStartX.current - touchEndX.current) > 20) return;
                    if (isCenter) {
                      triggerHaptic('impact', 'light');
                      setExpandedDemo(item);
                      setIsDemoLoading(true);
                    } else {
                      triggerHaptic('selection');
                      setPortfolioIndex(idx);
                    }
                  }}
                  style={{ transform, zIndex, opacity, pointerEvents }}
                  className={`absolute w-[200px] sm:w-[240px] h-[250px] sm:h-[280px] border rounded-[2rem] p-6 flex flex-col justify-between cursor-pointer transition-all duration-[400ms] ease-out group ${isLightTheme ? 'bg-[#1A080C]/90 border-[#D8A0A6]/30 shadow-[0_20px_50px_rgba(216,160,166,0.15)] backdrop-blur-xl' : 'bg-[#1a1a1a]/80 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl'}`}
                >
                  {isCenter && (
                    <div className={`absolute inset-0 rounded-[2rem] flex items-center justify-center opacity-100 transition-opacity duration-300 z-10 ${isLightTheme ? 'bg-[#150508]/20 backdrop-blur-[2px]' : 'bg-black/20 backdrop-blur-[2px]'}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border shadow-2xl transition-transform animate-pulse group-hover:scale-110 ${isLightTheme ? 'bg-[#D8A0A6]/20 border-[#D8A0A6]/40 text-[#D8A0A6]' : 'bg-white/20 border-white/20 text-white'}`}>
                        <Maximize size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  )}

                  <div className={`relative z-20 transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/50'}`}>
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="relative z-20">
                    <h3 className={`text-[13px] uppercase tracking-widest font-medium transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            {CONFIG.portfolio.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  triggerHaptic('selection');
                  setPortfolioIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === portfolioIndex ? (isLightTheme ? 'bg-[#D8A0A6] w-6' : 'bg-white w-6') : (isLightTheme ? 'bg-[#F5ECEE]/20 w-1.5 hover:bg-[#F5ECEE]/40' : 'bg-white/20 w-1.5 hover:bg-white/40')}`}
              />
            ))}
          </div>
        </section>

        {/* --- 4. ТАРИФЫ (APPLE WALWAL VIBE) --- */}
        <section className="flex flex-col gap-6">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/50' : 'text-white/40'}`}>Тариф</h2>
          
          <div className="relative h-[560px] sm:h-[540px] w-full flex justify-center items-start perspective-1000 touch-pan-y">
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
                      : 'z-10 translate-y-[95px] scale-[0.92] opacity-95 hover:opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
                  } ${
                    isBase
                      ? (isLightTheme ? 'bg-[#20080C]/90 border-[#D8A0A6]/30' : 'bg-white/10 border-white/20')
                      : (isLightTheme ? 'bg-[#1A080C]/95 border-[#D8A0A6]/50 shadow-[0_0_30px_rgba(216,160,166,0.2)]' : 'bg-[#050505]/95 border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]')
                  }`}
                  style={{ height: 'auto', minHeight: '460px' }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest mb-1 ${!isBase || !isLightTheme ? 'text-white/50' : 'text-[#D8A0A6]/60'}`}>{tariff.subtitle}</p>
                        <h3 className={`text-2xl font-light tracking-wide ${!isBase || !isLightTheme ? 'text-white' : 'text-[#F5ECEE]'}`}>{tariff.title}</h3>
                      </div>
                      {isActive && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center animate-in zoom-in duration-500 ${!isBase || !isLightTheme ? 'bg-white/10 text-white' : 'bg-[#D8A0A6]/10 text-[#D8A0A6]'}`}>
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      {tariff.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex items-center h-4 shrink-0">
                            <div className={`w-1.5 h-1.5 rounded-full ${!isBase || !isLightTheme ? 'bg-white/30' : 'bg-[#D8A0A6]/40'}`}></div>
                          </div>
                          <p className={`text-xs font-light tracking-wide ${!isBase || !isLightTheme ? 'text-white/80' : 'text-[#F5ECEE]/80'}`}>{feat}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-6 border-t ${!isBase || !isLightTheme ? 'border-white/10' : 'border-[#D8A0A6]/20'}`}>
                    <p className={`text-[10px] uppercase tracking-widest mb-1 ${!isBase || !isLightTheme ? 'text-white/40' : 'text-[#D8A0A6]/50'}`}>Инвестиция</p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-xl font-medium tracking-wide ${!isBase || !isLightTheme ? 'text-white' : 'text-[#F5ECEE]'}`}>{tariff.price}</p>
                      {tariff.oldPrice && (
                        <p className={`text-xs line-through tracking-wide ${!isBase || !isLightTheme ? 'text-white/30' : 'text-[#F5ECEE]/40'}`}>{tariff.oldPrice}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 4.5. МОЯ ФИЛОСОФИЯ --- */}
        <section className="flex flex-col gap-6">
          <h2 className={`text-xs uppercase tracking-[0.3em] mb-2 transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/50' : 'text-white/40'}`}>Моя философия</h2>
          
          <div className={`border rounded-3xl p-6 relative overflow-hidden transition-colors duration-700 ${isLightTheme ? 'bg-[#D8A0A6]/[0.03] border-[#D8A0A6]/20' : 'bg-white/[0.03] border-white/10'}`}>
            <div className={`absolute bottom-0 right-0 w-full h-1/2 pointer-events-none transition-colors duration-700 ${isLightTheme ? 'bg-gradient-to-t from-[#150508] to-transparent' : 'bg-gradient-to-t from-white/5 to-transparent'}`}></div>
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-700 ${isLightTheme ? 'bg-[#9E5B6A]/30' : 'bg-purple-500/10'}`}></div>
            
            <h3 className={`text-lg font-medium mb-3 tracking-widest transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>{CONFIG.mastermindName}</h3>
            <p className={`text-[12px] leading-relaxed font-light tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/70' : 'text-white/50'}`}>
              {CONFIG.mastermindBio}
            </p>
          </div>
        </section>

        {/* --- 4.6. ОТЗЫВЫ --- */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex justify-between items-end mb-2">
            <h2 className={`text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/50' : 'text-white/40'}`}>Отзывы</h2>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerHaptic('impact', 'light');
                setIsReviewModalOpen(true);
              }}
              className={`text-[10px] uppercase tracking-widest border-b pb-0.5 transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/60 hover:text-[#D8A0A6] border-[#D8A0A6]/30' : 'text-white/50 hover:text-white border-white/20'}`}
            >
              Оставить отзыв
            </button>
          </div>
          
          <div 
            ref={reviewsRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide w-[calc(100%+48px)] -ml-6 pl-6 pr-0 sm:w-full sm:ml-0 sm:pl-0 cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              if (e.pointerType !== 'mouse') return;
              isDraggingReviews.current = true;
              startXReviews.current = e.pageX - reviewsRef.current.offsetLeft;
              scrollLeftReviews.current = reviewsRef.current.scrollLeft;
            }}
            onPointerMove={(e) => {
              if (!isDraggingReviews.current || e.pointerType !== 'mouse') return;
              e.preventDefault();
              const x = e.pageX - reviewsRef.current.offsetLeft;
              const walk = (x - startXReviews.current) * 1.5;
              reviewsRef.current.scrollLeft = scrollLeftReviews.current - walk;
            }}
            onPointerUp={() => { isDraggingReviews.current = false; }}
            onPointerLeave={() => { isDraggingReviews.current = false; }}
            onPointerCancel={() => { isDraggingReviews.current = false; }}
          >
            {reviewsList.map((review, idx) => (
              <div 
                key={idx}
                className={`min-w-[280px] border rounded-3xl p-6 snap-center flex flex-col gap-4 transition-colors duration-700 ${isLightTheme ? 'bg-[#D8A0A6]/[0.03] border-[#D8A0A6]/20 hover:bg-[#D8A0A6]/[0.06]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-sm font-medium tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>{review.name}</h3>
                    <p className={`text-[10px] mt-1 transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/50' : 'text-white/30'}`}>{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < review.stars ? "text-[#D8A0A6] fill-[#D8A0A6]" : (isLightTheme ? "text-[#F5ECEE]/10" : "text-white/20")} 
                      />
                    ))}
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed font-light italic transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/70' : 'text-white/60'}`}>
                  "{review.text}"
                </p>
              </div>
            ))}
            <div className="min-w-[24px] shrink-0 h-1"></div>
          </div>
        </section>

        {/* --- 5. CTA --- */}
        <section className="flex flex-col items-center pb-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (isOrderSubmitted) return; // 👈 Не даем открыть форму снова, если уже отправлено
              triggerHaptic('impact', 'medium');
              setIsOrderModalOpen(true);
            }}
            disabled={isOrderSubmitted}
            className={`group relative w-full h-16 rounded-2xl backdrop-blur-[20px] border-[0.5px] flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden mb-8 ${isOrderSubmitted ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'} ${isLightTheme ? 'bg-[#D8A0A6]/10 hover:bg-[#D8A0A6]/20 border-[#D8A0A6]/30 shadow-[0_10px_40px_rgba(216,160,166,0.15)]' : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/20 shadow-[0_10px_40px_rgba(255,255,255,0.03)]'}`}
          >
            <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] ${!isOrderSubmitted ? 'group-hover:translate-x-[100%]' : ''} ${isLightTheme ? 'bg-gradient-to-r from-transparent via-[#D8A0A6]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'}`}></div>
            <span className={`text-[13px] uppercase tracking-[0.2em] font-medium relative z-10 transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white/90'}`}>
              {isOrderSubmitted ? 'Бриф отправлен' : CONFIG.ctaText}
            </span>
            {!isOrderSubmitted ? (
              <ArrowRight className={`w-4 h-4 relative z-10 group-hover:translate-x-1 transition-all ${isLightTheme ? 'text-[#F5ECEE]/80' : 'text-white/70'}`} strokeWidth={1.5} />
            ) : (
              <Check className={`w-4 h-4 relative z-10 ${isLightTheme ? 'text-[#F5ECEE]/80' : 'text-white/70'}`} strokeWidth={1.5} />
            )}
          </button>

          <div className="text-center">
            <p className={`text-[10px] uppercase tracking-[0.3em] font-medium mb-3 transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/40' : 'text-white/30'}`}>
              {CONFIG.footerText}
            </p>
            <div className="flex justify-center gap-6">
              <a href={CONFIG.linkTelegram} target="_blank" rel="noreferrer" className={`text-[10px] tracking-widest uppercase cursor-pointer transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/60 hover:text-[#D8A0A6]' : 'text-white/50 hover:text-white'}`}>Telegram</a>
              <a href={CONFIG.linkVK} target="_blank" rel="noreferrer" className={`text-[10px] tracking-widest uppercase cursor-pointer transition-colors duration-700 ${isLightTheme ? 'text-[#D8A0A6]/60 hover:text-[#D8A0A6]' : 'text-white/50 hover:text-white'}`}>Вконтакте</a>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-[9px] tracking-[0.15em] uppercase">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic('impact', 'light');
                  setIsPrivacyModalOpen(true);
                }}
                className={`transition-all duration-500 opacity-40 hover:opacity-100 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white'}`}
              >
                Политика конфиденциальности
              </button>
              <span className={`opacity-40 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white'}`}>•</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerHaptic('impact', 'light');
                  setIsTermsModalOpen(true);
                }}
                className={`transition-all duration-500 opacity-40 hover:opacity-100 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white'}`}
              >
                Условия
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* --- 6. REVIEW MODAL --- */}
      {isReviewModalOpen && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md transition-all duration-700 ${isLightTheme ? 'bg-[#150508]/80' : 'bg-black/60'}`}>
          <div className={`relative w-full max-w-sm border rounded-3xl p-6 shadow-2xl transition-colors duration-700 ${isLightTheme ? 'bg-[#1A080C] border-[#D8A0A6]/20' : 'bg-[#0a0a0a] border-white/10'}`}>
            <button
              onClick={() => {
                triggerHaptic('impact', 'light');
                setIsReviewModalOpen(false);
                setTimeout(() => setIsReviewSubmitted(false), 300);
              }}
              className={`absolute top-4 right-4 transition-colors ${isLightTheme ? 'text-[#F5ECEE]/40 hover:text-[#F5ECEE]' : 'text-white/40 hover:text-white'}`}
            >
              <X size={20} />
            </button>

            {isReviewSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-2 transition-colors duration-700 ${isLightTheme ? 'bg-[#D8A0A6]/10 border-[#D8A0A6]/30 shadow-[0_0_30px_rgba(216,160,166,0.15)]' : 'bg-white/5 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
                  <Sparkles className={isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'} size={28} />
                </div>
                <h3 className={`text-xl font-medium tracking-wide transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Спасибо!</h3>
                <p className={`text-sm font-light leading-relaxed transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>
                  Ваш отзыв успешно отправлен.<br/>Скоро он появится здесь.
                </p>
                <button
                  onClick={() => {
                    triggerHaptic('impact', 'light');
                    setIsReviewModalOpen(false);
                    setTimeout(() => setIsReviewSubmitted(false), 300);
                  }}
                  className={`group relative w-full mt-6 py-4 font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
                >
                  <span className="relative z-10 tracking-widest uppercase text-xs">Закрыть</span>
                  <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className={`text-lg font-medium tracking-wide mb-2 text-center transition-colors duration-700 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>Новый отзыв</h3>

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
                        className={star <= reviewForm.rating ? "text-[#D8A0A6] fill-[#D8A0A6] drop-shadow-[0_0_10px_rgba(216,160,166,0.3)]" : (isLightTheme ? "text-[#F5ECEE]/10" : "text-white/10")}
                      />
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${isLightTheme ? 'bg-[#F5ECEE]/5 border-[#F5ECEE]/10 text-[#F5ECEE] placeholder-[#F5ECEE]/40 focus:border-[#D8A0A6]/40' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30'}`}
                />

                <textarea
                  placeholder="Ваш отзыв..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  rows={4}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${isLightTheme ? 'bg-[#F5ECEE]/5 border-[#F5ECEE]/10 text-[#F5ECEE] placeholder-[#F5ECEE]/40 focus:border-[#D8A0A6]/40' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30'}`}
                />

                <button
                  onClick={() => {
                    if (!reviewForm.name || !reviewForm.text) {
                      triggerHaptic('notification', 'error');
                      return;
                    }
                    triggerHaptic('notification', 'success');

                    if (CONFIG.googleScriptUrl && !CONFIG.googleScriptUrl.includes("ТВОЯ_ССЫЛКА")) {
                      fetch(CONFIG.googleScriptUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                          'Content-Type': 'text/plain;charset=utf-8',
                        },
                        body: JSON.stringify({
                          action: 'addReview',
                          name: reviewForm.name,
                          text: reviewForm.text,
                          stars: reviewForm.rating,
                          date: new Date().toLocaleDateString('ru-RU')
                        })
                      }).catch(err => console.error("Ошибка отправки:", err));
                    }

                    setIsReviewSubmitted(true);
                    setReviewForm({ name: '', text: '', rating: 5 });
                  }}
                  className={`group relative w-full py-4 font-medium rounded-2xl mt-4 transition-all duration-300 active:scale-[0.98] overflow-hidden ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
                >
                  <span className="relative z-10 tracking-widest uppercase text-xs">Отправить отзыв</span>
                  <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- 7. DEMO MODAL (ЛИКВИДНЫЙ МОРФИНГ / FULL SCREEN) --- */}
      <AnimatePresence>
        {expandedDemo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, borderRadius: '4rem' }}
            animate={{ opacity: 1, scale: 1, borderRadius: '0rem' }}
            exit={{ opacity: 0, scale: 0.8, borderRadius: '4rem' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`fixed inset-0 z-[500] flex flex-col items-center justify-center p-6 overflow-hidden ${isLightTheme ? 'bg-[#150508]' : 'bg-[#050505]'}`}
          >
            {/* Декоративное свечение на фоне */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 blur-[100px] rounded-full pointer-events-none ${isLightTheme ? 'bg-[#D8A0A6]' : 'bg-white'}`}></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
              <div className={`w-20 h-20 rounded-full border flex items-center justify-center mb-8 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.05)] ${isLightTheme ? 'bg-[#D8A0A6]/10 border-[#D8A0A6]/30 text-[#D8A0A6]' : 'bg-white/5 border-white/10 text-white/80'}`}>
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              
              <h2 className={`text-2xl font-light tracking-wide mb-3 ${isLightTheme ? 'text-[#F5ECEE]' : 'text-white'}`}>
                Симуляция готова
              </h2>
              <p className={`text-[13px] font-light leading-relaxed mb-6 ${isLightTheme ? 'text-[#F5ECEE]/60' : 'text-white/50'}`}>
                Интерактивный прототип <strong className={`font-medium tracking-wide ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white'}`}>«{expandedDemo.title}»</strong> откроется в новой вкладке для идеального погружения без искажений.
              </p>

              {/* 👇 ЗДЕСЬ МЕНЯЕТСЯ РАЗМЕР ЖЕЛТОГО ТЕКСТА И ШЕСТЕРЕНКИ 👇 */}
              {/* 1. Чтобы изменить размер текста, меняй классы 'text-xs sm:text-sm' (например, на 'text-[10px]') */}
              <div className={`flex items-center justify-center gap-2 mb-8 text-xs sm:text-sm font-bold tracking-widest uppercase ${isLightTheme ? 'text-[#D8A0A6] drop-shadow-[0_0_12px_rgba(216,160,166,0.8)]' : 'text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]'}`}>
                <span>Нажми</span>
                {/* 2. Чтобы изменить размер шестеренки, меняй 'w-5 h-5' (например, на 'w-4 h-4' или 'w-3 h-3') */}
                <Settings className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
                <span>чтобы увидеть все дизайны</span>
              </div>

              {/* 👇 ЗДЕСЬ МЕНЯЕТСЯ ВЫСОТА КНОПКИ "ОТКРЫТЬ LIVE-ДЕМО" 👇 */}
              {/* Чтобы сделать кнопку ТОНЬШЕ:
                  1. Удали в className ниже класс 'min-h-[64px]' 
                  2. Измени классы 'py-5 sm:py-6' на меньшие значения (например, напиши просто 'py-3' или 'py-2') */}
              <button
                onClick={() => {
                  triggerHaptic('impact', 'medium');
                  const url = expandedDemo.demoLink;
                  
                  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                    // Умное открытие для Telegram
                    window.Telegram.WebApp.openLink(url);
                  } else {
                    // Умное открытие для обычных браузеров
                    const a = document.createElement('a');
                    a.href = url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.click();
                  }
                }}
                className={`group relative w-full py-2 sm:py-2] font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center gap-3 mb-6 ${isLightTheme ? 'bg-[#D8A0A6] text-[#150508] shadow-[0_10px_30px_rgba(216,160,166,0.2)] hover:shadow-[0_10px_40px_rgba(216,160,166,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
              >
                <span className="relative z-10 tracking-widest uppercase text-[11px] font-bold">Открыть Live-Демо</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('impact', 'light');
                  setExpandedDemo(null);
                }}
                className={`text-[10px] tracking-widest uppercase pb-1 border-b transition-colors active:scale-95 ${isLightTheme ? 'text-[#D8A0A6]/60 border-[#D8A0A6]/30 hover:text-[#D8A0A6]' : 'text-white/40 border-white/20 hover:text-white'}`}
              >
                Отменить и вернуться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderModalOpen && (
          <OrderForm 
            onClose={() => setIsOrderModalOpen(false)} 
            onSuccess={() => setIsOrderSubmitted(true)}
            isLightTheme={isLightTheme} 
            triggerHaptic={triggerHaptic} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPrivacyModalOpen && (
          <PrivacyModal 
            onClose={() => setIsPrivacyModalOpen(false)} 
            isLightTheme={isLightTheme} 
            triggerHaptic={triggerHaptic} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTermsModalOpen && (
          <TermsModal 
            onClose={() => setIsTermsModalOpen(false)} 
            isLightTheme={isLightTheme} 
            triggerHaptic={triggerHaptic} 
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        html, body { 
          position: static !important;
          height: auto !important; 
          min-height: 100vh !important; 
          overflow-y: visible !important; 
          overflow-x: clip !important; 
          overscroll-behavior-y: auto !important;
          touch-action: auto !important;
        }
        #root {
          display: block !important;
          height: auto !important;
          min-height: 100vh !important;
          overflow: visible !important;
          overflow-x: clip !important;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}