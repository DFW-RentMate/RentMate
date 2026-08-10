'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';

import StepIndicator from './StepIndicator';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Conditions from './steps/Step2Conditions';
import Step3Photos from './steps/Step3Photos';
import Step4Preview from './steps/Step4Preview';

import { geocodeAddress } from './geocode';
import {
  RoomTypeKo,
  GenderPrefKo,
  ROOM_TYPE_TO_DB,
  GENDER_TO_DB,
} from './mappings';

// ─────────────────────────────────────────────
// 단계 정의
// ─────────────────────────────────────────────
export enum STEPS {
  BASIC = 0,
  CONDITIONS = 1,
  PHOTOS = 2,
  PREVIEW = 3,
}

export interface ListingFormData {
  // Step 1
  title: string;
  address: string;
  city: string;
  zipCode: string;
  rentPrice: string;
  deposit: string;
  moveInDate: string;
  contactPhone: string;
  contactKakao: string;

  // Step 2
  roomType: RoomTypeKo;
  genderPreference: GenderPrefKo;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  parkingAvailable: boolean;
  furnished: boolean;
  electricityIncluded: boolean;
  waterIncluded: boolean;
  gasIncluded: boolean;
  internetIncluded: boolean;
  trashIncluded: boolean;
  hasWasher: boolean;
  hasDryer: boolean;
  hasRefrigerator: boolean;
  hasAc: boolean;
  hasHeating: boolean;
  hasTv: boolean;
  nearbyFacilities: string[];
  amenitiesEtc: string;
  description: string;

  // Step 3
  photos: File[];
}

const INITIAL_FORM: ListingFormData = {
  title: '',
  address: '',
  city: '',
  zipCode: '',
  rentPrice: '',
  deposit: '',
  moveInDate: '',
  contactPhone: '',
  contactKakao: '',

  roomType: '개인실',
  genderPreference: '무관',
  petsAllowed: false,
  smokingAllowed: false,
  parkingAvailable: false,
  furnished: false,
  electricityIncluded: false,
  waterIncluded: false,
  gasIncluded: false,
  internetIncluded: false,
  trashIncluded: false,
  hasWasher: false,
  hasDryer: false,
  hasRefrigerator: false,
  hasAc: false,
  hasHeating: false,
  hasTv: false,
  nearbyFacilities: [],
  amenitiesEtc: '',
  description: '',

  photos: [],
};

// ─────────────────────────────────────────────
// 위저드 본체
// ─────────────────────────────────────────────
export default function ListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<STEPS>(STEPS.BASIC);
  const [form, setForm] = useState<ListingFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = <K extends keyof ListingFormData>(
    key: K,
    value: ListingFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ─── 단계별 유효성 검사 ───
  const validateStep = (): boolean => {
    if (step === STEPS.BASIC) {
      if (!form.title.trim()) return toast.error('매물 제목을 입력해주세요.'), false;
      if (!form.address.trim()) return toast.error('주소를 입력해주세요.'), false;
      if (!form.city) return toast.error('도시를 선택해주세요.'), false;
      if (!form.rentPrice || Number(form.rentPrice) <= 0)
        return toast.error('월세를 입력해주세요.'), false;
      if (!form.moveInDate) return toast.error('입주 가능일을 선택해주세요.'), false;
      if (!form.contactPhone.trim())
        return toast.error('연락 가능한 전화번호를 입력해주세요.'), false;
    }
    if (step === STEPS.CONDITIONS) {
      if (form.description.trim().length < 20)
        return toast.error('상세 설명을 최소 20자 이상 입력해주세요.'), false;
    }
    if (step === STEPS.PHOTOS) {
      if (form.photos.length === 0)
        return toast.error('사진을 최소 1장 업로드해주세요.'), false;
    }
    return true;
  };

  const onBack = () => {
    if (step === STEPS.BASIC) {
      router.push('/listings');
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  // ─── 최종 제출 ───
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. 주소 → 좌표
      const fullAddress = form.zipCode
        ? `${form.address}, ${form.city}, TX ${form.zipCode}`
        : `${form.address}, ${form.city}, TX`;
      const { lat, lng } = await geocodeAddress(fullAddress);

      if (lat === null || lng === null) {
        toast.error('주소로 위치를 찾지 못했어요. 주소를 확인해주세요.');
        setIsSubmitting(false);
        return;
      }

      // 2. 사진 업로드 → URL 배열
      const photoUrls: string[] = [];
      for (const file of form.photos) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const { url } = await res.json();
          photoUrls.push(url);
        }
      }

      // 3. 매물 등록 POST
      const payload = {
        title: form.title,
        description: form.description,
        roomType: ROOM_TYPE_TO_DB[form.roomType],
        rentPrice: form.rentPrice,
        deposit: form.deposit,
        moveInDate: form.moveInDate,
        contactPhone: form.contactPhone,
        contactKakao: form.contactKakao || null,
        addressRaw: fullAddress,
        city: form.city,
        latitude: lat,
        longitude: lng,
        genderPreference: GENDER_TO_DB[form.genderPreference],
        petsAllowed: form.petsAllowed,
        smokingAllowed: form.smokingAllowed,
        parkingAvailable: form.parkingAvailable,
        furnished: form.furnished,
        electricityIncluded: form.electricityIncluded,
        waterIncluded: form.waterIncluded,
        gasIncluded: form.gasIncluded,
        internetIncluded: form.internetIncluded,
        trashIncluded: form.trashIncluded,
        hasWasher: form.hasWasher,
        hasDryer: form.hasDryer,
        hasRefrigerator: form.hasRefrigerator,
        hasAc: form.hasAc,
        hasHeating: form.hasHeating,
        hasTv: form.hasTv,
        amenitiesEtc: form.nearbyFacilities.join(', '),
        photoUrls,
      };

      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('등록 실패');

      toast.success('매물이 등록되었습니다!');
      router.push('/listings');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('등록에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── 단계별 콘텐츠 ───
  let stepContent = <Step1BasicInfo form={form} updateForm={updateForm} />;
  if (step === STEPS.CONDITIONS) {
    stepContent = <Step2Conditions form={form} updateForm={updateForm} />;
  }
  if (step === STEPS.PHOTOS) {
    stepContent = <Step3Photos form={form} updateForm={updateForm} />;
  }
  if (step === STEPS.PREVIEW) {
    stepContent = <Step4Preview form={form} />;
  }

  const isLastStep = step === STEPS.PREVIEW;

  return (
    <div className="min-h-screen bg-[#fcfaf8] pb-16">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-10 pt-6">

        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          검색으로 돌아가기
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">매물 등록</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          4단계로 매물 정보를 입력하고 등록하세요.
        </p>

        <StepIndicator currentStep={step} />

        <div className="mt-6">{stepContent}</div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            이전
          </button>

          {isLastStep ? (
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-xl bg-[#ff6b4a] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e8603a] disabled:opacity-60"
            >
              <Check size={16} strokeWidth={3} />
              {isSubmitting ? '등록 중...' : '매물 등록하기'}
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 rounded-xl bg-[#ff6b4a] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e8603a]"
            >
              다음
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}