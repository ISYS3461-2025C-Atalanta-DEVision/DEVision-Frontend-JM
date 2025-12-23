import { useState, useCallback } from "react";

export default function useCarousel(images, externalIndex, onIndexChange) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;
  const totalImages = images.length;

  const goToIndex = (index) => {
    if (index >= 0 && index < totalImages) {
      setDirection(index > currentIndex ? 1 : -1);
      if (isControlled && onIndexChange) {
        onIndexChange(index);
      } else {
        setInternalIndex(index);
      }
    }
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + totalImages) % totalImages;
    setDirection(-1);
    if (isControlled && onIndexChange) {
      onIndexChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % totalImages;
    setDirection(1);
    if (isControlled && onIndexChange) {
      onIndexChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };
    
  return {
    currentIndex,
    direction,
    goToPrevious,
    goToNext,
    goToIndex,
    totalImages,
  };
}
