'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { register } from '@/actions/auth'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null)

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CBD5E1]">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <img src="/lancr_lg.png" alt="Lancr" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-[#FF2A54] font-headline">Lancr</span>
        </Link>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 font-headline">Create an account</h1>
        <p className="text-[#64748B] font-small">Start building your waitlist with Lancr</p>
      </div>

      {state?.success ? (
        <div className="space-y-6 text-center">
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 text-sm font-small">
            {state.message}
          </div>
          <Link
            href="/login"
            className="w-full block bg-[#FF2A54] hover:bg-[#E62348] text-white font-bold py-2.5 rounded-2xl transition-colors text-center font-small"
          >
            Go to Sign In
          </Link>
        </div>
      ) : (
        <>
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl text-sm font-small">
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F172A] font-small" htmlFor="displayName">
                Full Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-small"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F172A] font-small" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-small"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F172A] font-small" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-small"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F172A] font-small" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-small"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF2A54] hover:bg-[#E62348] text-white font-bold py-2.5 rounded-2xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 font-small"
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#64748B] font-small">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF2A54] font-bold hover:text-[#E62348] font-headline">
              Sign in
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
