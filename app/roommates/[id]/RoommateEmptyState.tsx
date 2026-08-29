"use client";
import { TbHomeSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function RoommateEmptyState() {
  const router = useRouter();

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-2">
      <TbHomeSearch size={90} color="gray" className="stroke-[1.5]" />
      <div className="text-2xl text-neutral-500 font-bold">
        등록된 룸메이트 프로필이 없습니다
      </div>
      <div className="font-light text-neutral-500">
        나만의 룸메이트 프로필을 등록하고 어울리는 룸메이트를 찾아보세요!
      </div>
      <div
        onClick={() => router.push("/roommates/new")}
        className="my-8 flex items-center justify-center gap-1 rounded-md hover:opacity-80 transition bg-primary text-white px-6 text-md font-medium py-2.5 cursor-pointer"
      >
        프로필 등록하러 가기
      </div>
    </div>
  );
}
