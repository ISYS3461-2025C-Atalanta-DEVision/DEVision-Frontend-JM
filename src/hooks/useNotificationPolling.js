import { useEffect, useRef, useCallback } from "react";
import useNotificationStore from "../store/notification.store";
import notificationService from "../services/notificationService";

const DEFAULT_POLL_INTERVAL = 15000; // 15 seconds as per backend docs

/**
 * Format date for backend LocalDateTime (no milliseconds, no Z suffix)
 * Backend expects: 2024-01-07T10:30:00
 */
const formatDateForBackend = (date) => {
  return date.toISOString().split(".")[0];
};

/**
 * Hook for notification polling mechanism
 *
 * Features:
 * - Configurable polling interval
 * - Visibility API integration (pause when tab hidden)
 * - Immediate refresh on tab focus
 * - Error handling with exponential backoff
 * - Cleanup on unmount
 * - Deduplication of concurrent requests
 *
 * @param {Object} options
 * @param {number} options.interval - Polling interval in ms (default: 15000)
 * @param {boolean} options.enabled - Whether polling is enabled (default: true)
 * @param {boolean} options.pauseOnHidden - Pause when tab is hidden (default: true)
 * @param {function} options.onNewNotifications - Callback when new notifications arrive
 */
export const useNotificationPolling = ({
  interval = DEFAULT_POLL_INTERVAL,
  enabled = true,
  pauseOnHidden = true,
  onNewNotifications,
} = {}) => {
  const {
    setUnreadCount,
    setNotifications,
    addNotifications,
    setLoading,
    setError,
    setLastPolledAt,
    setIsPolling,
    lastPolledAt,
  } = useNotificationStore();

  const pollingRef = useRef(null);
  const isPollingRef = useRef(false);
  const errorCountRef = useRef(0);
  const maxBackoffInterval = 60000; // Max 1 minute between polls on errors

  /**
   * Fetch unread count (lightweight, for badge)
   */
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.count);
      errorCountRef.current = 0;
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
      errorCountRef.current += 1;
      setError(error.message);
    }
  }, [setUnreadCount, setError]);

  /**
   * Fetch all notifications (heavier, for dropdown)
   */
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const notifications = await notificationService.getNotifications();
      setNotifications(notifications);
      setError(null);
      errorCountRef.current = 0;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [setNotifications, setLoading, setError]);

  /**
   * Poll for new notifications since last poll
   */
  const pollForNew = useCallback(async () => {
    if (!lastPolledAt) {
      // First poll - fetch all
      await fetchNotifications();
      await fetchUnreadCount();
      setLastPolledAt(formatDateForBackend(new Date()));
      return;
    }

    try {
      const newNotifications = await notificationService.pollNotifications(
        lastPolledAt
      );

      if (newNotifications && newNotifications.length > 0) {
        addNotifications(newNotifications);
        onNewNotifications?.(newNotifications);
      }

      await fetchUnreadCount();
      setLastPolledAt(formatDateForBackend(new Date()));
      errorCountRef.current = 0;
    } catch (error) {
      console.error("Failed to poll notifications:", error);
      errorCountRef.current += 1;
      setError(error.message);
    }
  }, [
    lastPolledAt,
    fetchNotifications,
    fetchUnreadCount,
    addNotifications,
    setLastPolledAt,
    setError,
    onNewNotifications,
  ]);

  /**
   * Main polling function with deduplication
   */
  const poll = useCallback(async () => {
    if (isPollingRef.current) return;

    isPollingRef.current = true;
    setIsPolling(true);

    await pollForNew();

    isPollingRef.current = false;
    setIsPolling(false);
  }, [pollForNew, setIsPolling]);

  /**
   * Calculate next interval with exponential backoff on errors
   */
  const getNextInterval = useCallback(() => {
    if (errorCountRef.current === 0) return interval;

    const backoff = Math.min(
      interval * Math.pow(2, errorCountRef.current),
      maxBackoffInterval
    );
    return backoff;
  }, [interval]);

  /**
   * Start polling
   */
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;

    // Initial poll
    poll();

    // Set up interval
    pollingRef.current = setInterval(() => {
      poll();
    }, getNextInterval());
  }, [poll, getNextInterval]);

  /**
   * Stop polling
   */
  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  /**
   * Manual refresh
   */
  const refresh = useCallback(async () => {
    await fetchNotifications();
    await fetchUnreadCount();
    setLastPolledAt(new Date().toISOString());
  }, [fetchNotifications, fetchUnreadCount, setLastPolledAt]);

  // Visibility change handler
  useEffect(() => {
    if (!pauseOnHidden) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        // Immediate poll on visibility restore
        poll();
        startPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauseOnHidden, stopPolling, startPolling, poll]);

  // Main polling effect
  useEffect(() => {
    if (enabled && !document.hidden) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, startPolling, stopPolling]);

  // Restart polling when interval changes due to backoff
  useEffect(() => {
    if (enabled && pollingRef.current) {
      stopPolling();
      startPolling();
    }
  }, [errorCountRef.current]);

  return {
    poll,
    refresh,
    startPolling,
    stopPolling,
    fetchNotifications,
    fetchUnreadCount,
  };
};

export default useNotificationPolling;
