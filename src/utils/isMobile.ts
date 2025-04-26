/**
 * Detects if the current device is a mobile device using modern browser APIs
 * @returns boolean indicating if the current device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for touch support and screen size
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

  // Check for mobile user agent as a fallback
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  return (hasTouch && isSmallScreen) || isMobileUserAgent;
};