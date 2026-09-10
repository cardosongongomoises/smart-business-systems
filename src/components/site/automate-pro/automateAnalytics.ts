// Analytics tracking events for the AUTOMATE PRO section
export type AutomateProEvent =
  | "automate_pro_view"
  | "automate_pro_cta_click"
  | "automate_demo_click"
  | "automate_pricing_view"
  | "automate_whatsapp_click"
  | "automate_contact_submit";

export function trackAutomateProEvent(
  event: AutomateProEvent,
  metadata?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  // Custom event dispatch for internal listeners
  const customEvent = new CustomEvent("automate_pro_telemetry", {
    detail: { event, metadata, timestamp: Date.now() },
  });
  window.dispatchEvent(customEvent);

  // Google Analytics / Tag Manager compatibility if present
  const win = window as unknown as {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };

  if (typeof win.gtag === "function") {
    win.gtag("event", event, metadata);
  } else if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event, ...metadata });
  }

  // Diagnostic logging in development
  if (import.meta.env.DEV) {
    console.debug(`[AUTOMATE_PRO_EVENT] ${event}`, metadata);
  }
}
