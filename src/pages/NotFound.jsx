import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Dog from "../assets/photo/pencile.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-neutral8 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral7 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-2 h-fit"
          src={Dog}
        >
        </motion.img>
      </div>
    </div>
  );
}
