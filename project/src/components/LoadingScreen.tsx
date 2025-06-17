import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.loading-icon', 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    );
    
    tl.fromTo('.loading-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.to('.loading-bar-fill',
      { width: '100%', duration: 1.5, ease: 'power2.inOut' },
      '-=0.3'
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loading-icon mb-8">
          <Sparkles className="w-16 h-16 text-pink-500 mx-auto" />
        </div>
        
        <div className="loading-text">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Luxe Beauty</h2>
          <p className="text-gray-600 mb-8">Premium Beauty</p>
        </div>

        <div className="w-64 h-1 bg-pink-200 rounded-full mx-auto overflow-hidden">
          <div className="loading-bar-fill h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-0"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;