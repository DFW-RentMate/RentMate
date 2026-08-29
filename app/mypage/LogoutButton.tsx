"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <LogOut size={16} />
        <span>로그아웃</span>
      </div>
    </button>
  );
}
