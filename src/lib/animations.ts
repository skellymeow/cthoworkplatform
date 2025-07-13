export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  fadeInUpDelayed: (delay: number = 0.1) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const }
  }),
  hoverScale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  hoverScaleLarge: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  iconHover: {
    whileHover: { rotate: 5 },
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeOut" as const }
  }
} 