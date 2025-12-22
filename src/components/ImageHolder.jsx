import React, { useState } from "react";
import CompanyDefault from "../assets/photo/company_default.png";

export default function ImageHolder({ src, alt, className, canOpen = true }) {
  const [open, setOpen] = useState(false);
  const finalSrc = src && src !== "default" ? `${src}` : CompanyDefault;
  return (
    <>
      <img
        src={finalSrc}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={() => {
          if (canOpen) setOpen(true);
        }}
      />

      {/* Fullscreen Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg object-contain animate-fadeIn"
          />
        </div>
      )}
    </>
  );
}
