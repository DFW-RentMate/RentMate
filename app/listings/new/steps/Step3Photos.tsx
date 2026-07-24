'use client';

import { useCallback, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ListingFormData } from '../ListingWizard';

const MAX_PHOTOS = 8;

interface StepProps {
  form: ListingFormData;
  updateForm: <K extends keyof ListingFormData>(
    key: K,
    value: ListingFormData[K],
  ) => void;
}

export default function Step3Photos({ form, updateForm }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const imageFiles = Array.from(files).filter((f) =>
        ['image/jpeg', 'image/png'].includes(f.type),
      );

      if (imageFiles.length === 0) {
        toast.error('JPG, PNG 파일만 업로드할 수 있어요.');
        return;
      }

      const remaining = MAX_PHOTOS - form.photos.length;
      if (imageFiles.length > remaining) {
        toast.error(`최대 ${MAX_PHOTOS}장까지 업로드할 수 있어요.`);
      }

      updateForm('photos', [...form.photos, ...imageFiles.slice(0, remaining)]);
    },
    [form.photos, updateForm],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const removePhoto = (index: number) => {
    updateForm(
      'photos',
      form.photos.filter((_, i) => i !== index),
    );
  };

  const movePhotoToFront = (index: number) => {
    if (index === 0) return;
    const next = [...form.photos];
    const [moved] = next.splice(index, 1);
    next.unshift(moved);
    updateForm('photos', next);
    toast.success('대표 사진으로 설정했어요.');
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900">
        사진 Photos <span className="text-[#ff6b4a]">*</span>
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        첫 번째 사진이 대표 이미지로 사용됩니다. 최대 {MAX_PHOTOS}장까지 업로드할 수 있습니다.
      </p>

      {/* 업로드 영역 */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
          mt-4 flex cursor-pointer flex-col items-center justify-center gap-3
          rounded-2xl border-2 border-dashed py-14 transition-colors
          ${
            isDragging
              ? 'border-[#ff6b4a] bg-[#fff0ec]'
              : 'border-gray-200 bg-gray-50/50 hover:border-[#ffab97] hover:bg-[#fff8f6]'
          }
        `}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4de]">
          <ImagePlus size={22} className="text-[#ff6b4a]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800">
            사진을 드래그하거나 클릭하여 업로드
          </p>
          <p className="mt-1 text-xs text-gray-400">
            JPG, PNG · 최대 {MAX_PHOTOS}장
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* 미리보기 그리드 */}
      {form.photos.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold text-gray-600">
            {form.photos.length}장 업로드됨 · 사진을 클릭하면 대표로 설정돼요
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {form.photos.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                onClick={() => movePhotoToFront(index)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-gray-200"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`업로드 사진 ${index + 1}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />

                {index === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#ff6b4a] px-2 py-0.5 text-[10px] font-bold text-white">
                    대표
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                  aria-label="사진 삭제"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}