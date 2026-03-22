import { useEffect, useState } from 'react';

export const useTelegramSettings = () => {
  const [heroPadding, setHeroPadding] = useState('pt-28');
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        if (tg.platform === 'unknown' || !tg.platform) {
          setHeroPadding('pt-10');
          setIsTelegram(false);
        } else {
          setHeroPadding('pt-28');
          setIsTelegram(true);
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
          tg.setHeaderColor('#050505');
        }
        
        return () => {
          if (tg && typeof tg.offEvent === 'function') tg.offEvent('viewportChanged', enforceFullscreen);
        };
      }
    } catch (error) {
      console.error('Telegram API Error:', error);
    }
  }, []);

  return { heroPadding, isTelegram };
};
