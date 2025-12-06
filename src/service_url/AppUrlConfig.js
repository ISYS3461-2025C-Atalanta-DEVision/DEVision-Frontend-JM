// API Gateway is the single entry point for all API calls
// All requests go through Gateway (port 8080), which routes to internal services
const API_GATEWAY_PORT = 8080
const API_GATEWAY_URL = "http://localhost:" + API_GATEWAY_PORT

export default API_GATEWAY_URL