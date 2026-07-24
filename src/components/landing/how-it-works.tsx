'use client';

import { Sparkles, Send, Zap, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  {
    icon: <Sparkles size={32} />,
    title: 'Create',
    description: 'Set up your campaign in minutes with our drag-and-drop builder.',
    color: '#FF2A54'
  },
  {
    icon: <Send size={32} />,
    title: 'Share',
    description: 'Send your link to early supporters and share it on social media.',
    color: '#0F172A'
  },
  {
    icon: <Zap size={32} />,
    title: 'Grow',
    description: 'Referrals multiply your reach automatically as users share your link.',
    color: '#FF6B8E'
  },
  {
    icon: <Rocket size={32} />,
    title: 'Launch',
    description: 'Launch with a built-in audience ready to use your product.',
    color: '#364052'
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 font-headline">From zero to launch in 4 steps.</h2>
          <p className="text-lg text-[#64748B] font-small">
            We've simplified the pre-launch process so you can focus on building your product.
          </p>
        </div>

        <div className="relative">
          {/* Animated spear/line */}
          <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-1 bg-[#CBD5E1] rounded-full z-0 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#FF2A54] to-transparent transition-all duration-1000 ease-in-out"
              style={{
                width: '25%',
                left: `${activeStep * 25}%`,
                transform: 'translateX(-50%)'
              }}
            ></div>
            {/* Spear head */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF2A54] rounded-full shadow-lg transition-all duration-1000 ease-in-out"
              style={{
                left: `${activeStep * 25 + 12.5}%`
              }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                {/* Step number */}
                <div className="text-[#CBD5E1] text-5xl font-bold mb-2 font-headline select-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  0{index + 1}
                </div>
                
                {/* Icon container */}
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative"
                  style={{ 
                    backgroundColor: step.color,
                    transform: activeStep === index ? 'scale(1.1) translateY(-8px)' : 'scale(1) translateY(0)',
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  <div className="text-white">
                    {step.icon}
                  </div>
                  {/* Glow effect for active step */}
                  {activeStep === index && (
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-50 animate-pulse"
                      style={{ 
                        backgroundColor: step.color,
                        filter: 'blur(20px)'
                      }}
                    ></div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-headline group-hover:scale-105 transition-transform duration-300">{step.title}</h3>
                <p className="text-[#64748B] leading-relaxed px-4 font-small text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
