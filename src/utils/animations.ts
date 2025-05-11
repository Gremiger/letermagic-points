
// Define animation keyframes as string templates for reference
// These are already implemented in index.css as actual CSS animations

export const pointIncrease = "animate-point-increase";
export const pointDecrease = "animate-point-decrease";

// Export animation class names for easy use in components
export const getPointAnimationClass = (points: number): string => {
  return points >= 0 ? pointIncrease : pointDecrease;
};
