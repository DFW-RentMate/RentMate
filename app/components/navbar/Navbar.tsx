'use client';

import Link from 'next/link';
import { Home, Heart, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import MenuItem from './MenuItem';
import { usePathname } from 'next/navigation';
import useLoginModal from '@/hooks/useLoginModal';

export default function Navbar() {
  const loginModal = useLoginModal();
  const [clickOpen, setClickOpen] = useState(false);

  const pathname = usePathname();

  const clickUserBar = () => {
    setClickOpen(!clickOpen);
    console.log(clickOpen);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      {/* Left Section: Logo and Brand */}
      <div className="flex items-center space-x-10">
        <Link href="/" className="flex items-center space-x-3">
          {/* Brand Icon */}
          <div className="flex items-center justify-center w-10 h-10 text-white bg-[#FF6B4A] rounded-full">
            <Home size={20} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col ">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              RoomRent DFW
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              달라스 한인 렌트
            </span>
          </div>
        </Link>

        <div
          className={
            'hidden md:flex items-center space-x-8 text-[15px] font-semibold text-gray-700'
          }
        >
          <Link
            href="/listings"
            className={`
              hover:text-[#FF6B4A]  p-2 rounded-xl transition-colors flex gap-1.5
              ${pathname === '/listings' ? 'bg-[#faefec] text-[#FF6B4A]' : 'hover:bg-neutral-100'}
              `}
          >
            매물 검색{' '}
            <span
              className={`text-gray-400 font-normal
              
              `}
            >
              Search
            </span>
          </Link>
          <Link
            href="/roommates"
            className={`
              hover:text-[#FF6B4A] p-2 rounded-xl transition-colors flex gap-1.5
              ${pathname === '/roommates' ? 'bg-[#faefec] text-[#FF6B4A]' : 'hover:bg-neutral-100'}
              `}
          >
            룸메이트 찾기{' '}
            <span className="text-gray-400 font-normal">Roommates</span>
          </Link>
        </div>
      </div>

      {/* <div className="flex items-center space-x-5">
        <Link href="/listings/new">
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-[#FF6B4A] rounded-full hover:bg-[#E55A39] cursor-pointer">
            <Plus size={16} strokeWidth={3} className="mr-1.5" />
            매물 등록{' '}
            <span className="ml-1.5 font-normal opacity-90 text-[13px]">
              List
            </span>
          </button>
        </Link>

        <button className="relative p-1 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
          <Heart size={26} strokeWidth={1.5} className="hover:fill-[#FF6B4A]" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold text-white bg-[#FF6B4A] rounded-full border-2 border-white">
            3
          </span>
        </button>

        <button
          className="relative flex items-center space-x-1.5 p-1 rounded-full hover:bg-gray-50 transition-colors"
          onClick={clickUserBar}
        >
          <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-[#FF6B4A] bg-orange-100 rounded-full cursor-pointer">
            김
          </div>
          <ChevronDown size={18} className="text-gray-500" />

          {clickOpen && (
            <div className="absolute flex flex-col top-12 right-0 shadow-md w-40  bg-white border border-neutral-200 rounded-xl overflow-hidden text-small text-neutral-800">
              <MenuItem label="마이페이지" />
              <MenuItem label="찜 목록" />
              <MenuItem label="내 매물" />
              <MenuItem label="내 룸메이트" />
              <hr className=" border-0 bg-neutral-400 h-[0.5px]" />
              <MenuItem label="로그아웃" />
            </div>
          )}
        </button>
      </div> */}

      <div
        onClick={loginModal.onOpen}
        className="flex items-center border border-neutral-300 px-4 py-2 text-sm font-semibold text-black transition-colors bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100"
      >
        로그인{' '}
        <span className="ml-1.5 font-normal opacity-90 text-[13px] text-neutral-400">
          Log in
        </span>
      </div>
    </nav>
  );
}
