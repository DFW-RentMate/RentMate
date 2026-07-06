'use client';

import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <ClipLoader size={100} color="#FF6B4A" loading={true} />
    </div>
  );
};

export default Loader;
