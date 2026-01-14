import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, ScrollText, ShoppingCart, Store, Building2, Eye } from 'lucide-react';

export function DvlaIntegrity() {
    const governanceFeatures = [
        {
            icon: Shield,
            title: "DVLA Governance",
            description: "Full data controls and access oversight of DVLA activities",
            iconBg: "bg-slate-900"
        },
        {
            icon: Lock,
            title: "Secure Integration",
            description: "Encrypted data flows with role-based access controls",
            iconBg: "bg-slate-900"
        },
        {
            icon: FileCheck,
            title: "Data Protection",
            description: "All compliance with Ghana Data Protection Act",
            iconBg: "bg-slate-900"
        },
        {
            icon: ScrollText,
            title: "Audit Trail",
            description: "Complete verification logs for regulatory oversight",
            iconBg: "bg-slate-900"
        }
    ];

    const targetAudiences = [
        {
            icon: ShoppingCart,
            title: "For Buyers",
            tag: "Reduce Risk",
            tagColor: "bg-primary-red",
            description: "Make informed vehicle purchase decisions backed by comprehensive verification data from trusted sources.",
            benefits: [
                "Protect your investment",
                "Avoid fraud and hidden issues",
                "Instant verification reports"
            ]
        },
        {
            icon: Store,
            title: "For Dealers",
            tag: "Reduce Disputes, Reduce Risk",
            tagColor: "bg-primary-orange",
            description: "Build customer trust and minimize liability by offering verified vehicle histories with every sale.",
            benefits: [
                "Enhance customer confidence",
                "Reduce legal exposure",
                "Streamline inventory checks"
            ]
        },
        {
            icon: Building2,
            title: "For Insurers & Financiers",
            tag: "Reduce Risk, Accelerate",
            tagColor: "bg-primary-orange",
            description: "Access comprehensive vehicle data to make accurate risk assessments and lending decisions.",
            benefits: [
                "Better risk pricing",
                "API integration available",
                "Faster loan approvals"
            ]
        },
        {
            icon: Eye,
            title: "For Regulators & Security Agencies",
            tag: "Gain Visibility",
            tagColor: "bg-slate-900",
            description: "Leverage actionable institution-level insights for effective vehicle registration, fraud, and cross-border irregularities.",
            benefits: [
                "Track stolen vehicles",
                "Cross-agency collaboration",
                "Comprehensive audit trails"
            ]
        }
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
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* DVLA Governance Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
                            Designed to Strengthen National Vehicle Registration Integrity
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-4xl mx-auto">
                            FraudWall-Auto is built to complement existing DVLA processes through controlled, IOV-governed data integration, enabling enhanced cross-verification and fraud detection while preserving data sovereignty and compliance with Ghana's Data Protection Act.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8"
                    >
                        {governanceFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-white border border-gray-200 rounded-md p-6 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`${feature.iconBg} p-3 rounded-lg shrink-0`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-blue-50/50 border-l-4 border-blue-500 p-6  max-w-5xl mx-auto"
                    >
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">Key Principle:</span> FraudWall-Auto operates as a complementary verification layer to DVLA data governance to support in-depth DVLA oversight, governance actions, and continuous regulatory oversight.
                        </p>
                    </motion.div>
                </div>

                {/* Who It's For Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">
                            Who It's For
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto"
                    >
                        {targetAudiences.map((audience, index) => {
                            const Icon = audience.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gray-50/50 border border-gray-200 rounded-md p-6 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`${audience.tagColor} p-3 rounded-md shrink-0`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                                {audience.title}
                                            </h3>
                                            <span className={`${audience.tagColor} text-white text-xs px-3 py-1 rounded-lg inline-block`}>
                                                {audience.tag}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {audience.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {audience.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-orange shrink-0" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
