'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { useEffect, useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface RoomTypeProps {
  selected?: boolean;
}

const ROOM_TYPE_LABEL: Record<string, string> = {
  Private: '개인실 Private',
  Shared: '쉐어룸 Shared',
  Studio: '스튜디오 Studio',
  Master_Bedroom: '마스터룸 Master',
};

const RoomType = ({ selected }: RoomTypeProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const roomType = params?.get('roomType');
  const roomTypeLabel = roomType ? ROOM_TYPE_LABEL[roomType] : '룸 타입';

  const [showRoomType, setShowRoomType] = useState(false);

  const handleClick = (type: string) => {
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
            shadow-sm text-sm flex items-center border py-1 px-3 rounded-2xl cursor-pointer hover:bg-gray-50 
            ${selected ? 'border-primary' : 'border-gray-200'}
            ${selected ? 'text-primary' : ''}
          `}
        onClick={() => {
          setShowRoomType(!showRoomType);
        }}
      >
        <span>{roomTypeLabel}</span>
        <LuChevronDown className="pl-1" size={20} />
      </div>

      <div
        className={`p-2 z-10
  flex flex-col w-50 absolute top-9 bg-white border border-gray-100 rounded-xl shadow-md text-sm overflow-hidden
  transition-all duration-150 ease-out origin-top
  ${showRoomType ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
`}
      >
        <div
          className="cursor-pointer px-4 py-2 hover:bg-[#faefec] transition-colors rounded-xl"
          onClick={() => {
            setShowRoomType(false);
            const currentQuery = qs.parse(params?.toString());
            delete currentQuery.roomType;
            const url = qs.stringifyUrl(
              { url: pathname, query: currentQuery },
              { skipNull: true },
            );
            router.push(url);
          }}
        >
          전체 All
        </div>
        <div
          className="cursor-pointer px-4 py-2 hover:bg-[#faefec] transition-colors rounded-xl"
          onClick={() => handleClick('Private')}
        >
          개인실 Private
        </div>
        <div
          className="cursor-pointer px-4 py-2 hover:bg-[#faefec] transition-colors rounded-xl"
          onClick={() => handleClick('Shared')}
        >
          쉐어룸 Shared
        </div>
        <div
          className="cursor-pointer px-4 py-2 hover:bg-[#faefec] transition-colors rounded-xl"
          onClick={() => handleClick('Studio')}
        >
          스튜디오 Studio
        </div>
        <div
          className="cursor-pointer px-4 py-2 hover:bg-[#faefec] transition-colors rounded-xl"
          onClick={() => handleClick('Master_Bedroom')}
        >
          마스터룸 Master
        </div>
      </div>
    </div>
  );
};

export default RoomType;
