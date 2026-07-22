'use client';

import { Check } from 'lucide-react';
import { STEPS } from './ListingWizard';

const STEP_LABELS = ['기본 정보', '조건 설정', '사진', '미리보기'];

interface StepIndicatorProps {
  currentStep: STEPS;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mt-8 flex items-center">
      {STEP_LABELS.map((label, index) => {
        const isDone = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === STEP_LABELS.length - 1;

        return (
          <div key={label} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors
                  ${
                    isDone
                      ? 'bg-[#ff6b4a] text-white'
                      : isCurrent
                        ? 'bg-[#ff6b4a] text-white ring-4 ring-[#ffe4de]'
                        : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : index + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isCurrent ? 'text-gray-900 font-bold' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`
                  mx-4 mb-6 h-[2px] flex-1 rounded-full
                  ${index < currentStep ? 'bg-[#ff6b4a]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}