import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function HeroInteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const lastFrameTime = useRef(performance.now());
  const frameCount = useRef(0);
  const fpsCheckInterval = useRef(0);
  const [particleCount, setParticleCount] = useState(80);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const initParticles = (count: number): Particle[] => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
      return newParticles;
    };

    resizeCanvas();
    const initialParticles = initParticles(particleCount);
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleResize = () => {
      resizeCanvas();
      setParticles(initParticles(particleCount));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      frameCount.current++;
      fpsCheckInterval.current += deltaTime;

      if (fpsCheckInterval.current >= 1000) {
        const fps = frameCount.current;
        frameCount.current = 0;
        fpsCheckInterval.current = 0;

        if (fps < 50 && particleCount > 40) {
          const newCount = Math.max(40, Math.floor(particleCount * 0.7));
          setParticleCount(newCount);
          setParticles(initParticles(newCount));
        }
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const gradient = ctx.createRadialGradient(
        mousePos.current.x,
        mousePos.current.y,
        0,
        mousePos.current.x,
        mousePos.current.y,
        canvas.offsetWidth * 0.5
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      initialParticles.forEach((particle, i) => {
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120;

        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          particle.vx -= (dx / distance) * force * 0.3;
          particle.vy -= (dy / distance) * force * 0.3;
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.offsetHeight) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y));
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < initialParticles.length; j++) {
          const other = initialParticles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      } else {
        lastFrameTime.current = performance.now();
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [particleCount]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="backdrop-blur-sm bg-black/20 rounded-3xl p-12 border border-white/10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Elevate Your Brand
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Cutting-edge creative solutions powered by performance and innovation.
            Experience the future of digital storytelling.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
