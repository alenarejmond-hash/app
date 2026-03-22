import { useEffect, useRef } from 'react';

export const useCanvasEngine = (isLightTheme, activeTariff) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const pointerPos = useRef({ x: -1000, y: -1000 });
  const themeRef = useRef(isLightTheme);
  const activeTariffRef = useRef(activeTariff);

  useEffect(() => { themeRef.current = isLightTheme; }, [isLightTheme]);
  useEffect(() => { activeTariffRef.current = activeTariff; }, [activeTariff]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

        // Настройка цветов в зависимости от темы и тарифа
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

  const addRipple = (x, y) => {
    ripplesRef.current.push({ x, y, radius: 0, speed: 6, alpha: 0.8, fade: 0.015 });
  };

  const setPointerPosition = (x, y) => {
    pointerPos.current = { x, y };
  };

  return { canvasRef, addRipple, setPointerPosition };
};
