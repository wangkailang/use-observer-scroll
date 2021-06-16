import { useRef, useEffect } from 'react';

export const useObserverScroll = ref => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('`useObserverScroll` expects a single ref argument.');
    }
  }

  const observerRef = useRef();
  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // enter view
        if (entry.isIntersecting) {
          if (ref.current) {
            ref.current.click();
          }
        }
      });
    });
    return () => {
      // stop observer
      observerRef.current?.disconnect();
    };
  }, []);

  return observerRef.current as IntersectionObserver;
}