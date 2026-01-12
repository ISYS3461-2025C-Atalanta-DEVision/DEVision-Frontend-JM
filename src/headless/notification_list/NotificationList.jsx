import React from "react";
import useNotification from "../../hooks/useNotification";
import NotificationCard from "../../components/NotificationCard";

export default function NotificationList({
  notification,
  handleMarkAsRead,
  handleNotificationClick,
}) {
  return (
    <div className="space-y-3">
      {notification.notifications?.map((notif) => (
        <NotificationCard
          key={notif.id}
          notification={notif}
          onClick={handleNotificationClick}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
    </div>
  );
}
