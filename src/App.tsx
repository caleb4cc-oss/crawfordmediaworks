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

  return (
    <div className="min-h-screen bg-black text-white overflow-visible">
      <div className="wind-container">
        <div className="wind-line wind-1"></div>
        <div className="wind-line wind-2"></div>
        <div className="wind-line wind-3"></div>
        <div className="wind-line wind-4"></div>
        <div className="wind-line wind-5"></div>
        <div className="wind-line wind-6"></div>
        <div className="wind-line wind-7"></div>
        <div className="wind-line wind-8"></div>
      </div>
      <Hero />
      <VideoShowcase onVideoClick={setSelectedVideo} />
      <Services />
      <About />
      <WorldMap />
      <CTA />
      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

export default App;
