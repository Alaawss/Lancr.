import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E2E8F0] relative overflow-hidden">
      <div className="w-full max-w-md px-4 relative z-10 flex flex-col items-center">
        {children}
      </div>
    </div>
  )
}
