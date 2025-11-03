import { useRef } from 'react';

interface ClientLocation {
  name: string;
  country: string;
  x: number;
  y: number;
}

const clientLocations: ClientLocation[] = [
  { name: 'United States', country: 'United States', x: 18.7, y: 27.6 },
  { name: 'United Kingdom', country: 'United Kingdom', x: 46.7, y: 18.1 },
  { name: 'Dubai', country: 'United Arab Emirates', x: 62.4, y: 34.3 }
];

export default function WorldMap() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <section id="clients" className="py-16 sm:py-24 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Brands Around the World Trust Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            From start-ups to established brands — our content drives revenue, not just views.
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-4 sm:p-8 backdrop-blur">
            <div
              ref={wrapRef}
              className="relative rounded-lg bg-black overflow-hidden"
              style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
            >
              <img
                src="/Assets/World_map_blank_without_borders.svg.png"
                alt="World Map"
                className="select-none pointer-events-none"
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  opacity: 0.4,
                  filter: 'brightness(1.2) contrast(1.1)'
                }}
              />

              {clientLocations.map((location, index) => (
                <div
                  key={index}
                  className="absolute cursor-pointer rounded-full bg-white shadow-lg w-2 h-2 sm:w-3.5 sm:h-3.5"
                  style={{
                    position: 'absolute',
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 0 2px rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.35)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full animate-ping opacity-20" style={{ top: '-10px', left: '-10px' }} />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
