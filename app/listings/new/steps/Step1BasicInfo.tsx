'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase()),
  );

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
            placeholder="예: 800 W Campbell Rd"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
          />
          <p className="mt-1.5 text-xs text-gray-400">
            상세 주소는 등록 후 문의한 사용자에게만 공개됩니다.
          </p>
        </div>

        {/* 도시 + ZIP */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              도시 City <span className="text-[#ff6b4a]">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors hover:bg-gray-50"
              >
                <span className={form.city ? 'text-gray-900' : 'text-gray-400'}>
                  {form.city || '도시를 선택하세요'}
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>

              {cityOpen && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
                  <div className="border-b border-gray-100 p-2">
                    <input
                      type="text"
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      placeholder="도시 검색..."
                      className="w-full rounded-lg bg-gray-50 px-3 py-2 text-sm outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-52 overflow-y-auto p-1">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            updateForm('city', city);
                            setCityOpen(false);
                            setCitySearch('');
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#fff0ec]"
                        >
                          {city}
                          {form.city === city && (
                            <Check size={15} className="text-[#ff6b4a]" />
                          )}
                        </button>
                      ))
                    ) : (
                      <p className="px-3 py-2 text-sm text-gray-400">
                        검색 결과 없음
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              우편번호 ZIP Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={form.zipCode}
              onChange={(e) =>
                updateForm('zipCode', e.target.value.replace(/[^0-9]/g, ''))
              }
              placeholder="예: 75080"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
            />
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

          <div className="flex flex-col gap-4">
            {/* 전화번호 (필수) */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                전화번호 Phone <span className="text-[#ff6b4a]">*</span>
              </label>
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(e) => updateForm('contactPhone', e.target.value)}
                placeholder="예: 469-123-4567"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
              />
            </div>

            {/* 카카오톡 ID (선택) */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                카카오톡 ID{' '}
                <span className="text-xs font-medium text-gray-400">(선택)</span>
              </label>
              <input
                type="text"
                value={form.contactKakao}
                onChange={(e) => updateForm('contactKakao', e.target.value)}
                placeholder="예: myKakaoId"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}