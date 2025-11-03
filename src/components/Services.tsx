import { Scissors, TrendingUp } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Scissors,
      title: 'Video Ad Editing',
      description: 'Scroll-stopping edits engineered to increase attention, retention, and conversions across paid social.',
    },
    {
      icon: TrendingUp,
      title: 'Paid Social & Meta Ad Management',
      description: 'End-to-end creative testing, funnel strategy, audience targeting, optimisation and scale.',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 sm:mb-20 text-center">What We Do</h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black p-8 sm:p-12 rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <service.icon size={48} className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
