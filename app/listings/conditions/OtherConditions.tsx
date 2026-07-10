'use client';
import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuSlidersHorizontal, LuSofa } from 'react-icons/lu';
import Etc from './Etc';
import { PiPawPrint } from 'react-icons/pi';
import { LucideParkingSquare } from 'lucide-react';

interface OtherConditionsProps {
  selected?: boolean;
}

const OtherConditions = ({ selected }: OtherConditionsProps) => {
  const [showConditions, setShowConditions] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get all cities in California (US state code 'CA')

    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowConditions(false);
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
              ${selected ? 'border-primary' : 'border-gray-200'}
              ${selected ? 'text-primary' : ''}
            `}
        onClick={() => setShowConditions(!showConditions)}
      >
        <LuSlidersHorizontal className="mr-1" size={12} />
        <span>조건</span>
        <LuChevronDown className="ml-1" size={16} />
      </div>
      {showConditions && (
        <div className="absolute flex flex-col top-9 left-0 bg-white w-70 rounded-xl border border-gray-200 shadow-md py-2">
          <Etc label="반려동물 가능" icon={PiPawPrint} paramKey="pets" />
          <Etc
            label="주차 가능"
            icon={LucideParkingSquare}
            paramKey="parking"
          />
          <Etc label="가구 포함" icon={LuSofa} paramKey="furnished" />
          <div> 성별 </div>
          <div> 입주 날짜 </div>
        </div>
      )}
    </div>
  );
};

export default OtherConditions;
