export default function RoommatesPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb] flex flex-col items-center pt-32 px-6">
      <div className="max-w-3xl w-full bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-[#fff0ea] text-[#ff6b4a] rounded-full flex justify-center items-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">룸메이트 찾기</h1>

        <p className="text-gray-500 text-lg">
          나와 딱 맞는 룸메이트를 찾을 수 있는 공간입니다.
          <br />
          현재 UI 컴포넌트 개발 준비 중입니다. 🚀
        </p>
      </div>
    </main>
  );
}
