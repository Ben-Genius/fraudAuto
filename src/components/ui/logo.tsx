import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-gradient-to-br from-secondary-orange to-primary-red rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        FraudWall-Auto
      </span>
    </div>
  );
}
