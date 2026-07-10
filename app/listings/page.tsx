'use client';

import { useSearchParams } from 'next/navigation';
import CityBox from './conditions/CityBox';
import 'rc-slider/assets/index.css';
import Price from './conditions/PriceCondition';
import RoomType from './conditions/RoomType';
import OtherConditions from './conditions/OtherConditions';
import Search from './conditions/Search';

const ListingPage = () => {
  const params = useSearchParams();
  const city = params?.get('city');
  const price = params?.get('min');
  const roomType = params?.get('roomType');

  return (
    <div className=" flex flex-col  bg-white">
      {/* 도시 + 가격 */}

      <div className="flex flex-col border-b border-gray-200 px-10 py-3 gap-2 md:px-10 ">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 pr-1 shrink-0">도시</span>
            <div className="w-60 border border-1 border-background rounded-xl">
              <Search />
            </div>
          </div>
          {/* 도시 */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            <CityBox label="Richardson" selected={city === 'Richardson'} />
            <CityBox label="Plano" selected={city === 'Plano'} />
            <CityBox label="Allen" selected={city === 'Allen'} />
            <CityBox label="Frisco" selected={city === 'Frisco'} />
            <CityBox label="Carrollton" selected={city === 'Carrollton'} />
          </div>
        </div>

        {/* 가격, 룸 타입, 조건*/}
        <div className="flex gap-2">
          <Price selected={price != null} />
          <RoomType selected={roomType != null} />
          <OtherConditions />
        </div>
      </div>

      {/* 밑에 부분 */}
      <div className="flex">
        <div>lists</div>
        <div>map</div>
      </div>
    </div>
  );
};

export default ListingPage;
