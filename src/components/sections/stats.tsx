"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: "50K+",
      target: 50000,
      label: "Vehicles Verified",
      color: "text-secondary-orange",
      suffix: "K+"
    },
    {
      number: "1,200+",
      target: 1200,
      label: "Fraud Cases Prevented",
      color: "text-primary-red",
      suffix: "+"
    },
    {
      number: "24/7",
      target: 24,
      label: "Real-time Monitoring",
      color: "text-secondary-orange",
      suffix: "/7"
    },
    {
      number: "99.9%",
      target: 99.9,
      label: "Accuracy Rate",
      color: "text-primary-red",
      suffix: "%"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      let start = 0;
      const duration = 2000;
      const increment = stat.target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.target) {
          start = stat.target;
          clearInterval(timer);
        }
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = start;
          return newValues;
        });
      }, 16);
    });
  };

  const formatNumber = (value: number, index: number) => {
    if (index === 0) return `${Math.floor(value / 1000)}K+`;
    if (index === 1) return `${Math.floor(value).toLocaleString()}+`;
    if (index === 2) return `${Math.floor(value)}/7`;
    if (index === 3) return `${value.toFixed(1)}%`;
    return value.toString();
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-medium lg:text-4xl mb-4">
            Trusted by Thousands Across Ghana
          </h2>
          <p className="text-lg text-gray-600">
            Our platform has helped prevent vehicle fraud and protect investments nationwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                bounce: 0.4
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div 
                className={`text-4xl md:text-5xl font-bold mb-2 ${stats[index].color} transition-colors duration-300`}
                animate={isVisible ? { 
                  textShadow: [
                    "0 0 0px rgba(251,140,0,0)",
                    "0 0 10px rgba(251,140,0,0.3)",
                    "0 0 0px rgba(251,140,0,0)"
                  ]
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {isVisible ? formatNumber(animatedValues[index], index) : "0"}
              </motion.div>
              <motion.div 
                className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {stats[index].label}
              </motion.div>
              
              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-secondary-orange to-primary-red mx-auto mt-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ width: "80%" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary-orange/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * 400,
                opacity: 0
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
