'use client';

import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean; // 로그인 중일 때 모달이 닫히지 않도록 
}

export default function Modal({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled
}: ModalProps) {
  // 모달 애니메이션을 위한 내부 상태
  const [showModal, setShowModal] = useState(isOpen);

  // isOpen 속성이 바뀔 때마다 내부 상태 동기화
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // 모달 닫기 함수 
  const handleClose = useCallback(() => {
    if (disabled) return; // 로딩 중이면 닫히지 않게 

    setShowModal(false);
    
    
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-neutral-800/70 antialiased outline-none focus:outline-none">
      
      
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto px-4 sm:px-0">
        
        
        <div
          className={`
            translate duration-300 h-full
            ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}
        >
          
          <div className="relative flex flex-col w-full h-full md:h-auto bg-white border-0 rounded-2xl shadow-lg outline-none focus:outline-none overflow-hidden">
            
            
            <div className="flex items-center justify-center relative p-6 border-b border-gray-100">
              <button
                onClick={handleClose}
                className="absolute left-6 p-1 border-0 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-700"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
              <h3 className="text-lg font-bold text-gray-950">
                {title}
              </h3>
            </div>

            
            <div className="relative p-6 flex-auto">
              {body}
            </div>

            
            {footer && (
              <div className="flex flex-col gap-2 p-6 border-t border-gray-100 bg-neutral-50/50">
                {footer}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}