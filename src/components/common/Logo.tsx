import { motion } from "framer-motion";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
  logoSrc?: string;
};

export default function Logo({
  size = 36,
  showText = true,
  className = "",
  logoSrc = "/favicon.png",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      
      {/* TechGem Logo Icon */}
      <motion.div
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ rotate: 15, scale: 1.1 }}
        style={{
          width: size,
          height: size,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Deep Teal / Cyan Glow */}
        <div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background:
              "radial-gradient(circle, rgba(48, 160, 170, 0.35), transparent 70%)",
          }}
        />

        {/* Gold Accent Glow */}
        <div
          className="absolute inset-1 rounded-full blur-sm"
          style={{
            background:
              "radial-gradient(circle, rgba(218, 174, 54, 0.2), transparent 70%)",
          }}
        />

        {/* Actual TechGem Logo */}
        <img
          src={logoSrc}
          alt="TechGem Logo"
          draggable={false}
          className="relative z-10 w-full h-full object-contain select-none"
          style={{
            filter: `
              drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))
              drop-shadow(0 0 4px rgba(46, 160, 170, 0.35))
              drop-shadow(0 0 3px rgba(218, 174, 54, 0.2))
            `,
          }}
        />
      </motion.div>

      {/* TechGem Text */}
      {showText && (
      <span className="font-display font-bold text-lg tracking-tight">
        <span style={{ color: "#2AA6B5" }}>Tech</span>
        <span style={{ color: "#D4AF37" }}>Gem</span>
      </span>
    )}
    </div>
  );
}