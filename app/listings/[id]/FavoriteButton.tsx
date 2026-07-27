'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleFavorite } from '@/app/actions/toggleFavorite';

interface Props {
  listingId: string;
  initialFavorited: boolean;
}

const FavoriteButton = ({ listingId, initialFavorited }: Props) => {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      const result = await toggleFavorite(listingId);
      setFavorited(result);
    } catch {
      alert('로그인이 필요합니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-100 transition-colors"
    >
      <Heart
        size={18}
        className={favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
      />
      {favorited ? '찜 완료' : '찜하기'}
    </button>
  );
};

export default FavoriteButton;
