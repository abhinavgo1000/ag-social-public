import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; 
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | AG Social',
    default: 'AG Social',
  },
  description: 'Welcome to AG Social, a POC social media platform.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'AG Social',
    description: 'Welcome to AG Social, a POC social media platform.',
    url: 'https://agsocial.vercel.app',
    siteName: 'AG Social',
    images: [
      {
        url: 'https://agsocial.vercel.app/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AG Social',
    description: 'Welcome to AG Social, a POC social media platform.',
    images: [
      {
        url: 'https://agsocial.vercel.app/og.png',
        width: 1200,
        height: 630,
      },
    ],
    creator: '@agsocial'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
