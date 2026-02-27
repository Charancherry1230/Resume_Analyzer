"use client";

import { motion } from "framer-motion";
import { AnalysisResult } from "@/lib/analyzer";
import ScoreCard from "./ScoreCard";
import SkillsCard from "./SkillsCard";
import MissingSkillsCard from "./MissingSkillsCard";
import SuggestionsCard from "./SuggestionsCard";

interface ResultsDashboardProps {
    result: AnalysisResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
    return (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full"
            >
                <div className="mb-8 border-b border-gray-800 pb-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        Analysis Results
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        A comprehensive breakdown of your resume&apos;s technical strength.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Top Row: Score & Missing Skills */}
                    <div className="lg:col-span-1">
                        <ScoreCard score={result.score} />
                    </div>

                    <div className="lg:col-span-2">
                        <MissingSkillsCard result={result} />
                    </div>

                    {/* Middle Row: Detected Skills (Categorized) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        <SkillsCard category={result.technical} delay={0.2} />
                        <SkillsCard category={result.frameworks} delay={0.3} />
                        <SkillsCard category={result.tools} delay={0.4} />
                        <SkillsCard category={result.soft} delay={0.5} />
                    </div>

                    {/* Bottom Row: Suggestions */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-2">
                        <SuggestionsCard suggestions={result.suggestions} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
