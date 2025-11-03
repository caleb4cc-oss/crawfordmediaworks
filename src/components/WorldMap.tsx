interface ClientLocation {
  name: string;
  country: string;
  x: number;
  y: number;
}

const clientLocations: ClientLocation[] = [
  { name: '', country: 'United Kingdom', x: 48, y: 19 },
  { name: '', country: 'United States', x: 30, y: 25 },
  { name: '', country: 'United Arab Emirates', x: 58, y: 33.5 }
];

export default function WorldMap() {
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
                  className="absolute"
                  style={{
                    position: 'absolute',
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-1.5 h-1.5 sm:w-8 sm:h-8 bg-white rounded-full animate-ping opacity-20" />
                    <div className="relative w-0.5 h-0.5 sm:w-4 sm:h-4 bg-white rounded-full border-2 border-white shadow-2xl" />
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
