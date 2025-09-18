'use client';

import { motion, type Variants } from 'framer-motion';
import React from 'react';

interface AnimatedGroupProps {
  children: React.ReactNode;
  variants?: {
    container?: Variants;
    item?: Variants;
  } | any;
  className?: string;
}

export function AnimatedGroup({ children, variants, className }: AnimatedGroupProps) {
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  };

  // Handle both simple and complex variant structures
  const containerVariants = variants?.container || defaultVariants.container;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
