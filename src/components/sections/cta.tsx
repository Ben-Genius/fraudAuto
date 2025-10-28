"use client";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { BoxesCore } from "../ui/boxes-core";
import { motion } from "framer-motion";

export function CTA() {
  const [showSecondTypewriter, setShowSecondTypewriter] = useState(false);
  const [hideFirstCursor, setHideFirstCursor] = useState(false);

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
    // Start second typewriter after first one completes (2.5s duration + 0.5s delay)
    const timer1 = setTimeout(() => {
      setHideFirstCursor(true);
      setShowSecondTypewriter(true);
    }, 3000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="w-full py-20 lg:py-10 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-5">
      <BoxesCore />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-secondary-orange text-white mb-8">
              Get started
            </Badge>
          </motion.div>

          <div className="flex flex-col gap-4 items-center">
            <TypewriterEffectSmooth
              words={descriptionWords}
              className="text-lg leading-relaxed tracking-tight max-w-full justify-center"
              hideCursor={hideFirstCursor}
            />
            
            {showSecondTypewriter && (
              <TypewriterEffectSmooth
                words={words}
                className="max-w-4xl"
                cursorClassName="bg-secondary-orange"
              />
            )}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 6 }}
              viewport={{ once: true }}
              className="text-gray-300 text-center max-w-xl mt-4"
            >
              Our comprehensive verification service helps you make informed
              decisions and avoid costly mistakes. Start with a free VIN check
              today.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 6.5 }}
            viewport={{ once: true }}
            className="flex flex-row gap-4 mt-8"
          >
            <Button
              variant="outline"
              className="gap-4 border-white/30 text-white bg-secondary-orange"
            >
              <PhoneCall className="w-4 h-4" />
              Contact Support
            </Button>
            <Button
              asChild
              className="gap-4 bg-primary-red hover:from-secondary-orange/90 hover:to-primary-red/90 text-white border-0"
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
