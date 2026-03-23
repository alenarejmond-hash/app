import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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
              <p className="text-xs font-light leading-relaxed">Реализация за 3–5 рабочих дней с момента получения 100% заполненного брифа и материалов.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Искусство правок</h4>
              <p className="text-xs font-light leading-relaxed">Наполнение контентом включено. В индив-проектах включено 2 круга правок на этапе дизайна. Правки после сдачи проекта — платные.</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-widest mb-1 ${isLightTheme ? 'text-[#D8A0A6]' : 'text-white/80'}`}>Владение</h4>
              <p className="text-xs font-light leading-relaxed">После полной оплаты вы получаете полные права на бота и Mini App. Никаких ежемесячных платежей.</p>
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

export default TermsModal;