import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import paymentService from "../../services/paymentService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const processPayment = async (stripe, cardElement, planData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Create subscription intent from backend
      const intentResponse = await paymentService.createSubscriptionIntent(planData);
      const clientSecret = intentResponse.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to get payment client secret");
      }

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        return { success: true, paymentIntent };
      }

      return { success: false, paymentIntent };
    } catch (err) {
      console.error("Payment failed", err);
      setError(err.message || "Payment failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    stripePromise,
    loading,
    error,
    success,
    processPayment,
    setError,
  };
};
