import { FiCalendar } from "react-icons/fi";

export default function MoveInDate({ date }: { date: Date | null }) {
  // 날짜가 있으면 포맷팅, 없으면 '미정'으로 표시
  const formattedDate = date
    ? `${new Date(date).getFullYear()}. ${new Date(date).getMonth() + 1}. ${new Date(date).getDate()}.`
    : "미정";

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        입주 희망 Move-in
      </h3>
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
        <FiCalendar className="w-5 h-5 text-[#ff6b4a]" />
        <span className="font-semibold text-gray-900">
          {formattedDate} 이후
        </span>
      </div>
    </div>
  );
}
