import React from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useStripePayment } from "./useStripe";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../store/profile.store";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

function CheckoutForm({ planType = "PREMIUM", currency = "usd" }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { loading, error, success, processPayment } = useStripePayment();
  const { profile } = useProfileStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const planData = {
      companyId: profile?.userId,
      payerEmail: profile?.email,
      planType,
      currency,
    };

    const result = await processPayment(stripe, cardElement, planData);

    if (result.success) {
      // Short delay to show success message, then navigate with refresh flag
      setTimeout(() => {
        navigate("/dashboard?refresh=true");
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blacktxt">Secure payment</h2>
        <p className="text-neutral8 text-sm mt-1">
          Payments are encrypted and processed securely.
        </p>
      </div>

      <h2 className="text-lg font-semibold text-blacktxt mb-5">Card payment</h2>

      {/* Card number */}
      <div className="space-y-1 mb-4">
        <label className="text-sm font-medium text-neutral7">Card number</label>
        <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral7">Expiration date</label>
          <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral7">Security code</label>
          <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-600 text-sm">
          Payment successful! Redirecting...
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || loading || !profile}
        className="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
}

export default function StripePayment({ className, planType, currency }) {
  const { stripePromise } = useStripePayment();

  return (
    <Elements stripe={stripePromise}>
      <div
        className={`rounded-2xl border border-neutral2 bg-white p-6 shadow-sm ${className}`}
      >
        <CheckoutForm planType={planType} currency={currency} />
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 text-xs text-white">
        <i className="ri-lock-line" />
        Secured by Stripe · PCI-DSS compliant
      </div>
    </Elements>
  );
}
