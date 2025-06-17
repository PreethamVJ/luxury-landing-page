import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "Are your products suitable for sensitive skin?",
      answer: "Yes, all our products are dermatologist-tested and formulated with gentle, natural ingredients. We specifically design our formulations to be suitable for sensitive skin types, and many of our products are hypoallergenic."
    },
    {
      id: 2,
      question: "Do you offer international shipping?",
      answer: "Absolutely! We ship worldwide with express delivery options. International orders include tracking and are carefully packaged to ensure your beauty products arrive in perfect condition."
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return unused products in their original packaging for a full refund."
    },
    {
      id: 4,
      question: "Are your products cruelty-free?",
      answer: "Yes, we are 100% cruelty-free and never test on animals. We're also certified by Leaping Bunny, the gold standard for cruelty-free cosmetics. Many of our products are also vegan-friendly."
    },
    {
      id: 5,
      question: "How do I choose the right products for my skin type?",
      answer: "We offer a free online skin consultation tool on our website. You can also contact our beauty experts who are available 24/7 to provide personalized recommendations based on your skin concerns and goals."
    },
    {
      id: 6,
      question: "Do you offer samples or trial sizes?",
      answer: "Yes! We offer sample sizes of most products so you can try before committing to full sizes. We also include complimentary samples with every order so you can discover new favorites."
    }
  ];

  useEffect(() => {
    gsap.fromTo('.faq-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.faq-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <section className="faq-section py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="faq-title text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our beauty products and services
          </p>
        </div>

        <div className="faq-list space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  const answerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        gsap.fromTo(answerRef.current,
          { height: 0, opacity: 0 },
          { 
            height: 'auto', 
            opacity: 1, 
            duration: 0.5, 
            ease: 'power2.out'
          }
        );
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="faq-item bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-pink-100">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-pink-50/50 transition-colors duration-200"
      >
        <span className="text-lg font-semibold text-gray-800 pr-4">
          {faq.question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-5 h-5 text-white" />
          ) : (
            <Plus className="w-5 h-5 text-white" />
          )}
        </div>
      </button>
      
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: isOpen ? 'auto' : 0 }}
      >
        <div className="px-8 pb-6">
          <p className="text-gray-600 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;