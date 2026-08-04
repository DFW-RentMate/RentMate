'use client';

import type { ListingFormData } from '../ListingWizard';
import {
  ROOM_TYPES_KO,
  GENDER_PREFS_KO,
  ROOM_TYPE_LABEL_EN,
  GENDER_LABEL_EN,
  NEARBY_FACILITIES,
} from '../mappings';

interface StepProps {
  form: ListingFormData;
  updateForm: <K extends keyof ListingFormData>(
    key: K,
    value: ListingFormData[K],
  ) => void;
}

// ─── 토글 스위치 (flex 방식 — 손잡이가 오른쪽으로 이동) ───
function Toggle({
  label,
  labelEn,
  checked,
  onChange,
}: {
  label: string;
  labelEn?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        {labelEn && <span className="text-[11px] text-gray-400">{labelEn}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors
          ${checked ? 'bg-[#ff6b4a]' : 'bg-gray-200'}
        `}
      >
        <span
          className={`
            block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200
            ${checked ? 'translate-x-[20px]' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}

// ─── 라디오 pill (단일 선택) ───
function RadioPills({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: never) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value as never)}
          className={`
            flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors
            ${
              value === opt.value
                ? 'border-[#ff6b4a] bg-[#fff0ec] text-[#ff6b4a]'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <span
            className={`h-3.5 w-3.5 rounded-full border-2 ${
              value === opt.value
                ? 'border-[#ff6b4a] bg-[#ff6b4a] ring-2 ring-inset ring-white'
                : 'border-gray-300'
            }`}
          />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── 다중 선택 칩 (주변 편의시설) ───
function MultiChips({
  options,
  selected,
  onToggle,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`
              rounded-full border px-4 py-2 text-sm font-semibold transition-colors
              ${
                on
                  ? 'border-[#ff6b4a] bg-[#fff0ec] text-[#ff6b4a]'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            {on && '✓ '}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── 섹션 제목 ───
function SectionTitle({
  children,
  required,
  hint,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-bold text-gray-900">
        {children} {required && <span className="text-[#ff6b4a]">*</span>}
      </h3>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function Step2Conditions({ form, updateForm }: StepProps) {
  const toggleFacility = (name: string) => {
    const next = form.nearbyFacilities.includes(name)
      ? form.nearbyFacilities.filter((f) => f !== name)
      : [...form.nearbyFacilities, name];
    updateForm('nearbyFacilities', next);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col gap-8">

        {/* 룸 타입 */}
        <div>
          <SectionTitle required>룸 타입 Room type</SectionTitle>
          <RadioPills
            value={form.roomType}
            onChange={(v) => updateForm('roomType', v)}
            options={ROOM_TYPES_KO.map((t) => ({
              value: t,
              label: `${t} ${ROOM_TYPE_LABEL_EN[t]}`,
            }))}
          />
        </div>

        {/* 성별 선호 */}
        <div>
          <SectionTitle>성별 선호 Gender preference</SectionTitle>
          <RadioPills
            value={form.genderPreference}
            onChange={(v) => updateForm('genderPreference', v)}
            options={GENDER_PREFS_KO.map((g) => ({
              value: g,
              label: `${g} ${GENDER_LABEL_EN[g]}`,
            }))}
          />
        </div>

        {/* 입주 조건 */}
        <div>
          <SectionTitle>입주 조건 Conditions</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Toggle label="반려동물 가능" labelEn="Pets allowed"
              checked={form.petsAllowed}
              onChange={(v) => updateForm('petsAllowed', v)} />
            <Toggle label="흡연 가능" labelEn="Smoking allowed"
              checked={form.smokingAllowed}
              onChange={(v) => updateForm('smokingAllowed', v)} />
            <Toggle label="주차 가능" labelEn="Parking available"
              checked={form.parkingAvailable}
              onChange={(v) => updateForm('parkingAvailable', v)} />
            <Toggle label="가구 포함" labelEn="Furnished"
              checked={form.furnished}
              onChange={(v) => updateForm('furnished', v)} />
          </div>
        </div>

        {/* 관리비 포함 */}
        <div>
          <SectionTitle>관리비 포함 Utilities included</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Toggle label="전기" labelEn="Electricity"
              checked={form.electricityIncluded}
              onChange={(v) => updateForm('electricityIncluded', v)} />
            <Toggle label="수도" labelEn="Water"
              checked={form.waterIncluded}
              onChange={(v) => updateForm('waterIncluded', v)} />
            <Toggle label="가스" labelEn="Gas"
              checked={form.gasIncluded}
              onChange={(v) => updateForm('gasIncluded', v)} />
            <Toggle label="인터넷" labelEn="Internet"
              checked={form.internetIncluded}
              onChange={(v) => updateForm('internetIncluded', v)} />
            <Toggle label="쓰레기" labelEn="Trash"
              checked={form.trashIncluded}
              onChange={(v) => updateForm('trashIncluded', v)} />
          </div>
        </div>

        {/* 가전 / 편의시설 */}
        <div>
          <SectionTitle>가전 / 편의시설 Amenities</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Toggle label="세탁기" checked={form.hasWasher}
              onChange={(v) => updateForm('hasWasher', v)} />
            <Toggle label="건조기" checked={form.hasDryer}
              onChange={(v) => updateForm('hasDryer', v)} />
            <Toggle label="냉장고" checked={form.hasRefrigerator}
              onChange={(v) => updateForm('hasRefrigerator', v)} />
            <Toggle label="에어컨" checked={form.hasAc}
              onChange={(v) => updateForm('hasAc', v)} />
            <Toggle label="난방" checked={form.hasHeating}
              onChange={(v) => updateForm('hasHeating', v)} />
            <Toggle label="TV" checked={form.hasTv}
              onChange={(v) => updateForm('hasTv', v)} />
          </div>
        </div>

        {/* 주변 편의시설 */}
        <div>
          <SectionTitle hint="해당하는 항목을 모두 선택하세요. 도보 또는 차로 5분 이내 기준.">
            주변 편의시설 Nearby
          </SectionTitle>
          <MultiChips
            options={NEARBY_FACILITIES}
            selected={form.nearbyFacilities}
            onToggle={toggleFacility}
          />
          {form.nearbyFacilities.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              {form.nearbyFacilities.length}개 선택됨
            </p>
          )}
        </div>

        {/* 상세 설명 */}
        <div>
          <SectionTitle
            required
            hint="위 항목으로 표현하기 어려운 내용만 적어주세요."
          >
            상세 설명 Description
          </SectionTitle>
          <textarea
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            placeholder="예) 하우스메이트는 20대 직장인 1명입니다. 방은 남향이라 채광이 좋고 조용한 편이에요. 계약은 최소 6개월부터 가능합니다."
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-[#ff6b4a] focus:ring-2 focus:ring-[#ffe4de]"
          />
          <p
            className={`mt-1.5 text-xs ${
              form.description.trim().length < 20
                ? 'text-gray-400'
                : 'text-green-600'
            }`}
          >
            {form.description.trim().length < 20
              ? `최소 20자 이상 입력해 주세요. (현재 ${form.description.trim().length}자)`
              : `${form.description.trim().length}자 입력됨`}
          </p>
        </div>

      </div>
    </div>
  );
}