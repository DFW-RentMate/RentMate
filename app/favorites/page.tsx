import { getServerSession } from 'next-auth';
import { getFavoriteListings } from '../actions/getFavoriteListings';
import { getFavoriteRoommates } from '../actions/getFavoriteRoomates';
import FavoritesClient from './FavoritesClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const listings = await getFavoriteListings();
  const roommates = await getFavoriteRoommates();

  return (
    <div className="flex flex-col bg-[#fffbf8] px-5 py-5 md:px-20 md:py-10 min-h-screen">
      <div className="text-3xl font-semibold mb-1">찜 목록</div>
      <span className="text-[#8e857d]">
        저장한 매물과 룸메이트 프로필을 한곳에서 확인하세요.
      </span>

      <FavoritesClient listings={listings} roommates={roommates} />
    </div>
  );
};

export default page;
