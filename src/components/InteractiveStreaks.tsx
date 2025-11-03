import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

interface GradientBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  particles: Particle[];
  dispersing: boolean;
}

export default function InteractiveStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<GradientBlob[]>([]);
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

    const createBlob = (): GradientBlob => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 120 + Math.random() * 180,
        opacity: 0.15 + Math.random() * 0.25,
        particles: [],
        dispersing: false,
      };
    };

    const createParticlesFromBlob = (blob: GradientBlob): Particle[] => {
      const particleCount = Math.floor(blob.radius * 0.5);
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * blob.radius;
        const px = blob.x + Math.cos(angle) * distance;
        const py = blob.y + Math.sin(angle) * distance;

        const speed = 0.3 + Math.random() * 0.5;
        const particleAngle = Math.random() * Math.PI * 2;

        particles.push({
          x: px,
          y: py,
          vx: Math.cos(particleAngle) * speed,
          vy: Math.sin(particleAngle) * speed,
          opacity: blob.opacity * (0.5 + Math.random() * 0.5),
          size: 1 + Math.random() * 2,
          life: 0,
          maxLife: 60 + Math.random() * 120,
        });
      }

      return particles;
    };

    blobsRef.current = Array.from({ length: 8 }, createBlob);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      blobsRef.current.forEach(blob => {
        const dx = e.clientX - blob.x;
        const dy = e.clientY - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < blob.radius + 100) {
          if (!blob.dispersing) {
            blob.dispersing = true;
            blob.particles = createParticlesFromBlob(blob);
          }
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const newBlobs = Array.from({ length: 3 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 2;
        return {
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 100 + Math.random() * 150,
          opacity: 0.35 + Math.random() * 0.25,
          particles: [],
          dispersing: false,
        };
      });
      blobsRef.current.push(...newBlobs);

      setTimeout(() => {
        blobsRef.current = blobsRef.current.slice(3);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobsRef.current.forEach((blob, index) => {
        if (blob.dispersing) {
          blob.particles = blob.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;

            const lifeRatio = particle.life / particle.maxLife;
            const currentOpacity = particle.opacity * (1 - lifeRatio);

            if (currentOpacity > 0.01) {
              ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
              return true;
            }
            return false;
          });

          if (blob.particles.length === 0) {
            blobsRef.current.splice(index, 1);
            const newBlob = createBlob();
            blobsRef.current.push(newBlob);
          }
        } else {
          blob.x += blob.vx;
          blob.y += blob.vy;

          blob.vx *= 0.98;
          blob.vy *= 0.98;

          if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
          if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
          if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
          if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

          const speedMagnitude = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
          if (speedMagnitude < 0.1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.2 + Math.random() * 0.3;
            blob.vx = Math.cos(angle) * speed;
            blob.vy = Math.sin(angle) * speed;
          }

          const gradient = ctx.createRadialGradient(
            blob.x, blob.y, 0,
            blob.x, blob.y, blob.radius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${blob.opacity})`);
          gradient.addColorStop(0.3, `rgba(255, 255, 255, ${blob.opacity * 0.7})`);
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${blob.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fill();
        }
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
