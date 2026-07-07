import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// 1. 네가 만든 Navbar 임포트 유지
import Navbar from '@/app/components/navbar/Navbar';
// 2. 팀원이 만든 컴포넌트 임포트 유지
import ClientOnly from './components/ClientOnly';
import ToastProvider from './provider/ToastProvider';
import { Footer } from './components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RentMate',
  description: 'DFW 한인 룸렌트 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientOnly>
          <ToastProvider />
        </ClientOnly>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
