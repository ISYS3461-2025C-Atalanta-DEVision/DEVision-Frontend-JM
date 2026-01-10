// src/pages/EventPage.jsx
import React from "react";
import PostList from "../headless/post_list/PostList";
import eventService from "../services/eventService";
import EventCard from "../components/EventCard";
import NavBar from "../layout/NavBar/NavBar";
import useProfileStore from "../store/profile.store";
import CompanyCard from "../components/CompanyCard";
import CreateEventForm from "../layout/CreateEventForm/CreateEventForm";

export default function EventPage() {
  const { profile, loading, error } = useProfileStore();

  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage={"event"} />
      <main className="w-full flex justify-center pt-5">
        <div className="w-full max-w-7xl flex gap-6 px-6">
          {/* LEFT SIDEBAR (same pattern as JobPostPage) */}
          {loading ? (
            <div>Loading profile...</div>
          ) : (
            <aside className="w-[320px] shrink-0">
              <div className="sticky top-20">
                <CompanyCard items={profile} />
              </div>
            </aside>
          )}

          {/* MAIN EVENTS LIST */}
          <section className="flex-1">
            <PostList
              PostCardComponent={EventCard}
              fetchPostAPI={eventService.getEventList}
              className="flex flex-col gap-6 mt-5"
              CreatePostComponent={CreateEventForm}
            />
          </section>
        </div>
      </main>
    </div>
  );
}