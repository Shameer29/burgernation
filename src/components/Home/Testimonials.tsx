import { motion } from "framer-motion";
import { CUSTOMER_REVIEWS } from "../../data/franchise";

export default function Testimonials() {
  const reviews = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section className="relative bg-char-950 py-20 sm:py-28 overflow-hidden border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-16 flex flex-col items-center text-center gap-3 px-5"
      >
        <span className="text-xs tracking-[0.35em] text-crush font-semibold">GOOGLE REVIEWS</span>
        <h2 className="font-display text-4xl sm:text-6xl text-off leading-[0.9]">
          WHAT PEOPLE <span className="text-crush">ARE SAYING</span>
        </h2>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-char-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-char-950 to-transparent" />

        <div className="scrollbar-none overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-5 px-5">
            {reviews.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="w-72 sm:w-80 shrink-0 rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-char-800/80 via-char-900 to-black p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-crush text-sm tracking-wide">{"★".repeat(review.rating)}</span>
                  {review.verified && (
                    <span className="text-[9px] font-bold tracking-wider text-off-dim/70 uppercase">Verified</span>
                  )}
                </div>
                <p className="text-sm text-off-dim leading-relaxed line-clamp-4">&ldquo;{review.comment}&rdquo;</p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-display text-sm text-off tracking-wide">{review.name}</span>
                  <span className="text-[10px] text-off-dim/60">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
