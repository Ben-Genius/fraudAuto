"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is a FraudAuto Vehicle History Report?',
    answer: 'A FraudAuto Vehicle History Report provides comprehensive information about a vehicle\'s past, including ownership history, accident records, theft status, and technical specifications. Our reports are compiled from official sources including Ghana\'s DVLA and Police Service databases.'
  },
  {
    question: 'How accurate are FraudAuto reports?',
    answer: 'Our reports maintain a 99.9% accuracy rate by sourcing data directly from official government databases, insurance companies, and verified automotive sources. We continuously update our databases to ensure the most current information.'
  },
  {
    question: 'Do FraudAuto reports cover all vehicles in Ghana?',
    answer: 'We provide reports for vehicles registered in Ghana through the DVLA system. Our database covers cars, trucks, motorcycles, and commercial vehicles. Some very old vehicles or those with incomplete registration records may have limited information available.'
  },
  {
    question: 'Where can I find a vehicle\'s VIN number?',
    answer: 'The VIN (Vehicle Identification Number) is typically located on the dashboard near the windshield on the driver\'s side, on the driver\'s side door frame, or in the engine compartment. It\'s also printed on your vehicle registration documents and insurance papers.'
  },
  {
    question: 'How much does a vehicle history report cost?',
    answer: 'We offer a free basic VIN check that includes theft status and basic vehicle information. Comprehensive reports start from GHS 25 for a single report, with discounted packages available for multiple reports or dealer accounts.'
  },
  {
    question: 'How quickly will I receive my report?',
    answer: 'Most reports are generated instantly after payment confirmation. In rare cases where additional verification is needed, reports may take up to 24 hours. You\'ll receive your report via email and can also access it through your account dashboard.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-medium lg:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about FraudAuto vehicle verification
          </p>
        </motion.div>

        <div className="space-y-6">
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
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex flex-1 items-center justify-between gap-4 rounded-2xl p-4 text-left w-full bg-white hover:bg-gray-50/70 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className="h-5 w-5 text-secondary-orange" />
                    <span className="text-lg font-medium text-zinc-700 tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 transition-transform group-hover:scale-105 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4 text-gray-800" />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 ml-14">
                    <div className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-md transition-all">
                      <span className="flex-1 text-md leading-relaxed text-gray-700">
                        {faq.answer}
                      </span>
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-orange/20 transition-transform hover:scale-105">
                        <MessageCircle className="h-5 w-5 text-secondary-orange" />
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
          className="text-center mt-12 p-6 bg-white rounded-2xl shadow-md"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl">★</span>
              ))}
            </div>
            <span className="font-semibold text-lg">4.9 out of 5</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Based on 2,346 customer reviews</p>
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ Recommend this service
          </div>
        </motion.div>
      </div>
    </section>
  );
}
