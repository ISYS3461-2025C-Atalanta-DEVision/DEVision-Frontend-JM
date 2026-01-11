# Notification System - Full Stack Integration Guide

## Overview

The DEVision Job Manager notification system provides real-time notifications to users through a polling-based mechanism. This document covers the complete integration between the frontend (React) and backend (Spring Boot) microservice.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐     ┌─────────────────────┐     ┌──────────────────┐  │
│  │  NotificationBell │────▶│   useNotification   │────▶│ notification.store│ │
│  │    (UI Component) │     │   (Component Hook)  │     │    (Zustand)      │ │
│  └──────────────────┘     └─────────────────────┘     └──────────────────┘  │
│                                     │                                        │
│                                     ▼                                        │
│                          ┌─────────────────────┐                            │
│                          │useNotificationPolling│                            │
│                          │   (Polling Hook)     │                            │
│                          └─────────────────────┘                            │
│                                     │                                        │
│                                     ▼                                        │
│                          ┌─────────────────────┐                            │
│                          │ notificationService  │                            │
│                          │   (API Service)      │                            │
│                          └─────────────────────┘                            │
│                                     │                                        │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │ HTTP/REST
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY                                     │
│                    (JWT Validation + Header Injection)                       │
│                                                                              │
│                     X-User-Id: <extracted from JWT>                         │
│                     X-Principal-Type: COMPANY | APPLICANT                   │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Spring Boot)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐     ┌─────────────────────┐     ┌──────────────┐  │
│  │NotificationController│────▶│NotificationPublicApi│────▶│  Database    │  │
│  │   (REST Endpoints)   │     │     (Service)       │     │  (MongoDB)   │  │
│  └──────────────────────┘     └─────────────────────┘     └──────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### Base URL
```
/notification-service/api/notifications
```

### Endpoints Reference

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/` | Get all notifications (paginated) | `page`, `size` |
| GET | `/unread` | Get unread notifications only | - |
| GET | `/count` | Get unread count (for badge) | - |
| GET | `/poll` | Poll for new notifications | `since` (ISO datetime) |
| POST | `/read` | Mark notification(s) as read | - |
| POST | `/read-all` | Mark all as read | - |

### Required Headers

All endpoints require these headers (injected by API Gateway after JWT validation):

| Header | Description | Example |
|--------|-------------|---------|
| `X-User-Id` | User's unique identifier | `uuid-string` |
| `X-Principal-Type` | Type of user | `COMPANY` or `APPLICANT` |

---

## Frontend File Structure

```
src/
├── service_url/
│   └── NotificationUrlConfig.js    # API endpoint URL constants
│
├── services/
│   └── notificationService.js      # API call functions
│
├── store/
│   └── notification.store.js       # Zustand state management
│
├── hooks/
│   └── useNotificationPolling.js   # Polling mechanism logic
│
└── headless/notification/
    ├── useNotification.js          # Component-level hook
    └── notificationBell.jsx        # UI component
```

---

## Component Documentation

### 1. NotificationUrlConfig.js

**Purpose:** Centralized URL configuration for notification endpoints.

```javascript
// Usage
import { GET_UNREAD_COUNT_URL } from "../service_url/NotificationUrlConfig";
```

**Exports:**
- `GET_NOTIFICATIONS_URL` - Paginated notifications list
- `GET_UNREAD_NOTIFICATIONS_URL` - Unread notifications only
- `GET_UNREAD_COUNT_URL` - Badge count (lightweight)
- `POLL_NOTIFICATIONS_URL` - Poll since timestamp
- `MARK_AS_READ_URL` - Mark specific IDs as read
- `MARK_ALL_AS_READ_URL` - Mark all as read

---

### 2. notificationService.js

**Purpose:** Service layer encapsulating all API calls.

```javascript
import notificationService from "../services/notificationService";

// Get paginated notifications
const notifications = await notificationService.getNotifications(0, 20);

// Get unread count
const { count } = await notificationService.getUnreadCount();

// Poll for new since timestamp
const newItems = await notificationService.pollNotifications("2024-01-07T10:30:00");

// Mark as read
await notificationService.markAsRead(["id1", "id2"]);

