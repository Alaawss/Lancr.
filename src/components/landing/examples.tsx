'use client';

import { useState, useEffect } from 'react';
import { Zap, Calendar, Book, ArrowRight, Users } from 'lucide-react';

const examples = [
  { 
    name: 'Nova AI', 
    category: 'SaaS', 
    color: '#FF2A54',
    icon: <Zap size={24} />,
    description: 'AI-powered creative intelligence platform',
    initialSignups: 2348,
    launchHours: 48
  },
  { 
    name: 'Summit 2025', 
    category: 'Event', 
    color: '#0F172A',
    icon: <Calendar size={24} />,
    description: 'Annual tech conference and networking',
    initialSignups: 1205,
    launchHours: 72
  },
  { 
    name: "Creator's Blueprint", 
    category: 'Course', 
    color: '#FF6B8E',
    icon: <Book size={24} />,
    description: 'Complete guide to content creation',
    initialSignups: 892,
    launchHours: 24
  }
];

function CountdownCard({ example, index }: { example: typeof examples[0], index: number }) {
  const [signups, setSignups] = useState(example.initialSignups);
  const [hours, setHours] = useState(example.launchHours);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const signupInterval = setInterval(() => {
      setSignups((prev) => prev + Math.floor(Math.random() * 2));
    }, 3000 + index * 1000);
    return () => clearInterval(signupInterval);
  }, [index]);

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
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#334155] group">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: example.color }}
        >
          <div className="text-white">
            {example.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-[#FF2A54] uppercase tracking-wider mb-1 font-small">{example.category}</div>
          <h3 className="text-xl font-bold text-[#0F172A] font-headline">{example.name}</h3>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-[#64748B] mb-6 font-small leading-relaxed">{example.description}</p>
      
      {/* Live Stats */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF2A54]/10 flex items-center justify-center">
              <Users size={18} className="text-[#FF2A54]" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] font-small">People Waiting</div>
              <div className="text-lg font-bold text-[#0F172A] font-headline">{signups.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 flex items-center justify-center">
              <Calendar size={18} className="text-[#0F172A]" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] font-small">Launching In</div>
              <div className="text-lg font-bold text-[#0F172A] font-headline font-mono">
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <button className="w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 font-small group-hover:gap-3"
        style={{ 
          backgroundColor: example.color,
          color: 'white'
        }}
      >
        View Campaign <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default function Examples() {
  return (
    <section className="py-16 md:py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E2E8F0] mb-4 font-headline leading-[1.1]">See It In Action</h2>
            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-body">
              Check out how others are using Lancr to build massive waitlists before they even write their first line of code.
            </p>
          </div>
          <button className="text-[#FF2A54] font-bold hover:text-[#E62348] flex items-center gap-1 group whitespace-nowrap font-small text-sm sm:text-base">
            View more examples <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Side-by-Side Live Waitlists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {examples.map((example, index) => (
            <CountdownCard key={index} example={example} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
