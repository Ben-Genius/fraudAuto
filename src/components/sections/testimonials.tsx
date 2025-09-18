import { TestimonialsColumn } from '../ui/testimonials-column';
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "FraudAuto saved me from buying a stolen car! The VIN check revealed the vehicle was reported stolen. This service is essential for anyone buying used cars in Ghana.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    name: "Ama Osei",
    role: "Car Buyer, Accra",
  },
  {
    text: "As a car dealer, FraudAuto helps me verify every vehicle before purchase. It's essential for maintaining trust with my customers and avoiding fraudulent vehicles.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Kofi Mensah",
    role: "Auto Dealer, Kumasi",
  },
  {
    text: "The license plate lookup feature is incredibly fast and accurate. Perfect for quick verification during police stops and investigations.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    name: "Inspector Adjei",
    role: "Ghana Police Service",
  },
  {
    text: "FraudAuto has transformed how we verify vehicles in Ghana. Their integration with our systems has significantly reduced fraudulent registrations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Kwame Asante",
    role: "DVLA Regional Director",
  },
  {
    text: "The comprehensive vehicle history reports helped me make an informed decision. Found out about previous accidents that weren't disclosed by the seller.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Akosua Frimpong",
    role: "Teacher, Cape Coast",
  },
  {
    text: "Quick, reliable, and affordable. FraudAuto's VIN decoder gave me all the technical specifications I needed before purchasing my truck.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    name: "Yaw Boateng",
    role: "Business Owner, Takoradi",
  },
  {
    text: "The real-time integration with official databases gives me confidence in the accuracy of the reports. Highly recommend for all vehicle purchases.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    name: "Efua Asante",
    role: "Insurance Agent, Tema",
  },
  {
    text: "FraudAuto's customer support is exceptional. They guided me through the entire process and answered all my questions promptly.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    name: "Kwaku Owusu",
    role: "Mechanic, Sunyani",
  },
  {
    text: "The mobile app makes it easy to check vehicles on the go. Perfect for my work as a vehicle inspector. Clean interface and fast results.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    name: "Abena Sarpong",
    role: "Vehicle Inspector, Ashanti",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-gray-50 py-10 relative">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm mb-6">
            <span className="text-sm font-medium text-gray-700">Testimonials</span>
          </div>

          <h2 className="text-3xl font-medium lg:text-4xl mb-4 text-center">
            What Our Customers Say
          </h2>
          <p className="text-center mt-5 text-gray-600 leading-relaxed">
            See how FraudAuto has helped thousands of Ghanaians make safer vehicle purchases.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px]  mx-auto overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
