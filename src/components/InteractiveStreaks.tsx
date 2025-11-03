import { useEffect, useRef } from 'react';

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  thickness: number;
}

export default function InteractiveStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streaksRef = useRef<Streak[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createStreak = (): Streak => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.35;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 40 + Math.random() * 80,
        opacity: 0.05 + Math.random() * 0.15,
        thickness: 1 + Math.random() * 2,
      };
    };

    streaksRef.current = Array.from({ length: 25 }, createStreak);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      streaksRef.current.forEach(streak => {
        const dx = e.clientX - streak.x;
        const dy = e.clientY - streak.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          streak.vx += (dx / distance) * force * 0.25;
          streak.vy += (dy / distance) * force * 0.25;
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const newStreaks = Array.from({ length: 5 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 1.5;
        return {
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: 60 + Math.random() * 100,
          opacity: 0.2 + Math.random() * 0.2,
          thickness: 2 + Math.random() * 3,
        };
      });
      streaksRef.current.push(...newStreaks);

      setTimeout(() => {
        streaksRef.current = streaksRef.current.slice(5);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streaksRef.current.forEach(streak => {
        streak.x += streak.vx;
        streak.y += streak.vy;

        streak.vx *= 0.99;
        streak.vy *= 0.99;

        if (streak.x < 0 || streak.x > canvas.width) {
          streak.vx *= -1;
          streak.x = Math.max(0, Math.min(canvas.width, streak.x));
        }
        if (streak.y < 0 || streak.y > canvas.height) {
          streak.vy *= -1;
          streak.y = Math.max(0, Math.min(canvas.height, streak.y));
        }

        const speedMagnitude = Math.sqrt(streak.vx * streak.vx + streak.vy * streak.vy);
        if (speedMagnitude < 0.1) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.15 + Math.random() * 0.25;
          streak.vx = Math.cos(angle) * speed;
          streak.vy = Math.sin(angle) * speed;
        }

        const endX = streak.x - (streak.vx / speedMagnitude) * streak.length;
        const endY = streak.y - (streak.vy / speedMagnitude) * streak.length;

        const gradient = ctx.createLinearGradient(streak.x, streak.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${streak.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = streak.thickness;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
