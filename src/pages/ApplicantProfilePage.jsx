import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../layout/NavBar/NavBar";
import applicantService from "../services/applicantService";
import authService from "../services/authService";

export default function ApplicantProfilePage() {
  const { applicantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  // Get application context from navigation state (if coming from job applications)
  const applicationContext = location.state?.applicationContext;

  // Fetch countries for mapping
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await authService.getCountries();
        setCountries(data);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch applicant profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!applicantId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await applicantService.getFullProfile(applicantId);
        setProfile(data);

        // Fetch skills if skillCategories exist
        if (data.skillCategories?.length > 0) {
          const fetchedSkills = await applicantService.getSkillsByIds(data.skillCategories);
          setSkills(fetchedSkills);
        }
      } catch (err) {
        console.error("Failed to fetch applicant profile:", err);
        setError("Failed to load applicant profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [applicantId]);

  // Get country name from code
  const getCountryName = (code) => {
    const country = countries.find((c) => c.code === code || c.value === code);
    return country?.name || country?.label || code;
  };

  // Get highest education display
  const getHighestEducation = () => {
    if (!profile?.education?.length) return "Not specified";
    // Find the education that matches highestEducation ID, or just show the first one
    const highest = profile.education.find((e) => e.id === profile.highestEducation);
    if (highest) {
      return `${highest.levelStudy} in ${highest.major}`;
    }
    // Fallback to first education entry
    const first = profile.education[0];
    return first ? `${first.levelStudy} in ${first.major}` : "Not specified";
  };

  // Format date range
  const formatDateRange = (startDate, endDate) => {
    const start = startDate ? new Date(startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
    const end = endDate ? new Date(endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";
    return `${start} - ${end}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-backGround">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-backGround">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-4">
          <i className="ri-error-warning-line text-5xl text-neutral6"></i>
          <p className="text-xl text-neutral6">{error || "Applicant not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backGround pb-10">
      <NavBar />

      <main className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral6 hover:text-primary mb-6 transition"
        >
          <i className="ri-arrow-left-line"></i>
          Back
        </button>

        {/* Application Context Banner */}
        {applicationContext && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <i className="ri-briefcase-line mr-2"></i>
              Applied to: <span className="font-semibold">{applicationContext.jobTitle}</span>
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
                <h1 className="text-3xl font-bold text-textBlack">{profile.name}</h1>
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
                  <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
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
                    <span className="text-textBlack">{getCountryName(profile.country)}</span>
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
                <p className="text-xs font-semibold text-neutral7 uppercase">Documents</p>
                {applicationContext.mediaUrls.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm"
                  >
                    <i className="ri-file-pdf-line"></i>
                    {url.includes("cv") ? "CV" : url.includes("cover") ? "Cover Letter" : `Document ${idx + 1}`}
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
                    <i className={`ri-${skill.icon}-line text-[20px] text-primary`}></i>
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
                      <h3 className="font-semibold text-textBlack">{work.title}</h3>
                      {work.description && (
                        <p className="text-sm text-neutral7 mt-2">{work.description}</p>
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
            <p className="text-neutral7 leading-relaxed">{profile.objectiveSummary}</p>
          </div>
        )}

        {/* Empty State for minimal profiles */}
        {!profile.education?.length && !profile.workHistory?.length && !skills.length && (
          <div className="bg-bgComponent rounded-xl shadow-sm border border-neutral2 p-8 text-center">
            <i className="ri-file-list-3-line text-4xl text-neutral5"></i>
            <p className="text-neutral6 mt-2">This applicant hasn't added detailed profile information yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
