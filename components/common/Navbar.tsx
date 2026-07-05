import Link from "next/link";
import { Home, Heart, ChevronDown, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Left Section: Logo and Brand */}
      <div className="flex items-center space-x-10">
        <Link href="/" className="flex items-center space-x-3">
          {/* Brand Icon */}
          <div className="flex items-center justify-center w-10 h-10 text-white bg-[#FF6B4A] rounded-full">
            <Home size={20} strokeWidth={2.5} />
          </div>

          {/* Brand Text */}
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              RoomRent DFW
            </span>
            <span className="text-[11px] text-gray-500 font-medium mt-1">
              다래방 · 달라스 한인 렌트
            </span>
          </div>
        </Link>

        {/* Center Section: Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8 text-[15px] font-semibold text-gray-700">
          <Link
            href="/listings"
            className="hover:text-[#FF6B4A] transition-colors flex gap-1.5"
          >
            매물 검색 <span className="text-gray-400 font-normal">Search</span>
          </Link>
          <Link
            href="/roommates"
            className="hover:text-[#FF6B4A] transition-colors flex gap-1.5"
          >
            룸메이트 찾기{" "}
            <span className="text-gray-400 font-normal">Roommates</span>
          </Link>
        </div>
      </div>

      {/* Right Section: Action Buttons and User Profile */}
      <div className="flex items-center space-x-5">
        {/* Create Listing Button */}
        <Link href="/listings/new">
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-[#FF6B4A] rounded-full hover:bg-[#E55A39]">
            <Plus size={16} strokeWidth={3} className="mr-1.5" />
            매물 등록{" "}
            <span className="ml-1.5 font-normal opacity-90 text-[13px]">
              List
            </span>
          </button>
        </Link>

        {/* Favorites Icon with Notification Badge */}
        <button className="relative p-1 text-gray-700 hover:text-gray-900 transition-colors">
          <Heart size={26} strokeWidth={1.5} />
          {/* Badge */}
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold text-white bg-[#FF6B4A] rounded-full border-2 border-white">
            3
          </span>
        </button>

        {/* User Profile Dropdown */}
        <button className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-[#FF6B4A] bg-orange-100 rounded-full">
            김
          </div>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
      </div>
    </nav>
  );
}
