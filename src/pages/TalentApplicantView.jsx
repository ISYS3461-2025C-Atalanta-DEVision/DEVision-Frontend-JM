import React from "react";
import useNotificationStore from "../store/notification.store";
import TalentList from "../headless/talent_list/TalentList";
import NavBar from "../layout/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function TalentApplicantView() {
  const { notification } = useNotificationStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6">
        <button
          onClick={() => navigate("/dashboard/search_applicants")}
          className="flex text-xl items-center gap-2 text-neutral8 hover:text-primary mb-6 transition"
        >
          <i className="ri-arrow-left-line"></i>
          Back
        </button>
        <TalentList list={notification?.notifications} />
      </main>
    </div>
  );
}
