import { useCallback } from 'react';

export const useHaptic = () => {
  return useCallback((type = 'impact', style = 'light') => {
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
};