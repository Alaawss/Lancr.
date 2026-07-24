'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/actions/auth'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CBD5E1]">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <img src="/lancr_lg.png" alt="Lancr" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-[#FF2A54] font-headline">Lancr</span>
        </Link>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 font-headline">Welcome back</h1>
        <p className="text-[#64748B] font-small">Sign in to your Lancr account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl text-sm font-small">
            {state.error}
          </div>
        )}

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

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#FF2A54] hover:bg-[#E62348] text-white font-bold py-2.5 rounded-2xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-small"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#64748B] font-small">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#FF2A54] font-bold hover:text-[#E62348] font-headline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
