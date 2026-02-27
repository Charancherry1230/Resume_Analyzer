"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/lib/analyzer";

interface SkillsCardProps {
    category: SkillCategory;
    delay?: number;
}

export default function SkillsCard({ category, delay = 0.1 }: SkillsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col rounded-3xl border border-gray-800 bg-[#0F1523]/50 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-indigo-500/30 transition-colors"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-200">{category.name}</h3>
                <span className="text-sm font-medium text-gray-400 bg-gray-800/50 px-2.5 py-0.5 rounded-full">
                    {category.found.length}
                </span>
            </div>

            {category.found.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-500 italic py-6">
                    No skills detected.
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {category.found.map((skill, index) => (
                        <motion.span
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: delay + index * 0.05 }}
                            className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
