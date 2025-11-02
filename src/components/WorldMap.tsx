import { useRef, useState, useEffect } from 'react';

interface ClientLocation {
  name: string;
  country: string;
  x: number;
  y: number;
}

const clientLocations: ClientLocation[] = [
  { name: '', country: 'United Kingdom', x: 50.5, y: 30 },
  { name: '', country: 'United States', x: 22, y: 35 },
  { name: '', country: 'United Arab Emirates', x: 56, y: 42 }
];

export default function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeLocation, setActiveLocation] = useState<ClientLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<ClientLocation | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 3);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.location-pin')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const displayLocation = activeLocation || hoveredLocation;

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            [ CLIENTS_AROUND_THE_WORLD ]
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            &gt; Trusted by brands across three continents, delivering results globally
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 backdrop-blur">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg bg-black"
              style={{ height: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="absolute inset-0 transition-transform duration-200"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center center'
                }}
              >
                <img
                  src="/Assets/very-high-quality-10000x5268px-no-borders-world-map-but-v0-z7mxzmiohwsc1.webp"
                  alt="World Map"
                  className="w-full h-auto select-none pointer-events-none"
                  draggable={false}
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.5) contrast(1.2)',
                    mixBlendMode: 'lighten'
                  }}
                />

                {clientLocations.map((location, index) => (
                  <div
                    key={index}
                    className="absolute location-pin"
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div
                      className="relative cursor-pointer"
                      onMouseEnter={() => setHoveredLocation(location)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onClick={() => setActiveLocation(location)}
                    >
                      <div className="absolute inset-0 w-8 h-8 bg-white rounded-full animate-ping opacity-20" />
                      <div className="relative w-4 h-4 bg-white rounded-full border-2 border-white shadow-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>&gt; Click and drag to explore • Scroll to zoom • Click pins for details</p>
            </div>
          </div>

          {displayLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
              <div className="bg-white text-black px-6 py-4 rounded-lg shadow-2xl border-2 border-white animate-fadeIn">
                <div className="text-2xl font-bold">{displayLocation.country}</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {clientLocations.map((location, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-xl p-6 hover:border-white transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveLocation(location)}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                  {location.country}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
