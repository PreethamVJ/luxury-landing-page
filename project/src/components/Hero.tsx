import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });
    
    tl.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo('.hero-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );

    tl.fromTo('.hero-image',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    // Text reveal animation on scroll
    if (textRef.current) {
      const words = textRef.current.textContent?.split(' ') || [];
      textRef.current.innerHTML = words.map(word => `<span class="text-word">${word}</span>`).join(' ');
      
      gsap.set('.text-word', { opacity: 0.3 });
      
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const words = gsap.utils.toArray('.text-word');
          
          words.forEach((word, index) => {
            const wordProgress = (progress * words.length) - index;
            const opacity = gsap.utils.clamp(0.3, 1, wordProgress);
            gsap.set(word, { opacity });
          });
        }
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-amber-50">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-gray-600">Trusted by 10,000+ customers</span>
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Your
              <span className="block text-pink-600">Natural Beauty</span>
            </h1>
            
            <p ref={textRef} className="hero-subtitle text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience premium beauty products crafted with the finest ingredients to enhance your natural radiance and boost your confidence every day.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button className="group bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="hero-image relative">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beauty Products"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
              
              {/* Floating Product Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Bestseller</p>
                    <p className="text-xs text-gray-600">Glow Serum</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg animate-bounce delay-500">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">New</p>
                    <p className="text-xs text-gray-600">Vitamin C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pink-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;