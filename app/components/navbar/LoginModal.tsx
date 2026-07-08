import { Home } from 'lucide-react';

const LoginModal = () => {
  return (
    <div
      className="justify-center 
      items-center 
      flex 
      overflow-x-hidden 
      overflow-y-auto
      fixed
      inset-0
      z-50
    bg-neutral-800/40"
    >
      <div className="bg-white flex flex-col items-center justify-center p-30 rounded-2xl">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-[#FF6B4A] rounded-full">
          <Home size={20} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col ">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
            RoomRent DFW
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            달라스 한인 렌트
          </span>
        </div>

        <div>Google</div>
        <div>Kakao</div>
      </div>
    </div>
  );
};

export default LoginModal;
