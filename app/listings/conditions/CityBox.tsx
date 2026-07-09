'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface CityBoxProps {
  label?: string;
  selected?: boolean;
}

const CityBox = ({ label, selected }: CityBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleClick = () => {
    const currentQuery = qs.parse(params.toString()); // URL에서 파라미터 읽기 → { category: 'beach', location: 'TX' }

    const updatedQuery = {
      ...currentQuery,
      city: label,
    }; // city 더해주기

    if (label === params?.get('city')) {
      delete updatedQuery.city;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        shadow-xs
        border 
        py-1 
        px-2 
        rounded-2xl 
        cursor-pointer
        hover:bg-gray-50
        text-sm
        ${selected ? 'border-primary ' : 'border-gray-200'}
        ${selected ? 'text-primary' : ''}
        `}
    >
      {label}
    </div>
  );
};

export default CityBox;
