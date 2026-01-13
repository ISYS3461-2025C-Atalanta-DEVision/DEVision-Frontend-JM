import { applicantService } from "../../services/applicantService";
import { countryService } from "../../services/countryService";
import ApplicantCard from "../../components/ApplicantCard";
import useApplicantList from "./useApplicantList";

const EDUCATION_LEVELS = [
  { value: "", label: "All Education Levels" },
  { value: "Bachelor", label: "Bachelor's Degree" },
  { value: "Master", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
];
export default function ApplicantList() {
  const {
    applicants,
    loading,
    initialLoading,
    error,
    searchQuery,
    page,
    hasMore,
    isFilterMode,
    selectedCountry,
    selectedEducation,
    countries,
    countriesLoading,
    handleSearch,
    loaderRef,
  } = useApplicantList(countryService, applicantService);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral9 mb-2">Applicants</h1>
        <p className="text-neutral6">Search and browse applicants</p>
      </div>

      <form onSubmit={handleSearch} className="mb-6 space-y-4">
        {/* Search by name */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-neutral5"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicants by name..."
              className="w-full pl-10 pr-4 py-2.5 border border-neutral3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral5 hover:text-neutral7"
              >
                <i className="ri-close-line"></i>
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Country filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              disabled={countriesLoading}
              className="w-full px-4 py-2.5 border border-neutral3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white pr-10"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-neutral5 pointer-events-none"></i>
          </div>

          {/* Education filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white pr-10"
            >
              {EDUCATION_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-neutral5 pointer-events-none"></i>
          </div>

          {/* Clear filters button */}
          {(selectedCountry || selectedEducation) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2.5 text-neutral6 hover:text-neutral8 border border-neutral3 rounded-lg hover:bg-neutral1 transition-colors flex items-center gap-2"
            >
              <i className="ri-filter-off-line"></i>
              Clear Filters
            </button>
          )}
        </div>
      </form>

      {/* Active filters display */}
      {isFilterMode && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-neutral6">Active filters:</span>
          {getActiveFilterLabels().map((label, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {label}
            </span>
          ))}
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Initial Loading State */}
      {initialLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-neutral3 p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral2"></div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral2 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral2 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral2 space-y-2">
                <div className="h-3 bg-neutral2 rounded w-full"></div>
                <div className="h-3 bg-neutral2 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applicants Grid */}
      {!initialLoading && applicants.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onClick={() => handleApplicantClick(applicant.id)}
              />
            ))}
          </div>

          {/* Infinite Scroll Loader */}
          {hasMore && (
            <div
              ref={loaderRef}
              className="mt-6 flex justify-center items-center py-4"
            >
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  <span className="text-neutral6 text-sm">Loading more...</span>
                </div>
              )}
            </div>
          )}

          {!hasMore && applicants.length > 0 && (
            <div className="mt-6 text-center py-4">
              <span className="text-neutral5 text-sm">
                You've reached the end
              </span>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!initialLoading && !loading && applicants.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-user-search-line text-5xl text-neutral4 mb-4 block"></i>
          <p className="text-neutral6">
            {isFilterMode
              ? "No applicants found matching your filters. Try adjusting your search criteria."
              : "No applicants available."}
          </p>
          {isFilterMode && (
            <button
              onClick={handleClearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
