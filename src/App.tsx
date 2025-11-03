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
    <div className="min-h-screen bg-black text-white overflow-visible relative">
      <div className="wind-container">
        <div className="wind-line wind-1"></div>
        <div className="wind-line wind-2"></div>
        <div className="wind-line wind-3"></div>
        <div className="wind-line wind-4"></div>
        <div className="wind-line wind-5"></div>
        <div className="wind-line wind-6"></div>
        <div className="wind-line wind-7"></div>
        <div className="wind-line wind-8"></div>
        <div className="wind-line wind-9"></div>
        <div className="wind-line wind-10"></div>
        <div className="wind-line wind-11"></div>
        <div className="wind-line wind-12"></div>
        <div className="wind-line wind-13"></div>
        <div className="wind-line wind-14"></div>
        <div className="wind-line wind-15"></div>
        <div className="wind-line wind-16"></div>
        <div className="wind-line wind-17"></div>
        <div className="wind-line wind-18"></div>
        <div className="wind-line wind-19"></div>
        <div className="wind-line wind-20"></div>
        <div className="wind-line wind-21"></div>
        <div className="wind-line wind-22"></div>
        <div className="wind-line wind-23"></div>
        <div className="wind-line wind-24"></div>
        <div className="wind-line wind-25"></div>
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
