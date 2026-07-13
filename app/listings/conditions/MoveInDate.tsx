'use client';

import { PiCalendarDotsDuotone } from 'react-icons/pi';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { formatISO } from 'date-fns';

const MoveInDate = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="relative flex flex-col justify-center text-sm font-medium gap-2 w-full">
      입주 가능일 Move-in by
      <div className="relative w-full">
        <DatePicker
          className="border border-1 rounded-md cursor-pointer w-62 p-2"
          minDate={new Date()}
          selected={startDate}
          showYearDropdown
          showMonthDropdown
          popperPlacement="bottom-start"
          onChange={(date: Date | null) => {
            setStartDate(date);
            if (date) {
              const currentQuery = qs.parse(params?.toString());
              const updatedQuery = {
                ...currentQuery,
                date: formatISO(date),
              };
              const url = qs.stringifyUrl(
                { url: pathname, query: updatedQuery },
                { skipNull: true },
              );
              router.push(url);
            }
          }}
        />
        <PiCalendarDotsDuotone size={22} className="absolute top-2 right-2" />
      </div>
    </div>
  );
};

export default MoveInDate;
