import { Users, Palette, BarChart3, Clock, Sparkles, Share2, Zap } from 'lucide-react';

const features = [
  { 
    icon: <Users size={28} />, 
    title: 'Referral Tracking', 
    description: 'Every signup gets a unique referral link. Track who refers who and reward your most loyal supporters.',
    color: 'bg-[#FF2A54]'
  },
  { 
    icon: <Palette size={28} />, 
    title: 'Custom Branding', 
    description: 'Upload your logo, choose your theme, and match your brand colors perfectly.',
    color: 'bg-[#0F172A]'
  },
  { 
    icon: <BarChart3 size={28} />, 
    title: 'Real-Time Analytics', 
    description: 'Track views, signups, conversion rates, and referral performance in a beautiful dashboard.',
    color: 'bg-[#FF6B8E]'
  },
  { 
    icon: <Clock size={28} />, 
    title: 'Countdown Timer', 
    description: 'Build anticipation with a live countdown timer until your official launch date.',
    color: 'bg-[#364052]'
  },
  { 
    icon: <Sparkles size={28} />, 
    title: 'Premium Customization', 
    description: 'Unlock premium themes, remove Lancr branding, and fully own your waitlist experience.',
    color: 'bg-[#FF2A54]'
  },
  { 
    icon: <Share2 size={28} />, 
    title: 'Easy Sharing', 
    description: 'One-click copy for referral links and built-in social sharing buttons to maximize reach.',
    color: 'bg-[#0F172A]'
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4 font-headline leading-[1.1]">
            Everything you need to build hype.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#64748B] font-body leading-relaxed">
            Lancr provides all the tools to turn a simple idea into a viral launch campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#CBD5E1]"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${feature.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2 md:mb-3 font-headline">{feature.title}</h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-small">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
