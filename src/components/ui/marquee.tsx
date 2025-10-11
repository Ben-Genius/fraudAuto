import { cn } from "../../lib/utils";

interface Brand {
  name: string;
  logo: string;
}

interface MarqueeProps {
  brands: Brand[];
  className?: string;
}

export function Marquee({ brands, className }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex animate-marquee">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-20 w-auto object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
