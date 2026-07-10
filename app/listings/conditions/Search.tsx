import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';

const DFW_CITIES = [
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
  return (
    <Combobox
      items={DFW_CITIES}
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
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default Search;
