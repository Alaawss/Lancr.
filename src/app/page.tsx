import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import LivePreview from '@/components/landing/live-preview';
import Features from '@/components/landing/features';
import Examples from '@/components/landing/examples';
import HowItWorks from '@/components/landing/how-it-works';
import Testimonials from '@/components/landing/testimonials';
import Pricing from '@/components/landing/pricing';
import FAQ from '@/components/landing/faq';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-violet-200 selection:text-violet-900">
      <Navbar />
      <main>
        <Hero />
        <LivePreview />
        <Features />
        <Examples />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
