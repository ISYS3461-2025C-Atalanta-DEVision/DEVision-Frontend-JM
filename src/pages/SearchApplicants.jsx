import React from "react";
import NavBar from "../layout/NavBar/NavBar";
import SearchApplicantForm from "../layout/SearchApplicantForm/SearchApplicantForm";
function SearchApplicants() {
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar />
      <div className="max-w-[90%] h-full mx-auto py-2 mt-2">
        <SearchApplicantForm />
      </div>
    </div>
  );
}

export default SearchApplicants;

