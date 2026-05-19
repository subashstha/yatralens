import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';

const footerLinks = {
  Explore: [
    { name: 'Destinations', path: '/explore' },
    { name: 'Categories', path: '/categories' },
    { name: 'Trekking', path: '/categories/trekking' },
    { name: 'Hidden Gems', path: '/categories/hidden-gem' },
    { name: 'Adventure', path: '/categories/adventure' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ],
  Account: [
    { name: 'Sign In', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Saved Places', path: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Explore <span className="text-primary-500">Nepal</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your ultimate guide to discovering authentic Nepal — from snow-capped peaks to hidden valleys, ancient temples to vibrant cafes.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
              <FiMapPin size={14} className="text-primary-500" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
              <FiMail size={14} className="text-primary-500" />
              <span>hello@explorenepal.com</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400 mb-6">
              <FiPhone size={14} className="text-primary-500" />
              <span>+977 9800000000</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: FiFacebook, href: '#' },
                { icon: FiInstagram, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiYoutube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Explore Nepal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <FiHeart size={14} className="text-primary-500" /> for Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
