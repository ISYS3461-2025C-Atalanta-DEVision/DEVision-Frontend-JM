import { useState } from "react";
import paymentService from "../services/paymentService";

export default function usePayment() {
  const [premiumStatus, setPremiumStatus] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check company premium status
  const fetchPremiumStatus = async (companyId) => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.getCompanyPremiumStatus(companyId);
      setPremiumStatus(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch premium status", err);
      setError("Failed to load premium status");
    } finally {
      setLoading(false);
    }
  };

  // Get company subscriptions
  const fetchSubscriptions = async (companyId) => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.getCompanySubscriptions(companyId);
      setSubscriptions(data || []);
      return data;
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  // Create subscription intent
  const createIntent = async (planData) => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.createSubscriptionIntent(planData);
      return data;
    } catch (err) {
      console.error("Failed to create subscription intent", err);
      setError("Failed to create payment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async (companyId, cancelAtPeriodEnd = true) => {
    setLoading(true);
    setError("");
    try {
      const data = await paymentService.cancelCompanySubscription(
        companyId,
        cancelAtPeriodEnd
      );
      await fetchSubscriptions(companyId);
      return data;
    } catch (err) {
      console.error("Failed to cancel subscription", err);
      setError("Failed to cancel subscription");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    premiumStatus,
    subscriptions,
    loading,
    error,
    fetchPremiumStatus,
    fetchSubscriptions,
    createIntent,
    cancelSubscription,
    setPremiumStatus,
    setSubscriptions,
    setError,
  };
}
