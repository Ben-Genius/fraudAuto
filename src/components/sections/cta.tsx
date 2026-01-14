"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { BoxesCore } from "../ui/boxes-core";
import { motion } from "framer-motion";

export function CTA() {
  const [showSecondTypewriter, setShowSecondTypewriter] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const words = [
    {
      text: "Start",
      className: "text-white",
    },
    {
      text: "Verifying",
      className: "text-secondary-orange",
    },
    {
      text: "with",
      className: "text-white",
    },
    {
      text: "Confidence",
      className: "text-primary-red",
    },
  ];



  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowSecondTypewriter(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isInView]);

  return (
    <div className="w-full py-12 sm:py-16  relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-8 sm:pb-12">
      <BoxesCore />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-secondary-orange text-white mb-1 text-xs sm:text-sm">
              Get started
            </Badge>
          </motion.div>

          <div className="flex flex-col items-center px-4 sm:px-0">


            {showSecondTypewriter && (
              <TypewriterEffectSmooth
                words={words}
                className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                cursorClassName="bg-secondary-orange"
                startAnimation={true}
              />
            )}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.5 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-xs sm:max-w-lg md:max-w-xl mt-4 px-4 sm:px-0"
            >
              Join the national movement toward transparent, fraud-free vehicle transactions
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button
              variant="outline"
              className="gap-2 sm:gap-4 border-white/30 text-white bg-secondary-orange w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4" />
              Contact for Institutional Access
            </Button>
            <Button
              asChild
              className="gap-2 sm:gap-4 bg-primary-red hover:from-secondary-orange/90 hover:to-primary-red/90 text-white border-0 w-full sm:w-auto"
            >
              <Link to="/vin-decoder">
                Verify a Vehicle Now <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
