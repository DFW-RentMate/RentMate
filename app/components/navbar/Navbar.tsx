"use client";

import Link from "next/link";
import { Home, Heart, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

export default function Navbar() {
  const { data: session } = useSession();
  const loginModal = useLoginModal();
  const [clickOpen, setClickOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const clickUserBar = () => setClickOpen(!clickOpen);

  const handleCreateListing = () => {
    if (session) router.push("/listings/new");
    else loginModal.onOpen();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white/85 backdrop-blur-md border-b border-gray-300 sticky top-0 z-50">
      {/* ── Left: 로고 + 네비 링크 ── */}
      <div className="flex items-center space-x-10">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 text-white bg-[#FF6B4A] rounded-full">
            <Home size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              RoomRent DFW
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              달라스 한인 렌트
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-[15px] font-semibold text-gray-700">
          <Link
            href="/listings"
            className={`hover:text-[#FF6B4A] p-2 rounded-xl transition-colors flex gap-1.5 ${pathname === "/listings" ? "bg-[#faefec] text-[#FF6B4A]" : "hover:bg-neutral-100"}`}
          >
            매물 검색 <span className="text-gray-400 font-normal">Search</span>
          </Link>
          <Link
            href="/roommates"
            className={`hover:text-[#FF6B4A] p-2 rounded-xl transition-colors flex gap-1.5 ${pathname === "/roommates" ? "bg-[#faefec] text-[#FF6B4A]" : "hover:bg-neutral-100"}`}
          >
            룸메이트 찾기{" "}
            <span className="text-gray-400 font-normal">Roommates</span>
          </Link>
        </div>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center space-x-5">
        <button
          onClick={handleCreateListing}
          className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-[#FF6B4A] rounded-full hover:bg-[#E55A39] cursor-pointer"
        >
          <Plus size={16} strokeWidth={3} className="mr-1.5" />
          매물 등록{" "}
          <span className="ml-1.5 font-normal opacity-90 text-[13px]">
            List
          </span>
        </button>

        {session ? (
          <>
            <button
              className="p-1.5 flex items-center justify-center rounded-full hover:bg-orange-50 transition-colors cursor-pointer group"
              onClick={() => router.push("/favorites")}
            >
              <Heart
                size={24}
                strokeWidth={1.5}
                className="fill-[#FF6B4A] text-[#FF6B4A] transition-transform group-hover:scale-110"
              />
            </button>

            <div className="relative">
              <button
                className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-gray-50 transition-colors"
                onClick={clickUserBar}
              >
                <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-[#FF6B4A] bg-orange-100 rounded-full cursor-pointer overflow-hidden">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="프로필"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (session.user?.name?.charAt(0) ?? "유")
                  )}
                </div>
                <ChevronDown size={18} className="text-gray-500" />
              </button>

              {clickOpen && (
                <div className="absolute flex flex-col top-12 right-0 shadow-lg w-40 bg-white border border-neutral-200 rounded-xl overflow-hidden text-sm text-neutral-800 z-50">
                  <MenuItem
                    label="마이페이지"
                    onClick={() => {
                      router.push("/mypage");
                      setClickOpen(false);
                    }}
                  />
                  <MenuItem
                    label="찜 목록"
                    onClick={() => {
                      router.push("/favorites");
                      setClickOpen(false);
                    }}
                  />
                  <MenuItem
                    label="내 매물"
                    onClick={() => {
                      router.push("/mylists");
                      setClickOpen(false);
                    }}
                  />
                  <MenuItem
                    label="내 룸메이트"
                    onClick={() => {
                      router.push("/roommates/me");
                      setClickOpen(false);
                    }}
                  />
                  <hr className="border-0 bg-neutral-200 h-px" />
                  <MenuItem label="로그아웃" onClick={() => signOut()} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            onClick={loginModal.onOpen}
            className="flex items-center border border-neutral-300 px-4 py-2 text-sm font-semibold text-black transition-colors bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100"
          >
            로그인{" "}
            <span className="ml-1.5 font-normal opacity-90 text-[13px] text-neutral-400">
              Log in
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
