export const titleAnimation = {
  initial: { opacity: 0, x: -50 },

  animate: { opacity: 1, x: 0 },

  transition: {
    duration: 2,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export const subtitleAnimation = {
  initial: { opacity: 0 },

  animate: { opacity: 1 },

  transition: {
    duration: 1,
    delay: 0.5,
  },
};

export const imageAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },

  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },

  transition: {
    duration: 1.5,
    ease: [0.16, 1, 0.3, 1]as const,
  },
};