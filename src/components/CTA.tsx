export default function CTA() {
  return (
    <section id="contact" className="py-20 sm:py-32 bg-black border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 sm:mb-12 leading-tight">
          Ready to increase sales<br />with high-performing video ads?
        </h2>

        <a
          href="https://calendly.com/crawfordmediaworks/crawford-media"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-full font-semibold text-lg sm:text-xl hover:bg-gray-200 transition-all hover:scale-105 transform duration-200 inline-block"
        >
          Book a Call
        </a>
      </div>

      <footer className="mt-20 sm:mt-32 pt-8 sm:pt-12 border-t border-gray-900 text-center text-gray-500">
        <p className="text-xs sm:text-sm">© 2025 Crawford Media Works. All rights reserved.</p>
      </footer>
    </section>
  );
}
