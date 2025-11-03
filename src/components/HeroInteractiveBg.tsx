import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

export default function HeroInteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const particleCountRef = useRef<number>(75);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isVisible = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initParticles();
    };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = [];

      for (let i = 0; i < particleCountRef.current; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastFrameTimeRef.current = performance.now();
        animate();
      }
    };

    const animate = () => {
      if (!isVisible) return;

      const now = performance.now();
      const deltaTime = now - lastFrameTimeRef.current;

      if (deltaTime > 16.7 && particleCountRef.current > 40) {
        particleCountRef.current = Math.max(40, particleCountRef.current - 5);
        initParticles();
      }

      lastFrameTimeRef.current = now;

      const rect = canvas.getBoundingClientRect();
      const { x: mouseX, y: mouseY } = mouseRef.current;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.max(rect.width, rect.height) * 0.6
      );
      gradient.addColorStop(0, 'rgba(50, 50, 50, 0.15)');
      gradient.addColorStop(0.5, 'rgba(30, 30, 30, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(150, 15000 / (dist * dist));

        if (dist < 150) {
          p.vx -= (dx / dist) * force * 0.01;
          p.vy -= (dy / dist) * force * 0.01;
        }

        const toBaseX = (p.baseX - p.x) * 0.01;
        const toBaseY = (p.baseY - p.y) * 0.01;
        p.vx += toBaseX;
        p.vy += toBaseY;

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    mouseRef.current = {
      x: canvas.getBoundingClientRect().width / 2,
      y: canvas.getBoundingClientRect().height / 2,
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
