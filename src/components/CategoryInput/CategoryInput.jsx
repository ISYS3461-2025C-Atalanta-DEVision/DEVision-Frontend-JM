import React, { useState, useRef, useEffect } from "react";
import useCategoryInput from "./useCategoryInput";
const CategoryInput = ({
  label,
  name,
  onChange,
  value,
  onBlur,
  error,
  options = [],
  placeholder = "Type to search...",
  required = false,
  disabled = false,
  className = "",
}) => {
  const {
    showList,
    setShowList,
    query,
    setQuery,
    containerRef,
    filteredOptions,
    highlightMatch,
    setIsTouched,
  } = useCategoryInput(options, onBlur, value, name);

  return (
    <div className={`mb-4 relative ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-neutral8 mb-1"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => {
          setShowList(true);
          setIsTouched(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 
          ${
            error
              ? "border-error focus:ring-error"
              : "border-gray-300 focus:ring-blue-500"
          } 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-bgComponent"}
        `}
      />

      {/* Dropdown list */}
      {showList && !disabled && (
        <ul className="absolute left-0 right-0 z-20 bg-bgComponent border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto mt-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                onMouseDown={() => {
                  onChange({
                    target: {
                      name,
                      value: opt,
                    },
                  });
                  setShowList(false);
                  setQuery("");
                }}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {highlightMatch(opt, query).map((part, i) =>
                  part.toLowerCase() === query.toLowerCase() ? (
                    <span key={i} className="text-primary font-semibold">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-neutral6">No results</li>
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CategoryInput;
