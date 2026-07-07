'use client';

import { useSyncExternalStore } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const subscribe = () => () => {};

  const hasMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!hasMounted) return null;

  return <div>{children}</div>;
};

export default ClientOnly;
