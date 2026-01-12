import { useState, useEffect, useCallback, useRef } from "react";
import notificationService from "../services/notificationService";
import useNotificationStore from "../store/notification.store";

export const useNotification = ({
  pollingInterval = 10000,
  autoStart = false,
} = {}) => {
  const { notification, loading, msg, setNotification, setMSG, setLoading } =
    useNotificationStore();

  const intervalRef = useRef(null);
  const isFetchingRef = useRef(false);

  const lastFetchedAtRef = useRef(null);

  const fetchAllNotifications = async () => {
    const noti = await notificationService.getMyNoti();
    const count = await notificationService.getUnreadCount();

    if (noti.length > 0) {
      lastFetchedAtRef.current = formatSinceParam(noti[0].createdAt);
    }

    setNotification({
      notifications: [...noti],
      ...count,
      newNoti: 0,
    });
  };

  const pollingNotifications = async () => {
    if (!lastFetchedAtRef.current) return;

    const res = await notificationService.pollFromNow(lastFetchedAtRef.current);

    if (res.length > 0) {
      lastFetchedAtRef.current = formatSinceParam(res[0].createdAt);

      setNotification((prev) => ({
        ...prev,
        notifications: [...res, ...prev.notifications],
        unreadCount: prev.unreadCount + res.length,
        newNoti: prev.newNoti + res.length,
      }));
    }
  };

  const fetchNotifications = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      // FIRST LOAD
      if (!lastFetchedAtRef.current) {
        await fetchAllNotifications();
      }
      // POLLING
      else {
        await pollingNotifications();
      }
    } catch (error) {
      console.error(error);
      setMSG({ type: "err", msg: "Something went wrong" });
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  const startPolling = useCallback(() => {
    fetchNotifications();

    if (intervalRef.current) return;

    intervalRef.current = setInterval(fetchNotifications, pollingInterval);
  }, [fetchNotifications, pollingInterval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const markAllAsRead = async () => {
    try {
      await notificationService.markReadAll({ markAll: true });
      setNotification((prev) => ({
        ...prev,
        notifications: prev.notifications.map((noti) => ({
          ...noti,
          isRead: true,
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.log("Failed to mark all notifications as read", error);
      setMSG({ type: "err", msg: "Failed to mark all as read" });
    }
  };

  const markAsRead = async (payload) => {
    try {
      const cleanPayload = {
        notificationIds: [payload],
        markAsRead: true,
        markAll: false,
      };

      await notificationService.markRead(cleanPayload);

      // Update local state without refetching
      setNotification((prev) => ({
        ...prev,
        notifications: prev.notifications.map((noti) =>
          noti.id === payload ? { ...noti, isRead: true } : noti
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
    } catch (error) {
      console.log("Failed to mark notification as read", error);
      setMSG({ type: "err", msg: "Failed to mark as read" });
    }
  };

  const formatSinceParam = (dateString) => {
    const date = new Date(dateString);

    date.setSeconds(date.getSeconds() + 1);

    return date
      .toISOString() // 2026-01-12T05:04:04.157Z
      .replace(".000Z", "") // safety
      .replace(/\.\d{3}Z$/, ""); // remove milliseconds
  };

  useEffect(() => {
    if (autoStart) startPolling();
    return () => stopPolling();
  }, [autoStart, startPolling, stopPolling]);

  return {
    notification,
    loading,
    msg,
    markAllAsRead,
    markAsRead,
    startPolling,
    stopPolling,
  };
};

export default useNotification;
