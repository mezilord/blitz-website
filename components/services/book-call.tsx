import { ArrowRight } from "lucide-react";

/** Opens the Cal.com booking popup (needs <CalFloatingButton /> on the page). */
export function BookCallButton({
  label = "Book a free call",
  variant = "navy",
  className = "",
}: {
  label?: string;
  variant?: "navy" | "light";
  className?: string;
}) {
  const styles =
    variant === "navy"
      ? "bg-brand-navy text-white hover:bg-brand-navy/90 shadow-[0_8px_24px_rgba(6,42,58,0.22)]"
      : "bg-background text-brand-navy hover:bg-white";
  return (
    <button
      type="button"
      data-cal-namespace="30min"
      data-cal-link="blitz-creative/30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
      className={`group inline-flex items-center gap-3 rounded-full pl-7 pr-2 py-2 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${styles} ${className}`}
    >
      {label}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
          variant === "navy" ? "border-white/30" : "border-brand-navy/20"
        }`}
      >
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
