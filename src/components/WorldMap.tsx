import { useEffect, useRef, useState } from 'react';

interface ClientLocation {
  name: string;
  country: string;
  x: number;
  y: number;
}

const clientLocations: ClientLocation[] = [
  { name: 'United States', country: 'United States', x: 27, y: 33 },
  { name: 'United Kingdom', country: 'United Kingdom', x: 45, y: 27 },
  { name: 'Dubai', country: 'United Arab Emirates', x: 58, y: 33.5 },
  { name: 'Sydney', country: 'Australia', x: 83, y: 76 }
];

export default function WorldMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selectedPin, setSelectedPin] = useState(0);
  const [showTool, setShowTool] = useState(true);
  const [readout, setReadout] = useState('Tap anywhere on the map to position the selected pin.');
  const [markers, setMarkers] = useState(clientLocations);

  const placeAt = (evt: React.MouseEvent | React.TouchEvent) => {
    if (!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const clientX = 'touches' in evt ? evt.touches[0].clientX : evt.clientX;
    const clientY = 'touches' in evt ? evt.touches[0].clientY : evt.clientY;
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;

    const updated = [...markers];
    updated[selectedPin] = {
      ...updated[selectedPin],
      x: parseFloat(xPct.toFixed(1)),
      y: parseFloat(yPct.toFixed(1))
    };
    setMarkers(updated);

    const pin = updated[selectedPin];
    const code = `left: ${xPct.toFixed(1)}%; top: ${yPct.toFixed(1)}%;`;
    setReadout(`${pin.name} → ${code}`);
    console.log(`[PinTool] ${pin.name} -> ${code}`);
  };

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
              onClick={placeAt}
              onTouchStart={placeAt}
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

              {markers.map((location, index) => (
                <div
                  key={index}
                  className="absolute cursor-pointer rounded-full bg-white shadow-lg"
                  style={{
                    position: 'absolute',
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '14px',
                    height: '14px',
                    boxShadow: '0 0 0 3px rgba(255,255,255,.25), 0 6px 16px rgba(0,0,0,.35)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-8 h-8 bg-white rounded-full animate-ping opacity-20" style={{ top: '-7px', left: '-7px' }} />
                  </div>
                </div>
              ))}

              {showTool && (
                <div
                  className="absolute right-2 top-2 z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white"
                  style={{
                    background: 'rgba(0,0,0,.7)',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  <span>Place pin:</span>
                  <select
                    value={selectedPin}
                    onChange={(e) => setSelectedPin(parseInt(e.target.value))}
                    className="rounded bg-white/10 px-2 py-1 text-xs text-white border border-white/20"
                  >
                    {markers.map((m, i) => (
                      <option key={i} value={i} className="bg-gray-900">
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowTool(false)}
                    className="rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20 border border-white/20"
                    type="button"
                  >
                    Done
                  </button>
                </div>
              )}

              <div
                className="absolute left-2 bottom-2 z-10 rounded-lg px-3 py-2 text-xs text-white"
                style={{ background: 'rgba(0,0,0,.6)' }}
              >
                {readout}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
