import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
  isEmbed?: boolean;
}

export default function VideoModal({ videoUrl, onClose, isEmbed }: VideoModalProps) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      document.body.style.overflow = 'hidden';

      if (isEmbed) {
        const timer = setTimeout(() => {
          setShowFallback(true);
        }, 2000);

        return () => {
          clearTimeout(timer);
          document.body.style.overflow = 'unset';
          setShowFallback(false);
        };
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      setShowFallback(false);
    };
  }, [videoUrl, isEmbed]);

  if (!videoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center p-6 animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 z-50"
      >
        <X size={24} className="text-black" />
      </button>

      <div
        className="relative bg-black overflow-hidden"
        style={{
          width: '90vw',
          maxWidth: isEmbed ? '420px' : '1200px',
          aspectRatio: isEmbed ? '9 / 16' : '16 / 9',
          borderRadius: '16px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isEmbed ? (
          <div className="relative" style={{ width: '100%', height: '100%', background: '#000' }}>
            <iframe
              src="https://www.youtube.com/embed/2b3BUo3xZP8?autoplay=1&mute=1&playsinline=1&origin=https://bolt.new"
              title="Founder Ad"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', display: 'block' }}
              onLoad={() => setShowFallback(false)}
            />
            {showFallback && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10">
                <a
                  href="https://www.youtube.com/embed/2b3BUo3xZP8?autoplay=1&mute=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Open Video
                </a>
              </div>
            )}
          </div>
        ) : (
          <img
            src={videoUrl}
            alt="Video preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
