import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.header-content',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  return (
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="header-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">Luxe Beauty</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-pink-600 transition-colors">Products</a>
            <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden bg-white border-t">
            <nav className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-pink-600 transition-colors">Home</a>
              <a href="#products" className="block text-gray-700 hover:text-pink-600 transition-colors">Products</a>
              <a href="#about" className="block text-gray-700 hover:text-pink-600 transition-colors">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;