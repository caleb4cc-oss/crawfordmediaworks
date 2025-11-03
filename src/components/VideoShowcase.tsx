import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

const videos = [
  { id: 2, title: 'UGC Ad', thumbnail: '/Assets/Screenshot 2025-11-03 at 18.18.23.png', videoUrl: 'https://www.dropbox.com/scl/fi/ps66dza2myg2q42j0ao4f/UGC-Ad.mp4?rlkey=uhof7947voxb4bpz1vzu52hr5&st=0q4134ys&dl=0' },
  { id: 3, title: 'Podcast Ad', thumbnail: '/Assets/Screenshot 2025-11-03 at 18.20.17.png', videoUrl: 'https://www.dropbox.com/scl/fi/ldqezvdtqceluiwr50aib/Podcast-Ad.mp4?rlkey=8kojuvt6huz2oyip85w0bs13q&st=nj3e99e2&dl=0' },
  { id: 4, title: 'Street Interview Ad', thumbnail: '/Assets/Screenshot 2025-11-03 at 18.19.21.png', videoUrl: 'https://www.dropbox.com/scl/fi/kv1c3ho0dxg534z5ebm5j/Chicken-Run-Vox-Pop.mp4?rlkey=d2n639spa278qi2bos1g8bonc&st=a5hk0ag8&dl=0' },
  { id: 5, title: 'Founder Ad', thumbnail: '/Assets/Screenshot 2025-11-03 at 18.21.13.png', videoUrl: 'https://www.dropbox.com/scl/fi/o53ws008f8mb17wjjndmo/Founder-Ad.mp4?rlkey=1aa9ffy7if8pjkg2e66oe2kb9&st=9ezocjol&dl=0' },
];

interface VideoShowcaseProps {
  onVideoClick: (videoUrl: string) => void;
}

export default function VideoShowcase({ onVideoClick }: VideoShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="showcase" className="py-20 bg-black overflow-hidden relative">
      <div className="mb-12 px-6 max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Our Work</h2>
        <p className="text-xl text-gray-400">Real ad creatives. Real results.</p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 px-6 overflow-x-auto scrollbar-hide scroll-smooth relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[...videos, ...videos].map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            className="flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-2xl"
            style={{ width: '337.5px', height: '600px' }}
            onClick={() => {
              if (video.videoUrl) {
                window.open(video.videoUrl, '_blank');
              } else {
                onVideoClick(video.thumbnail);
              }
            }}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <Play size={32} className="text-black ml-1" fill="black" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl">
              <h3 className="text-2xl font-semibold whitespace-nowrap">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
