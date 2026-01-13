import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import An from "../assets/team_members/an.png";
import Manh from "../assets/team_members/manh.png";
import Thao from "../assets/team_members/thao.png";
import Khoa from "../assets/team_members/khoa.png";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Smart Talent Search",
    description:
      "Find the perfect candidates with our advanced search filters and AI-powered matching system.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Easy Job Posting",
    description:
      "Create and manage job listings effortlessly with our intuitive posting tools.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Talent Pool Management",
    description:
      "Build and maintain a database of qualified candidates for future opportunities.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Analytics Dashboard",
    description:
      "Track your recruitment metrics and gain insights to optimize your hiring process.",
  },
];

const teamMembers = [
  {
    name: "Luu Tuan An",
    role: "Backend Specialist",
    major: "Software Engineering",
    image: An,
    github: "https://github.com/luutuanan2003",
    linkedin: "https://www.linkedin.com/in/an-tu%E1%BA%A5n-l%C6%B0u-889894237/",
  },
  {
    name: "Mai Dang Khoa",
    role: "Frontend Specialist",
    major: "Software Engineering",
    image: Khoa,
    github: "https://github.com/Kyle8Bits",
    linkedin: "https://www.linkedin.com/in/kylemai261/",
  },
  {
    name: "Thao Trinh",
    role: "Backend Specialist",
    major: "Software Engineering",
    image: Thao,
    github: "https://github.com/nancybwi",
    linkedin: "https://www.linkedin.com/in/thao-trinh-73ab23172/",
  },
  {
    name: "Minh Anh",
    role: "Backend Specialist",
    major: "Software Engineering",
    image: Manh,
    github: "https://github.com/AnhPhung37",
    linkedin: "https://www.linkedin.com/in/anh-phung-1b9531351/",
  },
];

const techLogos = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Go", color: "#00ADD8" },
  { name: "Rust", color: "#DEA584" },
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: [null, Math.random() * 100 - 50],
            y: [null, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Hero illustration component
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Main floating card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-2xl p-6 border border-neutral3"
        >
          {/* Profile cards */}
          <div className="space-y-4">
            {[
              {
                name: "Alex Rivera",
                role: "Senior React Developer",
                match: "98%",
              },
              { name: "Jordan Kim", role: "Full Stack Engineer", match: "95%" },
              { name: "Sam Taylor", role: "Backend Specialist", match: "92%" },
            ].map((dev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="flex items-center space-x-4 p-3 bg-neutral1 rounded-xl hover:bg-neutral2 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                  {dev.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-neutral8">{dev.name}</p>
                  <p className="text-sm text-neutral7">{dev.role}</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {dev.match} match
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-4 -left-4 bg-white border border-neutral3 px-4 py-3 rounded-xl shadow-lg z-20"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral8">
            Hired successfully!
          </span>
        </div>
      </motion.div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 blur-3xl -z-10 transform scale-150" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 overflow-hidden">
      <FloatingParticles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                DEVision
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/login"
                className="text-neutral7 hover:text-primary transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link to="/register">
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-indigo-500/10 text-primary rounded-full text-sm font-medium mb-6 border border-primary/20"
                >
                  Recruitment Made Simple
                </motion.span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral8 mb-6 leading-tight">
                  Find Your Perfect
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent block"
                  >
                    Development Talent
                  </motion.span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg sm:text-xl text-neutral7 max-w-xl mx-auto lg:mx-0 mb-8"
                >
                  DEVision connects companies with top-tier developers.
                  Streamline your hiring process and build your dream team
                  faster than ever.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto shadow-lg shadow-primary/25"
                    >
                      Start Hiring Today
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      View Demo
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Tech logos */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <p className="text-sm text-neutral6 mb-4">
                  Find developers skilled in
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {techLogos.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-white rounded-lg shadow-md border border-neutral2 text-sm font-medium text-neutral8 cursor-default"
                    >
                      {tech.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right illustration */}
            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral1/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral8 mt-2 mb-4">
              Everything You Need to Hire
            </h2>
            <p className="text-lg text-neutral7 max-w-2xl mx-auto">
              Powerful tools designed to help you find, evaluate, and hire the
              best talent in the industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="group p-6 bg-white rounded-2xl border border-neutral2 hover:border-primary/30 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary/10 to-indigo-500/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-indigo-600 group-hover:text-white transition-all duration-300"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-neutral8 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral7">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral1 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral8 mt-2 mb-4">
              About Us
            </h2>
            <p className="text-lg text-neutral7 max-w-2xl mx-auto">
              Meet our talented developers behind DEVision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white p-6 rounded-2xl shadow-lg border border-neutral2 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 overflow-hidden relative"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex flex-col items-center">
                  {/* Profile image with ring */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-600 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-neutral8 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {member.role}
                    </p>
                    <p className="text-sm text-neutral6 flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
                      {member.major}
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-neutral8 hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-[#0077B5] hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-600 to-primary bg-[length:200%_100%] animate-gradient" />

            {/* Floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full"
              />
            </div>

            <div className="relative p-8 sm:p-12 text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Ready to Transform Your Hiring?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto"
              >
                Join hundreds of companies already using DEVision to build their
                dream development teams.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary hover:bg-neutral1 shadow-xl"
                    >
                      Get Started Free
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral8 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-4">
                DEVision
              </h3>
              <p className="text-neutral5">
                Connecting companies with exceptional development talent
                worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral5">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral5">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral5">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral7 mt-12 pt-8 text-center text-neutral5">
            <p>&copy; 2025 DEVision. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* CSS for animated gradient */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
