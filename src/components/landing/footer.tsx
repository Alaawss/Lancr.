import Link from 'next/link';
import { Globe, Share2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] pt-6 md:pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-xl font-bold text-[#E2E8F0] font-headline">
                Lancr
              </span>
            </Link>
            <p className="text-[#94A3B8] mb-4 max-w-xs text-xs font-small">
              Build hype before you launch. Create referral-driven waitlists for your next big idea.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-[#64748B] hover:text-[#FF2A54] transition-colors" title="Website">
                <Globe size={18} />
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#FF2A54] transition-colors" title="Share">
                <Share2 size={18} />
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#FF2A54] transition-colors" title="Contact">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#E2E8F0] mb-3 text-xs font-headline">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Features</a></li>
              <li><a href="#pricing" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Pricing</a></li>
              <li><a href="#faq" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">FAQ</a></li>
              <li><a href="#examples" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#E2E8F0] mb-3 text-xs font-headline">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">About</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Blog</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#E2E8F0] mb-3 text-xs font-headline">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Terms of Service</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Privacy Policy</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-[#FF2A54] transition-colors font-small">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 md:pt-6 border-t border-[#334155] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#94A3B8] text-xs font-small">
            © {new Date().getFullYear()} Lancr Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-small">
            03-99
          </div>
        </div>
      </div>
    </footer>
  );
}
