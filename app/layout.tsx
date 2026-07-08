import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// ─────────────────────────────────────────────
// 컴포넌트 불러오기
// ─────────────────────────────────────────────
import Navbar from './components/navbar/Navbar';       
import ClientOnly from './components/ClientOnly';      // 에러 방지막
import ToastProvider from './provider/ToastProvider';  // 알림창
import { Footer } from './components/shell/footer';    

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

        {/* 메인에 드디어 영준님의 네비바가 들어왔으므로 당당하게 활성화! */}
        <Navbar />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}