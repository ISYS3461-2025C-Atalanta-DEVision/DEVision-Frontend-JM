import { useState, useEffect, useRef } from "react";
import countryService from "../services/countryService";

function parseFullName(name) {
  if (!name) return { firstName: "Unknown", lastName: "" };
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

function ApplicantCard({ applicant, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countryName, setCountryName] = useState(
    countryService.getCountryNameSync(applicant.country)
  );
  const cardRef = useRef(null);

  const { firstName, lastName } = parseFullName(applicant.name);
  const initials = `${firstName.charAt(0)}${lastName.charAt(0) || ""}`.toUpperCase();

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch country name when visible
  useEffect(() => {
    if (isVisible && applicant.country) {
      countryService.getCountryName(applicant.country).then(setCountryName);
    }
  }, [isVisible, applicant.country]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-neutral3 p-4 hover:shadow-md transition-all cursor-pointer"
    >
      {!isVisible ? (
        // Skeleton placeholder
        <div className="animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-neutral2"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral2 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral2 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-neutral2 rounded w-full"></div>
            <div className="h-3 bg-neutral2 rounded w-2/3"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Header with Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              {applicant.avatarUrl && !imageError ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg animate-pulse">
                      {initials}
                    </div>
                  )}
                  <img
                    src={applicant.avatarUrl}
                    alt={applicant.name}
                    className={`w-14 h-14 rounded-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {initials}
                </div>
              )}
              {applicant.isPremium && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="ri-vip-crown-fill text-xs text-white"></i>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-neutral9 truncate">
                {firstName} {lastName}
              </h3>
              <p className="text-sm text-neutral6 truncate flex items-center gap-1">
                <i className="ri-mail-line text-xs"></i>
                {applicant.email || "No email"}
              </p>
            </div>

            <i className="ri-arrow-right-s-line text-xl text-neutral5"></i>
          </div>

          {/* Details */}
          <div className="mt-3 pt-3 border-t border-neutral2 space-y-2">
            {/* Country */}
            <div className="flex items-center gap-2 text-sm">
              <i className="ri-map-pin-line text-neutral5"></i>
              <span className="text-neutral7">{countryName}</span>
            </div>

            {/* Highest Education */}
            {applicant.highestEducation && (
              <div className="flex items-center gap-2 text-sm">
                <i className="ri-graduation-cap-line text-neutral5"></i>
                <span className="text-neutral7">
                  {applicant.highestEducation}
                </span>
              </div>
            )}
          </div>

          {/* Status indicators */}
          <div className="mt-3 flex items-center gap-2">
            {applicant.isActive && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Active
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ApplicantCard;
