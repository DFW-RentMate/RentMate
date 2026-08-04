export default function AboutSection({ intro }: { intro: string | null }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">자기소개 About</h3>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        {intro ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {intro}
          </p>
        ) : (
          <p className="text-gray-400 italic">등록된 자기소개가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
