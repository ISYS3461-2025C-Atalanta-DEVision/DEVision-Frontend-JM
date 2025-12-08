import React from "react";
import Button from "../../components/Button";


export default function NavBar({ username, handleLogout }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">DEVision</h1>
            <span className="ml-2 text-sm text-neutral6">Job Manager</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {username}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
