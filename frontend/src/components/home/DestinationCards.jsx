import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const cards = [
  {
    src: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80',
    label: 'Kathmandu',
    rotate: -8,
    h: 'h-36 md:h-44',
    w: 'w-24 md:w-32',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    label: 'Pokhara',
    rotate: -3,
    h: 'h-44 md:h-52',
    w: 'w-28 md:w-36',
  },
  {
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
    label: 'Everest',
    rotate: 0,
    h: 'h-52 md:h-64',
    w: 'w-32 md:w-44',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    label: 'Annapurna',
    rotate: 3,
    h: 'h-44 md:h-52',
    w: 'w-28 md:w-36',
  },
  {
    src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80',
    label: 'Mustang',
    rotate: 8,
    h: 'h-36 md:h-44',
    w: 'w-24 md:w-32',
  },
];

export default function DestinationCards() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container-custom text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white"
        >
          Plan Your Next Trip With
          <br />
          <span className="text-primary-600">Confidence And Ease</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-md mx-auto"
        >
          Join thousands of travellers who've explored Nepal with confidence and comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-6"
        >
          <Link
            to="/explore"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          >
            Book Your Trek
          </Link>
        </motion.div>
      </div>

      {/* Photo fan */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="flex justify-center items-end gap-2 md:gap-3 px-4"
      >
        {cards.map((card) => (
          <div
            key={card.label}
            className={`relative rounded-2xl overflow-hidden flex-shrink-0 shadow-xl ${card.w} ${card.h}`}
            style={{ transform: `rotate(${card.rotate}deg)`, transformOrigin: 'bottom center' }}
          >
            <img
              src={card.src}
              alt={card.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-3 text-white text-xs font-semibold tracking-wide">
              {card.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
