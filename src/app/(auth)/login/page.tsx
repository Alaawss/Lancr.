'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/actions/auth'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-md shadow-xl border border-[#CBD5E1]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 font-display">Welcome back</h1>
        <p className="text-[#64748B] font-body">Sign in to your Lancr account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm font-body">
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] font-body" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-body"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] font-body" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2A54] focus:border-transparent transition-all font-body"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#FF2A54] hover:bg-[#E62348] text-white font-bold py-2.5 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-body"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#64748B] font-body">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#FF2A54] font-bold hover:text-[#E62348]">
          Sign up
        </Link>
      </div>
    </div>
  )
}
