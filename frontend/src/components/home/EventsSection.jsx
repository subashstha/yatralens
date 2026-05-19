import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const events = [
  {
    id: 1,
    title: 'Everest Trail Race 2025',
    date: '29 May 2025',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    slug: 'everest-trail-race-2025',
  },
  {
    id: 2,
    title: 'Indra Jatra: Kathmandu Cultural Festival',
    date: '18 September 2025',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    slug: 'indra-jatra-2025',
  },
  {
    id: 3,
    title: 'Tiji Festival, Upper Mustang',
    date: '02 June 2025',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    slug: 'tiji-festival-mustang-2025',
  },
];

export default function EventsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-widest uppercase text-gray-900 dark:text-white">
            Events &amp; Festivals
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
            Discover Nepal's most celebrated cultural events and festivals that bring the nation alive.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base leading-snug group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-gray-400 dark:text-gray-500 text-xs">
                      {event.date}
                    </p>
                  </div>

                  {/* Arrow button */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-colors">
                    <FiArrowRight
                      size={15}
                      className="text-gray-400 group-hover:text-white transition-colors"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 text-center"
        >
          <Link
            to="/blog"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors"
          >
            View all events
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
