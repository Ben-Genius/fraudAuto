import { TestimonialsColumn } from "../ui/testimonials-column";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "FraudWall-Auto saved me from buying a stolen car! The VIN check revealed the vehicle was reported stolen. This service is essential for anyone buying used cars in Ghana.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    name: "Ama Osei",
    role: "Car Buyer, Accra",
  },
  {
    text: "As a car dealer, FraudWall-Auto helps me verify every vehicle before purchase. It's essential for maintaining trust with my customers and avoiding fraudulent vehicles.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Kofi Mensah",
    role: "Auto Dealer, Kumasi",
  },
  {
    text: "The license plate lookup feature is incredibly fast and accurate. Perfect for quick verification during police stops and investigations.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    name: "Inspector Adjei",
    role: "Ghana Police Service",
  },
  {
    text: "FraudWall-Auto has transformed how we verify vehicles in Ghana. Their integration with our systems has significantly reduced fraudulent registrations.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Kwame Asante",
    role: "DVLA Regional Director",
  },

];

export function Testimonials() {
  return (
    <section className="bg-gray-50 py-8 sm:py-10 md:py-12 lg:py-16 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 text-center">
            What Our <span className="text-primary-red">Customers</span> Say
          </h2>
          <p className="text-center mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-4 sm:px-0">
            See how FraudWall-Auto has helped thousands of Ghanaians make safer
            vehicle purchases.
          </p>
        </motion.div>

        <div className="relative mt-8 sm:mt-12 md:mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-4 sm:gap-6">
            <TestimonialsColumn testimonials={testimonials} duration={25} />
          </div>
        </div>
      </div>
    </section>
  );
}
