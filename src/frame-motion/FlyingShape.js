import { motion } from "framer-motion";
import pencile from "../assets/photo/pencile.png";
const floatingShapes = [
  {
    id: "circle-top-left",
    className: "w-16 h-16 rounded-full bg-[#98A9BB] border border-[#002959]",
    style: { top: "8%", left: "12%" },
    animation: { y: [0, -25, 0], x: [0, 8, 0], rotate: [0, 12, -6, 0] },
    duration: 3.4,
    delay: 0,
  },
  {
    id: "diamond-top-right",
    className: "w-10 h-10 rotate-45 bg-[#002959] border border-[#98A9BB]",
    style: { top: "18%", right: "10%" },
    animation: { y: [0, 20, 0], x: [0, -12, 0] },
    duration: 4.3,
    delay: 1.2,
  },
  {
    id: "ring-bottom-left",
    className: "w-20 h-20 rounded-full border border-[#002959]",
    style: { bottom: "18%", left: "6%" },
    animation: { y: [0, -18, 0], rotate: [0, 18, 0, -12, 0] },
    duration: 1.4,
    delay: 0.6,
  },
  {
    id: "pill-mid",
    className: "w-24 h-8 rounded-full bg-[#98A9BB] border border-[#002959]",
    style: { top: "58%", right: "28%" },
    animation: { y: [0, -14, 0], x: [0, 10, 0], rotate: [0, -10, 0] },
    duration: 2.5,
    delay: 2,
  },
  {
    id: "tiny-bottom-right",
    className: "w-3 h-3 rounded-full bg-bgComponent/80",
    style: { bottom: "14%", right: "16%" },
    animation: { y: [0, -10, 0], x: [0, 6, 0] },
    duration: 3.6,
    delay: 1.8,
  },
  {
    id: "square-mid-left",
    className: "w-8 h-8 bg-[#002959]/70 border border-[#98A9BB]/30",
    style: { top: "45%", left: "18%" },
    animation: { y: [0, 18, 0], x: [0, -8, 0], rotate: [0, 8, -8, 0] },
    duration: 2.1,
    delay: 0.4,
  },
  {
    id: "triangle-top-center",
    className:
      "w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-transparent border-b-rose-400/70",
    style: { top: "10%", left: "48%" },
    animation: { y: [0, 22, 0], rotate: [0, -6, 6, 0] },
    duration: 3.2,
    delay: 1,
  },
  {
    id: "rectangle-bottom-center",
    className: "w-12 h-4 bg-[#98A9BB]/70 rounded-sm",
    style: { bottom: "15%", left: "26%" },
    animation: { y: [0, -12, 0], x: [0, 24, 0] },
    duration: 2.8,
    delay: 0.9,
  },
];

export { floatingShapes };
