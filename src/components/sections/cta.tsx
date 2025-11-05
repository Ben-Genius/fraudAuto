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
  const [hideFirstCursor, setHideFirstCursor] = useState(false);
  const [startFirstAnimation, setStartFirstAnimation] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const words = [
    {
      text: "Protect",
      className: "text-white",
    },
    {
      text: "Your",
      className: "text-white",
    },
    {
      text: "Vehicle",
      className: "text-secondary-orange",
    },
    {
      text: "Investment",
      className: "text-primary-red",
    },
    {
      text: "Today",
      className: "text-white",
    },
  ];

  const descriptionWords = [
    {
      text: "Don't",
      className: "text-gray-300",
    },
    {
      text: "risk",
      className: "text-gray-300",
    },
    {
      text: "buying",
      className: "text-gray-300",
    },
    {
      text: "stolen",
      className: "text-primary-red",
    },
    {
      text: "or",
      className: "text-gray-300",
    },
    {
      text: "damaged",
      className: "text-secondary-orange",
    },
    {
      text: "vehicles",
      className: "text-gray-300",
    },
  ];

  useEffect(() => {
    if (!isInView) return;
    
    // Start first animation when in view
    setStartFirstAnimation(true);
    
    // First typewriter: 2s duration + 0.5s delay = 2.5s total
    // Wait for first to completely finish, then start second
    const timer1 = setTimeout(() => {
      setHideFirstCursor(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      setShowSecondTypewriter(true);
    }, 2600); // Small gap after first finishes

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isInView]);

  return (
    <div className="w-full py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-8 sm:pb-12">
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
            <TypewriterEffectSmooth
              words={descriptionWords}
              className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight max-w-full justify-center -mb-0"
              hideCursor={hideFirstCursor}
              startAnimation={startFirstAnimation}
            />

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
              className="text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-xs sm:max-w-lg md:max-w-xl mt-1 px-4 sm:px-0"
            >
              Our comprehensive verification service helps you make informed
              decisions and avoid costly mistakes. Start with a free VIN check
              today.
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
              Contact Support
            </Button>
            <Button
              asChild
              className="gap-2 sm:gap-4 bg-primary-red hover:from-secondary-orange/90 hover:to-primary-red/90 text-white border-0 w-full sm:w-auto"
            >
              <Link to="/vin-decoder">
                Start Verification <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
