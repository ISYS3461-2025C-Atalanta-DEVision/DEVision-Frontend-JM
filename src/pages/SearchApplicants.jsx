import React from "react";
import NavBar from "../layout/NavBar/NavBar";
import Graphs from "../headless/react_chartjs/Graphs";
import SearchApplicantForm from "../layout/SearchApplicantForm/SearchApplicantForm";
function SearchApplicants() {
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar />
      <main className="max-w-[90%] mx-auto py-2 mt-2">
        <div className="flex gap-6 px-6">
          <SearchApplicantForm />
          <Graphs />
        </div>
      </main>
    </div>
  );I
}

export default SearchApplicants;
