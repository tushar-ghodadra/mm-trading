/* Shared motion preferences, read once. */
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

export const reduceMotion = mq("(prefers-reduced-motion: reduce)");
export const finePointer = mq("(hover: hover) and (pointer: fine)");
