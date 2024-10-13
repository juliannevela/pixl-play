import { CustomAnimation } from "@/types/types";

const zoomIn = (): CustomAnimation => ({
  0: {
    transform: [{ scale: 0.9 }],
  },
  0.5: {
    transform: [{ scale: 0.95 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
});

const zoomOut = (): CustomAnimation => ({
  0: {
    transform: [{ scale: 1 }],
  },
  0.5: {
    transform: [{ scale: 0.95 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
});

export { zoomIn, zoomOut };
