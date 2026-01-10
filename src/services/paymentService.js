import {
  PAYMENT_CREATE_INTENT_URL,
  PAYMENT_CHECK_TRANSACTION_URL,
  PAYMENT_SUBSCRIPTIONS_URL,
  PAYMENT_COMPANY_PREMIUM_URL,
  PAYMENT_COMPANY_SUBSCRIPTIONS_URL,
  PAYMENT_CANCEL_COMPANY_SUBSCRIPTION_URL,
  PAYMENT_SEARCH_TRANSACTIONS_URL,
} from "../service_url/PaymentUrlConfig";
import api from "../http_call/HttpRequest";

export const paymentService = {
  // Create subscription intent for Stripe checkout
  createSubscriptionIntent: async (planData) => {
    const response = await api.post(PAYMENT_CREATE_INTENT_URL, planData);
    return response.data;
  },

  // Get transaction by ID
  getTransaction: async (transactionId) => {
    const response = await api.get(
      PAYMENT_CHECK_TRANSACTION_URL(transactionId)
    );
    return response.data;
  },

  // Get subscription by ID
  getSubscription: async (subscriptionId) => {
    const response = await api.get(PAYMENT_SUBSCRIPTIONS_URL(subscriptionId));
    return response.data;
  },

  // Check company premium status
  getCompanyPremiumStatus: async (companyId) => {
    const response = await api.get(PAYMENT_COMPANY_PREMIUM_URL(companyId));
    return response.data;
  },

  // Get all subscriptions for a company
  getCompanySubscriptions: async (companyId) => {
    const response = await api.get(
      PAYMENT_COMPANY_SUBSCRIPTIONS_URL(companyId)
    );
    return response.data;
  },

  // Cancel company subscription
  cancelCompanySubscription: async (companyId, cancelAtPeriodEnd = true) => {
    const response = await api.post(
      PAYMENT_CANCEL_COMPANY_SUBSCRIPTION_URL(companyId),
      null,
      { params: { cancelAtPeriodEnd } }
    );
    return response.data;
  },

  // Search transactions with filters
  searchTransactions: async (searchParams = {}) => {
    const response = await api.get(PAYMENT_SEARCH_TRANSACTIONS_URL, {
      params: searchParams,
    });
    return response.data;
  },
};

export default paymentService;
