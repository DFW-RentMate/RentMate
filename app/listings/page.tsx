'use client';

import { useSearchParams } from 'next/navigation';
import CityBox from './conditions/CityBox';
import 'rc-slider/assets/index.css';
import Price from './conditions/PriceCondition';

const ListingPage = () => {
  const params = useSearchParams();
  const city = params?.get('city');
  const price = params?.get('min');

  return (
    <div className=" flex flex-col  bg-white">
      {/* 도시 + 가격 */}
      <div className="flex flex-col border-b border-gray-200 px-10 py-3 gap-2 md:px-10 ">
        {/* 도시 */}
        <div className="flex gap-2 items-center overflow-x-auto pb-1">
          <span className="text-neutral-400 pr-1 shrink-0">도시</span>
          <CityBox label="Richardson" selected={city === 'Richardson'} />
          <CityBox label="Plano" selected={city === 'Plano'} />
          <CityBox label="Allen" selected={city === 'Allen'} />
          <CityBox label="Frisco" selected={city === 'Frisco'} />
          <CityBox label="Carrollton" selected={city === 'Carrollton'} />
        </div>

        {/* 가격 */}
        <Price selected={price != null} />
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
