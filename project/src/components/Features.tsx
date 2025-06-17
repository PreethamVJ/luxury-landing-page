import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Truck, Award, Headphones, Leaf, Heart } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "100% organic and cruelty-free formulations for your skin's health"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary delivery on orders over $50 worldwide"
    },
    {
      icon: Award,
      title: "Dermatologist Tested",
      description: "All products are clinically tested and approved by experts"
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Join thousands of satisfied customers who trust our products"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee on all our beauty products"
    },
    {
      icon: Headphones,
      title: "Beauty Support",
      description: "Expert beauty consultants available 24/7 for personalized advice"
    }
  ];

  useEffect(() => {
    gsap.fromTo('.features-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.feature-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="features-section py-20 bg-gradient-to-br from-pink-50 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="features-title text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Luxe Beauty?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to quality, sustainability, and your beauty journey
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-pink-500/20 rounded-full mx-auto animate-ping opacity-75 group-hover:opacity-100"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;