import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cody = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const eyesX = window.innerWidth / 2;
    const eyesY = window.innerHeight / 2;

    const deltaX = mousePos.x - eyesX;
    const deltaY = mousePos.y - eyesY;

    const maxMove = 15; // Ajuste la distance max des pupilles
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const moveX = (deltaX / distance) * maxMove;
    const moveY = (deltaY / distance) * maxMove;

    setEyePos({ x: moveX, y: moveY });
  }, [mousePos]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">

      <svg
        viewBox="0 0 200 100"
        className="w-64 h-32"
      >
        {/* Visage */}
        <circle cx="100" cy="50" r="45" fill="#FACC15" />

        {/* Œil gauche */}
        <circle cx="75" cy="50" r="15" fill="white" />
        <motion.circle
          cx="75"
          cy="50"
          r="6"
          fill="black"
          animate={{ cx: 75 + eyePos.x, cy: 50 + eyePos.y }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />


        <circle cx="125" cy="50" r="15" fill="white" />
        <motion.circle
          cx="125"
          cy="50"
          r="6"
          fill="black"
          animate={{ cx: 125 + eyePos.x, cy: 50 + eyePos.y }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
      </svg>
    </div>
  );
};

export default Cody;
