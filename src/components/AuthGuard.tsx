import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-brown">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <>{children}</>
}
