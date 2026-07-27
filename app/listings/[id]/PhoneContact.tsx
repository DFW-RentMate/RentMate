'use client';

import { Phone } from 'lucide-react';

const PhoneContact = ({ phone }: { phone: string }) => {
  return (
    <a
      href={`tel:${phone}`}
      className="w-full bg-emerald-400 hover:bg-emerald-500 transition-colors rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
    >
      <Phone size={16} />
      {phone}
    </a>
  );
};

export default PhoneContact;
