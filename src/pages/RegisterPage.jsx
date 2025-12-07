import React from "react";
import { motion } from "framer-motion";
import RegistrationForm from "../headless/registration_form/RegistrationForm";
import BgImage from "../assets/photo/bg-login.jpg";
import { floatingShapes } from "../frame-motion/FlyingShape";

export default function RegisterPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-8"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/50 z-0" />

      {floatingShapes.map(
        ({ id, className, style, animation, duration, delay }) => (
          <motion.span
            key={id}
            className={`absolute ${className}`}
            style={style}
            animate={animation}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        )
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-fit w-fit bg-white rounded-2xl shadow-xl p-8 space-y-6 z-10"
      >
        <div className="text-center space-y-1">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">
            DEVision
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-500">
            Fill in the details to get started
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <RegistrationForm />
        </div>
      </motion.div>
    </div>
  );
}
