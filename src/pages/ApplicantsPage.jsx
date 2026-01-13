import { useState, useCallback, useEffect, useRef } from "react";
import NavBar from "../layout/NavBar/NavBar";
import { applicantService } from "../services/applicantService";
import { countryService } from "../services/countryService";
import { useNavigate } from "react-router-dom";
import ApplicantCard from "../components/ApplicantCard";
import ApplicantList from "../headless/applicant_list/ApplicantList";

export default function ApplicantsPage() {
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage="applicants" />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ApplicantList />
      </main>
    </div>
  );
}
