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

import {
  RoomTypeKo,
  GenderPrefKo,
  ROOM_TYPE_TO_DB,
  GENDER_TO_DB,
} from './mappings';

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
  rentPrice: string;
  deposit: string;
  moveInDate: string;
  contactType: 'phone' | 'kakao';
  contactValue: string;

  // Step 2 — 한글 값 사용 (팀 컨벤션)
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
  amenitiesEtc: string;
  description: string;

  // Step 3
  photos: File[];
}

const INITIAL_FORM: ListingFormData = {
  title: '',
  address: '',
  city: '',
  rentPrice: '',
  deposit: '',
  moveInDate: '',
  contactType: 'phone',
  contactValue: '',

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
  amenitiesEtc: '',
  description: '',

  photos: [],
};

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

  const validateStep = (): boolean => {
    if (step === STEPS.BASIC) {
      if (!form.title.trim()) return toast.error('매물 제목을 입력해주세요.'), false;
      if (!form.address.trim()) return toast.error('주소를 입력해주세요.'), false;
      if (!form.city) return toast.error('도시를 선택해주세요.'), false;
      if (!form.rentPrice || Number(form.rentPrice) <= 0)
        return toast.error('월세를 입력해주세요.'), false;
      if (!form.moveInDate) return toast.error('입주 가능일을 선택해주세요.'), false;
      if (!form.contactValue.trim())
        return toast.error('연락 방법을 입력해주세요.'), false;
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

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // ★ DB 저장용 payload: 한글 → 영문 enum 변환은 여기서만!
      const payload = {
        ...form,
        roomType: ROOM_TYPE_TO_DB[form.roomType],
        genderPreference: GENDER_TO_DB[form.genderPreference],
      };

      // TODO: 사진 업로드(Vercel Blob) + POST /api/listings 연결
      console.log('제출 데이터:', payload);
      await new Promise((r) => setTimeout(r, 800));

      toast.success('매물이 등록되었습니다!');
      router.push('/listings');
      router.refresh();
    } catch {
      toast.error('등록에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
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