import { Scissors, TrendingUp } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export default function Services() {
  const services = [
    {
      icon: Scissors,
      title: 'Video Editing',
      description: 'High-end video ad editing optimised for attention, retention, and conversions.',
    },
    {
      icon: TrendingUp,
      title: 'Meta Ads Management',
      description: 'Full-funnel Meta ad strategy, creative testing, scaling, and performance optimisation.',
    },
  ];

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <spline-viewer
          url="https://prod.spline.design/7K-GEL3EWZkk788g/scene.splinecode"
          loading="eager"
          interaction-prompt="none"
          style={{ width: '100%', height: '100%', opacity: 0.3 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">Our Services</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black p-12 rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <service.icon size={48} className="mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
              <p className="text-xl text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
