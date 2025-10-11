import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedGroup } from "../ui/animated-group";
import { HeroSearch } from "../ui/hero-search";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] w-full bg-no-repeat bg-cover bg-center text-sm pb-34">
      <div className="relative pt-8 md:pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
            <AnimatedGroup variants={transitionVariants}>
              <Link
                to="/pricing"
                className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32"
              >
                <span>Protect Your Vehicle Investment</span>
                <div className="flex items-center gap-1 font-medium">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <h1 className="text-4xl md:text-7xl font-semibold font-sans max-w-7xl text-center mx-auto mt-8">
                Combat Vehicle{" "}
                <span className="text-secondary-orange"> Fraud </span>
                Ghana
              </h1>

              <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
                Comprehensive VIN decoding, vehicle servicce or maintenance
                history, license plate verification, and vehicle history
                reports. Integrated with Ghana's DVLA and Police Service for
                real-time fraud detection.
              </p>
            </AnimatedGroup>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12"
            >
              <HeroSearch />
            </AnimatedGroup>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mx-auto w-full flex items-center justify-center gap-3 mt-4"
            >
              <Button
                asChild
                className="bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition"
              >
                <Link to="/vin-decoder">
                  <span>Start Verification</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 border border-slate-300 hover:bg-slate-200/30 rounded-full px-6 py-3"
              >
                <Link to="/pricing">
                  <span>View Pricing</span>
                  <svg
                    width="6"
                    height="8"
                    viewBox="0 0 6 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M1.25.5 4.75 4l-3.5 3.5"
                      stroke="#050040"
                      strokeOpacity=".4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
