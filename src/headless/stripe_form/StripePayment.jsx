import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripe } from "./useStripe";

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

export default function StripePayment({ className }) {

  const { stripePromise } = useStripe();
  return (
    <Elements stripe={stripePromise}>
      <div
        className={`rounded-2xl border border-neutral2 bg-white p-6 shadow-sm space-y-5 ${className}`}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blacktxt">
            Secure payment
          </h2>
          <p className="text-neutral8 text-sm mt-1">
            Payments are encrypted and processed securely.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-blacktxt">Card payment</h2>

        {/* Card number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral7">
            Card number
          </label>
          <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral7">
              Expiration date
            </label>
            <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral7">
              Security code
            </label>
            <div className="rounded-xl border border-neutral2 px-3 py-3 focus-within:border-primary">
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        {/* Submit button (UI only) */}
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Pay now
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 text-xs text-white">
        <i className="ri-lock-line" />
        Secured by Stripe · PCI-DSS compliant
      </div>
    </Elements>
  );
}
