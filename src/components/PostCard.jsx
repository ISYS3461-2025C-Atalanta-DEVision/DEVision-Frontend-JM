// import React from "react";
// import ImageHolder from "../components/ImageHolder";
// import Button from "../components/Button";
// import SkillTag from "../components/SkillTag";

// export default function PostCard({ item }) {
//   if (!item) return null;

//   return (
//     <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
//       {/* Company + Job Header */}
//       <div>
//         {/* Company Name (Primary Visual Anchor) */}
//         <div className="flex items-center gap-1">
//           <h2 className="text-sm font-semibold text-primary2 uppercase tracking-wide">
//             Devision
//           </h2>
//           <span className="text-xs py-0.5 bg-primary2/10 text-primary2 rounded-full">
//             Verified Company
//           </span>
//         </div>

//         {/* Job Title */}
//         <h3 className="text-2xl font-semibold text-blacktxt mt-2 leading-tight">
//           {item.title}
//         </h3>

//         {/* Location + Employment */}
//         <p className="text-sm text-neutral7 mt-1">
//           {item.location} &nbsp;•&nbsp; {item.employmentType}
//         </p>
//       </div>

//       {/* Description */}
//       <p className="mt-4 text-sm text-blacktxt leading-relaxed line-clamp-3">
//         {item.description}
//       </p>

//       {/* Skills */}
//       {item.skills?.length > 0 && (
//         <div className="mt-4">
//           <p className="text-sm font-medium text-neutral7 mb-2">
//             Required Skills
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {item.skills.map((skill, idx) => (
//               <SkillTag key={idx} skillName={skill} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Divider */}
//       <hr className="my-5 border-neutral7" />

//       {/* Job Meta Info */}
//       <div className="grid grid-cols-2 gap-y-2 text-sm text-blacktxt">
//         <p>
//           <span className="font-medium">Salary:</span>{" "}
//           {item.salaryDisplay || "Negotiable"}
//         </p>

//         <p>
//           <span className="font-medium">Contract:</span>{" "}
//           {item.additionalEmploymentTypes?.length > 0
//             ? item.additionalEmploymentTypes.join(", ")
//             : "N/A"}
//         </p>

//         <p>
//           <span className="font-medium">Posted:</span> {item.postedDate}
//         </p>

//         {item.expireDate && (
//           <p>
//             <span className="font-medium">Expires:</span> {item.expireDate}
//           </p>
//         )}
//       </div>

//       <div className="mt-4 flex gap-3 overflow-x-auto">
//         <ImageHolder
//           src={
//             "https://i.pinimg.com/736x/3e/2b/8d/3e2b8da38a188f336338709aa95e2c50.jpg"
//           }
//           alt={item.title}
//           className="w-24 h-24 rounded-md object-cover border"
//         />
//       </div>

//       {/* Media Previews */}
//       {/* {item.mediaURL?.length > 0 && (
//         <div className="mt-4 flex gap-3 overflow-x-auto">
//           {item.mediaURL.map((url, idx) => (
//             <ImageHolder
//               key={idx}
//               src={url}
//               alt={item.title}
//               className="w-24 h-24 rounded-md object-cover border"
//             />
//           ))}
//         </div>
//       )} */}

//       {/* Footer CTA */}
//       <div className="mt- flex justify-end">
//         <Button variant="primary" size="md">
//           View Job Details →
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import ImageHolder from "../components/ImageHolder";
import Button from "../components/Button";
import SkillTag from "../components/SkillTag";
import skillStore from "../store/skill.store";

export default function PostCard({ item }) {
  // Fetch skills on mount to ensure skill names are available
  useEffect(() => {
    skillStore.getState().fetchSkills();
  }, []);

  if (!item) return null;

  return (
    <article className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full">
      {/* Company */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-primary2 uppercase tracking-wide">
          {item.companyName}
        </span>
        <span className="text-xs px-2 py-0.5 bg-primary2/10 text-primary2 rounded-full">
          Verified Company
        </span>
      </div>

      {/* Role + Fresher Friendly badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-3xl font-semibold text-blacktxt leading-tight">
          {item.title}
        </h1>
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

      {/* Pitch */}
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

      {/* Image (Employer branding)
      <section className="mt-8">
        <ImageHolder
          src="https://i.pinimg.com/736x/3e/2b/8d/3e2b8da38a188f336338709aa95e2c50.jpg"
          alt="Company workplace"
          className="w-full full rounded-lg object-cover border"
        />
      </section> */}

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg">
          View Job Details →
        </Button>
      </div>
    </article>
  );
}
