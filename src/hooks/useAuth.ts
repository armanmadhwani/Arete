import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { authService, type AuthState } from '../lib/auth'

export function useAuth(): AuthState & {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  })

  useEffect(() => {
    // Get initial session
    authService.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
      })
    })

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (event, session) => {
        setState({
          user: session?.user ?? null,
          session,
          loading: false,
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      await authService.signIn(email, password)
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }))
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      await authService.signUp(email, password)
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }))
      throw error
    }
  }

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      await authService.signOut()
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }))
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email)
  }

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }
}
