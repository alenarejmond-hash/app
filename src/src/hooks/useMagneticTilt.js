import { useState, useRef, useCallback } from 'react';

export const useMagneticTilt = (triggerHaptic) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const isMaxTiltRef = useRef(false);

  const handleTiltMove = useCallback((e, isHeroRevealed) => {
    if (!cardRef.current || isHeroRevealed) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Интенсивность наклона
    const rotateX = ((y - centerY) / centerY) * -25; 
    const rotateY = ((x - centerX) / centerX) * 25;

    setTilt({ rotateX, rotateY });

    if (Math.abs(rotateX) > 13 || Math.abs(rotateY) > 13) {
      if (!isMaxTiltRef.current) {
        if (triggerHaptic) triggerHaptic('impact', 'light');
        isMaxTiltRef.current = true;
      }
    } else {
      isMaxTiltRef.current = false;
    }
  }, [triggerHaptic]);

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    isMaxTiltRef.current = false;
  };

  return { cardRef, tilt, handleTiltMove, resetTilt };
};