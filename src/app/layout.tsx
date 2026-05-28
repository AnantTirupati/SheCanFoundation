import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'She Can Foundation | Uplifting Women & Social Impact across India',
  description:
    'She Can Foundation is a registered national non-governmental organization committed to ending period poverty, facilitating girl-child education, and building female self-reliance since 2022.',
  keywords: [
    'Women Empowerment',
    'Menstrual Hygiene Awareness',
    'Education for Girls',
    'NGO India',
    'She Can Foundation',
    'Social Impact',
    'Donate NGO',
    'Period Poverty India',
  ],
  icons: {
    icon: '/SheCan.png',
    shortcut: '/SheCan.png',
    apple: '/SheCan.png',
  },
  openGraph: {
    title: 'She Can Foundation | Uplifting Women & Social Impact across India',
    description:
      'A registered national non-governmental organization committed to ending period poverty, facilitating girl-child education, and building female self-reliance.',
    url: 'https://shecanfoundation.org',
    siteName: 'She Can Foundation',
    images: [
      {
        url: '/volunteers_distributing.png',
        width: 800,
        height: 600,
        alt: 'She Can Campaign',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased min-h-screen flex flex-col justify-between bg-[#111827] text-neutral-white">
        {/* Global Transparent Sticky Header */}
        <Navbar />

        {/* Global Main Content Wrapper */}
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Floating AI Support Desk */}
        <Chatbot />
      </body>
    </html>
  );
}
