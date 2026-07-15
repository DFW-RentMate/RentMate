import { IListingsParams } from '../actions/getListings';
import ListingPage from './ListingPage';
import Lists from './lists/Lists';

interface ListsProps {
  searchParams: IListingsParams; // URL 파라미터 (카테고리, 필터 등)
}

export default async function Page({ searchParams }: ListsProps) {
  const params = await searchParams;
  return (
    <ListingPage>
      <Lists searchParams={params} />
    </ListingPage>
  );
}
