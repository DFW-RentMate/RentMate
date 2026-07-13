'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CityBox from './conditions/CityBox';
import 'rc-slider/assets/index.css';
import Price from './conditions/PriceCondition';
import RoomType from './conditions/RoomType';
import OtherConditions from './conditions/OtherConditions';
import Search from './conditions/Search';
import List from './lists/List';

const ListingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const city = params?.get('city');
  const price = params?.get('min');
  const roomType = params?.get('roomType');
  const pets = params?.get('pets');
  const parking = params?.get('parking');
  const furnished = params?.get('furnished');
  const date = params?.get('date');
  const gender = params?.get('gender');
  const otherSelected = !!(gender || pets || parking || furnished || date);

  return (
    <div className=" flex flex-col  bg-white">
      {/* 도시 + 가격 */}

      <div className="flex flex-col border-b border-gray-200 px-10 py-3 gap-2 md:px-10 ">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 pr-1 shrink-0">도시</span>
            <div className="w-60 border border-background rounded-xl">
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
        <div className="flex gap-2 flex-wrap items-center">
          <Price selected={price != null} />
          <RoomType selected={roomType != null} />
          <OtherConditions selected={otherSelected} />
          <span
            className="text-sm text-gray-500  mt-1 hover:text-gray-600 hover:underline cursor-pointer"
            onClick={() => {
              router.push(pathname);
            }}
          >
            초기화
          </span>
        </div>
      </div>

      {/* 밑에 부분 */}
      <div className="grid grid-cols-2 h-screen">
        <div className="flex flex-col bg-[#fefbf8] overflow-y-auto p-4 gap-2">
          <span className="text-gray-500 font-light px-1 ">
            매물 · DFW 한인 렌트
          </span>
          <List />
          <List />
          <List />
        </div>
        <div className="sticky top-0 h-screen">map</div>
      </div>
    </div>
  );
};

export default ListingPage;
