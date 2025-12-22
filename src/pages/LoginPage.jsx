import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../headless/login_form/LoginForm";
import AuthService from "../services/authService";
import BgImage from "../assets/photo/bg-login.jpg";
import { floatingShapes } from "../frame-motion/FlyingShape";
import useAuth from "../hooks/useAuth";
import Snowfall from "react-snowfall";
export default function LoginPage() {
  const { login } = useAuth();
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Snowfall
        snowflakeCount={300}
        speed={[0.5, 2.5]}
        wind={[-0.5, 1.5]}
        radius={[0.5, 3]}
        color="#ffffff"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-bgComponent/50 z-0" />

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
        className="w-full max-w-md bg-bgComponent rounded-2xl shadow-xl p-8 space-y-6 z-10"
      >
        <div className="text-center space-y-1">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            DEVision
          </p>
          <h1 className="text-3xl font-bold text-textBlack">
            Welcome to DEVision
          </h1>
          <p className="text-sm text-neutral6">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <LoginForm loginApi={login} />
        </div>
      </motion.div>
    </div>
  );
}
