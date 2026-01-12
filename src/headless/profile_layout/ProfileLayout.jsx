import React from "react";
import useProfileLayout from "./useProfileLayout";
import { useLocation } from "react-router-dom";

export default function ProfileLayout({ applicantId }) {
  const {
    getCountryName,
    formatDateRange,
    getHighestEducation,
    profile,
    skills,
    loading,
    error,
    countries,
  } = useProfileLayout(applicantId);

  const location = useLocation();
  const applicationContext = location.state?.applicationContext;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-4">
        <i className="ri-error-warning-line text-5xl text-neutral6"></i>
        <p className="text-xl text-neutral6">
          {error || "Applicant not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <>
      {applicationContext && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <i className="ri-briefcase-line mr-2"></i>
            Applied to:{" "}
            <span className="font-semibold">{applicationContext.jobTitle}</span>
            {applicationContext.appliedAt && (
              <span className="ml-2 text-blue-600">
                on {new Date(applicationContext.appliedAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-6 mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-4xl font-bold text-primary">
              {profile.name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-textBlack">
                {profile.name}
              </h1>
              {profile.isPremium && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                  <i className="ri-vip-crown-line mr-1"></i>
                  Premium
                </span>
              )}
              {profile.isActive && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                  Active
                </span>
              )}
            </div>

            <p className="text-neutral6 mt-1">{getHighestEducation()}</p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <i className="ri-mail-line text-neutral6"></i>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-phone-line text-neutral6"></i>
                  <span className="text-textBlack">{profile.phone}</span>
                </div>
              )}
              {profile.country && (
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-map-pin-line text-neutral6"></i>
                  <span className="text-textBlack">
                    {getCountryName(profile.country)}
                  </span>
                </div>
              )}
              {profile.createdAt && (
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-calendar-line text-neutral6"></i>
                  <span className="text-neutral6">
                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Documents from Application */}
          {applicationContext?.mediaUrls?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-neutral7 uppercase">
                Documents
              </p>
              {applicationContext.mediaUrls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm"
                >
                  <i className="ri-file-pdf-line"></i>
                  {url.includes("cv")
                    ? "CV"
                    : url.includes("cover")
                    ? "Cover Letter"
                    : `Document ${idx + 1}`}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-6 mb-6">
          <h2 className="text-lg font-semibold text-textBlack mb-4 flex items-center gap-2">
            <i className="ri-tools-line text-primary"></i>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-center px-3 py-2 gap-2 bg-neutral1 rounded-lg"
              >
                <p className="text-blacktxt font-medium">{skill.name}</p>
                {skill.icon && (
                  <i
                    className={`ri-${skill.icon}-line text-[20px] text-primary`}
                  ></i>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {profile.education?.length > 0 && (
        <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-6 mb-6">
          <h2 className="text-lg font-semibold text-textBlack mb-4 flex items-center gap-2">
            <i className="ri-graduation-cap-line text-primary"></i>
            Education
          </h2>
          <div className="space-y-4">
            {profile.education.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className={`${idx > 0 ? "border-t border-neutral3 pt-4" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-textBlack">
                      {edu.levelStudy} in {edu.major}
                    </h3>
                    <p className="text-neutral6">{edu.schoolName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral6">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-neutral7 mt-1">
                        GPA: <span className="font-medium">{edu.gpa}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work History Section */}
      {profile.workHistory?.length > 0 && (
        <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-6 mb-6">
          <h2 className="text-lg font-semibold text-textBlack mb-4 flex items-center gap-2">
            <i className="ri-briefcase-line text-primary"></i>
            Work Experience
          </h2>
          <div className="space-y-4">
            {profile.workHistory.map((work, idx) => (
              <div
                key={work.id || idx}
                className={`${idx > 0 ? "border-t border-neutral3 pt-4" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-textBlack">
                      {work.title}
                    </h3>
                    {work.description && (
                      <p className="text-sm text-neutral7 mt-2">
                        {work.description}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-neutral6 text-right shrink-0 ml-4">
                    {formatDateRange(work.startDate, work.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Objective Summary (if available) */}
      {profile.objectiveSummary && (
        <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-6">
          <h2 className="text-lg font-semibold text-textBlack mb-4 flex items-center gap-2">
            <i className="ri-user-star-line text-primary"></i>
            Objective Summary
          </h2>
          <p className="text-neutral7 leading-relaxed">
            {profile.objectiveSummary}
          </p>
        </div>
      )}

      {/* Empty State for minimal profiles */}
      {!profile.education?.length &&
        !profile.workHistory?.length &&
        !skills.length && (
          <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-8 text-center">
            <i className="ri-file-list-3-line text-4xl text-neutral5"></i>
            <p className="text-neutral6 mt-2">
              This applicant hasn't added detailed profile information yet.
            </p>
          </div>
        )}
    </>
  );
}
