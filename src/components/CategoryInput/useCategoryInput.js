import { useState, useRef, useEffect } from "react";

function useCategoryInput(options, onBlur, value, nameFromList) {
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const containerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const handleBlur = useCallback(() => {
    if (isTouched && value.length === 0) {
      onBlur({ target: { name: nameFromList, value: [] } });
    }
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleBlur();
        setShowList(false); // hide list when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTouched, value.length, onBlur, nameFromList]);

  const highlightMatch = (text, query) => {
    if (!query) return [text];

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex);
  };

  return {
    showList,
    setShowList,
    query,
    setQuery,
    containerRef,
    filteredOptions,
    highlightMatch,
    setIsTouched,
  };
}

export default useCategoryInput;
