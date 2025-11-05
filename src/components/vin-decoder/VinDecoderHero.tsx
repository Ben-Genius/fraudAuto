import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";

interface VinDecoderHeroProps {
  titles: string[];
}



export function VinDecoderHero({ titles }: VinDecoderHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex gap-4 sm:gap-6 md:gap-8 py-12 sm:py-16 md:py-20 lg:pt-32 px-4 sm:px-6 lg:px-8 items-center justify-center flex-col">
      {/* Badge Button */}
      <div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 sm:gap-4 border border-orange-200 text-orange-600 hover:bg-orange-50 text-xs sm:text-sm whitespace-nowrap"
        >
          <span className="hidden xs:inline">🇬🇭</span>
          <span className="hidden sm:inline">
            Official Ghana DVLA Integration
          </span>
          <span className="inline sm:hidden">Ghana DVLA</span>
          <MoveRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>

      {/* Main Heading with Animated Text */}
      <div className="w-full px-2 sm:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto tracking-tight sm:tracking-tighter pb-4 text-center leading-tight">
          <span className="text-gray-900">Vehicle verification that's </span>
          <br className="sm:hidden" />
          <span className="relative h-[1.2em] overflow-visible inline-block w-full text-center">
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-orange-600 whitespace-nowrap"
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? {
                        y: 0,
                        opacity: 1,
                      }
                    : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-tight text-gray-600 max-w-3xl mx-auto font-light px-2 sm:px-4 text-center mt-4 sm:mt-6">
          Comprehensive VIN decoding and vehicle history reports powered by
          Ghana DVLA, Police Service, and insurance databases. Protect your
          investment with real-time verification.
        </p>
      </div>

      {/* Feature Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-500 w-full max-w-2xl px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Real-time verification</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Official database access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
          <span className="whitespace-nowrap">Instant results</span>
        </div>
      </div>
    </div>
  );
}
