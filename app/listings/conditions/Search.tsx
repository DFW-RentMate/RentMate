'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../../components/ui/combobox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const DFW_CITIES = [
  '전체',
  'Carrollton',
  'Richardson',
  'Plano',
  'Frisco',
  'Dallas',
  'Irving',
  'Denton',
  'Arlington',
  'Lewisville',
  'Allen',
  'McKinney',
  'Coppell',
  'Garland',
  '기타 DFW 지역',
];

const Search = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentCity = params?.get('city') || '';

  const onClick = (item: string) => {
    const currentQuery = qs.parse(params?.toString());

    if (item === '전체') {
      delete currentQuery.city; // 전체 선택시 param 삭제
    } else {
      currentQuery.city = item;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: currentQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  return (
    <Combobox
      key={currentCity}
      items={DFW_CITIES}
      value={currentCity}
      onValueChange={(value) => {
        // 선택 후 input blur
        (document.activeElement as HTMLElement)?.blur();
      }}
    >
      <ComboboxInput
        placeholder="도시 검색 (예: Plano)"
        className="border focus:border-primary focus:ring-primary"
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} onClick={() => onClick(item)}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default Search;
