'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { LuCheck } from 'react-icons/lu';

interface EtcProps {
  label?: string;
  paramKey: string; // 'pets', 'parking', 'furnished'
}

const Etc = ({ label, paramKey }: EtcProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const checked = params?.get(paramKey) === 'true';

  const handleClick = () => {
    const currentQuery = qs.parse(params?.toString());
    const updatedQuery = {
      ...currentQuery,
      [paramKey]: !checked ? 'true' : null,
    };

    const url = qs.stringifyUrl(
      { url: pathname, query: updatedQuery },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer my-1 text-sm">
      <div
        onClick={handleClick}
        className={`
          w-5 h-5 rounded-full border-1 flex items-center justify-center transition-colors hover:border-primary
          ${checked ? 'border-primary bg-primary' : 'border-gray-300'}
          `}
      >
        {checked && <LuCheck size={13} color="white" />}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default Etc;
