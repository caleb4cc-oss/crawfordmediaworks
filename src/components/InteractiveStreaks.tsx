import { useEffect, useRef } from 'react';

interface GradientBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
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
        radius: 300 + Math.random() * 400,
        opacity: 0.08 + Math.random() * 0.12,
      };
    };

    blobsRef.current = Array.from({ length: 12 }, createBlob);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      blobsRef.current.forEach(blob => {
        const dx = e.clientX - blob.x;
        const dy = e.clientY - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 300) {
          const force = (300 - distance) / 300;
          blob.vx += (dx / distance) * force * 0.3;
          blob.vy += (dy / distance) * force * 0.3;
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const newBlobs = Array.from({ length: 2 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 1.2;
        return {
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 350 + Math.random() * 400,
          opacity: 0.25 + Math.random() * 0.15,
        };
      });
      blobsRef.current.push(...newBlobs);

      setTimeout(() => {
        blobsRef.current = blobsRef.current.slice(2);
      }, 4000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobsRef.current.forEach(blob => {
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
        gradient.addColorStop(0.4, `rgba(255, 255, 255, ${blob.opacity * 0.6})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${blob.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
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