// Mark all as read
await notificationService.markAllAsRead();
```

---

### 3. notification.store.js (Zustand)

**Purpose:** Global state management for notifications.

**State Shape:**
```javascript
{
  notifications: [],        // Array of notification objects
  unreadCount: 0,          // Number for badge display
  loading: false,          // Loading state
  error: null,             // Error message if any
  lastPolledAt: null,      // ISO timestamp of last poll
  isPolling: false,        // Currently polling flag
  isDropdownOpen: false,   // Dropdown visibility
}
```

**Actions:**
| Action | Description |
|--------|-------------|
| `setNotifications(items)` | Replace all notifications |
| `addNotifications(items)` | Prepend new notifications (deduped) |
| `setUnreadCount(count)` | Update badge count |
| `markNotificationRead(id)` | Mark single as read (local) |
| `markAllRead()` | Mark all as read (local) |
| `toggleDropdown()` | Toggle dropdown visibility |
| `reset()` | Reset to initial state |

---

### 4. useNotificationPolling.js

**Purpose:** Core polling mechanism with smart optimizations.

**Features:**
| Feature | Description |
|---------|-------------|
| Interval Polling | Default 15 seconds (configurable) |
| Visibility API | Pauses polling when tab is hidden |
| Focus Refresh | Immediate poll when tab regains focus |
| Exponential Backoff | Increases interval on errors (max 60s) |
| Request Deduplication | Prevents concurrent API calls |
| Cleanup | Proper cleanup on unmount |

**Usage:**
```javascript
const { poll, refresh, startPolling, stopPolling } = useNotificationPolling({
  interval: 15000,        // Poll every 15 seconds
  enabled: true,          // Enable/disable polling
  pauseOnHidden: true,    // Pause when tab hidden
  onNewNotifications: (items) => {
    // Callback when new notifications arrive
    console.log("New notifications:", items);
  },
});
```

**Polling Flow:**
```
1. Component mounts
        │
        ▼
2. Initial poll (fetch all + count)
        │
        ▼
3. Start interval timer (15s)
        │
        ▼
4. On each tick:
   ├── If tab hidden → skip
   ├── If already polling → skip (dedupe)
   └── Otherwise → poll for new since lastPolledAt
        │
        ▼
5. On error:
   └── Apply exponential backoff (15s → 30s → 60s max)
        │
        ▼
6. On tab visibility change:
   ├── Hidden → stop polling
   └── Visible → immediate poll + restart timer
        │
        ▼
7. Component unmounts → cleanup timer
```

---

### 5. useNotification.js

**Purpose:** Component-level hook combining store and polling.

**Usage:**
```javascript
const {
  // State
  notifications,
  unreadCount,
  loading,
  error,
  isDropdownOpen,

  // Actions
  refresh,
  markAsRead,
  markAllAsRead,
  toggleDropdown,
  openDropdown,
  closeDropdown,
} = useNotification({
  pollInterval: 15000,
  enabled: true,
  onNewNotifications: (items) => { /* optional callback */ },
});
```

---

### 6. notificationBell.jsx

**Purpose:** UI component with bell icon, badge, and dropdown.

**Features:**
- Bell icon with unread count badge
- Ping animation on badge
- Dropdown panel with notification list
- "Mark all read" action
- Click-to-dismiss individual notifications
- Relative time display (Just now, 5m ago, etc.)
- Loading and empty states
- Click-outside-to-close behavior

**Component Structure:**
```jsx
<NotificationBell>
  ├── <button> (Bell with badge)
  │     ├── <svg> (Bell icon)
  │     └── <div> (Badge with count + ping animation)
  │
  └── <div> (Dropdown - conditional)
        ├── <header> (Title + Mark all read)
        ├── <div> (Scrollable notification list)
        │     └── <div> (Notification item) × n
        └── <footer> (View all link)
