
import { keyframes } from "@emotion/react";

export const pointIncrease = keyframes`
  0% {
    transform: scale(1);
    color: inherit;
  }
  50% {
    transform: scale(1.5);
    color: #22c55e; /* Green color */
  }
  100% {
    transform: scale(1);
    color: inherit;
  }
`;

export const pointDecrease = keyframes`
  0% {
    transform: scale(1);
    color: inherit;
  }
  50% {
    transform: scale(1.5);
    color: #ef4444; /* Red color */
  }
  100% {
    transform: scale(1);
    color: inherit;
  }
`;
