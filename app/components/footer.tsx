import Link from "next/link"

// 로고 컴포넌트를 만들면 주석 풀기
// import { Logo } from "@/components/shell/logo"

// ─────────────────────────────────────────────
// 타입 및 데이터 정의
// ─────────────────────────────────────────────

// 푸터 링크의 형태 정의하는 TypeScript 인터페이스
interface FooterLink {
  href: string
  label: string
}

// 링크 데이터를 배열로 관리
const footerLinks: FooterLink[] = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/contact", label: "문의하기" },
]


const containerCls =
  "mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-10 xl:px-20"

// ─────────────────────────────────────────────
// Footer 컴포넌트 본체
// ─────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear() 

  return (
    <footer className="border-t border-border bg-card">

      {/*  메인 영역: 로고 + 링크  */}
      <div className={containerCls}>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">

          {/* 왼쪽: 로고 + 서비스 한 줄 소개 */}
          <div className="flex flex-col gap-3">
            {/* TODO: 로고 만들면 주석 풀기 */}
            {/* <Logo /> */}
            <h2 className="text-xl font-bold text-primary">RoomRent DFW</h2> {/* 로고 임시 대체 텍스트 */}
            
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              달라스·포트워스 (DFW) 지역 한인 커뮤니티를 위한
              <br className="hidden sm:block" />
              방 렌트 &amp; 룸메이트 매칭 플랫폼.
            </p>
          </div>

          {/* 오른쪽: 푸터 메뉴 링크 목록 */}
          
          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/*  카피라이트 바  */}
      <div className="border-t border-border">
        <div className={containerCls}>
          <p className="py-4 text-xs text-muted-foreground">
            © {currentYear} RoomRent DFW · 다래방. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}