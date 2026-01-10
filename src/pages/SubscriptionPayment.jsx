import React from "react";
import StripePayment from "../headless/stripe_form/StripePayment";
import NavBar from "../layout/NavBar/NavBar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function SubscriptionPayment() {
  return (
    <div className="h-screen overflow-hidden">
      <NavBar />

      <div className="relative h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-8">
        {/* Background fade */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Glow blobs (slow float) */}
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-400/40 rounded-full blur-[120px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-fuchsia-400/40 rounded-full blur-[140px]"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-150px] left-1/4 w-[600px] h-[600px] bg-violet-400/40 rounded-full blur-[140px]"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main content */}
        <motion.div
          className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* LEFT: Plan card */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-white p-10 border border-neutral2 shadow-xl"
          >
            <div
              className="absolute inset-0 pointer-events-none
              bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_60%)]"
            />

            <div className="relative space-y-6">
              <motion.div variants={fadeUp}>
                <h1 className="text-sm uppercase tracking-wide text-neutral7">
                  Subscription plan
                </h1>
                <h2 className="text-4xl font-bold text-blacktxt mt-2">
                  Talent Search
                </h2>
                <p className="text-neutral8 mt-2 max-w-md">
                  Advanced candidate discovery with real-time alerts and smart
                  filters.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">$30</span>
                <span className="text-neutral8 mb-1">/ month</span>
              </motion.div>

              <motion.ul
                variants={fadeUp}
                className="space-y-3 pt-4 border-t border-neutral2"
              >
                <li className="flex gap-3 font-medium">
                  <i className="ri-notification-3-line text-primary text-lg" />
                  Instant alerts for new matching candidates
                </li>
                <li className="flex gap-3 font-medium">
                  <i className="ri-flashlight-line text-primary text-lg" />
                  Real-time talent matching
                </li>
                <li className="flex gap-3 font-medium">
                  <i className="ri-filter-3-line text-primary text-lg" />
                  Filter by skills, salary, location & education
                </li>
                <li className="flex gap-3 font-medium">
                  <i className="ri-price-tag-3-line text-primary text-lg" />
                  Advanced tech tags
                </li>
                <li className="flex gap-3 font-medium">
                  <i className="ri-briefcase-4-line text-primary text-lg" />
                  Flexible employment types in one search
                </li>
              </motion.ul>

              <motion.p
                variants={fadeIn}
                className="text-sm text-neutral6 pt-4"
              >
                Cancel anytime · No hidden fees
              </motion.p>
            </div>
          </motion.div>

          {/* RIGHT: Stripe payment */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center"
          >
            <motion.div variants={fadeIn} className="w-full max-w-md">
              <StripePayment
                className="shadow-lg"
                planType="PREMIUM"
                currency="usd"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
