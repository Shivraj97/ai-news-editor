import type { Metadata } from 'next'
import { Merriweather } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '../trpc/clients/client'
import { Container } from '../components/atoms/container'
import { Toaster } from '../components/molecules/Toaster/Toaster'
import { Navbar } from '../components/organisms/Navbar'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className={merriweather.className}>
            <Navbar />
            <Container>{children}</Container>
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  )
}
