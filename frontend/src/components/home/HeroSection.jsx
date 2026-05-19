import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar } from 'react-icons/fi';

const slideUp = (delay = 0) => ({
  initial: { y: 20 },
  animate: { y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1686634664616-be12017d2b4c?w=2560&q=100&fm=webp&fit=crop&crop=center"
          alt="Nepal Himalayas"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>

      {/* Content row */}
      <div className="relative z-10 h-full flex items-center container-custom gap-12">

        {/* ── Left: text ── */}
        <div className="flex flex-col flex-1 min-w-0">

          <motion.div {...slideUp(0)} className="mb-5 mt-20 md:mt-0">
            <span className="inline-flex items-center gap-1.5 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.18] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.25)] text-white text-xs px-3 py-1.5 rounded-full">
              Trekking starts from{' '}
              <span className="font-bold text-xs">$299/day</span>
            </span>
          </motion.div>

          <motion.div {...slideUp(0.08)}>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight">
              <span className="block text-white text-[clamp(2.8rem,6vw,5.8rem)]">Your Next</span>
              <span className="block text-white text-[clamp(2.8rem,6vw,5.8rem)]">Adventure</span>
              <span className="block text-white/45 text-[clamp(2.8rem,6vw,5.8rem)]">Starts Here</span>
            </h1>
          </motion.div>

          <motion.p
            {...slideUp(0.18)}
            className="mt-6 text-white/70 text-sm md:text-base leading-relaxed max-w-xs"
          >
            Explore handpicked treks, sacred temples, and hidden valleys across Nepal.
            Unplug, unwind, and reconnect with what matters most.
          </motion.p>

          <motion.div {...slideUp(0.28)} className="mt-8 flex items-center gap-4">
            <Link
              to="/explore"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
            >
              Start Exploring
            </Link>
            <Link
              to="/about"
              className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Learn more
            </Link>
          </motion.div>
        </div>

        {/* ── Right: stacked photo cards (desktop only) ── */}
        <motion.div
          initial={{ x: 30 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block relative flex-shrink-0 w-[480px] h-[470px]"
        >
          {/* Card 1 — Pokhara (top-left, behind) */}
          <div className="absolute top-0 left-0 w-[400px] h-[280px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1750199884692-f1cf7a8a19b5?w=1200&q=100&fm=webp&fit=crop&crop=center"
              alt="Pokhara"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1.5 text-white/70 mb-1">
                <FiMapPin size={11} />
                <span className="text-xs">Nepal</span>
              </div>
              <p className="text-white font-semibold text-sm leading-tight">Pokhara</p>
            </div>
          </div>

          {/* Card 2 — Annapurna (bottom-right, in front) */}
          <div className="absolute bottom-0 right-0 w-[370px] h-[280px] rounded-3xl overflow-hidden shadow-2xl z-10">
            <img
              src="https://images.unsplash.com/photo-1545662618-66de187bbf69?w=1000&q=100&fm=webp&fit=crop&crop=center"
              alt="Annapurna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1.5 text-white/70 mb-1">
                <FiMapPin size={11} />
                <span className="text-xs">Nepal</span>
              </div>
              <p className="text-white font-semibold text-sm leading-tight">Annapurna Range</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
              <div className="flex items-center gap-1">
                <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-sm">4.9</span>
              </div>
              <p className="text-white/60 text-[10px] mt-0.5">12K+ reviews</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
