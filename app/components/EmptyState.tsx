'use client';
import { TbHomeSearch } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  useIcon?: boolean;
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  useIcon,
  title,
  subtitle,
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className=" h-[80vh] flex flex-col items-center justify-center gap-0.5">
      {useIcon && (
        <TbHomeSearch size={90} color="gray" className="stroke-[1.5]" />
      )}
      <div className="text-2xl text-neutral-500 font-bold">{title}</div>
      <div className="font-light text-neutral-500 ">{subtitle}</div>
      {showReset && (
        <div
          onClick={() => {
            router.push('/listings');
          }}
          className="my-8  flex items-center justify-center gap-1
          disabled:opacity-70 
          disabled:cursor-not-allowed 
          rounded-md
          hover:opacity-80 
          transition
          bg-primary
          text-white
          w-34
          text-md 
          font-medium
          py-2
          cursor-pointer
          "
        >
          검색필터 초기화
        </div>
      )}
    </div>
  );
};

export default EmptyState;
