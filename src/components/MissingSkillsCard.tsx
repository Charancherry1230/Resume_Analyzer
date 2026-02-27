"use client";

import { motion } from "framer-motion";
import { AnalysisResult } from "@/lib/analyzer";

interface MissingSkillsCardProps {
    result: AnalysisResult;
}

export default function MissingSkillsCard({ result }: MissingSkillsCardProps) {
    // Combine all missing skills and take top 8
    const allMissing = [
        ...result.technical.missing.map(s => ({ name: s, type: 'technical' })),
        ...result.frameworks.missing.map(s => ({ name: s, type: 'framework' })),
        ...result.tools.missing.map(s => ({ name: s, type: 'tool' }))
    ];

    // Just show a random subset of 8 for demonstration, but prioritize technical
    const topMissing = allMissing.slice(0, 8);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col rounded-3xl border border-gray-800 bg-[#0F1523]/50 p-6 backdrop-blur-xl shadow-lg"
        >
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-200">High-Value Missing Keywords</h3>
                <p className="text-xs text-gray-500 mt-1">Consider adding these if you have experience.</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {topMissing.length === 0 ? (
                    <span className="text-sm text-gray-500">You hit all our tracked keywords!</span>
                ) : (
                    topMissing.map((skill, index) => (
                        <motion.span
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium border shadow-sm ${skill.type === 'technical'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                }`}
                        >
                            {skill.name}
                        </motion.span>
                    ))
                )}
            </div>
        </motion.div>
    );
}
