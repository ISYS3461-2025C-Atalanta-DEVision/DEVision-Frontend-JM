// hooks/useObserveScrolling.js
import { useEffect, useCallback } from "react";

export default function useObserveScrolling({ loadMore, loaderRef, loading }) {
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMore();
      }
    },
    [loadMore, loading]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "70px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      observer.disconnect();
    };
  }, [handleObserver, loaderRef]);
}