'use client';

import { useState, useEffect } from 'react';
import { Users, Clock, Zap, Share2, BarChart3 } from 'lucide-react';

export default function LivePreview() {
  const [signups, setSignups] = useState(2340);
  const [hours, setHours] = useState(48);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);

  // Simulate incoming signups
  useEffect(() => {
    const interval = setInterval(() => {
      setSignups((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => h - 1);
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Mobile Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 h-[580px] bg-[#1E293B] rounded-[3rem] p-3 shadow-2xl border-4 border-[#334155]">
                {/* Phone Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-[#0F172A] px-6 py-2 flex justify-between items-center">
                    <span className="text-white text-xs font-small">9:41</span>
                    <div className="w-16 h-4 bg-black rounded-full"></div>
                  </div>
                  
                  {/* Campaign Banner */}
                  <div className="h-28 bg-gradient-to-br from-[#FF2A54] to-[#FF6B8E] relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  
                  {/* Campaign Content */}
                  <div className="px-4 -mt-8 relative z-10">
                    <div className="bg-white p-2 rounded-2xl shadow-lg inline-block mb-4">
                      <div className="w-14 h-14 bg-[#E2E8F0] rounded-xl flex items-center justify-center">
                        <Zap size={24} className="text-[#FF2A54]" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1 font-headline">Nova AI</h3>
                    <p className="text-xs text-[#64748B] mb-4 font-small">Join the waitlist for early access</p>
                    
                    {/* Email Input */}
                    <div className="bg-[#F8FAFC] rounded-xl p-3 mb-3">
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full bg-transparent text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none font-small"
                      />
                    </div>
                    
                    <button className="w-full bg-[#FF2A54] text-white font-bold py-3 rounded-xl text-sm font-small">
                      Join Waitlist
                    </button>
                    
                    {/* Stats */}
                    <div className="mt-4 flex justify-between text-center">
                      <div>
                        <div className="text-lg font-bold text-[#0F172A] font-headline">{signups.toLocaleString()}</div>
                        <div className="text-xs text-[#64748B] font-small">Waiting</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#0F172A] font-headline">
                          {hours}h {minutes}m
                        </div>
                        <div className="text-xs text-[#64748B] font-small">To Launch</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -right-12 top-32 bg-[#FF2A54] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg font-small">
                {signups.toLocaleString()} signups
              </div>
              <div className="absolute -left-8 bottom-24 bg-[#E2E8F0] text-[#0F172A] px-3 py-2 rounded-full text-xs font-semibold shadow-lg font-small">
                lancr.app/nova-ai
              </div>
            </div>
          </div>

          {/* Right: Descriptive Text */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#E2E8F0] mb-4 font-headline leading-[1.1]">
                Your referral link, beautifully presented.
              </h2>
              <p className="text-lg text-[#94A3B8] font-body leading-relaxed">
                Every signup gets a unique, shareable campaign page. Track referrals, show live countdowns, and convert visitors into waitlist members — all from a single link.
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2A54]/20 flex items-center justify-center flex-shrink-0">
                  <Share2 size={20} className="text-[#FF2A54]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E2E8F0] mb-1 font-headline">Unique Referral Links</h3>
                  <p className="text-sm text-[#94A3B8] font-small">Every signup gets their own shareable link to track referrals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2A54]/20 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-[#FF2A54]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E2E8F0] mb-1 font-headline">Live Stats Display</h3>
                  <p className="text-sm text-[#94A3B8] font-small">Show real-time signup counts and countdown timers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2A54]/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={20} className="text-[#FF2A54]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E2E8F0] mb-1 font-headline">Conversion Tracking</h3>
                  <p className="text-sm text-[#94A3B8] font-small">Monitor views, signups, and referral performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
