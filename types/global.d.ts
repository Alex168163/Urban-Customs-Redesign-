export {};

declare global {
  interface Window {
    /** Present once GA4 / Google Ads is installed. Calls are no-ops until then. */
    gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
  }
}
