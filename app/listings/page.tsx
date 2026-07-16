import { IListingsParams, getListings } from '../actions/getListings';
import ListingPage from './lists/ListingPage';
import Lists from './lists/Lists';

interface ListsProps {
  searchParams: IListingsParams; // URL 파라미터 (카테고리, 필터 등)
}

export default async function Page({ searchParams }: ListsProps) {
  const params = await searchParams;
  const listings = await getListings(params);

  return <ListingPage listings={listings} />;
}
