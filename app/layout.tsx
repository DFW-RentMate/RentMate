import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
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

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

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
    <html
      lang="ko" className={cn("font-sans", inter.variable)}
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background">
        <ClientOnly>
          <ToastProvider />
        </ClientOnly>
        <Navbar />
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
