import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../layout/NavBar/NavBar";

import ProfileLayout from "../headless/profile_layout/ProfileLayout";

export default function ApplicantProfilePage() {
  const { applicantId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-backGround pb-10">
      <NavBar />

      <main className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex text-xl items-center gap-2 text-neutral8 hover:text-primary mb-6 transition"
        >
          <i className="ri-arrow-left-line"></i>
          Back
        </button>

        <ProfileLayout applicantId={applicantId} />
      </main>
    </div>
  );
}
