import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E2E8F0] relative overflow-hidden">
      <div className="w-full max-w-md px-4 relative z-10 flex flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#FF2A54] rounded-md flex items-center justify-center group-hover:bg-[#E62348] transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight font-display">Lancr</span>
        </Link>
        
        {children}
      </div>
    </div>
  )
}
