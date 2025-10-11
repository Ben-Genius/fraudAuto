import { useState, useEffect, useMemo } from "react";
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
    <div className="flex gap-8 py-20 lg:pt-32 items-center justify-center flex-col">
      <div>
        <Button
          variant="outline"
          size="sm"
          className="gap-4 border-theme-orange-1/20 text-theme-red-orange hover:bg-theme-orange-1/5"
        >
          🇬🇭 Official Ghana DVLA Integration{" "}
          <MoveRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="w-full">
        <h1 className="text-5xl max-w-5xl md:text-7xl mx-auto tracking-tighter pb-4">
          <span className="text-gray-900">
            Vehicle verification that's{" "}
          </span>
          <span className="relative w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-[#FC612D]">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-semibold text-theme-red-orange"
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

        <p className="text-xl text-center md:text-2xl leading-relaxed tracking-tight text-gray-600 max-w-3xl mx-auto font-light">
          Comprehensive VIN decoding and vehicle history reports powered by
          Ghana DVLA, Police Service, and insurance databases. Protect your
          investment with real-time verification.
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary-orange rounded-full"></div>
          <span>Real-time verification</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary-golden-yellow rounded-full"></div>
          <span>Official database access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary-dark-red rounded-full"></div>
          <span>Instant results</span>
        </div>
      </div>
    </div>
  );
}
