import { useState } from 'react';
import Hero from './components/Hero';
import VideoShowcase, { type Video } from './components/VideoShowcase';
import Services from './components/Services';
import About from './components/About';
import WorldMap from './components/WorldMap';
import CTA from './components/CTA';
import VideoModal from './components/VideoModal';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-visible relative">
      <Hero />
      <VideoShowcase onVideoClick={setSelectedVideo} />
      <Services />
      <About />
      <WorldMap />
      <CTA />
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

export default App;
