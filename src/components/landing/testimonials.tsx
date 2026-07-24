const testimonials = [
  {
    quote: "Lancr helped us collect 800 beta users before we even wrote a line of code. The validation alone was worth it.",
    author: "Sarah Chen",
    role: "Founder at NovaTech",
    initials: "SC",
    bgColor: "bg-[#FF2A54]"
  },
  {
    quote: "The referral system is genius. 40% of our signups came from referrals. People love climbing the leaderboard.",
    author: "Marcus Johnson",
    role: "Product Lead",
    initials: "MJ",
    bgColor: "bg-[#E2E8F0]"
  },
  {
    quote: "Simple, clean, and effective. Exactly what we needed for our pre-launch. Highly recommend to any indie maker.",
    author: "Emily Park",
    role: "Community Builder",
    initials: "EP",
    bgColor: "bg-[#FF2A54]"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#0F172A] text-[#E2E8F0] section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-headline">Loved by makers.</h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-small">From our early users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#1E293B] border border-[#334155] p-5 md:p-8 rounded-2xl md:rounded-md flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-[#FF2A54] mb-4 md:mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#94A3B8] text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-body">"{t.quote}"</p>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-md ${t.bgColor} flex items-center justify-center text-white font-bold text-sm md:text-lg`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-[#E2E8F0] font-body text-sm md:text-base">{t.author}</div>
                  <div className="text-[#64748B] text-xs md:text-sm font-body">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
