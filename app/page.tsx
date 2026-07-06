import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';

export default function Home() {
  return (
    // <ClientOnly>
    //   <Container>
    //     <div className="bg-amber-500">TestTestTestTestTestTestTestTestTest</div>
    //   </Container>
    // </ClientOnly>
    <div className="h-[80vh]">
      <EmptyState
        title="조건에 맞는 결과가 없습니다."
        subtitle="필터 설정을 조정하시거나 검색 조건을 변경해보세요"
      />
    </div>
  );
}
