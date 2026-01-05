import React from "react";
import ImageHolder from "../components/ImageHolder";
import Button from "../components/Button";
import SkillTag from "../components/SkillTag";
import { useState, useRef, useEffect } from "react";

export default function JobPostCard({ item }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown on click outside
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

  return (
    <article className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full relative">
      {/* Headless ellipsis menu */}
      <div className="absolute top-4 right-4 flex flex-col items-end">
        <button
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open menu"
          className="text-2xl p-1 rounded focus:outline-none focus:ring"
          type="button"
        >
          {/* Headless ellipsis as plain text */}
          <span aria-hidden="true">⋮</span>
        </button>
        {open && (
          <div
            ref={menuRef}
            className="absolute mt-2 right-0 w-36 bg-white border rounded shadow z-10"
            role="menu"
            tabIndex={-1}
          >
            {/* This dropdown is fully headless—customise options/actions below */}
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
              type="button"
              onClick={() => {
                setOpen(false);
                // Add Edit logic here
              }}
              role="menuitem"
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
              type="button"
              onClick={() => {
                setOpen(false);
                // Add Delete logic here
              }}
              role="menuitem"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* The rest of your card... */}
      <h1 className="text-3xl font-semibold text-blacktxt leading-tight">
        {item.title}
      </h1>
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