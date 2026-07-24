'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-[#0F172A]/95 backdrop-blur-md rounded-full px-6 py-2 shadow-xl border border-[#334155]/50 transition-all duration-300 ${
            scrolled ? 'shadow-2xl border-[#334155]' : 'shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo + Brand Name */}
            <div 
              onClick={() => {
                window.location.href = '/';
              }}
              className="flex items-center gap-3 cursor-pointer"
              style={{ userSelect: 'none' }}
            >
              <img 
                src="/lancr_lg.png" 
                alt="Lancr Logo" 
                className="w-16 h-16 object-contain"
              />
              <span className="text-2xl font-bold text-[#E2E8F0] font-logo">
                LANCR
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-[#94A3B8] hover:text-[#E2E8F0] transition-colors font-small">Features</a>
              <a href="#how-it-works" className="text-sm font-semibold text-[#94A3B8] hover:text-[#E2E8F0] transition-colors font-small">How It Works</a>
              <a href="#pricing" className="text-sm font-semibold text-[#94A3B8] hover:text-[#E2E8F0] transition-colors font-small">Pricing</a>
              <a href="#faq" className="text-sm font-semibold text-[#94A3B8] hover:text-[#E2E8F0] transition-colors font-small">FAQ</a>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-[#E2E8F0] hover:text-[#FF2A54] transition-colors font-small">
                Log in
              </Link>
              <Link href="/register" className="text-sm font-bold bg-[#FF2A54] text-white px-5 py-2 rounded-full hover:bg-[#E62348] transition-colors font-small">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#E2E8F0]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#0F172A] rounded-2xl p-4 shadow-xl flex flex-col gap-4">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#E2E8F0] font-semibold p-2 font-small">Features</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[#E2E8F0] font-semibold p-2 font-small">How It Works</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[#E2E8F0] font-semibold p-2 font-small">Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[#E2E8F0] font-semibold p-2 font-small">FAQ</a>
          <div className="h-px bg-[#334155] my-2"></div>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-[#E2E8F0] font-semibold p-2 font-small">Log in</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="bg-[#FF2A54] text-white font-bold p-3 rounded-full text-center font-small">Get Started</Link>
        </div>
      )}
    </header>
  );
}
