import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment() {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: import.meta.env.VITE_STRIPE_SECRET_KEY,
        // mode: "payment",
        // amount: 2000,
        // currency: "usd",

        appearance: {
          theme: "flat", // "stripe" | "night" | "flat"
          variables: {
            colorPrimary: "var(--color-primary)",
            colorBackground: "var(--color-bg)",
            colorText: "var(--color-blacktxt)",
            colorDanger: "var(--color-error)",
            fontFamily: "Inter, system-ui, sans-serif",
            spacingUnit: "6px",
            borderRadius: "12px",
          },
          rules: {
            ".Input": {
              border: "1px solid var(--color-neutral3)",
              boxShadow: "none",
            },
            ".Input:focus": {
              borderColor: "var(--color-primary)", // ✅ correct
            },
            ".Label": {
              fontWeight: "600",
              color: "var(--color-neutral8)",
            },
          },
        },
      }}
    >
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              email: "auto", // ✅ FIXED
            },
          },
        }}
        className="w-1/2"
      />
    </Elements>
  );
}
