import { useSyncExternalStore } from 'react';

const subscribe = (callback: (e: MediaQueryListEvent) => void) => {
  const mediaQueryList = window.matchMedia('(max-width: 767px)');
  mediaQueryList.addEventListener('change', callback);
  return () => mediaQueryList.removeEventListener('change', callback);
};

const getSnapshot = () => window.matchMedia('(max-width: 767px)').matches;
const getServerSnapshot = () => false;

export const useIsMobile = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};