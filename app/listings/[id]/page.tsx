import getListingById from '@/app/actions/getListingById';
import { Zap, Droplets, Flame, Wifi, Trash2, MapPin } from 'lucide-react';
import {
  Users,
  CalendarDays,
  PawPrint,
  Cigarette,
  Car,
  Sofa,
  WashingMachine,
  Wind,
  Refrigerator,
  AirVent,
  Thermometer,
  Heart,
  MessageCircle,
} from 'lucide-react';

import {} from 'lucide-react';
import BackButton from './BackButton';
import Badge from './Badge';

const ROOM_TYPE_LABEL: Record<string, string> = {
  Private: '개인실 Private',
  Shared: '쉐어룸 Shared',
  Studio: '스튜디오 Studio',
  Master_Bedroom: '마스터룸 Master',
};
// 텍스트 색깔 #8e857d

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const searchList = await getListingById(id);
  const photos = searchList?.listing_photos;
  const utilities = [
    {
      key: 'electricity_included',
      label: '전기 Electric',
      icon: <Zap size={14} />,
    },
    {
      key: 'water_included',
      label: '수도 Water',
      icon: <Droplets size={14} />,
    },
    { key: 'gas_included', label: '가스 Gas', icon: <Flame size={14} /> },
    {
      key: 'internet_included',
      label: '인터넷 Internet',
      icon: <Wifi size={14} />,
    },
    {
      key: 'trash_included',
      label: '쓰레기 Trash',
      icon: <Trash2 size={14} />,
    },
  ].filter(({ key }) => searchList?.[key as keyof typeof searchList]);

  const appliances = [
    {
      key: 'has_washer',
      label: '세탁기 Washer',
      icon: <WashingMachine size={14} />,
    },
    { key: 'has_dryer', label: '건조기 Dryer', icon: <Wind size={14} /> },
    {
      key: 'has_refrigerator',
      label: '냉장고 Fridge',
      icon: <Refrigerator size={14} />,
    },
    { key: 'has_ac', label: '에어컨 A/C', icon: <AirVent size={14} /> },
    {
      key: 'has_heating',
      label: '난방 Heating',
      icon: <Thermometer size={14} />,
    },
  ].filter(({ key }) => searchList?.[key as keyof typeof searchList]);

  if (!searchList) return;

  const conditions = [
    {
      label:
        searchList.gender_preference === 'F'
          ? '성별 여성 Female'
          : searchList.gender_preference === 'M'
            ? '성별 남성 Male'
            : '성별 무관 Any',
      icon: <Users size={19} />,
      active: true,
    },
    {
      label: `입주 ${new Date(searchList.move_in_date!).toLocaleDateString('ko-KR')}`,
      icon: <CalendarDays size={19} />,
      active: !!searchList.move_in_date,
    },
    {
      label: '반려동물 가능',
      icon: <PawPrint size={19} />,
      active: searchList.pets_allowed,
    },
    {
      label: '흡연 가능',
      icon: <Cigarette size={19} />,
      active: searchList.smoking_allowed,
    },
    {
      label: '주차 가능',
      icon: <Car size={19} />,
      active: searchList.parking_available,
    },
    {
      label: '가구 포함',
      icon: <Sofa size={19} />,
      active: searchList.furnished,
    },
  ];

  return (
    <div className="flex justify-center bg-[#fffbf8] min-h-screen px-8 py-6 gap-10">
      {/* 왼쪽 매물 정보 */}

      <div className="flex justify-center bg-[#fffbf8] flex-1 max-w-3xl">
        <div className="flex flex-col gap-3">
          <BackButton />

          <div className="flex gap-3 items-center">
            <div className="w-fit bg-[#FBE7DC] py-[2px] rounded-2xl px-2 h-auto text-sm text-[#b63d29] ">
              {ROOM_TYPE_LABEL[searchList.room_type]}
            </div>
            <span className="text-[#8e857d] font-light text-sm">
              {' '}
              {`등록일 ${searchList.created_at?.toISOString().slice(0, 10)}`}
            </span>
          </div>

          <div className="font-semibold text-2xl">{searchList.title}</div>

          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-[#8e857d]" />
            <div className="text-[#8e857d] font-light text-sm">{` ${searchList.city}, TX`}</div>
          </div>

          <div className="flex items-baseline">
            <div className="rounded-2xl h-auto text-2xl font-semibold">
              ${Number(searchList.rent_price).toLocaleString()}
            </div>
            <div className="text-[#8e857d] font-light text-sm ml-1">
              {' '}
              / 월 month
            </div>
            <div className="text-[#6e6761] font-light text-sm ml-3">
              {' '}
              보증금 ${Number(searchList.deposit)}
            </div>
          </div>

          <hr className="my-2" />
          <div className="font-medium text-lg">
            입주조건 Conditions
            <div className="grid grid-cols-3 gap-3 mt-2">
              {conditions.map(({ label, icon, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${active ? 'border-gray-200 text-gray-800 bg-white' : 'border-gray-100 text-gray-300'}`}
                >
                  <span className={active ? 'text-primary' : 'text-gray-300'}>
                    {icon}
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 관리비 포함 Utilities Included */}
          <div className="flex flex-col gap-2 justify-center items-start mt-4">
            <div className="font-medium text-lg">
              관리비 포함 Utilities Included
            </div>
            <div className="flex gap-2">
              {utilities.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {utilities.map(({ label, icon }) => (
                    <Badge
                      key={label}
                      icon={icon}
                      label={label}
                      variant="green"
                    />
                  ))}
                </div>
              ) : (
                <span className="text-gray-400 text-sm">해당 없음</span>
              )}
            </div>
          </div>

          {/* 가전 / 편의시설 Amenities */}
          <div className="font-medium text-lg mt-4">
            가전 / 편의시설 Amenities
          </div>
          <div className="flex gap-2">
            {appliances.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {appliances.map(({ label, icon }) => (
                  <Badge key={label} icon={icon} label={label} variant="blue" />
                ))}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">해당 없음</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-[#8e857d] font-light text-sm">
              {searchList.amenities_etc
                ? `기타ㆍ${searchList.amenities_etc}`
                : ''}
            </span>
          </div>

          {/* 상세 설명 */}
          <div className="flex flex-col gap-2">
            <div className="font-medium text-lg mt-4">
              상세 설명 Description
            </div>
            <div className="text-sm ">{searchList.description}</div>
          </div>

          <div>
            <div className="font-medium text-lg mt-4">위치</div>
          </div>
        </div>
        {/* 연락처 */}
        <div></div>
      </div>

      {/* 오른쪽 sticky 카드 */}
      <div className="w-80 shrink-0">
        <div className="sticky top-24 border border-gray-200 rounded-2xl p-5 shadow-md bg-white flex flex-col gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">
                ${Number(searchList.rent_price).toLocaleString()}
              </span>
              <span className="text-[#8e857d] text-sm">/ 월</span>
            </div>
            <div className="text-sm text-[#8e857d]">
              보증금 ${Number(searchList.deposit).toLocaleString()}
            </div>
          </div>

          <div className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
            <Heart size={18} />
            찜하기
          </div>

          <div className="w-full bg-[#FEE500] rounded-xl py-3 font-semibold text-[#3C1E1E] flex items-center justify-center gap-2  cursor-pointer hover:bg-[#F0D900] transition-colors">
            카카오톡으로 문의
          </div>

          <p className="text-xs text-[#8e857d] text-center">
            연락 시 안전거래 수칙을 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
