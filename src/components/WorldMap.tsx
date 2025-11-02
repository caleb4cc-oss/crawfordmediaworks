import { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';

interface ClientLocation {
  name: string;
  country: string;
  coordinates: [number, number];
}

const clientLocations: ClientLocation[] = [
  { name: 'London', country: 'United Kingdom', coordinates: [-0.1276, 51.5074] },
  { name: 'New York', country: 'United States', coordinates: [-74.006, 40.7128] },
  { name: 'Dubai', country: 'United Arab Emirates', coordinates: [55.2708, 25.2048] }
];

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeLocation, setActiveLocation] = useState<ClientLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<ClientLocation | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);
    const width = 1200;
    const height = 600;

    svg.selectAll('*').remove();

    const projection = geoMercator()
      .scale(180)
      .translate([width / 2, height / 1.5]);

    const path = geoPath().projection(projection);

    const g = svg.append('g');

    const worldData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]
            ]]
          }
        }
      ]
    };

    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#0a0a0a');

    const gridLines = g.append('g').attr('class', 'grid-lines');

    for (let lat = -90; lat <= 90; lat += 15) {
      const coords: [number, number][] = [];
      for (let lon = -180; lon <= 180; lon += 5) {
        coords.push([lon, lat]);
      }
      gridLines.append('path')
        .datum({ type: 'LineString', coordinates: coords })
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', '#1a1a1a')
        .attr('stroke-width', 0.5);
    }

    for (let lon = -180; lon <= 180; lon += 15) {
      const coords: [number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        coords.push([lon, lat]);
      }
      gridLines.append('path')
        .datum({ type: 'LineString', coordinates: coords })
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', '#1a1a1a')
        .attr('stroke-width', 0.5);
    }

    const continents = g.append('g').attr('class', 'continents');
    const continentCoords: number[][][][] = [
      [[[-100, 50], [-100, 30], [-80, 30], [-80, 50], [-100, 50]]],
      [[[0, 60], [0, 35], [40, 35], [40, 60], [0, 60]]],
      [[[40, 40], [40, 10], [80, 10], [80, 40], [40, 40]]]
    ];

    continentCoords.forEach((coords) => {
      continents.append('path')
        .datum({ type: 'Polygon', coordinates: coords })
        .attr('d', path as any)
        .attr('fill', '#1a1a1a')
        .attr('stroke', '#2a2a2a')
        .attr('stroke-width', 1);
    });

    const locationsGroup = g.append('g').attr('class', 'locations');

    clientLocations.forEach((location) => {
      const [x, y] = projection(location.coordinates) || [0, 0];

      const locationGroup = locationsGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`);

      locationGroup.append('circle')
        .attr('r', 8)
        .attr('fill', '#ffffff')
        .attr('opacity', 0.2)
        .attr('class', 'pulse-ring');

      locationGroup.append('circle')
        .attr('r', 6)
        .attr('fill', '#ffffff')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .attr('class', 'location-pin')
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredLocation(location))
        .on('mouseleave', () => setHoveredLocation(null))
        .on('click', () => setActiveLocation(location));

      locationGroup.append('circle')
        .attr('r', 20)
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredLocation(location))
        .on('mouseleave', () => setHoveredLocation(null))
        .on('click', () => setActiveLocation(location));
    });

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([[-200, -200], [width + 200, height + 200]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoomBehavior as any);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { r: 8; opacity: 0.2; }
        50% { r: 20; opacity: 0; }
      }
      .pulse-ring {
        animation: pulse 2s ease-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

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
            <div className="flex justify-center overflow-hidden rounded-lg">
              <svg
                ref={svgRef}
                viewBox="0 0 1200 600"
                className="w-full h-auto cursor-move"
                style={{ maxHeight: '600px' }}
              />
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>&gt; Click and drag to explore • Scroll to zoom • Click pins for details</p>
            </div>
          </div>

          {displayLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-white text-black px-6 py-4 rounded-lg shadow-2xl border-2 border-white animate-fadeIn">
                <div className="text-sm font-mono font-semibold mb-1">{displayLocation.country}</div>
                <div className="text-2xl font-bold">{displayLocation.name}</div>
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
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400 font-mono">{location.country}</span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                {location.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
