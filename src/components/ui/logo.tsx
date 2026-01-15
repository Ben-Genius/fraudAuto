import { cn } from "../../lib/utils";

import { IMAGES } from "../../assets/images";

interface LogoProps {
  className?: string;
  variant?: 'default' | 'icon';
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, variant = 'default', iconClassName, textClassName }: LogoProps) {
  return (
      <img
        src={IMAGES.autoLogo}
        alt="FraudWall Logo"
        className={cn("w-40 object-contain", iconClassName)}
      />
     
  );
}
