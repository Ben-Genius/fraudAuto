import { Marquee } from '../ui/marquee';
import { vehicleBrands } from '../../assets/images';

export function VinMakes() {
  return (
    <section className="py-16 md:py-24 bg-white">

      <div className="mx-auto max-w-8xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium lg:text-4xl mb-4">
            VIN Decoding for All Major Vehicle Makes
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive vehicle information for cars sold in Ghana
          </p>
        </div>

        <Marquee brands={vehicleBrands} className="mb-8" />

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see your vehicle make? We support over 100+ manufacturers
            worldwide.
          </p>
          <button className="text-secondary-orange hover:text-primary-red font-medium">
            View All Supported Makes →
          </button>
        </div>
      </div>
    </section>
  );
}
