import type { Metadata } from 'next';
import './globals.css';

// ─────────────────────────────────────────────
// 컴포넌트 불러오기
// ─────────────────────────────────────────────
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly'; // 에러 방지막
import ToastProvider from './provider/ToastProvider'; // 알림창
import { Footer } from './components/shell/footer';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

// 💡 1. 방금 만든 로그인 모달 불러오기!
import LoginModal from './components/auth/LoginModal';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'RoomRent DFW · 다래방',
  description:
    '달라스·포트워스 한인 커뮤니티를 위한 방 렌트 & 룸메이트 매칭 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", inter.variable)}>
      <body className="flex min-h-screen flex-col bg-background">
        
        <ClientOnly>
          <ToastProvider />
          
          <LoginModal />
        </ClientOnly>
        
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}