import { React, useState, useRef, useEffect } from "react";

import Button from "../../components/Button";
import { useNavbar } from "./useNavBar";
import SkillTag from "../../components/SkillTag";
import { useNavigate } from "react-router-dom";

import useProfileStore from "../../store/profile.store";
import NotificationList from "../../headless/notification_list/NotificationList";

export default function NavBar({ activepage }) {
  const { profile } = useProfileStore();

  const navigate = useNavigate();

  const {
    handleLogout,
    isActive,
    handleNavigate,
    loading,
    notification,
    markAsRead,
    markAllAsRead,
    isNotificationOpen,
    notificationRef,
    toggleNotificationDropdown,
  } = useNavbar(activepage);

  return (
    <nav className="sticky top-0 z-50 bg-bgComponent shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">DEVision</h1>
            <span className="ml-2 text-sm text-neutral6">Job Manager</span>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-12 text-xl font-medium text-neutral8">
            {/* Dashboard */}
            <a
              className={`cursor-pointer transition-colors 
              ${
                isActive("dashboard")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
              onClick={() => handleNavigate("/dashboard")}
            >
              Dashboard
            </a>

            {/* Jobs */}
            <a
              className={`cursor-pointer transition-colors 
              ${
                isActive("jobs")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
              onClick={() => handleNavigate("/jobpost")}
            >
              Recruitment
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-neutral7">Loading...</span>
            ) : (
              <span className="text-neutral7">{profile?.companyName}</span>
            )}

            <div className="relative" ref={notificationRef}>
              <Button
                variant="primary"
                size="sm"
                className="relative"
                onClick={toggleNotificationDropdown}
              >
                <i className="ri-notification-line text-lg" />
                {notification?.unreadCount != null && (
                  <span className="absolute -bottom-1 -right-1 min-w-[18px] h-4 px-1.5 text-xs flex items-center justify-center rounded-full bg-neutral8 text-white font-semibold">
                    {notification.unreadCount > 99
                      ? "99+"
                      : notification.unreadCount}
                  </span>
                )}

                {notification?.newNoti > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1.5 text-xs flex items-center justify-center rounded-full bg-red-500 text-white font-semibold">
                    {notification.newNoti > 99 ? "99+" : notification.newNoti}
                  </span>
                )}
              </Button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-neutral3 max-h-[500px] overflow-y-auto z-50">
                  <div className="p-4 border-b border-neutral3 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {notification?.unreadCount > 0 && (
                      <button
                        className="text-sm text-primary hover:underline"
                        onClick={() => markAllAsRead()}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  {notification?.notifications?.length > 0 ? (
                    <div className="p-4">
                      <NotificationList
                        notification={notification}
                        handleMarkAsRead={markAsRead}
                        handleNotificationClick={() =>
                          navigate("/dashboard/search_applicants")
                        }
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center text-neutral6">
                      No notifications
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <i className="ri-login-box-fill text-lg"></i>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
