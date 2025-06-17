import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

const BestSelling: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Radiance Glow Serum",
      price: 45,
      originalPrice: 60,
      image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      category: "Skincare"
    },
    {
      id: 2,
      name: "Vitamin C Brightening Cream",
      price: 35,
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 89,
      category: "Skincare"
    },
    {
      id: 3,
      name: "Hydrating Face Mask",
      price: 25,
      originalPrice: 35,
      image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
      category: "Masks"
    },
    {
      id: 4,
      name: "Luxury Lip Treatment",
      price: 28,
      image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 203,
      category: "Lips"
    },
    {
      id: 5,
      name: "Anti-Aging Night Cream",
      price: 55,
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 178,
      category: "Skincare"
    },
    {
      id: 6,
      name: "Gentle Cleansing Oil",
      price: 32,
      originalPrice: 40,
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 145,
      category: "Cleansers"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    gsap.fromTo('.best-selling-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.best-selling-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.product-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getVisibleProducts = () => {
    if (isMobile) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  return (
    <section id="products" className="best-selling-section py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="best-selling-title text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Best Selling Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved beauty essentials that customers can't get enough of
          </p>
        </div>

        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-3 gap-8 products-grid">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile/Tablet Slider */}
          <div className="lg:hidden relative overflow-hidden">
            <div className="products-grid flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * (100 / getVisibleProducts())}%)` }}>
              {products.map((product) => (
                <div key={product.id} className={`flex-shrink-0 px-2 ${
                  isMobile ? 'w-full' : 'w-1/2'
                }`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-pink-200"
            >
              <ChevronLeft className="w-6 h-6 text-pink-600" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-pink-200"
            >
              <ChevronRight className="w-6 h-6 text-pink-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-pink-600' : 'bg-pink-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="product-card group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-pink-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'text-pink-500 fill-current' : 'text-gray-400'}`} />
        </button>
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {product.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSelling;