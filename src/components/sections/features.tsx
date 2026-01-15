"use client";
import { AlertTriangle, Gauge, Wrench, Flag, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      title: "Theft & Salvage History",
      description: "Cross-check against international stolen vehicle databases and salvage records",
      icon: AlertTriangle,
    },
    {
      title: "Mileage & Odometer Anomalies",
      description: "Detect odometer rollback and mileage inconsistencies across service records",
      icon: Gauge,
    },
    {
      title: "Maintenance & Service Records",
      description: "Comprehensive service history verification from authorized service centers",
      icon: Wrench,
    },
    {
      title: "Import & Registration Red Flags",
      description: "Identify documentation irregularities and registration inconsistencies",
      icon: Flag,
    },
    {
      title: "Active Safety Recalls",
      description: "Real-time alerts on manufacturer recalls and safety notices",
      icon: Bell,
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut" as const
        },
        scale: {
          duration: 0.3,
          ease: "easeOut" as const
        }
      }
    }
  };

  return (
    <section className="py-0 sm:py-10 bg-white relative overflow-hidden">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4"
          >
            What We <span className="text-primary-red">Reveal</span> Before You Buy
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.65, 0, 0.35, 1]
            }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-primary-red to-primary-orange mx-auto mt-6 rounded-full w-24 origin-center"
          />
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
            
                className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-md border border-gray-200/80 flex gap-5 items-start transition-all duration-300 hover:border-primary-red/30 cursor-pointer overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-primary-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="relative bg-slate-900 p-3 rounded-xl shrink-0 group-hover:bg-gradient-to-br group-hover:from-primary-red group-hover:to-primary-orange transition-all duration-500 shadow-lg group-hover:shadow-primary-red/30"
                >
                  <Icon className="w-6 h-6 text-white relative z-10" />

                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 blur-md"
                    initial={false}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative flex-1">
                  <motion.h3
                    className="text-lg font-medium text-gray-900 mb-3 group-hover:text-primary-red transition-colors duration-300"
                    initial={false}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-sm  leading-relaxed"
                    initial={false}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-red/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}