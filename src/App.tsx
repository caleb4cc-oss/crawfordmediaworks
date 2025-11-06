import { useState } from 'react';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import Services from './components/Services';
import About from './components/About';
import WorldMap from './components/WorldMap';
import CTA from './components/CTA';
import VideoModal from './components/VideoModal';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isEmbed, setIsEmbed] = useState(false);

  const handleVideoClick = (content: string, isEmbedContent = false) => {
    setSelectedVideo(content);
    setIsEmbed(isEmbedContent);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-visible relative">
      <Hero />
      <VideoShowcase onVideoClick={handleVideoClick} />
      <Services />
      <About />
      <WorldMap />
      <CTA />
      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isEmbed={isEmbed}
      />
    </div>
  );
}

export default App;
