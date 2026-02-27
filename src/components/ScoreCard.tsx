"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreCardProps {
    score: number;
}

export default function ScoreCard({ score }: ScoreCardProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Count up animation
        let start = 0;
        const end = score;
        if (start === end) return;

        const duration = 1500;
        const incrementTime = (duration / end) * 2;

        const timer = setInterval(() => {
            start += 1;
            setAnimatedScore(start);
            if (start >= end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [score]);

    // Determine color based on score
    let colorClass = "text-red-500";
    let strokeColor = "#EF4444"; // red-500
    let message = "Needs Major Revision";

    if (score >= 75) {
        colorClass = "text-green-400";
        strokeColor = "#4ADE80"; // green-400
        message = "Highly Competitive";
    } else if (score >= 50) {
        colorClass = "text-yellow-400";
        strokeColor = "#FACC15"; // yellow-400
        message = "Good, Needs Polish";
    }

    // Circular progress math
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-gray-800 bg-[#0F1523]/50 p-8 backdrop-blur-xl shadow-lg"
        >
            <h3 className="mb-6 text-lg font-medium text-gray-300">Resume IQ Score</h3>

            <div className="relative flex items-center justify-center">
                {/* Background Circle */}
                <svg className="h-40 w-40 -rotate-90 transform">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-800"
                    />
                    {/* Animated Progress Circle */}
                    <motion.circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${colorClass}`}>
                        {animatedScore}
                    </span>
                    <span className="text-sm text-gray-500">/ 100</span>
                </div>
            </div>

            <p className={`mt-6 rounded-full px-4 py-1 text-sm font-medium bg-gray-800/50 ${colorClass}`}>
                {message}
            </p>
        </motion.div>
    );
}
