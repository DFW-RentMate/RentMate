import ClientOnly from './components/ClientOnly';
import Container from './components/Container';

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div className="bg-amber-500">TestTestTestTestTestTestTestTestTest</div>
      </Container>
    </ClientOnly>
  );
}
