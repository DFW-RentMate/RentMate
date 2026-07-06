'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="오류가 발생했습니다"
      subtitle="잠시 후 다시 시도해주세요"
    />
  );
};

export default ErrorState;
