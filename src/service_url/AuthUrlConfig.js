import API_GATEWAY_URL from "./AppUrlConfig";

// Auth Service endpoints via API Gateway
// Gateway routes /api/v1/auth/** to AUTH-SERVICE
const AUTH_BASE_URL = '/auth-service/api/v1/auth';

const LOGIN_SERVICE_URL = `${AUTH_BASE_URL}/login`
const REGISTER_SERVICE_URL = `${AUTH_BASE_URL}/register`
const ADMIN_LOGIN_SERVICE_URL = `${AUTH_BASE_URL}/admin/login`

const FORGOT_PASSWORD_URL = `${AUTH_BASE_URL}/forgot-password`
const CHANGE_PASSWORD_URL = `${AUTH_BASE_URL}/change-password`
const RESET_PASSWORD_URL = `${AUTH_BASE_URL}/reset-password`

const ACTIVATE_ACCOUNT_URL = `${AUTH_BASE_URL}/activate`
const LOGOUT_URL = `${AUTH_BASE_URL}/logout`

const REFRESH_TOKEN_URL = `${AUTH_BASE_URL}/refresh`
const VALIDATE_TOKEN_URL = `${AUTH_BASE_URL}/validate-token`

const COUNTRIES_URL = `${AUTH_BASE_URL}/countries`

export default {
    LOGIN_SERVICE_URL,
    REGISTER_SERVICE_URL,
    ADMIN_LOGIN_SERVICE_URL,
    REFRESH_TOKEN_URL,
    LOGOUT_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    ACTIVATE_ACCOUNT_URL,
    CHANGE_PASSWORD_URL,
    VALIDATE_TOKEN_URL,
    COUNTRIES_URL
}