import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getMyListings } from '../actions/getMyListings';
import { getFavoriteIds } from '../actions/getFavoriteIds';
import MyListingsClient from './MyListsClient';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const listings = await getMyListings();
  const favoriteIds = await getFavoriteIds();

  return (
    <div className="flex flex-col bg-[#fffbf8] px-5 py-5 md:px-20 md:py-10 min-h-screen">
      <div className="text-3xl font-semibold mb-1">내 매물</div>
      <span className="text-[#8e857d]">
        {session.user.name}님이 등록한 매물입니다.
      </span>

      <MyListingsClient listings={listings} favoriteIds={favoriteIds} />
    </div>
  );
};

export default page;
