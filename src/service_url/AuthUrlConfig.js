import API_GATEWAY_URL from "./AppUrlConfig";

// Auth Service endpoints via API Gateway
// Gateway routes /api/v1/auth/** to AUTH-SERVICE
const AUTH_BASE_URL = `${API_GATEWAY_URL}/api/v1/auth`

const LOGIN_SERVICE_URL = `${AUTH_BASE_URL}/login`
const REGISTER_SERVICE_URL = `${AUTH_BASE_URL}/register`
const REFRESH_TOKEN_URL = `${AUTH_BASE_URL}/refresh`
const LOGOUT_URL = `${AUTH_BASE_URL}/logout`
const FORGOT_PASSWORD_URL = `${AUTH_BASE_URL}/forgot-password`
const COUNTRIES_URL = `${AUTH_BASE_URL}/countries`

export default {
    LOGIN_SERVICE_URL,
    REGISTER_SERVICE_URL,
    REFRESH_TOKEN_URL,
    LOGOUT_URL,
    FORGOT_PASSWORD_URL,
    COUNTRIES_URL
}