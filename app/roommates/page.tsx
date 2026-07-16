import RoommatePage from "./RoommatePage";
import RoommateLists from "./lists/RoommateLists";

export interface IRoommateParams {
  city?: string;
  minBudget?: string;
  maxBudget?: string;
  gender?: string;
}

interface PageProps {
  searchParams: IRoommateParams;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <RoommatePage>
      <RoommateLists searchParams={params} />
    </RoommatePage>
  );
}
