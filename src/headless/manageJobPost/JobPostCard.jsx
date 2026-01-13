import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SkillTag from "../../components/SkillTag";
import skillStore from "../../store/skill.store";
import applicationService from "../../services/applicationService";
import applicantService from "../../services/applicantService";

// Component to display applicant name (fetches from API)
function ApplicantName({ applicantId }) {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const applicant = await applicantService.getApplicantById(applicantId);
        setName(applicant?.name || applicantId);
      } catch (error) {
        console.error("Failed to fetch applicant:", error);
        setName(applicantId); // Fallback to ID
      } finally {
        setLoading(false);
      }
    };
    fetchName();
  }, [applicantId]);

  if (loading) {
    return <span className="text-neutral6">Loading...</span>;
  }

  return <span>{name}</span>;
}

export default function JobPostCard({
  item,
  onDelete,
  onPublish,
  onUnpublish,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [applications, setApplications] = useState({ pending: [], archived: [] });
  const [loadingApps, setLoadingApps] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Fetch skills on mount to ensure skill names are available
  useEffect(() => {
    skillStore.getState().fetchSkills();
  }, []);

  const isPublic = item.status === "PUBLIC";
  const statusLabel = isPublic ? "Unpublish" : "Publish";

  useEffect(() => {
    function handleClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fetch applications when showApplications is toggled on
  useEffect(() => {
    if (showApplications && item?.jobId) {
      fetchApplications();
    }
  }, [showApplications, item?.jobId]);

  const fetchApplications = async () => {
    if (!item?.jobId) return;
    setLoadingApps(true);
    try {
      const [pending, archived] = await Promise.all([
        applicationService.getApplicationsByJobIdAndStatus(item.jobId, "PENDING"),
        applicationService.getApplicationsByJobIdAndStatus(item.jobId, "ARCHIVED"),
      ]);
      setApplications({ pending, archived });
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleUpdateStatus = async (application, newStatus) => {
    setUpdatingStatus((prev) => ({ ...prev, [application.id]: true }));
    try {
      await applicationService.updateApplicationStatus(
        application.id,
        newStatus,
        application.applicantId,
        item.jobId
      );
      // Refetch applications to update the list
      await fetchApplications();
    } catch (error) {
      console.error("Failed to update application status:", error);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [application.id]: false }));
    }
  };

  if (!item) return null;

  const handleTogglePublish = async () => {
    setOpen(false);
    if (isPublic) {
      await onUnpublish?.(item.jobId);
    } else {
      await onPublish?.(item.jobId);
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    await onDelete?.(item.jobId);
  };

  const currentApplications = activeTab === "pending" ? applications.pending : applications.archived;

  return (
    <article className="bg-[#F9F7EB] border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full relative">
      {/* Ellipsis menu */}
      <div className="absolute top-4 right-4 flex flex-col items-end">
        <button
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open menu"
          className="text-2xl p-1 rounded focus:outline-none focus:ring"
          type="button"
        >
          <span aria-hidden="true">&#x22EE;</span>
        </button>
        {open && (
          <div
            ref={menuRef}
            className="absolute mt-2 right-0 w-36 bg-[#F9F7EB] border rounded shadow z-10"
            role="menu"
            tabIndex={-1}
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-[#002959]/70 hover:text-white"
              type="button"
              onClick={handleTogglePublish}
              role="menuitem"
            >
              {statusLabel}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-[#002959]/70 hover:text-white"
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchParams({ edit: item.jobId });
              }}
              role="menuitem"
            >
              Update
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-[#002959]/70 hover:text-white"
              type="button"
              onClick={handleDelete}
              role="menuitem"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Header: title + status pill + fresher friendly badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-3xl font-semibold text-blacktxt leading-tight">
          {item.title}
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral4 text-[#002959] border border-[#002959]/30">
          {item.status}
        </span>
        {item.isFresherFriendly && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
            <i className="ri-seedling-line mr-1"></i>
            Fresher Friendly
          </span>
        )}
      </div>

      {/* Meta */}
      <p className="text-sm text-neutral6 mt-2">
        {item.location} &nbsp;&bull;&nbsp; {item.employmentType}
      </p>

      {/* Description */}
      <p className="mt-6 text-base text-blacktxt leading-relaxed">
        {item.description}
      </p>

      {/* Skills */}
      {item.skills?.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-neutral7 mb-3 uppercase">
            What you will work with
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skillId, idx) => (
              <SkillTag key={idx} skillId={skillId} />
            ))}
          </div>
        </section>
      )}

      {/* Offer */}
      <section className="mt-8 border-t pt-6">
        <h3 className="text-sm font-semibold text-neutral7 mb-4 uppercase">
          What we offer
        </h3>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <p>
            <span className="font-medium">Salary:</span>{" "}
            {item.salaryDisplay || "Negotiable"}
          </p>
          <p>
            <span className="font-medium">Contract:</span>{" "}
            {item.additionalEmploymentTypes?.length
              ? item.additionalEmploymentTypes.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-medium">Posted:</span>{" "}
            {item.postedDate || "Recently"}
          </p>
          <p>
            <span className="font-medium">Expires:</span> {item.expireDate}
          </p>
        </div>
      </section>

      {/* Applications Section */}
      <section className="mt-8 border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral7 uppercase">
            Applications
          </h3>
          <button
            type="button"
            onClick={() => setShowApplications(!showApplications)}
            className="text-sm text-[#002959] hover:underline flex items-center gap-1"
          >
            {showApplications ? (
              <>
                <i className="ri-arrow-up-s-line"></i>
                Hide
              </>
            ) : (
              <>
                <i className="ri-arrow-down-s-line"></i>
                Show Applications
              </>
            )}
          </button>
        </div>

        {showApplications && (
          <div className="bg-white rounded-lg border p-4">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b">
              <button
                type="button"
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
                  activeTab === "pending"
                    ? "border-[#002959] text-[#002959]"
                    : "border-transparent text-neutral6 hover:text-[#002959]"
                }`}
              >
                Pending ({applications.pending.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("archived")}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
                  activeTab === "archived"
                    ? "border-[#002959] text-[#002959]"
                    : "border-transparent text-neutral6 hover:text-[#002959]"
                }`}
              >
                Archived ({applications.archived.length})
              </button>
            </div>

            {/* Applications List */}
            {loadingApps ? (
              <div className="text-center py-8 text-neutral6">
                <i className="ri-loader-4-line animate-spin text-2xl"></i>
                <p className="mt-2">Loading applications...</p>
              </div>
            ) : currentApplications.length === 0 ? (
              <div className="text-center py-8 text-neutral6">
                <i className="ri-inbox-line text-3xl"></i>
                <p className="mt-2">No {activeTab} applications</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-[#F9F7EB] rounded-lg border"
                  >
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => navigate(`/applicants/${app.applicantId}`, {
                          state: {
                            applicationContext: {
                              jobTitle: item.title,
                              jobId: item.jobId,
                              appliedAt: app.appliedAt,
                              mediaUrls: app.mediaUrls,
                            }
                          }
                        })}
                        className="font-medium text-sm text-[#002959] hover:underline text-left"
                      >
                        <ApplicantName applicantId={app.applicantId} />
                      </button>
                      <p className="text-xs text-neutral6 mt-1">
                        Applied: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                      </p>
                      {/* Media URLs (CV/Cover Letter) */}
                      {app.mediaUrls?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {app.mediaUrls.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#002959] hover:underline flex items-center gap-1"
                            >
                              <i className="ri-file-pdf-line"></i>
                              {url.includes("cv") ? "CV" : url.includes("cover") ? "Cover Letter" : `Document ${idx + 1}`}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Archive/Unarchive button */}
                    <button
                      type="button"
                      disabled={updatingStatus[app.id]}
                      onClick={() => handleUpdateStatus(
                        app,
                        app.status === "PENDING" ? "ARCHIVED" : "PENDING"
                      )}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition flex items-center gap-1 ${
                        app.status === "PENDING"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      } ${updatingStatus[app.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {updatingStatus[app.id] ? (
                        <i className="ri-loader-4-line animate-spin"></i>
                      ) : app.status === "PENDING" ? (
                        <>
                          <i className="ri-archive-line"></i>
                          Archive
                        </>
                      ) : (
                        <>
                          <i className="ri-inbox-unarchive-line"></i>
                          Unarchive
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </article>
  );
}
