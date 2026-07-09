'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface EtcProps {
  label?: string;
  icon?: IconType;
  paramKey: string; // 'pets', 'parking', 'furnished'
}

const Etc = ({ label, icon: Icon, paramKey }: EtcProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const value = params?.get(paramKey);

  const handleClick = (val: boolean) => {
    const currentQuery = qs.parse(params?.toString());
    const updatedQuery = {
      ...currentQuery,
      [paramKey]: val ? 'true' : 'false',
    };

    const url = qs.stringifyUrl(
      { url: pathname, query: updatedQuery },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col px-4 py-2">
      <span className="flex text-sm font-medium my-1 gap-1 px-1 items-center">
        {Icon && <Icon size={16} />}
        {label}
      </span>
      <div className="flex justify-between items-center border border-gray-200 rounded-xl overflow-hidden text-xs">
        <div
          onClick={() => handleClick(true)}
          className={`flex-1 text-center py-1 cursor-pointer border-r border-gray-200 
      ${value === 'true' ? 'bg-primary text-white' : 'hover:bg-gray-50'}
    `}
        >
          네
        </div>
        <div className="w-[1px] h-full bg-gray-200" />
        <div
          onClick={() => handleClick(false)}
          className={`flex-1 text-center py-1 cursor-pointer 
      ${value === 'false' ? 'bg-primary text-white' : 'hover:bg-gray-50'}
    `}
        >
          아니요
        </div>
      </div>
    </div>
  );
};

export default Etc;
