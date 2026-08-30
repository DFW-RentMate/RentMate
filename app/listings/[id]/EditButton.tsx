'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Settings } from 'lucide-react';

const EditButton = ({
  listingId,
  ownerId,
}: {
  listingId: string;
  ownerId: string;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = (session?.user as { id?: string })?.id;

  if (userId !== ownerId) return null; // 본인 매물 아니면 안 보임

  return (
    <button
      onClick={() => router.push(`/listings/${listingId}/edit`)}
      className="w-full bg-[#1a1f2e] hover:bg-[#252b3d] rounded-xl py-3 flex items-center justify-center gap-2 font-medium text-white transition-colors"
    >
      <Settings size={18} />
      매물 수정하기
    </button>
  );
};

export default EditButton;
