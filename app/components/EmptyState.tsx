'use client';
import { TbHomeSearch } from 'react-icons/tb';
import Button from './Button';
import { FiPlus } from 'react-icons/fi';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({ title, subtitle, showReset }: EmptyStateProps) => {
  return (
    <div className=" h-[80vh] flex flex-col items-center justify-center gap-0.5">
      <TbHomeSearch size={80} color="gray" className="stroke-[1.5]" />
      <div className="text-2xl text-neutral-500 font-bold">{title}</div>
      <div className="font-light text-neutral-500 ">{subtitle}</div>
      <div className="my-8 w-fit">
        <Button label="검색필터 초기화" outline={false} small={true} />
      </div>
    </div>
  );
};

export default EmptyState;
