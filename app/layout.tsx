import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// ─────────────────────────────────────────────
// 공통 컴포넌트 import
// ─────────────────────────────────────────────
import ClientOnly from './components/ClientOnly';
import ToastProvider from './provider/ToastProvider';
import { Footer } from './components/shell/footer';
// import Navbar from './components/common/Navbar'; // 🚧 TODO: 영준님이 합치면 주석을 풀기

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoomRent DFW · 다래방',
  description: '달라스·포트워스 한인 커뮤니티를 위한 방 렌트 & 룸메이트 매칭 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background">
        
        
        <ClientOnly>
          <ToastProvider />
        </ClientOnly>

        {/* <Navbar /> 영준님이 합치면 주석 해제 */}

        
        <main className="flex-1 pt-16">
          {children}
        </main>

        
        <Footer />

      </body>
    </html>
  );
}