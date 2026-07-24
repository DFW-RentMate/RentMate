'use client';

import type { ListingFormData } from '../ListingWizard';
import { CITIES } from '../mappings';

interface StepProps {
  form: ListingFormData;
  updateForm: <K extends keyof ListingFormData>(
    key: K,
    value: ListingFormData[K],
  ) => void;
}

export default function Step1BasicInfo({ form, updateForm }: StepProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col gap-6">

        {/* 매물 제목 */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-900">
            매물 제목 Title <span className="text-[#ff6b4a]">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
            placeholder="예: Plano 신축 아파트 마스터룸"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
          />
        </div>

        {/* 주소 */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-900">
            주소 Address <span className="text-[#ff6b4a]">*</span>
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => updateForm('address', e.target.value)}
            placeholder="주소를 입력하세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
          />
          <p className="mt-1.5 text-xs text-[#ff6b4a] cursor-pointer hover:underline">
            주소를 찾을 수 없나요? 직접 입력
          </p>
        </div>

        {/* 도시 */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-900">
            도시 City <span className="text-[#ff6b4a]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => updateForm('city', city)}
                className={`
                  rounded-full border px-4 py-2 text-sm font-semibold transition-colors
                  ${
                    form.city === city
                      ? 'border-[#ff6b4a] bg-[#fff0ec] text-[#ff6b4a]'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* 월세 + 보증금 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              월세 Rent / month ($) <span className="text-[#ff6b4a]">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={form.rentPrice}
              onChange={(e) => updateForm('rentPrice', e.target.value)}
              placeholder="예: 800"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              보증금 Deposit ($)
            </label>
            <input
              type="number"
              min={0}
              value={form.deposit}
              onChange={(e) => updateForm('deposit', e.target.value)}
              placeholder="없으면 0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              보증금이 없으면 0을 입력하세요.
            </p>
          </div>
        </div>

        {/* 입주일 + 연락처 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              입주 가능일 Move-in date <span className="text-[#ff6b4a]">*</span>
            </label>
            <input
              type="date"
              value={form.moveInDate}
              onChange={(e) => updateForm('moveInDate', e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              연락 방법 Contact <span className="text-[#ff6b4a]">*</span>
            </label>

            <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => updateForm('contactType', 'phone')}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  form.contactType === 'phone'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                전화번호 Phone
              </button>
              <button
                type="button"
                onClick={() => updateForm('contactType', 'kakao')}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  form.contactType === 'kakao'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                카카오톡 ID
              </button>
            </div>

            <input
              type="text"
              value={form.contactValue}
              onChange={(e) => updateForm('contactValue', e.target.value)}
              placeholder={
                form.contactType === 'phone' ? '예: 469-123-4567' : '예: myKakaoId'
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}