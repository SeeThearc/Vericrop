'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setUser, setStatus } from '@/lib/authSlice'

export default function AuthComplete() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    try {
      // Get user data from URL parameters
      const userDataParam = searchParams.get('user')
      const redirectParam = searchParams.get('redirect')
      
      if (userDataParam) {
        // Decode and parse user data
        const userData = JSON.parse(decodeURIComponent(userDataParam))
        
        // Store user data in Redux
        dispatch(setUser(userData))
        
        // Set localStorage flags
        localStorage.setItem('vericrop_logged_in', 'true')
        localStorage.setItem('vericrop_recent_auth', 'true')
        
        // Update status
        dispatch(setStatus('Authentication completed successfully'))
        
        // Redirect to intended page or dashboard
        const redirectUrl = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard'
        
        // Small delay to ensure Redux state is updated
        setTimeout(() => {
          if (redirectUrl.startsWith('http')) {
            // If it's a full URL, extract just the path
            const url = new URL(redirectUrl)
            router.push(url.pathname + url.search)
          } else {
            router.push(redirectUrl)
          }
        }, 100)
      } else {
        // No user data found, redirect to login
        dispatch(setStatus('Authentication failed - no user data'))
        router.push('/login')
      }
    } catch (error) {
      dispatch(setStatus('Authentication failed - invalid data'+error))
      router.push('/login')
    }
  }, [searchParams, dispatch, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto animate-spin">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Completing Authentication...
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Setting up your VeriCrop account
        </p>
      </div>
    </div>
  )
}
