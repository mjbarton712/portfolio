import Image from "next/image";

const steps = [
  { title: "Discovery", desc: "We learn your goals and vision." },
  { title: "Prototype", desc: "You approve a design mockup." },
  { title: "Build", desc: "We handcraft your site with clean code." },
  { title: "Launch", desc: "Go live with confidence." },
  { title: "Support", desc: "Ongoing help as needed." },
];

const faqs = [
  { q: "Can I export my site as static files?", a: "Yes! Our 'Developer-Crafted' package delivers clean HTML/CSS/JS you can host anywhere." },
  { q: "Do you handle hosting & domains?", a: "Absolutely. We manage everything for you, or you can self-host if you prefer." },
  { q: "How fast is delivery?", a: "Most sites launch in 1-3 weeks, depending on complexity and feedback speed." },
];

const testimonials = [
  { name: "Alex P.", text: "The site is blazing fast and looks incredible. Matt made the process easy!", img: "/file.svg" },
  { name: "Jordan R.", text: "Professional, communicative, and the result was better than any template shop.", img: "/globe.svg" },
];

export default function Home() {
  return (
    <div className="bg-white text-black font-display dark:bg-[#18181b] dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden py-24 px-4 text-center bg-gradient-to-br from-primary to-black dark:from-primary-dark dark:to-black">
        {/* Quirky floating shapes */}
        <div className="absolute left-[-60px] top-[-60px] w-48 h-48 bg-primary/40 rounded-full blur-2xl animate-float z-0" />
        <div className="absolute right-[-80px] bottom-[-80px] w-72 h-72 bg-primary-light/30 rounded-full blur-3xl animate-float2 z-0" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Professional Websites.<br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="text-primary dark:text-primary-light">Built Right.</span>
              <span className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-primary to-primary-light rounded-full blur-sm opacity-60 animate-wiggle" />
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-orange-100/90 font-medium dark:text-primary-light/90">Not your $80 template flip — custom-crafted websites for serious businesses.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href="#contact" className="bg-primary text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-110 hover:bg-primary-dark transition-transform duration-200 active:scale-95 animate-bounceOnce">Get Started</a>
            <a href="#packages" className="border-2 border-primary text-primary font-semibold py-3 px-8 rounded-xl bg-white/80 hover:bg-primary hover:text-white transition dark:bg-black/40 dark:text-primary-light dark:border-primary-light dark:hover:bg-primary-light dark:hover:text-black">See Packages</a>
          </div>
          <div className="text-primary-light text-sm mt-2 font-semibold tracking-wide animate-pulse">Hosting + custom design + full dev expertise in one plan.</div>
        </div>
      </section>

      {/* Built for Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Built for <span className="text-primary dark:text-primary-light">Results</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
          </h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 bg-primary rounded-full animate-pulse" /> Clean HTML/CSS</li>
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 bg-primary rounded-full animate-pulse delay-100" /> Optimized for SEO & speed</li>
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 bg-primary rounded-full animate-pulse delay-200" /> Professional UX</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="bg-black dark:bg-neutral-900 rounded-2xl p-6 shadow-card w-full max-w-md animate-float2">
            <pre className="text-primary-light text-xs font-mono whitespace-pre-wrap">{`<section class="hero">
  <h1>Professional Websites. Built Right.</h1>
  <p>Custom-crafted for your business.</p>
</section>`}</pre>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="packages">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="relative inline-block">
            Website <span className="text-primary dark:text-primary-light">Packages</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
          </span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Package 1 */}
          <div className="rounded-2xl border-2 border-primary bg-neutral-50 dark:bg-neutral-900 p-8 shadow-card hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center group relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/20 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">Web Presence Starter</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">A professional, mobile-responsive, 1-3 page static website to establish your online presence. Includes design customization, content integration, contact form, and basic SEO. Hosted & managed by us.</p>
            <div className="text-2xl font-bold text-black dark:text-white mb-1">$350 - $550</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">+ $20-30/mo (hosting, domain, SSL, 1 update/quarter)</div>
            <button className="mt-auto bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:scale-110 transition-transform duration-200 active:scale-95">Start This Package</button>
          </div>
          {/* Package 2 */}
          <div className="rounded-2xl border-4 border-primary bg-white dark:bg-black p-8 shadow-card hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center scale-105 z-10 group relative overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">Business Growth Site</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">A comprehensive, mobile-responsive, 3-5 page site to showcase your business. Enhanced customization, multiple sections, advanced contact form, map, social links, SEO. Hosted & managed by us.</p>
            <div className="text-2xl font-bold text-black dark:text-white mb-1">$600 - $950</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">+ $25-35/mo (hosting, domain, SSL, 2 updates/quarter)</div>
            <button className="mt-auto bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:scale-110 transition-transform duration-200 active:scale-95">Start This Package</button>
          </div>
          {/* Package 3 */}
          <div className="rounded-2xl border-2 border-primary bg-neutral-100 dark:bg-neutral-800 p-8 shadow-card hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center group relative overflow-hidden">
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-primary/20 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">Developer-Crafted Static Site (Portable)</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">A custom-coded, high-performance, secure, and portable 3-5 page site. Prototype, then hand-coded HTML/CSS/JS. Includes all features, delivered as files you can host anywhere. Optional hosting/management.</p>
            <div className="text-2xl font-bold text-black dark:text-white mb-1">$900 - $1500+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">+ $20-35/mo (optional hosting/management)</div>
            <button className="mt-auto bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:scale-110 transition-transform duration-200 active:scale-95">Start This Package</button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10 relative inline-block">
          How It <span className="text-primary dark:text-primary-light">Works</span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
        </h2>
        <ol className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-center">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center relative group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-2 shadow-lg group-hover:scale-110 transition-transform duration-200 animate-bounceOnce" style={{ animationDelay: `${i * 0.1}s` }}>{i+1}</div>
              <div className="text-lg font-semibold mb-1">{step.title}</div>
              <div className="text-gray-500 dark:text-gray-300 text-sm text-center max-w-[140px]">{step.desc}</div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-60px] w-24 h-1 bg-gradient-to-r from-primary to-black opacity-30 rounded-full" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10 relative inline-block">
          What Clients <span className="text-primary dark:text-primary-light">Say</span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-card p-8 flex flex-col items-center text-center hover:shadow-2xl transition">
              <Image src={t.img} alt={t.name} width={40} height={40} className="mb-3 rounded-full bg-neutral-100 dark:bg-neutral-800" />
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">“{t.text}”</p>
              <div className="text-sm text-primary dark:text-primary-light font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-20" id="faq">
        <h2 className="text-3xl font-bold text-center mb-10 relative inline-block">
          FAQ <span className="text-primary dark:text-primary-light">& Answers</span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
              <div className="font-semibold text-black dark:text-white mb-2">{faq.q}</div>
              <div className="text-gray-600 dark:text-gray-300">{faq.a}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#contact" className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-110 hover:bg-primary-dark transition-transform duration-200 active:scale-95">Let's build your online presence.</a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-2xl mx-auto px-4 py-20" id="contact">
        <h2 className="text-3xl font-bold text-center mb-8 relative inline-block">
          Contact <span className="text-primary dark:text-primary-light">Me</span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-primary/40 rounded-full blur-sm opacity-60 animate-wiggle" />
        </h2>
        <form className="flex flex-col gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-card p-8">
          <input type="text" placeholder="Your Name" className="border border-neutral-300 dark:border-neutral-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white dark:bg-neutral-800 text-black dark:text-white" />
          <input type="email" placeholder="Your Email" className="border border-neutral-300 dark:border-neutral-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white dark:bg-neutral-800 text-black dark:text-white" />
          <textarea placeholder="How can I help you?" className="border border-neutral-300 dark:border-neutral-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white dark:bg-neutral-800 text-black dark:text-white" rows={4} />
          <button type="submit" className="bg-primary text-white font-semibold rounded-xl px-6 py-3 mt-2 hover:bg-primary-dark transition-transform duration-200 active:scale-95">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-neutral-400 dark:text-neutral-500 py-8 mt-auto text-sm border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-black transition-colors duration-500">© {new Date().getFullYear()} Matt Barton. All rights reserved.</footer>
    </div>
  );
}
