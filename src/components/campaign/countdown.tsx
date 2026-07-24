'use client';

import { useState, useEffect } from 'react';

export default function Countdown({ launchDate }: { launchDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const targetDate = new Date(launchDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  if (!timeLeft) {
    return null; // Or a skeleton
  }

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-card border border-border shadow-sm rounded-lg w-16 h-16 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF2A54]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-2xl font-bold text-foreground relative z-10 font-headline">{item.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-2 uppercase font-medium tracking-wider font-small">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
