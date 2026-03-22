import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';

export const OrderForm = ({ onClose, isLightTheme, triggerHaptic, CONFIG }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { tariff: 'Pro', domain: false }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    triggerHaptic('impact', 'light');
    return () => window.removeEventListener('resize', handleResize);
  }, [triggerHaptic]);

  const watchTariff = watch('tariff');
  const watchDomain = watch('domain');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // 1. Формируем JSON с новым полем "Контакт"
      const payload = {
        action: 'newOrder',
        name: data.name,
        contact: data.contact, // 👈 Твой новый контакт
        tariff: data.tariff,
        domain: data.domain,
        date: new Date().toLocaleDateString('ru-RU')
      };

      // 2. 👈 ВСТАВЬ СЮДА СВОЮ ССЫЛКУ НА GOOGLE SCRIPT ЗАМЕСТО ЗАГЛУШКИ
      const scriptUrl = "<YOUR_GOOGLE_SCRIPT_URL>";

      if (scriptUrl !== "<YOUR_GOOGLE_SCRIPT_URL>") {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } else if (CONFIG?.googleOrderScriptUrl && !CONFIG.googleOrderScriptUrl.includes("ТВОЯ_ССЫЛКА")) {
        // Fallback, если берем из общего конфига
        await fetch(CONFIG.googleOrderScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }
      
      setIsSuccess(true);
      triggerHaptic('notification', 'success');
      
      setTimeout(() => {
        const tg = window.Telegram?.WebApp;
        if (tg && typeof tg.close === 'function') {
          tg.close();
        } else {
          onClose();
        }
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
      {/* Встроенный салют (вместо react-confetti) */}
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
              style={{ backgroundColor: isLightTheme ? ['#C48766', '#4A302B', '#EFECE8'][i % 3] : ['#D4AF37', '#ffffff', '#8C64FF'][i % 3] }}
            />
          ))}
        </div>
      )}
      
      <motion.div 
        variants={modalVars} initial="hidden" animate="visible" exit="exit"
        className={`relative w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] border shadow-2xl overflow-hidden ${isLightTheme ? 'bg-[#FAF7F2]/90 border-[#C48766]/30 shadow-[0_30px_60px_rgba(196,135,102,0.15)]' : 'bg-[#0a0a0a]/90 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]'}`}
      >
        <button onClick={() => { triggerHaptic('impact', 'light'); onClose(); }} className={`absolute top-6 right-6 transition-colors hover:scale-110 active:scale-95 ${isLightTheme ? 'text-[#4A302B]/40 hover:text-[#4A302B]' : 'text-white/40 hover:text-white'}`}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <motion.div variants={itemVars} className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-2 ${isLightTheme ? 'bg-[#C48766]/10 border-[#C48766]/30 shadow-[0_0_30px_rgba(196,135,102,0.2)]' : 'bg-white/5 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}>
              <Sparkles className={isLightTheme ? 'text-[#C48766]' : 'text-white/80'} size={28} />
            </div>
            <h3 className={`text-2xl font-light tracking-wide ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Бриф зафиксирован ✨</h3>
            <p className={`text-sm font-light leading-relaxed ${isLightTheme ? 'text-[#4A302B]/60' : 'text-white/50'}`}>Скоро я свяжусь с вами для обсуждения деталей.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <motion.div variants={itemVars}>
              <h3 className={`text-2xl font-light tracking-wide mb-1 ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Ваш Digital-мир</h3>
              <p className={`text-xs font-light tracking-wide uppercase ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/40'}`}>Заполните детали проекта</p>
            </motion.div>

            <motion.div variants={itemVars}>
              <input 
                {...register('name', { required: true })}
                type="text" 
                placeholder="Ваше Имя" 
                className={`w-full border rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all duration-300 ${isLightTheme ? 'bg-[#4A302B]/5 border-[#4A302B]/10 text-[#4A302B] placeholder-[#4A302B]/40 focus:border-[#C48766] focus:bg-white focus:shadow-[0_0_20px_rgba(196,135,102,0.15)]' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">Имя обязательно</span>}
            </motion.div>

            {/* НОВОЕ ПОЛЕ КОНТАКТ */}
            <motion.div variants={itemVars}>
              <input 
                {...register('contact', { required: true })}
                type="text" 
                placeholder="@username или номер телефона" 
                className={`w-full border rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all duration-300 ${isLightTheme ? 'bg-[#4A302B]/5 border-[#4A302B]/10 text-[#4A302B] placeholder-[#4A302B]/40 focus:border-[#C48766] focus:bg-white focus:shadow-[0_0_20px_rgba(196,135,102,0.15)]' : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
              />
              {errors.contact && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">Контакт обязателен</span>}
            </motion.div>

            <motion.div variants={itemVars} className="flex flex-col gap-3">
              <p className={`text-[10px] uppercase tracking-widest pl-2 ${isLightTheme ? 'text-[#4A302B]/50' : 'text-white/40'}`}>Выбор тарифа</p>
              <div className="grid grid-cols-2 gap-3">
                {['Pro', 'Ultra'].map((t) => (
                  <div 
                    key={t}
                    onClick={() => { triggerHaptic('medium'); setValue('tariff', t); }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95 ${watchTariff === t ? (isLightTheme ? 'bg-[#C48766]/10 border-[#C48766] shadow-[0_0_15px_rgba(196,135,102,0.2)] text-[#4A302B]' : 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white') : (isLightTheme ? 'bg-transparent border-[#4A302B]/10 opacity-60 text-[#4A302B]/60' : 'bg-transparent border-white/10 opacity-50 text-white/50')}`}
                  >
                    <span className="text-lg font-medium tracking-wide">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVars} 
              onClick={() => { triggerHaptic('medium'); setValue('domain', !watchDomain); }}
              className={`cursor-pointer flex justify-between items-center p-5 border rounded-2xl transition-all duration-300 active:scale-95 ${isLightTheme ? 'bg-[#4A302B]/5 border-[#4A302B]/10' : 'bg-white/5 border-white/10'}`}
            >
              <span className={`text-sm tracking-wide font-light ${isLightTheme ? 'text-[#4A302B]' : 'text-white'}`}>Нужен домен?</span>
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${watchDomain ? (isLightTheme ? 'bg-[#C48766]' : 'bg-white') : (isLightTheme ? 'bg-[#4A302B]/20' : 'bg-white/10')}`}>
                <motion.div 
                  layout
                  className={`w-4 h-4 rounded-full shadow-md ${isLightTheme ? (watchDomain ? 'bg-white' : 'bg-[#EFECE8]') : (watchDomain ? 'bg-black' : 'bg-white/50')}`}
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
              className={`group relative w-full py-4 font-medium rounded-2xl mt-2 transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center ${isLightTheme ? 'bg-[#4A302B] text-white shadow-[0_10px_30px_rgba(74,48,43,0.2)] hover:shadow-[0_10px_40px_rgba(74,48,43,0.3)]' : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]'}`}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span className="relative z-10 tracking-widest uppercase text-xs">Отправить бриф</span>
                  <div className={`absolute inset-0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%] ${isLightTheme ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};