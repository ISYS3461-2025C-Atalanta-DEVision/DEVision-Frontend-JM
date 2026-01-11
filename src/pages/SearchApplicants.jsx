import React from "react";
import NavBar from "../layout/NavBar/NavBar";
import SearchApplicantView from "../layout/SearchApplicantForm/SearchApplicantView";
function SearchApplicants() {
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar />
      <div className="max-w-[90%] h-full mx-auto py-2 mt-2">
        <SearchApplicantView />
      </div>
    </div>
  );
}

export default SearchApplicants;

