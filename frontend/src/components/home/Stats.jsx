import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const stats = [
  { value: '200+', label: 'Destinations', sub: 'Across all 7 provinces' },
  { value: '50K+', label: 'Travelers', sub: 'Trust our guides' },
  { value: '4.9', label: 'Average Rating', sub: 'From verified reviews' },
  { value: '10K+', label: 'Travel Photos', sub: 'Shared by community' },
];

const avatars = [
  'https://i.pravatar.cc/40?img=47',
  'https://i.pravatar.cc/40?img=32',
  'https://i.pravatar.cc/40?img=15',
];

export default function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">

          {/* Left — photo with floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[48%] flex-shrink-0"
          >
            <div className="rounded-3xl overflow-hidden h-[460px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=100&fm=webp&fit=crop"
                alt="Nepal trekking"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating client badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-6 left-6 bg-white dark:bg-gray-900 rounded-2xl px-5 py-4 shadow-xl"
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none">50K+</p>
              <p className="text-xs text-gray-400 mt-1">Valuable Clients</p>
              <div className="flex -space-x-2 mt-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="client"
                    className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — text + stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">
              About Us
            </span>

            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white leading-tight">
              YatraLens<br />Uncharted Trails
            </h2>

            <p className="mt-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15px]">
              We are your ultimate Nepal travel companion, offering handpicked
              trekking routes, cultural experiences, and unforgettable journeys.
              Whether you seek high-altitude adventure or serene valley escapes,
              every detail is crafted with care.
            </p>

            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:gap-2.5 transition-all"
            >
              Learn More <FiArrowUpRight size={16} />
            </Link>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className={`${i % 2 === 0 ? '' : 'border-l border-gray-100 dark:border-gray-800 pl-6'}`}
                >
                  <p className="text-3xl md:text-4xl font-bold font-display text-primary-600 leading-none">
                    {s.value}
                  </p>
                  <p className="mt-1.5 font-semibold text-gray-800 dark:text-gray-200 text-sm">{s.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
