// app/test/page.tsx
import prisma from "@/lib/prisma"; // 또는 '../../lib/prisma'

export default async function TestPage() {
  try {
    // DB에서 매물(listings) 데이터를 최대 5개만 가져오는 테스트 쿼리
    const testListings = await prisma.listings.findMany({
      take: 5,
    });

    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ DB 연결 테스트 성공!
        </h1>
        <p className="mb-4 text-gray-600">
          DB에서 성공적으로 데이터를 읽어왔습니다.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
          <pre className="text-sm">{JSON.stringify(testListings, null, 2)}</pre>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ❌ DB 연결 실패
        </h1>
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">{String(error)}</p>
      </div>
    );
  }
}
