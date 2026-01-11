/**
 * Notification Service URL Configuration
 *
 * Endpoints for notification polling mechanism.
 * User identification is passed via X-User-Id and X-Principal-Type headers
 * by the API Gateway after JWT validation.
 */

const NOTIFICATION_SERVICE_BASE = "/notification-service/api/notifications";

// GET - Get all notifications (paginated)
// Query params: page, size
export const GET_NOTIFICATIONS_URL = NOTIFICATION_SERVICE_BASE;

// GET - Get unread notifications only
export const GET_UNREAD_NOTIFICATIONS_URL = `${NOTIFICATION_SERVICE_BASE}/unread`;

// GET - Get unread count (for badge)
export const GET_UNREAD_COUNT_URL = `${NOTIFICATION_SERVICE_BASE}/count`;

// GET - Poll for new notifications since timestamp
// Query param: since (ISO datetime)
export const POLL_NOTIFICATIONS_URL = `${NOTIFICATION_SERVICE_BASE}/poll`;

// POST - Mark notification(s) as read
// Body: { notificationIds: ["id1", "id2"] } or { markAll: true }
export const MARK_AS_READ_URL = `${NOTIFICATION_SERVICE_BASE}/read`;

// POST - Mark all notifications as read
export const MARK_ALL_AS_READ_URL = `${NOTIFICATION_SERVICE_BASE}/read-all`;
