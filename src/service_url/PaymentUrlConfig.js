export const PAYMENT_BASE_URL = "/payment-service/api/payments";

// concrete endpoints
export const PAYMENT_CREATE_INTENT_URL = `${PAYMENT_BASE_URL}/subscriptions/intent`;
export const PAYMENT_CHECK_TRANSACTION_URL = (transactionId) => `${PAYMENT_BASE_URL}/transactions/${transactionId}`;
export const PAYMENT_SUBSCRIPTIONS_URL = (subscriptionId) => `${PAYMENT_BASE_URL}/subscriptions/${subscriptionId}`;

// Premium status
export const PAYMENT_COMPANY_PREMIUM_URL = (companyId) => `${PAYMENT_BASE_URL}/premium/company/${companyId}`;

// Company subscriptions
export const PAYMENT_COMPANY_SUBSCRIPTIONS_URL = (companyId) => `${PAYMENT_BASE_URL}/subscriptions/company/${companyId}`;

// Cancel company subscription
export const PAYMENT_CANCEL_COMPANY_SUBSCRIPTION_URL = (companyId) => `${PAYMENT_BASE_URL}/subscriptions/company/${companyId}/cancel`;

// Search transactions
export const PAYMENT_SEARCH_TRANSACTIONS_URL = `${PAYMENT_BASE_URL}/transactions`;