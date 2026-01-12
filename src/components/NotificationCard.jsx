import React from "react";
import { formatDateYear } from "../utils/DateTime";

const getNotificationIcon = (type) => {
  const iconMap = {
    ApplicantMatchingAlert: "ri-user-star-line",
    JobApplicationAlert: "ri-briefcase-line",
    MessageAlert: "ri-message-3-line",
    SystemAlert: "ri-notification-3-line",
  };
  return iconMap[type] || "ri-notification-line";
};

const getNotificationColor = (type, isRead) => {
  if (isRead) return "neutral";

  const colorMap = {
    ApplicantMatchingAlert: "green",
    JobApplicationAlert: "blue",
    MessageAlert: "purple",
    SystemAlert: "orange",
  };
  return colorMap[type] || "primary";
};

const parseMatchMessage = (message) => {
  const matchPercentage = message.match(/(\d+)%\s+match/);

  const nameMatch = message.match(/New applicant match:\s+([^m]+)\s+matches/);

  const criteriaMatch = message.match(/matches your "([^"]+)"/);

  return {
    applicantName: nameMatch ? nameMatch[1].trim() : null,
    matchPercentage: matchPercentage ? matchPercentage[1] : null,
    jobCriteria: criteriaMatch ? criteriaMatch[1] : null,
    rawMessage: message,
  };
};

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 60) return "Just now";
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d ago`;

  return formatDateYear(dateString);
};

export default function NotificationCard({
  notification,
  onClick,
  onMarkAsRead,
}) {
  if (!notification) return null;

  const { type, message, isRead, createdAt } = notification;
  const icon = getNotificationIcon(type);
  const color = getNotificationColor(type, isRead);

  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    primary: "bg-primary/10 border-primary/20 text-primary",
    neutral: "bg-white border-neutral3 text-neutral7",
  };

  const iconColorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    primary: "bg-primary/20 text-primary",
    neutral: "bg-neutral2 text-neutral6",
  };

  // Parse the message for special formatting
  let content = null;
  if (type === "ApplicantMatchingAlert") {
    const parsed = parseMatchMessage(message);
    content = (
      <div className="space-y-2">
        {parsed.applicantName && (
          <p className="font-semibold text-blacktxt text-base">
            {parsed.applicantName}
          </p>
        )}
        {parsed.jobCriteria && (
          <p className="text-sm text-neutral7">
            Matches your{" "}
            <span className="font-medium">"{parsed.jobCriteria}"</span> criteria
          </p>
        )}
        {parsed.matchPercentage && (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
            <i className="ri-star-fill mr-1"></i>
            {parsed.matchPercentage}% Match
          </div>
        )}
      </div>
    );
  } else {
    content = (
      <p className="text-sm text-neutral7 leading-relaxed">{message}</p>
    );
  }

  return (
    <article
      className={`relative border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
        colorClasses[color]
      } ${isRead ? "opacity-75" : ""}`}
      onClick={() => {
        onMarkAsRead?.(notification.id);
        onClick?.(notification);
      }}
    >
      {/* Unread indicator dot */}
      {!isRead && (
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
      )}

      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColorClasses[color]}`}
        >
          <i className={`${icon} text-xl`}></i>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {content}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-current/10">
            <span className="text-xs text-neutral6 font-medium">
              {getTimeAgo(createdAt)}
            </span>

            {!isRead && (
              <button
                className="text-xs text-primary hover:text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead?.(notification.id);
                }}
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
