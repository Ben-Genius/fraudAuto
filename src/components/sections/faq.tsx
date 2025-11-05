"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is a FraudWall-Auto Vehicle History Report?",
    answer:
      "A FraudWall-Auto Vehicle History Report provides comprehensive information about a vehicle's past, including ownership history, accident records, theft status, and technical specifications. Our reports are compiled from official sources including Ghana's DVLA and Police Service databases.",
  },
  {
    question: "How accurate are FraudWall-Auto reports?",
    answer:
      "Our reports maintain a 99.9% accuracy rate by sourcing data directly from official government databases, insurance companies, and verified automotive sources. We continuously update our databases to ensure the most current information.",
  },
  {
    question: "Do FraudWall-Auto reports cover all vehicles in Ghana?",
    answer:
      "We provide reports for vehicles registered in Ghana through the DVLA system. Our database covers cars, trucks, motorcycles, and commercial vehicles. Some very old vehicles or those with incomplete registration records may have limited information available.",
  },
  {
    question: "Where can I find a vehicle's VIN number?",
    answer:
      "The VIN (Vehicle Identification Number) is typically located on the dashboard near the windshield on the driver's side, on the driver's side door frame, or in the engine compartment. It's also printed on your vehicle registration documents and insurance papers.",
  },
  {
    question: "How much does a vehicle history report cost?",
    answer:
      "We offer a free basic VIN check that includes theft status and basic vehicle information. Comprehensive reports start from GHS 25 for a single report, with discounted packages available for multiple reports or dealer accounts.",
  },
  {
    question: "How quickly will I receive my report?",
    answer:
      "Most reports are generated instantly after payment confirmation. In rare cases where additional verification is needed, reports may take up to 24 hours. You'll receive your report via email and can also access it through your account dashboard.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0">
            Everything you need to know about FraudWall-Auto vehicle
            verification
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex flex-1 items-center justify-between gap-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left w-full bg-white hover:bg-gray-50/70 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-orange flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-base sm:text-lg font-medium text-zinc-700 tracking-wide text-left">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 transition-transform group-hover:scale-105 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-800" />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 sm:mt-4 ml-7 sm:ml-14">
                    <div className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-md transition-all">
                      <span className="flex-1 text-sm sm:text-base leading-relaxed text-gray-700">
                        {faq.answer}
                      </span>
                      <div className="flex h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-orange/20 transition-transform hover:scale-105">
                        <MessageCircle className="h-3 w-3 sm:h-5 sm:w-5 text-secondary-orange" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg sm:text-xl">
                  ★
                </span>
              ))}
            </div>
            <span className="font-semibold text-base sm:text-lg">4.9 out of 5</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            Based on 2,346 customer reviews
          </p>
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
            ✓ Recommend this service
          </div>
        </motion.div>
      </div>
    </section>
  );
}
