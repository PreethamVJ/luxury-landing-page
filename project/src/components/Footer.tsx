import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-pink-400" />
              <h3 className="text-2xl font-bold text-white">Luxe Beauty</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Crafting premium beauty products since 2015. 
              Experience the perfect blend of nature and science for your skin.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#home" text="Home" />
              <FooterLink href="#products" text="Products" />
              <FooterLink href="#about" text="About Us" />
              <FooterLink href="#contact" text="Contact" />
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Customer Care</h4>
            <ul className="space-y-2">
              <FooterLink href="#" text="Help Center" />
              <FooterLink href="#" text="Shipping Info" />
              <FooterLink href="#" text="Returns & Exchanges" />
              <FooterLink href="#" text="Beauty Consultation" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400" />
                <span className="text-gray-400">hello@luxebeauty.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-pink-400" />
                <span className="text-gray-400">New York, NY 10012</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Subscribe for Beauty Tips & Exclusive Offers
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-r-full font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Luxe Beauty. All rights reserved. Crafted with love for your beauty.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ComponentType<{ className?: string }> }> = ({ icon: Icon }) => (
  <button className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300">
    <Icon className="w-5 h-5" />
  </button>
);

const FooterLink: React.FC<{ href: string; text: string }> = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
    >
      {text}
    </a>
  </li>
);

export default Footer;