'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SafeListing } from '../../types';
import 'rc-slider/assets/index.css';
import Price from '../conditions/PriceCondition';
import RoomType from '../conditions/RoomType';
import OtherConditions from '../conditions/OtherConditions';
import Search from '../conditions/Search';
import dynamic from 'next/dynamic';
import Lists from './Lists';
import { useState } from 'react';

const MapComponent = dynamic(() => import('../map/Map'), {
  ssr: false,
});

const ListingPage = ({ listings }: { listings: SafeListing[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const price = params?.get('min');
  const roomType = params?.get('roomType');
  const pets = params?.get('pets');
  const parking = params?.get('parking');
  const furnished = params?.get('furnished');
  const date = params?.get('date');
  const gender = params?.get('gender');
  const otherSelected = !!(gender || pets || parking || furnished || date);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col border-b border-gray-200 px-10 py-3 gap-2 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 pr-1 shrink-0">도시</span>
            <div className="w-60 border border-background rounded-xl">
              <Search />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center ml-2">
            <Price selected={price != null} />
            <RoomType selected={roomType != null} />
            <OtherConditions selected={otherSelected} />
            <span
              className="text-sm text-gray-500 mt-1 hover:text-gray-600 hover:underline cursor-pointer"
              onClick={() => router.push(pathname)}
            >
              초기화
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <Lists
          listings={listings}
          selectedId={selectedId}
          onHover={setSelectedId}
        />
        <div className="sticky  aspect-square overflow-hidden">
          <MapComponent
            listings={listings}
            selectedId={selectedId}
            onMarkerClick={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
