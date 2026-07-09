'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { useEffect, useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface RoomTypeProps {
  selected?: boolean;
}

const RoomType = ({ selected }: RoomTypeProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [showRoomType, setShowRoomType] = useState(false);
  const [roomType, setRoomType] = useState(
    params?.get('roomType') || '룸 타입',
  );

  useEffect(() => {
    setRoomType(params?.get('roomType') || '룸 타입');
  }, [params]);

  const handleClick = (type: string) => {
    setRoomType(type);
    setShowRoomType(false);

    const currentQuery = qs.parse(params?.toString()); // URL에서 파라미터 읽기
    const updatedQuery = {
      ...currentQuery,
      roomType: type,
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
        setShowRoomType(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative " ref={ref}>
      <div
        className={`
            shadow-xs text-sm flex items-center border py-1 px-3 rounded-2xl cursor-pointer hover:bg-gray-50 font-medium
            ${selected ? 'border-primary' : 'border-gray-200'}
            ${selected ? 'text-primary' : ''}
          `}
        onClick={() => {
          setShowRoomType(!showRoomType);
        }}
      >
        <span>{roomType}</span>
        <LuChevronDown className="pl-1" size={20} />
      </div>

      {showRoomType && (
        <div className=" flex flex-col w-full absolute bg-white border border-gray-50  rounded-b-2xl text-sm font-medium">
          <div
            className="cursor-pointer px-4 py-1 hover:bg-gray-50 transition"
            onClick={() => handleClick('Private')}
          >
            Private
          </div>
          <div
            className="border-t-1 border-gray-100 cursor-pointer px-4 py-1 hover:bg-gray-50 transition"
            onClick={() => handleClick('Shared')}
          >
            Shared
          </div>
          <div
            className="border-t-1 border-gray-100 cursor-pointer px-4 py-1 hover:bg-gray-50 transition"
            onClick={() => handleClick('Studio')}
          >
            Studio
          </div>
          <div
            className="border-t-1 border-gray-100 cursor-pointer px-4 py-1 hover:bg-gray-50 transition"
            onClick={() => handleClick('Master')}
          >
            Master
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomType;
