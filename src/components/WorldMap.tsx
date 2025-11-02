import { useRef, useState, useEffect } from 'react';

interface ClientLocation {
  name: string;
  country: string;
  x: number;
  y: number;
}

const clientLocations: ClientLocation[] = [
  { name: '', country: 'United Kingdom', x: 47, y: 19 },
  { name: '', country: 'United States', x: 20, y: 25 },
  { name: '', country: 'United Arab Emirates', x: 62.5, y: 35 }
];

export default function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="clients" className="py-24 px-6 bg-black relative overflow-hidden">
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
              style={{ height: '600px' }}
            >
              <div className="absolute inset-0">
                <img
                  src="/Assets/World_map_blank_without_borders.svg.png"
                  alt="World Map"
                  className="w-full h-auto select-none pointer-events-none"
                  draggable={false}
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.5) contrast(1.2)',
                    mixBlendMode: 'lighten'
                  }}
                />

                {/* Gridlines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Vertical lines (X-axis) */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const x = i * 10;
                    return (
                      <g key={`v-${i}`}>
                        <line
                          x1={`${x}%`}
                          y1="0%"
                          x2={`${x}%`}
                          y2="100%"
                          stroke="rgba(255, 255, 255, 0.15)"
                          strokeWidth="1"
                        />
                        <text
                          x={`${x}%`}
                          y="98%"
                          fill="rgba(255, 255, 255, 0.5)"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {x}
                        </text>
                      </g>
                    );
                  })}

                  {/* Horizontal lines (Y-axis) */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const y = i * 10;
                    return (
                      <g key={`h-${i}`}>
                        <line
                          x1="0%"
                          y1={`${y}%`}
                          x2="100%"
                          y2={`${y}%`}
                          stroke="rgba(255, 255, 255, 0.15)"
                          strokeWidth="1"
                        />
                        <text
                          x="2%"
                          y={`${y}%`}
                          fill="rgba(255, 255, 255, 0.5)"
                          fontSize="10"
                          dominantBaseline="middle"
                        >
                          {y}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {clientLocations.map((location, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-8 h-8 bg-white rounded-full animate-ping opacity-20" />
                      <div className="relative w-4 h-4 bg-white rounded-full border-2 border-white shadow-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
