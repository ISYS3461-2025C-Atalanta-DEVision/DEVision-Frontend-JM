//  Endpoints:
//  * - GET  /api/notifications           - Get all notifications (paginated)
//  * - GET  /api/notifications/unread    - Get unread notifications
//  * - GET  /api/notifications/count     - Get unread count (for badge)
//  * - GET  /api/notifications/poll      - Poll for new notifications since timestamp
//  * - POST /api/notifications/read      - Mark notification(s) as read
//  * - POST /api/notifications/read-all  - Mark all as read
//  *

const NOTIFCATION_BASE_URL = "/notification-service/api/notifications";

export const GET_ALL = `${NOTIFCATION_BASE_URL}`;
export const GET_UNREAD = `${NOTIFCATION_BASE_URL}/unread`;
export const GET_UNREAD_COUNT = `${NOTIFCATION_BASE_URL}/count`;
export const POLLING = `${NOTIFCATION_BASE_URL}/poll`;
export const MARK_READ = `${NOTIFCATION_BASE_URL}/read`;
export const READ_ALL = `${NOTIFCATION_BASE_URL}/read-all`;


