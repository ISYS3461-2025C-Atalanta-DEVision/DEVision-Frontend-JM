import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SkillTag from "../../components/SkillTag";
import skillStore from "../../store/skill.store";

export default function JobPostCard({
  item,
  onDelete,
  onPublish,
  onUnpublish,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

  if (!item) return null;

  const handleTogglePublish = async () => {
    setOpen(false);
    if (isPublic) {
      await onUnpublish?.(item.jobId);
    } else {
      await onPublish?.(item.jobId);
    }
  };

  const handleDelete = () => {
    setOpen(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    await onDelete?.(item.jobId);
  };

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
          <span aria-hidden="true">⋮</span>
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
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#98A9BB] text-[#002959] border border-[#002959]/30">
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
        {item.location} &nbsp;•&nbsp; {item.employmentType}
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#F9F7EB] rounded-xl p-6 shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-delete-bin-line text-red-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-black-900">
                Delete Job Post
              </h3>
            </div>
            <p className="text-black-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">"{item.title}"</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-black-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}