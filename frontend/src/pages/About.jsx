import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiUsers, FiCamera, FiAward } from 'react-icons/fi';

const values = [
  {
    num: '01',
    title: 'Authentic Experiences',
    desc: 'Every destination is hand-picked and reviewed by locals — not algorithms. We go beyond the tourist trail into the real Nepal.',
    icon: FiMapPin,
  },
  {
    num: '02',
    title: 'Community Driven',
    desc: 'Built by Nepali explorers for curious travellers. Real stories, real reviews, and a growing community sharing what they love.',
    icon: FiUsers,
  },
  {
    num: '03',
    title: 'Visual Storytelling',
    desc: 'Nepal deserves to be seen in its full beauty. We pair every destination with photography that does justice to the landscape.',
    icon: FiCamera,
  },
  {
    num: '04',
    title: 'Responsible Tourism',
    desc: 'We actively support local businesses and eco-friendly travel. Every booking through us contributes to local communities.',
    icon: FiAward,
  },
];

const team = [
  { name: 'Subash Shrestha', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fm=webp&fit=crop&crop=face' },
  { name: 'Anita Tamang', role: 'Head of Content', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp&fit=crop&crop=face' },
  { name: 'Bikash Rai', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp&fit=crop&crop=face' },
  { name: 'Sita Gurung', role: 'Travel Curator', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fm=webp&fit=crop&crop=face' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90&fm=webp&fit=crop"
          alt="Nepal mountains"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Hero text — sits above the stats bar */}
        <div className="relative z-10 container-custom pb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary-400 text-sm font-bold tracking-[0.25em] uppercase mb-5"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl text-white leading-[1.05] max-w-3xl"
          >
            We exist to show
            <br />
            the <span className="text-primary-400">real Nepal</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-white/70 text-base md:text-lg max-w-lg leading-relaxed"
          >
            Not just Everest. Not just Pokhara. The hidden valleys, ancient
            monasteries, teahouses, and riverside cafes that most travellers never find.
          </motion.p>
        </div>

      </section>

      {/* ── STORY ── */}
      <section className="py-24 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">How it started</span>
              <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white leading-tight">
                Born from a love<br />for the mountains
              </h2>
              <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                Explore Nepal started with a frustration — most travel platforms showed the same 10 places
                and the same stock photos. But Nepal has over 200 distinct destinations, each with its own
                culture, terrain, and story.
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                We set out to build the most comprehensive, community-driven Nepal travel guide on the internet.
                Every listing is researched on the ground. Every photo is genuine. Every review is verified.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Nepal-first', 'Community verified', 'Locally sourced', 'Free to explore'].map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Images collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative h-[480px]"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80&fm=webp&fit=crop"
                alt="Pokhara"
                className="absolute top-0 left-0 w-[62%] h-[58%] object-cover rounded-2xl shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80&fm=webp&fit=crop"
                alt="Everest trail"
                className="absolute bottom-0 right-0 w-[58%] h-[58%] object-cover rounded-2xl shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80&fm=webp&fit=crop"
                alt="Kathmandu"
                className="absolute bottom-8 left-4 w-[36%] h-[40%] object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-950"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24">
        <div className="container-custom">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-16">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600"
              >
                What we stand for
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white"
              >
                Our principles
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 lg:text-right text-sm leading-relaxed max-w-sm lg:ml-auto"
            >
              Four beliefs that shape every decision we make at Explore Nepal — from what we list to how we build.
            </motion.p>
          </div>

          {/* Numbered rows */}
          <div className="border-t border-gray-100 dark:border-gray-800">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative border-b border-gray-100 dark:border-gray-800 py-9 pl-5 overflow-hidden cursor-default"
              >
                {/* Sliding left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-600 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12">
                  {/* Number */}
                  <span className="font-display font-bold text-6xl text-gray-100 dark:text-gray-800 group-hover:text-primary-100 dark:group-hover:text-primary-950 transition-colors leading-none w-16 flex-shrink-0">
                    {v.num}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 md:w-60 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 flex-shrink-0">
                      <v.icon size={18} className="text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug">
                      {v.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 dark:text-gray-500 leading-relaxed text-sm flex-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600"
              >
                The people
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white"
              >
                Meet the team
              </motion.h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              A small crew of Nepali explorers and engineers passionate about their country.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-[3/4] mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary-600 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gray-950 dark:bg-black">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-white mb-6"
          >
            Ready to explore Nepal?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-10 max-w-lg mx-auto"
          >
            200+ destinations, verified reviews, and a community of travellers who know Nepal inside out.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Start Exploring <FiArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
