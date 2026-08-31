import Link from 'next/link';
import { Home } from 'lucide-react';

// ─────────────────────────────────────────────
// 타입 및 데이터 정의
// ─────────────────────────────────────────────

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/contact', label: '문의하기' },
];

// 좌우 여백 패딩 관리
const containerCls = 'w-full px-6 sm:px-10 md:px-16 xl:px-24';

// ─────────────────────────────────────────────
// Footer 컴포넌트 본체
// ─────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-neutral-50 py-3">
      <div className={containerCls}>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 text-white bg-[#FF6B4A] rounded-full">
                <Home size={16} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-gray-900 tracking-tight leading-none">
                  RoomRent DFW
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-1">
                  달라스 한인 렌트
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-gray-600">
              달라스·포트워스 (DFW) 지역 한인 커뮤니티를 위한
              <br className="hidden sm:block" />방 렌트 &amp; 룸메이트 매칭
              플랫폼.
            </p>
          </div>

          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── 카피라이트 바 ── */}
      <div className="border-t border-gray-200">
        <div className={containerCls}>
          <p className="py-1 text-xs text-gray-500">
            © {currentYear} RoomRent DFW · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
