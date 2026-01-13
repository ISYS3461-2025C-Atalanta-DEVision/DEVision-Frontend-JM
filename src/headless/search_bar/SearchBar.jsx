import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import useSearchBar from "./useSearchBar";

export default function SearchBar({
  placeholder = "Search...",
  className = "",
}) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { query, handleChange, clearQuery, searchApplicants, results, loading } = useSearchBar();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await searchApplicants(query);
    }
  };

  const handleApplicantClick = (applicantId) => {
    clearQuery();
    navigate(`/applicants/${applicantId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        clearQuery();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearQuery]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Input
        name="search"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={loading}
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral5">
          <i className="ri-loader-4-line animate-spin" />
        </span>
      )}
      {!loading && query && (
        <button
          type="button"
          onClick={clearQuery}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral5 hover:text-neutral8"
        >
          ✕
        </button>
      )}

      {results?.data?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bgComponent border border-neutral3 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {results.data.map((applicant) => (
            <div
              key={applicant.id}
              onClick={() => handleApplicantClick(applicant.id)}
              className="p-3 hover:bg-neutral2 cursor-pointer border-b border-neutral3 last:border-b-0 transition-colors"
            >
              <p className="font-medium text-neutral8">{applicant.name}</p>
              <p className="text-sm text-neutral6">{applicant.email}</p>
              <p className="text-xs text-neutral5">{applicant.country}</p>
            </div>
          ))}
        </div>
      )}

      {results?.data?.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bgComponent border border-neutral3 rounded-lg shadow-lg p-4 text-center text-neutral6 z-50">
          No applicants found
        </div>
      )}
    </div>
  );
}
