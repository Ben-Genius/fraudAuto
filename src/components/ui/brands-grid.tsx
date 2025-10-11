"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  brands: Brand[];
  imageHeight?: number;
}

export const BrandsGrid = React.forwardRef<HTMLDivElement, BrandsGridProps>(
  (
    {
      className,
      title = "Trusted and loved by fast-growing companies worldwide",
      brands,
      // imageHeight = 56,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("py-0 bg-transparent", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          {title && (
            <p className="max-w-sm mx-auto text-pretty text-center font-medium mb-6 text-foreground md:text-lg">
              {title}
            </p>
          )}

          <div className="max-w-xs mx-auto grid grid-cols-2 items-center md:grid-cols-3 md:max-w-lg lg:grid-cols-4 lg:max-w-4xl gap-8">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 bg-transparent"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-20 w-auto object-contain bg-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
