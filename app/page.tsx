import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
// 팀원 코드에 있던 불필요한 console error 임포트는 뺐어!

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9fafb] flex flex-col items-center pt-20">
      {/* 네가 만들어둔 환영 메시지 */}
      <h1 className="text-xl font-medium text-gray-400 mb-10">
        Welcome to RoomRent DFW
      </h1>

      {/* 팀원이 테스트 중인 EmptyState UI */}
      <ClientOnly>
        <div className="h-[80vh] w-full">
          <EmptyState
            showReset={true}
            useIcon={true}
            title="조건에 맞는 결과가 없습니다."
            subtitle="필터 설정을 조정하시거나 검색 조건을 변경해보세요"
          />
        </div>
      </ClientOnly>
    </main>
  );
}