</NotificationBell>
```

---

## Backend API Contract

### Notification Object Schema

```json
{
  "id": "uuid-string",
  "type": "NEW_APPLICANT | JOB_MATCH | SYSTEM",
  "title": "Notification title",
  "message": "Notification body message",
  "read": false,
  "createdAt": "2024-01-07T10:30:00Z",
  "metadata": {
    "jobPostId": "optional-uuid",
    "applicantId": "optional-uuid"
  }
}
```

### Response Examples

**GET /count**
```json
{
  "count": 5
}
```

**GET / (paginated)**
```json
[
  {
    "id": "abc-123",
    "type": "NEW_APPLICANT",
    "title": "New applicant for Senior Developer",
    "message": "John Doe applied to your job post",
    "read": false,
    "createdAt": "2024-01-07T10:30:00Z",
    "metadata": {
      "jobPostId": "job-456",
      "applicantId": "applicant-789"
    }
  }
]
```

**POST /read (Request Body)**
```json
{
  "notificationIds": ["abc-123", "def-456"]
}
```

---

## Integration Checklist

### Frontend Setup
- [x] NotificationUrlConfig.js created
- [x] notificationService.js created
- [x] notification.store.js created
- [x] useNotificationPolling.js created
- [x] useNotification.js created
- [x] notificationBell.jsx enhanced
- [x] NavBar.jsx imports NotificationBell

### Backend Requirements
- [x] GET /api/notifications (paginated)
- [x] GET /api/notifications/unread
- [x] GET /api/notifications/count
- [x] GET /api/notifications/poll?since=
- [x] POST /api/notifications/read
- [x] POST /api/notifications/read-all
- [ ] API Gateway routes /notification-service/** to service

### API Gateway Configuration
```yaml
# Example Spring Cloud Gateway route
spring:
  cloud:
    gateway:
      routes:
        - id: notification-service
          uri: lb://notification-service
          predicates:
            - Path=/notification-service/**
          filters:
            - StripPrefix=1
            - AddRequestHeader=X-User-Id, {userId}
            - AddRequestHeader=X-Principal-Type, {principalType}
```

---

## Sequence Diagrams

### Initial Load
```
User           NotificationBell    useNotification    API Gateway    Backend
 │                   │                   │                 │            │
 │  Open App         │                   │                 │            │
 │──────────────────▶│                   │                 │            │
 │                   │  Initialize       │                 │            │
 │                   │──────────────────▶│                 │            │
 │                   │                   │  GET /count     │            │
 │                   │                   │────────────────▶│            │
 │                   │                   │                 │  Validate  │
 │                   │                   │                 │───────────▶│
 │                   │                   │                 │  {count:5} │
 │                   │                   │                 │◀───────────│
 │                   │                   │◀────────────────│            │
 │                   │  Update badge (5) │                 │            │
 │                   │◀──────────────────│                 │            │
 │  See badge "5"    │                   │                 │            │
 │◀──────────────────│                   │                 │            │
```

### Polling Cycle
```
Timer              useNotificationPolling    API         Backend
 │                          │                 │             │
 │  15s elapsed             │                 │             │
 │─────────────────────────▶│                 │             │
 │                          │  GET /poll?since=timestamp   │
 │                          │────────────────▶│             │
 │                          │                 │────────────▶│
 │                          │                 │  [new items]│
 │                          │                 │◀────────────│
 │                          │◀────────────────│             │
 │                          │  GET /count     │             │
 │                          │────────────────▶│             │
 │                          │                 │────────────▶│
 │                          │                 │  {count: 7} │
 │                          │◀────────────────│             │
 │                          │                 │             │
 │                          │  Update store   │             │
 │                          │  (add items,    │             │
 │                          │   set count=7)  │             │
```

### Mark As Read
```
User         NotificationBell    useNotification    API      Backend     Store
 │                 │                   │              │          │          │
 │  Click item     │                   │              │          │          │
 │────────────────▶│                   │              │          │          │
 │                 │  markAsRead(id)   │              │          │          │
 │                 │──────────────────▶│              │          │          │
 │                 │                   │  POST /read  │          │          │
 │                 │                   │─────────────▶│          │          │
 │                 │                   │              │─────────▶│          │
 │                 │                   │              │   200 OK │          │
 │                 │                   │              │◀─────────│          │
 │                 │                   │◀─────────────│          │          │
 │                 │                   │  markNotificationRead   │          │
 │                 │                   │─────────────────────────────────▶ │
 │                 │                   │              │          │  Update  │
 │                 │  Re-render        │              │          │  state   │
 │                 │◀──────────────────│              │          │          │
 │  Item grayed    │                   │              │          │          │
 │◀────────────────│                   │              │          │          │
```

---

## Error Handling

### Frontend Error States

| Scenario | Behavior |
|----------|----------|
| Network failure | Store error message, apply backoff |
| 401 Unauthorized | HttpRequest interceptor handles refresh |
| 500 Server Error | Log error, continue polling with backoff |
| Timeout | Treat as network failure |

### Backoff Strategy

```
Error Count    Interval
    0          15 seconds (normal)
    1          30 seconds
    2          60 seconds (max)
    3+         60 seconds (capped)
```

On successful response, error count resets to 0.

---

## Testing

### Manual Testing Checklist

1. **Badge Display**
   - [ ] Badge shows correct unread count
   - [ ] Badge hides when count is 0
   - [ ] Badge shows "99+" for counts > 99

2. **Dropdown**
   - [ ] Opens on bell click
   - [ ] Closes on outside click
   - [ ] Shows loading spinner initially
   - [ ] Shows empty state when no notifications
   - [ ] Lists notifications with correct data

3. **Polling**
   - [ ] Polls every 15 seconds
   - [ ] Pauses when tab is hidden
   - [ ] Resumes and fetches immediately on tab focus
   - [ ] New notifications appear without refresh

4. **Mark as Read**
   - [ ] Click on notification marks it as read
   - [ ] "Mark all read" clears all
   - [ ] Badge count decrements correctly

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Badge always 0 | API Gateway not forwarding headers | Check X-User-Id header config |
| Notifications not loading | CORS or auth issue | Check browser console for errors |
| Polling stops | Tab hidden or error backoff | Check visibility state and error logs |
| Duplicate notifications | Dedup not working | Check notification ID uniqueness |

### Debug Mode

Enable debug logging in the polling hook:

```javascript
// In useNotificationPolling.js, change:
log.debug("Poll notifications...")
// To:
console.log("Poll notifications...")
```

---

## Future Enhancements

1. **WebSocket Support** - Replace polling with real-time push
2. **Notification Preferences** - User can enable/disable types
3. **Sound/Desktop Notifications** - Browser notification API
4. **Notification Grouping** - Group similar notifications
5. **Deep Linking** - Click notification to navigate to relevant page

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial implementation with polling |
