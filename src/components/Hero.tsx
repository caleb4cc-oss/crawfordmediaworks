import { Play } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <spline-viewer
          id="hero-spline"
          url="https://prod.spline.design/W43q4Hg6Ghj1QPJt/scene.splinecode"
          loading="eager"
          interaction-prompt="none"
        />
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
      </div>

      <div className="hero-content">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none typewriter-text">
              Video Editing Agency
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            &gt; We create high-performing video ads that convert. From editing to Meta ad management,
            we turn raw footage into scroll-stopping content that drives sales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-black rounded font-semibold text-lg hover:bg-gray-200 transition-all hover:scale-105 transform duration-200 border-2 border-white">
              [ BOOK_A_CALL ]
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded font-semibold text-lg hover:bg-white hover:text-black transition-all hover:scale-105 transform duration-200 flex items-center gap-2">
              <Play size={20} />
              [ VIEW_WORK ]
            </button>
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
