import { useCallback } from "react";
import useNotificationStore from "../../store/notification.store";
import useNotificationPolling from "../../hooks/useNotificationPolling";
import notificationService from "../../services/notificationService";

/**
 * Component-level hook for notification functionality
 *
 * Provides:
 * - Notification state from store
 * - Polling initialization
 * - Mark as read actions
 * - Dropdown toggle
 */
export const useNotification = (options = {}) => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    isDropdownOpen,
    markNotificationRead,
    markAllRead,
    toggleDropdown,
    setIsDropdownOpen,
  } = useNotificationStore();

  // Initialize polling
  const { refresh, fetchNotifications, fetchUnreadCount } =
    useNotificationPolling({
      interval: options.pollInterval || 15000,
      enabled: options.enabled !== false,
      onNewNotifications: options.onNewNotifications,
    });

  /**
   * Mark a single notification as read
   */
  const handleMarkAsRead = useCallback(
    async (notificationId) => {
      try {
        await notificationService.markAsRead([notificationId]);
        markNotificationRead(notificationId);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    },
    [markNotificationRead]
  );

  /**
   * Mark all notifications as read
   */
  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      markAllRead();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  }, [markAllRead]);

  /**
   * Open dropdown and fetch fresh notifications
   */
  const openDropdown = useCallback(async () => {
    setIsDropdownOpen(true);
    await fetchNotifications();
  }, [setIsDropdownOpen, fetchNotifications]);

  /**
   * Close dropdown
   */
  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, [setIsDropdownOpen]);

  return {
    // State
    notifications,
    unreadCount,
    loading,
    error,
    isDropdownOpen,

    // Actions
    refresh,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    fetchNotifications,
    fetchUnreadCount,
  };
};

export default useNotification;
