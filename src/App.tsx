import { useState } from 'react';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import Services from './components/Services';
import About from './components/About';
import CTA from './components/CTA';
import VideoModal from './components/VideoModal';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-visible">
      <Hero />
      <VideoShowcase onVideoClick={setSelectedVideo} />
      <Services />
      <About />
      <CTA />
      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

export default App;
