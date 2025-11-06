import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
  isEmbed?: boolean;
}

export default function VideoModal({ videoUrl, onClose, isEmbed }: VideoModalProps) {
  useEffect(() => {
    if (videoUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [videoUrl]);

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
        className="relative bg-black rounded-2xl overflow-hidden"
        style={{ maxWidth: '1200px', width: '90vw', aspectRatio: isEmbed ? '9 / 16' : '16 / 9' }}
        onClick={(e) => e.stopPropagation()}
      >
        {isEmbed ? (
          <div
            className="relative z-[2]"
            style={{ width: '100%', height: '100%' }}
            dangerouslySetInnerHTML={{ __html: videoUrl }}
          />
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
