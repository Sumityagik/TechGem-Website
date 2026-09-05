import { motion } from "framer-motion";
import { useRef } from "react";

type TechGemLogo3DProps = {
  size?: number;
  className?: string;
  logoSrc: string;
};

export default function TechGemLogo3D({
  size = 400,
  className = "",
  logoSrc="/favicon.png",
}: TechGemLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.setProperty("--rx", `${y * -18}deg`);
    el.style.setProperty("--ry", `${x * 25}deg`);

    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;

    if (!el) return;

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        perspective: "1200px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ============================= */}
      {/* ELECTRIC BLUE AMBIENT GLOW */}
      {/* ============================= */}

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "75%",
          height: "75%",
          background:
            "radial-gradient(circle, rgba(50,180,210,0.28), transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ============================= */}
      {/* GOLD AMBIENT GLOW */}
      {/* ============================= */}

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(255,205,50,0.25), transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ============================= */}
      {/* 3D LOGO CONTAINER */}
      {/* ============================= */}

      <div
        className="relative flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.25s ease-out",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            rotateZ: [0, 2, -2, 0],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ============================= */}
          {/* DEEP BACK SHADOW */}
          {/* ============================= */}

          <img
            src={logoSrc}
            alt="TechGem Logo Shadow"
            draggable={false}
            className="absolute object-contain select-none pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              transform: "translateZ(-25px)",
              opacity: 0.35,
              filter:
                "blur(12px) brightness(0.5) drop-shadow(0 25px 35px rgba(0,0,0,0.7))",
            }}
          />

          {/* ============================= */}
          {/* ELECTRIC BLUE DEPTH LAYER */}
          {/* ============================= */}

          <img
            src={logoSrc}
            alt=""
            draggable={false}
            className="absolute object-contain select-none pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              transform: "translateZ(-12px)",
              opacity: 0.45,
              filter:
                "drop-shadow(-8px 8px 15px rgba(40,180,210,0.55))",
            }}
          />

          {/* ============================= */}
          {/* GOLD DEPTH LAYER */}
          {/* ============================= */}

          <img
            src={logoSrc}
            alt=""
            draggable={false}
            className="absolute object-contain select-none pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              transform: "translateZ(-6px)",
              opacity: 0.35,
              filter:
                "drop-shadow(8px -4px 15px rgba(255,200,40,0.45))",
            }}
          />

          {/* ============================= */}
          {/* MAIN LOGO */}
          {/* ============================= */}

          <img
            src={logoSrc}
            alt="TechGem"
            draggable={false}
            className="relative object-contain select-none pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              transform: "translateZ(20px)",
              filter: `
                drop-shadow(0 18px 25px rgba(0,0,0,0.45))
                drop-shadow(0 0 12px rgba(80,200,220,0.25))
                drop-shadow(0 0 10px rgba(255,210,60,0.2))
              `,
            }}
          />

          {/* ============================= */}
          {/* INTERACTIVE LIGHT REFLECTION */}
          {/* ============================= */}

          <div
            className="absolute pointer-events-none"
            style={{
              width: "88%",
              height: "88%",
              transform: "translateZ(30px)",
              background: `
                radial-gradient(
                  circle at var(--mx, 50%) var(--my, 50%),
                  rgba(255,255,255,0.38),
                  rgba(255,255,255,0.08) 18%,
                  transparent 45%
                )
              `,
              mixBlendMode: "screen",
              opacity: 0.65,

              WebkitMaskImage: `url(${logoSrc})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",

              maskImage: `url(${logoSrc})`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />

          {/* ============================= */}
          {/* ANIMATED SHINE SWEEP */}
          {/* ============================= */}

          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "90%",
              height: "90%",
              transform: "translateZ(35px)",

              WebkitMaskImage: `url(${logoSrc})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",

              maskImage: `url(${logoSrc})`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",

              background:
                "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.65) 50%, transparent 65%)",
              opacity: 0.5,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* ============================= */}
      {/* FLOATING ELECTRIC PARTICLE */}
      {/* ============================= */}

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 10,
          height: 10,
          top: "15%",
          right: "12%",
          background: "#4ac6d8",
          boxShadow: "0 0 18px rgba(74,198,216,0.9)",
        }}
        animate={{
          y: [0, -18, 0],
          x: [0, 8, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ============================= */}
      {/* FLOATING GOLD PARTICLE */}
      {/* ============================= */}

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          bottom: "18%",
          left: "10%",
          background: "#ffd54a",
          boxShadow: "0 0 18px rgba(255,213,74,0.9)",
        }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ============================= */}
      {/* SMALL WHITE SPARKLE */}
      {/* ============================= */}

      <motion.div
        className="absolute"
        style={{
          top: "48%",
          right: "4%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 15px white",
        }}
        animate={{
          scale: [0.5, 1.8, 0.5],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}