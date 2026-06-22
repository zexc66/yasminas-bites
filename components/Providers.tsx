'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'react-hot-toast'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SocialProofToast } from '@/components/ui/SocialProofToast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
    <AuthProvider>
      {children}
      <CartDrawer />
      <WhatsAppButton />
      <SocialProofToast />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#FAF7F2',
            color: '#3D1F10',
            border: '1px solid #F5E6C2',
            fontFamily: 'var(--font-inter)',
          },
        }}
      />
    </AuthProvider>
    </LanguageProvider>
  )
}
