import { getFavoriteListings } from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const page = async () => {
  const listings = await getFavoriteListings();

  return (
    <div className="flex flex-col bg-[#fffbf8] px-5 py-5 md:px-10 md:py-10 min-h-screen">
      <div className="text-3xl font-semibold mb-1">찜 목록</div>
      <span className="text-[#8e857d]">
        저장한 매물과 룸메이트 프로필을 한곳에서 확인하세요.
      </span>

      <FavoritesClient listings={listings} />
    </div>
  );
};

export default page;
