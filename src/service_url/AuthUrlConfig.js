// Auth Service endpoints via API Gateway
// Gateway routes /api/v1/auth/** to AUTH-SERVICE
const AUTH_BASE_URL = "/auth-service/api/auth";

export const LOGIN_SERVICE_URL = `${AUTH_BASE_URL}/login`;
export const REGISTER_SERVICE_URL = `${AUTH_BASE_URL}/register`;
export const ADMIN_LOGIN_SERVICE_URL = `${AUTH_BASE_URL}/admin/login`;

export const FORGOT_PASSWORD_URL = `${AUTH_BASE_URL}/forgot-password`;
export const CHANGE_PASSWORD_URL = `${AUTH_BASE_URL}/change-password`;
export const RESET_PASSWORD_URL = `${AUTH_BASE_URL}/reset-password`;

export const ACTIVATE_ACCOUNT_URL = `${AUTH_BASE_URL}/activate`;
export const LOGOUT_URL = `${AUTH_BASE_URL}/logout`;

export const REFRESH_TOKEN_URL = `${AUTH_BASE_URL}/refresh`;
export const VALIDATE_TOKEN_URL = `${AUTH_BASE_URL}/validate-token`;

export const COUNTRIES_URL = `${AUTH_BASE_URL}/countries`;


