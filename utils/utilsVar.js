export default function varUtils() {
  let windowWidth;
  let windowHeight;

  if (typeof window !== "undefined") {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  return { windowWidth, windowHeight };
}
