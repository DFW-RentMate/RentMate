'use client';
import { TbHomeSearch } from 'react-icons/tb';
import Button from './Button';
import { FiPlus } from 'react-icons/fi';
import { IconType } from 'react-icons';
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
        <TbHomeSearch size={80} color="gray" className="stroke-[1.5]" />
      )}
      <div className="text-2xl text-neutral-500 font-bold">{title}</div>
      <div className="font-light text-neutral-500 ">{subtitle}</div>
      {showReset && (
        <div className="my-8 w-fit">
          <Button
            label="검색필터 초기화"
            outline={false}
            small={true}
            onClick={() => router.push('/')}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
