import { motion } from 'framer-motion';
import { BellElectric, CheckCircle2 } from 'lucide-react';
import { Stats } from './stats';

export function RiskCapabilities() {
    const riskLevels = [
        {
            level: "L",
            title: "Low Risk",
            description: "Clean history, verified",
            percentage: 15,
            color: "green",
            bgColor: "bg-green-50/20",
            borderColor: "border-green-500",
            iconBg: "bg-green-500",
            textColor: "text-green-700",
            barColor: "bg-green-500"
        },
        {
            level: "M",
            title: "Medium Risk",
            description: "Needs investigation",
            percentage: 50,
            color: "orange",
            bgColor: "bg-orange-50/20",
            borderColor: "border-primary-orange/40",
            iconBg: "bg-primary-orange",
            textColor: "text-orange-700",
            barColor: "bg-primary-orange"
        },
        {
            level: "H",
            title: "High Risk",
            description: "Exercise caution",
            percentage: 85,
            color: "red",
            bgColor: "bg-red-50/20",
            borderColor: "border-red-500",
            iconBg: "bg-red-600",
            textColor: "text-red-700",
            barColor: "bg-red-600"
        }
    ];

    const coreCapabilities = [
        "VIN & Plate Verification",
        "International Theft & Salvage Checks",
        "Maintenance & Mileage Analysis",
        "Recall & Safety Alerts",
        "Downloadable Verification Reports"
    ];

    const advancedCapabilities = [
        "Post-verification monitoring & alerts",
        "API access for dealers & institutions",
        "Role-based access for agencies",
        "Audit logs & compliance reporting"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="py-16 sm:py-24 bg-gray-50 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Risk Scoring Section */}
                <div className="mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
                            Instant <span className="text-primary-red">Vehicle</span> Risk Scoring
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
                            Multi-source data analysis generating simple risk scores to support informed decisions
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
                    >
                        {riskLevels.map((risk, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                            
                                className={`${risk.borderColor} border-2 rounded-md transition-all duration-300 group cursor-pointer bg-white p-2 w-80`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.5 }}
                                        className={`${risk.iconBg} w-14 h-14 rounded-full flex items-center justify-center shrink-0`}
                                    >
                                        <span className="text-white text-lg font-semibold">{risk.level}</span>
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-black font-semibold text-md mb-1">
                                            {risk.title}
                                        </h3>
                                        {/* Risk Bar */}
                                        <div className="w-full pb-3 pt-1">

                                            <div className="w-40 h-1.5  bg-gray-200/50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${risk.percentage}%` }}
                                                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                                                    viewport={{ once: true }}
                                                    className={`h-full ${risk.barColor} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-xs">
                                            {risk.description}
                                        </p>
                                    </div>
                                </div>
                           
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <Stats />
                {/* Platform Capabilities Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
                            Platform <span className="text-primary-red">Capabilities</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
                    >
                        {/* Core Capabilities */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white/50 border border-gray-200/60 rounded-md p-8 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-slate-900 p-2.5 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">
                                    Core Capabilities
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {coreCapabilities.map((capability, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-3 group"
                                    >
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 group-hover:bg-primary-orange transition-colors duration-300" />
                                        <span className="text-gray-700 text-base leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                                            {capability}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Advanced Capabilities */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-md p-8 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Animated background accent */}
                            <motion.div
                                className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/10 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary-orange p-2.5 rounded-lg">
                                        <BellElectric className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Advanced Capabilities
                                    </h3>
                                </div>
                                <ul className="space-y-4">
                                    {advancedCapabilities.map((capability, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-start gap-3 group"
                                        >
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-orange shrink-0 group-hover:bg-white transition-colors duration-300" />
                                            <span className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                                                {capability}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
