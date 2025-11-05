import { Marquee } from '../ui/marquee';
import { vehicleBrands } from '../../assets/images';

export function VinMakes() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
            VIN Decoding for All Major Vehicle Makes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0">
            Comprehensive vehicle information for cars sold in Ghana
          </p>
        </div>

        <Marquee brands={vehicleBrands} className="mb-6 sm:mb-8" />

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4 sm:px-0">
            Don't see your vehicle make? We support over 100+ manufacturers
            worldwide.
          </p>
          <button className="text-secondary-orange hover:text-primary-red font-medium text-sm sm:text-base transition-colors">
            View All Supported Makes →
          </button>
        </div>
      </div>
    </section>
  );
}
