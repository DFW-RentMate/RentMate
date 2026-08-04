import RoommatePage from "./RoommatePage";
import RoommateLists from "./lists/RoommateLists";

export interface IRoommateParams {
  city?: string;
  minBudget?: string;
  maxBudget?: string;
  gender?: string;
  min?: string; // 💡 친구의 Price 컴포넌트 대응
  max?: string; // 💡 친구의 Price 컴포넌트 대응
}

interface PageProps {
  searchParams: IRoommateParams;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  // 💡 친구의 Price 컴포넌트가 보내는 min/max를 우리가 쓰는 minBudget/maxBudget으로 매핑!
  const normalizedParams = {
    ...params,
    minBudget: params.minBudget || params.min,
    maxBudget: params.maxBudget || params.max,
  };

  return (
    <RoommatePage>
      <RoommateLists searchParams={normalizedParams} />
    </RoommatePage>
  );
}
