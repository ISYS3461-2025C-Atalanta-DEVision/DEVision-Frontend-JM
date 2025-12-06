import React from "react";

export default function NavBar({company_name}) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="text-lg font-bold">Logo</div>

      <div className="text-base font-semibold">This is NavBar</div>

      <div className="flex items-center gap-4">
        
        <div className="text-lg font-bold">Hello, {company_name}</div>

        <button
          type="button"
          className="w-9 h-9 rounded-full overflow-hidden border border-gray-300"
        >
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>

        <button type="button" aria-label="Notifications" className="text-xl">
          🔔
        </button>

        <button type="button" aria-label="Settings" className="text-xl">
          ⚙️
        </button>
      </div>
    </header>
  );
}