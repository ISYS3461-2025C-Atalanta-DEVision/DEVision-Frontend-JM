import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "../headless/carousel/Carousel";

export default function EventCard({ item }) {
  const [open, setOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition"
      >
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-52 w-full object-cover"
        />

        <div className="p-4 space-y-1">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-neutral5">{item.date}</p>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* BACKDROP */}
            <div
              onClick={() => {
                setOpen(false);
                setSelectedThumbnail(0);
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />

            {/* CONTENT */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-w-5xl w-full mx-6 bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <Carousel
                images={item.imageUrls}
                showArrows={true}
                showDots={true}
                currentIndex={selectedThumbnail}
                onIndexChange={setSelectedThumbnail}
                className="h-[70vh] aspect-square object-cover"
              />

              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-neutral6 text-sm">{item.date}</p>

                <p className="text-blacktxt leading-relaxed">{item.caption}</p>
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setOpen(false);
                  setSelectedThumbnail(0);
                }}
                className="absolute top-4 right-4 bg-white text-blacktxt hover:bg-primary hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow"
              >
                <i className="ri-close-large-line" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
