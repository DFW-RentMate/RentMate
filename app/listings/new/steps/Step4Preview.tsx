'use client';

import { useMemo } from 'react';
import {
  Eye, MapPin, Users, Calendar, PawPrint, Cigarette, Car, Sofa,
} from 'lucide-react';
import type { ListingFormData } from '../ListingWizard';
import type { RoomTypeKo, GenderPrefKo } from '../mappings';

interface StepProps {
  form: ListingFormData;
}

const ROOM_TYPE_BADGE: Record<RoomTypeKo, { label: string; cls: string }> = {
  개인실: { label: '개인실 Private', cls: 'bg-[#ffe4de] text-[#c0440b]' },
  셰어: { label: '셰어 Shared', cls: 'bg-green-50 text-green-700' },
  스튜디오: { label: '스튜디오 Studio', cls: 'bg-purple-50 text-purple-700' },
  마스터룸: { label: '마스터룸 Master', cls: 'bg-amber-50 text-amber-700' },
};

const GENDER_LABEL: Record<GenderPrefKo, string> = {
  무관: '성별 무관 Any',
  남성: '남성 선호 Male',
  여성: '여성 선호 Female',
};

export default function Step4Preview({ form }: StepProps) {
  const coverUrl = useMemo(
    () => (form.photos[0] ? URL.createObjectURL(form.photos[0]) : null),
    [form.photos],
  );

  const today = new Date();
  const dateStr = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}.`;

  const roomType = ROOM_TYPE_BADGE[form.roomType];

  const conditions = [
    { on: true, icon: Users, label: GENDER_LABEL[form.genderPreference] },
    { on: !!form.moveInDate, icon: Calendar, label: `입주 ${form.moveInDate.replaceAll('-', '. ')}` },
    { on: form.petsAllowed, icon: PawPrint, label: '반려동물 가능' },
    { on: form.smokingAllowed, icon: Cigarette, label: '흡연 가능' },
    { on: form.parkingAvailable, icon: Car, label: '주차 가능' },
    { on: form.furnished, icon: Sofa, label: '가구 포함' },
  ];

  return (
    <div className="flex flex-col gap-4">

      {/* 안내 배너 */}
      <div className="flex items-center gap-2.5 rounded-xl bg-[#fff0ec] px-4 py-3.5">
        <Eye size={16} className="shrink-0 text-[#ff6b4a]" />
        <p className="text-sm text-gray-700">
          아래는 등록 후 매물 상세 페이지 미리보기입니다.
        </p>
      </div>

      {/* 상세 페이지 프리뷰 */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {coverUrl ? (
          <img
            src={coverUrl}
            alt="대표 사진"
            className="h-72 w-full object-cover md:h-96"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-gray-100 text-sm text-gray-400 md:h-96">
            사진이 없습니다
          </div>
        )}

        <div className="p-6 md:p-8">

          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${roomType.cls}`}>
              {roomType.label}
            </span>
            <span className="text-sm text-gray-400">등록일 {dateStr}</span>
          </div>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
            {form.title || '(제목 없음)'}
          </h2>
          <div className="mt-1.5 flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} />
            {form.address || '(주소 없음)'}
            {form.city && ` · ${form.city}`}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900">
              ${form.rentPrice || 0}
            </span>
            <span className="text-sm text-gray-500">/ 월 month</span>
            <span className="text-sm text-gray-500">보증금 ${form.deposit || 0}</span>
          </div>

          <hr className="my-6 border-gray-100" />

          <h3 className="text-base font-bold text-gray-900">입주 조건 Conditions</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditions
              .filter((c) => c.on)
              .map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
                >
                  <c.icon size={16} className="text-[#ff6b4a]" />
                  {c.label}
                </div>
              ))}
          </div>

          <h3 className="mt-8 text-base font-bold text-gray-900">
            상세 설명 Description
          </h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {form.description || '(설명 없음)'}
          </p>

          <h3 className="mt-8 text-base font-bold text-gray-900">위치 Location</h3>
          <p className="mt-1 text-sm text-gray-500">
            정확한 주소는 문의 후 공개됩니다. 대략적인 위치만 표시됩니다.
          </p>
          <div className="mt-3 flex h-40 items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-400">
            지도는 등록 완료 후 표시됩니다
          </div>

        </div>
      </div>
    </div>
  );
}