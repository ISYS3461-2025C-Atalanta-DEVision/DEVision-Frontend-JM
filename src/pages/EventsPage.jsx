// src/pages/EventPage.jsx
import React from "react";
import PostList from "../headless/post_list/PostList";
import eventService from "../services/eventService";
import EventCard from "../components/EventCard";
import NavBar from "../layout/NavBar/NavBar";
import useProfileStore from "../store/profile.store";
import CompanyCard from "../components/CompanyCard";
import CreateEventForm from "../layout/CreateEventForm/CreateEventForm";
import GridTable from "../headless/grid_table/GridTable";

export default function EventPage() {
  const { profile, loading, error } = useProfileStore();

  console.log("Profile in EventsPage:", profile);

  return (
    <div className="min-h-screen bg-backGround pb-5">
      <NavBar activepage={"event"} />
      <main className="w-full flex justify-center pt-5">
        <div className="w-full max-w-[80%] flex gap-6 px-6">
          {/* LEFT SIDEBAR (same pattern as JobPostPage) */}
          {loading ? (
            <div>Loading profile...</div>
          ) : (
            <>
              <aside className="w-[320px] shrink-0">
                <div className="sticky top-20">
                  <CompanyCard items={profile} />
                </div>
              </aside>

              {/* MAIN EVENTS LIST */}
              <section className="flex-1">
                <CreateEventForm />
                <GridTable
                  CardComponent={EventCard}
                  fetchItemAPI={eventService.getEventList}
                  className="gap-6 mt-6"
                />
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
