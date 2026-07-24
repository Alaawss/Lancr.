'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is there a free plan?",
    answer: "Yes, forever free with 1 campaign and up to 100 signups. It's perfect for validating small side projects before committing."
  },
  {
    question: "What happens when I hit my signup cap?",
    answer: "If you're on the free plan and hit 100 signups, new users won't be able to join your waitlist. You can upgrade to Premium at any time to unlock unlimited signups instantly."
  },
  {
    question: "Can people join without creating an account?",
    answer: "Yes, joiners just enter their email address. We want to make it as frictionless as possible for your audience to show interest."
  },
  {
    question: "Can I export my email list?",
    answer: "Yes, Premium users can export their entire subscriber list as a CSV file at any time, perfect for importing into your favorite email marketing tool."
  },
  {
    question: "How does the referral system work?",
    answer: "Each person who signs up gets a unique referral link. When they share it and someone else signs up through their link, their referral count goes up. You can optionally show a leaderboard to gamify the process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, Apple Pay, and Google Pay securely through our payment provider, Paddle."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-headline">Frequently Asked Questions</h2>
          <p className="text-lg text-white/90 font-small">
            Everything you need to know about Lancr.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-3xl transition-all duration-200 ${
                openIndex === index ? 'border-white/30 bg-white/10 shadow-lg' : 'border-white/20 bg-white/5 hover:border-white/30'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-white font-small">{faq.question}</span>
                <ChevronDown 
                  className={`text-white/80 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-white' : ''}`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 pt-0 text-white/90 leading-relaxed font-small">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
