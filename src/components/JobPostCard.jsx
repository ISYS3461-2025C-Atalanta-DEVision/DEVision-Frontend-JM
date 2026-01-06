import React, { useState, useRef, useEffect } from "react";
import SkillTag from "../components/SkillTag";
import jobPostService from "../services/jobPostService";

export default function JobPostCard({ item, removeItem }) {
  console.log(item.status);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const statusLabel =
    item.status === "PUBLIC"
      ? "Unpublish"
      : item.status === "PRIVATE"
      ? "Publish"
      : item.status || "Unknown";

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

  const handleDelete = async () => {
    setOpen(false);
    try {
      await jobPostService.deleteJobPost(item.jobId);   // ensure deleteJobPost(jobId) is fixed
      removeItem?.(item.jobId);                      // update GridTable state
    } catch (err) {
      console.error("Failed to delete job post", err);
      // optionally show an Alert/toast here
    }
  };

  return (
    <article className="bg-[#F9F7EB] border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full relative">
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
              onClick={() => {
                setOpen(false);
                // publish/unpublish logic here
              }}
              role="menuitem"
            >
              {statusLabel}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-[#002959]/70 hover:text-white"
              type="button"
              onClick={() => {
                setOpen(false);
                // update logic
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

      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold text-blacktxt leading-tight">
          {item.title}
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#98A9BB] text-[#002959] border border-[#002959]/30">
          {item.status}
        </span>
      </div>

      {/* rest of your card unchanged */}
      <p className="text-sm text-neutral6 mt-2">
        {item.location} &nbsp;•&nbsp; {item.employmentType}
      </p>
      <p className="mt-6 text-base text-blacktxt leading-relaxed">
        {item.description}
      </p>
      {item.skills?.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-neutral7 mb-3 uppercase">
            What you will work with
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, idx) => (
              <SkillTag key={idx} skillName={skill} />
            ))}
          </div>
        </section>
      )}
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
    </article>
  );
}