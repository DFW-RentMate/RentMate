'use client';

import Slider from 'rc-slider';
import { LuChevronDown } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface PriceProps {
  selected: boolean;
}
const Price = ({ selected }: PriceProps) => {
  const params = useSearchParams();

  // const [price, setPrice] = useState([0, 3000]);

  // useEffect(() => {
  //   setPrice([
  //     Number(params?.get('min')) || 0,
  //     Number(params?.get('max')) || 3000,
  //   ]);
  // }, [params]);

  // 밑에 코드로 수정
  const minParam = params?.get('min') ?? null;
  const maxParam = params?.get('max') ?? null;

  const [price, setPrice] = useState([
    Number(minParam) || 0,
    Number(maxParam) || 3000,
  ]);
  const [prevMinParam, setPrevMinParam] = useState(minParam);
  const [prevMaxParam, setPrevMaxParam] = useState(maxParam);

  if (minParam !== prevMinParam || maxParam !== prevMaxParam) {
    setPrevMinParam(minParam);
    setPrevMaxParam(maxParam);
    setPrice([Number(minParam) || 0, Number(maxParam) || 3000]);
  }

  const [showSlider, setShowSlider] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const currentQuery = qs.parse(params?.toString()); // URL에서 파라미터 읽기
    const updatedQuery = {
      ...currentQuery,
      min: price[0],
      max: price[1],
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className={`
            shadow-sm text-sm flex items-center border py-1 px-3 rounded-2xl cursor-pointer hover:bg-gray-50 
            transition-colors duration-200
            ${selected ? 'border-primary' : 'border-gray-200'}
            ${selected ? 'text-primary' : ''}
          `}
        onClick={() => {
          setShowSlider(!showSlider);
        }}
      >
        <span>
          가격 ${price[0]} - ${price[1]}+{' '}
        </span>
        <LuChevronDown className={`pl-1 `} size={20} />
      </div>

      <div
        className={`
          absolute w-64 top-10 left-0 bg-white border border-gray-200 rounded-xl shadow-md p-3 z-10
          transition-all duration-150 ease-out origin-top
          ${showSlider ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
      >
        <div className="mb-3 font-semibold">월 렌트 범위 Rent range</div>
        <div className="px-2">
          <Slider
            className="px-10"
            range
            min={0}
            max={3000}
            value={price}
            onChange={(value) => setPrice(value as number[])}
            onChangeComplete={handleClick}
            styles={{
              track: { backgroundColor: '#E8603A' },
              handle: {
                borderColor: '#E8603A',
                height: 20,
                width: 20,
                marginTop: -7,
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              },
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm ">
          <span>${price[0]}</span>
          <span>${price[1]}+</span>
        </div>
      </div>
    </div>
  );
};

export default Price;
