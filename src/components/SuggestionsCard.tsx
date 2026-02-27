"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";

interface SuggestionsCardProps {
    suggestions: string[];
}

export default function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col col-span-1 md:col-span-2 rounded-3xl border border-gray-800 bg-[#0F1523]/50 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-200">Actionable Suggestions</h3>
                    <p className="text-sm text-gray-500">AI-generated tips to improve your resume</p>
                </div>
            </div>

            <ul className="space-y-4 relative z-10">
                {suggestions.length === 0 ? (
                    <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">Your resume is perfectly optimized according to our rule set!</span>
                    </li>
                ) : (
                    suggestions.map((suggestion, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-start group rounded-xl p-3 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                        >
                            <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                <ChevronRight className="h-3 w-3" />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{suggestion}</p>
                        </motion.li>
                    ))
                )}
            </ul>
        </motion.div>
    );
}
