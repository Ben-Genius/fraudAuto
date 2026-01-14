import { motion } from 'framer-motion';
import { Globe, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AfcftaCta() {
    return (
        <section className="relative">
            {/* AfCFTA Banner */}
            <div className="bg-slate-900 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6"
                    >
                        <div className="bg-primary-orange/20 p-3 rounded-full animate-pulse ">
                            <Globe className="w-8 h-8 text-primary-orange " />
                        </div>
                        <p className="text-white text-sm sm:text-base md:text-lg text-start max-w-2xl">
                            Designed to scale across Ghana, West Africa, and the African Continental Free Trade Area (AfCFTA)
                        </p>
                    </motion.div>
                </div>
            </div>

       
          
        </section>
    );
}
