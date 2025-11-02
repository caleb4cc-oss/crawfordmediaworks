export default function CTA() {
  return (
    <section id="contact" className="py-32 bg-black border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
          Ready to increase sales with<br />high-performing video ads?
        </h2>

        <a
          href="https://calendly.com/crawfordmediaworks/crawford-media"
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-5 bg-white text-black rounded-full font-semibold text-xl hover:bg-gray-200 transition-all hover:scale-105 transform duration-200 inline-block"
        >
          Book a Call
        </a>
      </div>

      <footer className="mt-32 pt-12 border-t border-gray-900 text-center text-gray-500">
        <p className="text-sm">© 2025 Crawford Media Works. All rights reserved.</p>
      </footer>
    </section>
  );
}
