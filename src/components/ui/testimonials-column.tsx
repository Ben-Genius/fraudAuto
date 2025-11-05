"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    image: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg max-w-xs w-full" key={i}>
                  <div className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{text}</div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      width={32}
                      height={32}
                      src={image}
                      alt={name}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium text-sm sm:text-base text-gray-900">{name}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
