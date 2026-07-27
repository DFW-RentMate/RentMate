'use client';
import dynamic from 'next/dynamic';
import { SafeListing } from '@/app/types';

const Map = dynamic(() => import('./Map'), { ssr: false });

const MapWrapper = ({ listing }: { listing: SafeListing }) => {
  return <Map listing={listing} />;
};

export default MapWrapper;
