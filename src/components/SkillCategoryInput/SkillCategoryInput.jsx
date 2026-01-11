import React, { useState, useRef, useEffect } from "react";
import skillStore from "../../store/skill.store";

const SkillCategoryInput = ({
  label,
  name,
  onChange,
  value = [], // Array of skill IDs
  onBlur,
  error,
  placeholder = "Type to search skills...",
  required = false,
  disabled = false,
  className = "",
}) => {
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const containerRef = useRef(null);

  const { skills, loading } = skillStore();

  // Fetch skills on mount
  useEffect(() => {
    skillStore.getState().fetchSkills();
  }, []);

  // Filter skills based on query and exclude already selected
  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(query.toLowerCase()) &&
      !value.includes(skill.id)
  );

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (isTouched && value.length === 0) {
          onBlur?.({ target: { name, value: [] } });
        }
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTouched, value.length, onBlur, name]);

  const highlightMatch = (text, query) => {
    if (!query) return [text];
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex);
  };

  const handleSelectSkill = (skill) => {
    // Add skill ID to the value array
    onChange({
      target: {
        name,
        value: skill.id,
      },
    });
    setShowList(false);
    setQuery("");
  };

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
        placeholder={loading ? "Loading skills..." : placeholder}
        disabled={disabled || loading}
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
              : "border-neutral3 focus:ring-blue-500"
          }
          ${disabled ? "bg-neutral2 cursor-not-allowed" : "bg-bgComponent"}
        `}
      />

      {/* Dropdown list */}
      {showList && !disabled && !loading && (
        <ul className="absolute left-0 right-0 z-20 bg-bgComponent border border-neutral3 rounded-lg shadow-lg max-h-60 overflow-auto mt-1">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <li
                key={skill.id}
                onMouseDown={() => handleSelectSkill(skill)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2"
              >
                {skill.icon && (
                  <i className={`ri-${skill.icon}-line text-primary`}></i>
                )}
                <span>
                  {highlightMatch(skill.name, query).map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                      <span key={i} className="text-primary font-semibold">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </span>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-neutral6">No skills found</li>
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SkillCategoryInput;
