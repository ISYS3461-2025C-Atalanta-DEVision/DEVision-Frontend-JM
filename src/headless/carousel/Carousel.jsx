import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCarousel from "./useCarousel";

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function Carousel({
  images = [],
  className = "",
  imageClassName = "",
  showDots = true,
  showArrows = true,
  currentIndex: externalIndex,
  onIndexChange,
}) {
  const {
    currentIndex,
    direction,
    goToPrevious,
    goToNext,
    goToIndex,
    totalImages,
  } = useCarousel(images, externalIndex, onIndexChange);

  return (
    <div
      className={`
    relative
    aspect-square
    bg-neutral2
    overflow-hidden
    rounded-[16px]
    flex items-center justify-center
    w-full
    p-2
    ${className}
  `}
    >
      {/* Image container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`inset-0 m-auto max-w-[100%] max-h-[100%] object-contain ${imageClassName}`}
        />
      </AnimatePresence>

      {/* Left Arrow */}
      {showArrows && (
        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-blacktxt shadow-md hover:bg-white transition"
          aria-label="Previous image"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
      )}

      {/* Right Arrow */}
      {showArrows && (
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-blacktxt shadow-md hover:bg-white transition"
          aria-label="Next image"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      )}

      {/* Dots indicator */}
      {showDots && totalImages > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 text-white text-xs font-primary">
        {currentIndex + 1} / {totalImages}
      </div>
    </div>
  );
}
