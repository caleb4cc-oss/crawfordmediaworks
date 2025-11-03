import InteractiveStreaks from './InteractiveStreaks';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <spline-viewer
          id="heroSpline"
          url="https://prod.spline.design/7K-GEL3EWZkk788g/scene.splinecode"
          loading="eager"
          interaction-prompt="none"
        />
      </div>

      <div className="floating-lines" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`line line-${i + 1}`}></div>
        ))}
      </div>

      <InteractiveStreaks />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">[ CRAWFORD_MEDIA_WORKS ]</div>
            <div className="flex gap-8">
              <button
                onClick={() => scrollToSection('showcase')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Showcase
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('clients')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Clients
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-content">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8 overflow-visible">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-relaxed typewriter-text">
              Crawford Media Works
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto font-semibold whitespace-nowrap">
            High-converting video ads that turn scrollers into buyers.
          </p>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            We take your raw footage and turn it into powerful, conversion-driven ad creatives designed for Meta, TikTok, and paid social performance.
          </p>

          <div className="flex justify-center items-center">
            <a
              href="https://calendly.com/crawfordmediaworks/crawford-media"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black rounded font-semibold text-lg hover:bg-gray-200 transition-all hover:scale-105 transform duration-200 border-2 border-white inline-block"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
