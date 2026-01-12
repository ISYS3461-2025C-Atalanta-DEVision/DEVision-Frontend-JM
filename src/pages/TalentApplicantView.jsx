import React from "react";
import useNotificationStore from "../store/notification.store";
import TalentList from "../headless/talent_list/TalentList";
import NavBar from "../layout/NavBar/NavBar";

export default function TalentApplicantView() {
  const { notification } = useNotificationStore();

  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage={"jobs"} />
      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <TalentList list={notification?.notifications} />
      </main>
    </div>
  );
}
