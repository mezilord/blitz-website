import { BookCallButton } from "./book-call";

/** Navy closing band with a faint chessboard and the booking button. */
export function YourMove({
  title = "Your move.",
  body = "Book a free 30-minute call. We'll talk through your project, timeline and budget, and you'll leave with a clear next step.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "conic-gradient(#fff 25%, transparent 0 50%, #fff 0 75%, transparent 0)",
          backgroundSize: "96px 96px",
          maskImage: "linear-gradient(90deg, transparent 30%, #000 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 30%, #000 100%)",
        }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <h2 className="text-6xl lg:text-8xl font-display tracking-tight">{title}</h2>
        <p className="mt-6 max-w-xl text-lg lg:text-xl text-white/70 leading-relaxed">
          {body}
        </p>
        <div className="mt-10">
          <BookCallButton variant="light" />
        </div>
      </div>
    </section>
  );
}
