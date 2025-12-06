import sendHTTPRequest from "../http_call/HttpRequest";
import AuthUrlConfig from "../service_url/AuthUrlConfig";

/**
 * Login API - authenticates user via API Gateway
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} deviceInfo - Optional device information
 * @returns {Promise<Object>} Login response with tokens or error
 */
const login = async (email, password, deviceInfo = null) => {
    // const requestBody = JSON.stringify({
    //     email: email,
    //     password: password,
    //     deviceInfo: deviceInfo || navigator.userAgent
    // });

    // const response = await sendHTTPRequest(
    //     AuthUrlConfig.LOGIN_SERVICE_URL,
    //     'POST',
    //     requestBody
    // );

    // if (response.status === 200) {
    //     return {
    //         success: true,
    //         data: response.json
    //     };
    // } else if (response.status >= 500) {
    //     return {
    //         success: false,
    //         error: "Server Error",
    //         message: response.json?.message || "Internal server error"
    //     };
    // } else if (response.status >= 400) {
    //     return {
    //         success: false,
    //         error: "Client Error",
    //         message: response.json?.message || "Invalid credentials"
    //     };
    // }

    return
};

/**
 * Register API - registers new company via API Gateway
 * @param {Object} registrationData - Registration form data
 * @returns {Promise<Object>} Registration response or error
 */
const register = async (registrationData) => {
    const requestBody = JSON.stringify(registrationData);

    const response = await sendHTTPRequest(
        AuthUrlConfig.REGISTER_SERVICE_URL,
        'POST',
        requestBody
    );

    if (response.status === 201) {
        return {
            success: true,
            data: response.json
        };
    } else if (response.status >= 500) {
        return {
            success: false,
            error: "Server Error",
            message: response.json?.message || "Internal server error"
        };
    } else if (response.status >= 400) {
        console.log(response);
        return {
            success: false,
            error: "Client Error",
            message: response.json?.message || "Registration failed"
        };
    }
};

/**
 * Logout API - invalidates tokens via API Gateway
 * @param {string} accessToken - Current access token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise<Object>} Logout response
 */
const logout = async (accessToken, refreshToken) => {
    const requestBody = refreshToken ? JSON.stringify({ refreshToken }) : null;

    const response = await sendHTTPRequest(
        AuthUrlConfig.LOGOUT_URL,
        'POST',
        requestBody
    );

    return {
        success: response.status === 200,
        message: response.json?.message || "Logged out"
    };
};

/**
 * Get countries list for registration dropdown
 * @returns {Promise<Array>} List of valid countries
 */
const getCountries = async () => {
    const response = await sendHTTPRequest(
        AuthUrlConfig.COUNTRIES_URL,
        'GET'
    );

    if (response.status === 200) {
        return {
            success: true,
            data: response.json?.data || []
        };
    }
    return {
        success: false,
        data: []
    };
};

export { login, register, logout, getCountries };
