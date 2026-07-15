import getListings from '@/app/actions/getListings';
import ListCard from './ListCard';
import type {
  IListingsParams,
  ListingWithPhotos,
} from '@/app/actions/getListings';
import EmptyState from '@/app/components/EmptyState';
import { SafeListing } from '@/app/types';

const Lists = async ({ searchParams }: { searchParams: IListingsParams }) => {
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <div className="bg-[#fefbf8]">
        <EmptyState
          useIcon={true}
          title={'죄송합니다. 조건에 맞는 룸을 찾지 못했습니다. '}
          subtitle={'필터 설정을 조정하시거나, 검색 조건을 변경해 보세요.'}
          showReset={true}
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#fefbf8]">
      <div className="flex ml-1 mb-2 gap-1">
        <div className="text-sm text-black font-semibold">
          {listings.length}개
        </div>
        <div className="text-sm text-gray-500 font-light">
          {' '}
          매물 · DFW 한인 렌트
        </div>
      </div>

      <div className="flex flex-col  overflow-y-auto gap-2">
        {listings.map((listing: SafeListing) => (
          <ListCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Lists;
